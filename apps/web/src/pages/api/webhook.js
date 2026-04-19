/**
 * Stripe Webhook Handler
 * POST /api/webhook
 * 
 * Handles:
 *   - checkout.session.completed → payment successful, trigger domain deploy
 *   - customer.subscription.deleted → subscription cancelled
 *   - customer.subscription.updated → plan changes (future use)
 * 
 * Environment variables:
 *   STRIPE_WEBHOOK_SECRET — Webhook signing secret from Stripe dashboard
 *   KRISTIJAN_EMAIL      — Email to notify on successful payments
 *   DEPLOY_WEBHOOK_URL   — URL to call to trigger deploy (optional)
 *   KV_REST_BASE         — Cloudflare KV REST base URL
 *   KV_REST_TOKEN        — Cloudflare KV REST token
 */

import { createStore } from '@onepage/generator/store';

export const prerender = false;

// ---- Stripe signature verification ----
async function verifyStripeSignature(rawBody, signature, secret) {
  // In production, use Stripe's actual signature verification
  // For now, we verify using a simple check
  if (!secret) return true; // Skip if no secret configured
  
  try {
    // crypto.subtle is available in Cloudflare Workers
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );
    
    // Signature format: t=timestamp,v1=signature
    const parts = signature.split(',');
    const timestamp = parts.find(p => p.startsWith('t='))?.slice(2);
    const sig = parts.find(p => p.startsWith('v1='))?.slice(3);
    
    if (!timestamp || !sig) return false;
    
    const payload = `${timestamp}.${rawBody}`;
    const signatureBytes = Uint8Array.from(atob(sig), c => c.charCodeAt(0));
    
    return await crypto.subtle.verify(key, signatureBytes, encoder.encode(payload));
  } catch {
    return false;
  }
}

// ---- Store payment in KV ----
async function logPayment(session, env) {
  const store = createStore(null, {
    KV_REST_BASE: env.KV_REST_BASE,
    KV_REST_TOKEN: env.KV_REST_TOKEN,
  });
  
  // Get existing payments
  const paymentsRaw = await store._get ? null : null; // Use direct KV if available
  
  // For now, use a simple log approach
  const paymentRecord = {
    event: 'checkout.session.completed',
    sessionId: session.id,
    customerEmail: session.customer_details?.email || session.customer_email,
    amount: session.amount_total,
    currency: session.currency,
    businessName: session.metadata?.business_name || '',
    customDomain: session.metadata?.custom_domain || '',
    country: session.metadata?.country || '',
    createdAt: new Date().toISOString(),
  };
  
  console.log('[Webhook] Payment received:', JSON.stringify(paymentRecord));
  
  // Store in KV using direct REST API if available
  if (env.KV_REST_BASE && env.KV_REST_TOKEN) {
    try {
      const key = `stripe:payments:${session.id}`;
      const headers = {
        'Authorization': `Bearer ${env.KV_REST_TOKEN}`,
        'Content-Type': 'application/json',
      };
      
      await fetch(`${env.KV_REST_BASE}/values/${encodeURIComponent(key)}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(paymentRecord),
      });
      
      // Also append to payments index
      const indexKey = 'stripe:payments:index';
      const existing = await fetch(`${env.KV_REST_BASE}/values/${encodeURIComponent(indexKey)}`, { headers });
      let index = [];
      if (existing.ok) {
        const text = await existing.text();
        if (text) index = JSON.parse(text);
      }
      index.push(session.id);
      await fetch(`${env.KV_REST_BASE}/values/${encodeURIComponent(indexKey)}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(index),
      });
    } catch (err) {
      console.error('[Webhook] Failed to log to KV:', err.message);
    }
  }
  
  return paymentRecord;
}

// ---- Send notification email (placeholder using Resend) ----
async function sendPaymentNotification(payment, env) {
  if (!env.KRISTIJAN_EMAIL) {
    console.log('[Webhook] No KRISTIJAN_EMAIL configured, skipping notification');
    return;
  }
  
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    console.log('[Webhook] No RESEND_API_KEY configured, skipping notification');
    return;
  }
  
  const amount = (payment.amount / 100).toFixed(2);
  const currency = payment.currency?.toUpperCase() || 'EUR';
  
  const body = `
🎉 New Payment Received!

Business: ${payment.businessName || 'N/A'}
Domain: ${payment.customDomain || 'N/A'}
Email: ${payment.customerEmail || 'N/A'}
Amount: ${amount} ${currency}
Session: ${payment.sessionId}
Country: ${payment.country}

Time: ${payment.createdAt}
  `.trim();
  
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'onepage.preview <noreply@onepage.preview>',
        to: env.KRISTIJAN_EMAIL,
        subject: `💰 Payment received: ${amount} ${currency} from ${payment.businessName || payment.customerEmail}`,
        text: body,
      }),
    });
    
    if (response.ok) {
      console.log('[Webhook] Notification sent to', env.KRISTIJAN_EMAIL);
    } else {
      console.error('[Webhook] Failed to send notification:', await response.text());
    }
  } catch (err) {
    console.error('[Webhook] Error sending notification:', err.message);
  }
}

// ---- Trigger deploy flow ----
async function triggerDeploy(payment, env) {
  if (!env.DEPLOY_WEBHOOK_URL) {
    console.log('[Webhook] No DEPLOY_WEBHOOK_URL configured, skipping deploy trigger');
    return;
  }
  
  const deployPayload = {
    business_name: payment.businessName,
    custom_domain: payment.customDomain,
    session_id: payment.sessionId,
    customer_email: payment.customerEmail,
    country: payment.country,
    timestamp: payment.createdAt,
  };
  
  try {
    const response = await fetch(env.DEPLOY_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(deployPayload),
    });
    
    if (response.ok) {
      console.log('[Webhook] Deploy triggered for', payment.customDomain || payment.businessName);
    } else {
      console.error('[Webhook] Deploy trigger failed:', response.status, await response.text());
    }
  } catch (err) {
    console.error('[Webhook] Deploy trigger error:', err.message);
  }
}

// ---- Handle cancellation ----
async function handleCancellation(session, env) {
  console.log('[Webhook] Subscription cancelled for:', session.customer_email || session.customer);
  
  if (env.KV_REST_BASE && env.KV_REST_TOKEN) {
    try {
      const key = `stripe:cancelled:${session.subscription}`;
      const record = {
        event: 'customer.subscription.deleted',
        subscriptionId: session.subscription,
        customerEmail: session.customer_email || session.customer_details?.email,
        cancelledAt: new Date().toISOString(),
      };
      
      const headers = {
        'Authorization': `Bearer ${env.KV_REST_TOKEN}`,
        'Content-Type': 'application/json',
      };
      
      await fetch(`${env.KV_REST_BASE}/values/${encodeURIComponent(key)}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(record),
      });
    } catch (err) {
      console.error('[Webhook] Failed to log cancellation:', err.message);
    }
  }
}

// ---- Main webhook handler ----
export async function POST({ request, env }) {
  const signature = request.headers.get('stripe-signature') || '';
  const rawBody = await request.text();
  
  // Verify signature (skip in dev if no secret configured)
  const webhookSecret = env.STRIPE_WEBHOOK_SECRET;
  if (webhookSecret) {
    const isValid = await verifyStripeSignature(rawBody, signature, webhookSecret);
    if (!isValid) {
      console.error('[Webhook] Invalid signature');
      return json({ error: 'Invalid signature' }, 400);
    }
  }
  
  let event;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }
  
  console.log(`[Webhook] Received event: ${event.type} (${event.id})`);
  
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        console.log('[Webhook] checkout.session.completed:', session.id);
        
        // Log payment to KV
        const payment = await logPayment(session, env);
        
        // Send email notification to Kristijan
        await sendPaymentNotification(payment, env);
        
        // Trigger deploy flow
        await triggerDeploy(payment, env);
        
        return json({ received: true, sessionId: session.id });
      }
      
      case 'customer.subscription.deleted': {
        const session = event.data.object;
        console.log('[Webhook] customer.subscription.deleted:', session.id);
        
        await handleCancellation(session, env);
        
        return json({ received: true });
      }
      
      case 'customer.subscription.updated': {
        // Future: handle plan changes, upgrades, downgrades
        const session = event.data.object;
        console.log('[Webhook] customer.subscription.updated:', session.id);
        
        return json({ received: true });
      }
      
      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        console.log('[Webhook] invoice.payment_failed:', invoice.id);
        // Future: send dunning email, notify customer
        return json({ received: true });
      }
      
      default:
        console.log(`[Webhook] Unhandled event type: ${event.type}`);
        return json({ received: true, skipped: event.type });
    }
  } catch (err) {
    console.error('[Webhook] Error processing event:', err);
    return json({ error: err.message }, 500);
  }
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=60',
    },
  });
}

// Health check
export async function GET() {
  return json({ status: 'webhook endpoint active', timestamp: new Date().toISOString() });
}