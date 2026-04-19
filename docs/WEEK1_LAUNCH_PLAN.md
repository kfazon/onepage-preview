# Peek — Week 1 Launch Plan
**Version:** 1.0 | **Date:** 2026-04-19 | **Owner:** Kristijan + AI

---

## Goal for Week 1

Get first 3 paying customers and validate the full outreach → preview → claim → pay funnel.

**Success metric:** 3 paying customers by end of Week 1.

---

## Day-by-Day Plan

### Day 1 (Today) — Setup Complete

**Kristijan's tasks (45 min):**
- [ ] Set up Cloudflare KV binding (5 min)
  → Dashboard → Pages → peek-preview → Settings → Functions → KV Namespaces → Add "PREVIEWS" → namespace ID `7ca53bc9`
- [ ] Create Stripe Checkout Links (20 min)
  → Stripe Dashboard → Products → Create 3 products:
    - Peek Go Live DE: €149/month, copy link
    - Peek Go Live ES: €99/month, copy link
    - Peek Go Live PL: €59/month, copy link
- [ ] Add Stripe checkout links to the codebase (send to AI or edit directly)
  → In landing pages: replace `#` with actual Stripe checkout URLs in the pricing CTAs
- [ ] Update Impressum with real company address (5 min)
  → Edit apps/web/src/pages/impressum.astro
- [ ] Add Stripe keys to GitHub repo secrets (10 min)
  → GitHub repo → Settings → Secrets → Add STRIPE_WEBHOOK_SECRET

**AI's tasks (auto-complete):**
- ✅ 5 example previews (Pixel)
- ✅ 6 SEO landing pages (Pixel)
- ✅ Demos showcase page (Blitz)
- ✅ Competitor comparison page (Blitz)
- ✅ Test data CSVs (Hobotnica)
- ✅ Apollo + LinkedIn search configs (Hobotnica)

---

### Day 2 — First Previews Generated

**Action:** Generate 20 preview pages for DE Berlin businesses.

**Steps:**
1. Use Apollo.io or LinkedIn to find 20 hair salons in Berlin with no website
2. Run `scripts/batch-generate.js` with test data
3. Review generated previews — quality check
4. Pick the 10 best ones for outreach
5. Store preview URLs in a Google Sheet

**Target:** 20 previews generated.

---

### Day 3 — First LinkedIn Outreach

**Action:** Send 20 LinkedIn connection requests to DE Berlin businesses.

**Steps:**
1. Go to LinkedIn → Sales Navigator (or manual search)
2. Filter: Berlin, Hair Salon, 1-10 employees
3. Send connection requests with message:
   ```
   Hi [Name], I noticed [Business Name] in Berlin — we built a free preview website for businesses like yours. Want to see it?
   ```
4. Wait for accepts (typically 24-48 hours)

**Target:** 20 connection requests sent.

---

### Day 4 — Follow Up on LinkedIn Responses

**Action:** When connections accept, send preview links.

**Message template:**
```
Hi [Name], thanks for connecting!

Here's the free preview we made for [Business Name]:
[preview_link]

It shows your address, hours, photos, WhatsApp button, and reviews.
Free to claim. Your own domain starts at €149/month.

Want to see it? Just click the link.

[Your name]
```

**Target:** Send 10 preview links to accepted connections.

---

### Day 5 — First Claims?

**Action:** Monitor for claim form submissions.

**If claims come in:**
1. Send personalized email with Stripe Checkout Link within 2 hours
2. Follow up within 24 hours if no response

**If no claims:**
- Send follow-up to those who clicked but didn't claim:
  ```
  Hi [Name], just checking in — did you get a chance to look at the preview?
  [preview_link]
  The preview stays online for a few more days.
  ```

**Target:** 2-3 claim requests.

---

### Day 6 — Convert Claims to Paying Customers

**Action:** Follow up on claims, push for payment.

**Email to those who claimed:**
```
Subject: Your preview is ready — claim your page today

Hi [Name],

Thanks for claiming the preview for [Business Name]!

Here's your checkout link — takes 2 minutes:
[stripe_checkout_link]

What you get:
✓ Your own domain (e.g., [business-slug].de)
✓ WhatsApp booking button
✓ QR code for your menu
✓ SSL certificate
✓ No Peek branding
✓ Cancel anytime

Questions? Reply to this email — I'm here to help.

[Kristijan]
```

**Target:** 1-2 paying customers.

---

### Day 7 — Review & Plan Week 2

**Sunday evening — 30 min review:**

1. **Metrics:**
   - How many connection requests sent?
   - How many accepted?
   - How many preview links clicked?
   - How many claims?
   - How many paid?

2. **What worked:**
   - Which message got the best response?
   - Which type of business responded best?

3. **Week 2 plan:**
   - Scale what worked
   - Fix what didn't
   - Add 20 more businesses
   - If 1+ paying customers: ask for referral

---

## Quick Reference: Kristijan's Daily Routine

### Morning (15 min)
1. Check email for new claims
2. Check Stripe for new payments
3. Check LinkedIn for new messages

### Afternoon (30 min)
1. Send 10-20 LinkedIn connection requests
2. Follow up on pending conversations
3. Update Google Sheet CRM

### Evening (15 min)
1. Review day's results
2. Log in CRM
3. Plan tomorrow's outreach

---

## Outreach Templates (Copy-Paste Ready)

### LinkedIn Connection Request
```
Hi [Name], I noticed [Business Name] in [City] — we built a free preview website for similar businesses. Want to see what yours could look like?
```

### LinkedIn Follow Up (after accept)
```
Hi [Name], thanks for connecting!

Here's your free preview → [preview_link]

It shows your address, hours, photos, WhatsApp, and reviews.
Your own domain from €149/month.

Want to see it? Just click.

[Your name]
```

### Email — Claim Response
```
Subject: Your preview is ready — claim it today

Hi [Name],

Thanks for your interest in Peek!

Your preview for [Business Name] is live here:
[preview_link]

To get your own domain (e.g., [slug].de) and remove Peek branding:
→ [stripe_checkout_link]

€149/month · Cancel anytime · SSL included

Questions? Reply anytime.

[Kristijan]
```

### Email — Follow Up (Day 3)
```
Hi [Name], did you get a chance to look at the preview?
[preview_link]

The preview stays online a few more days.

[Kristijan]
```

### Email — Final Follow Up (Day 10)
```
Hi [Name], this is your last reminder — the preview for [Business Name] expires soon.
[preview_link]

Last chance to claim your own domain:
[stripe_checkout_link]

[Kristijan]
```

---

## If Kristijan Gets Busy

**Week 1 is labor-intensive.** The first customers require personal outreach.

**If Kristijan can only spend 30 min/day:**
- Focus on LinkedIn only (most efficient)
- Send 10 connections/day
- Follow up on accepts
- Skip cold email initially

**If Kristijan is busy for a few days:**
- AI can take over follow-up emails (once Stripe/Resend are set up)
- Kristijan only needs to: review suggested emails, approve/send

---

## Success Triggers

| Signal | What it means | Action |
|:---|:---|:---|
| 3+ claim requests in Week 1 | Product-market fit validated | Scale outreach |
| 1 paying customer in Week 1 | First revenue! | Ask for Google review + referral |
| 0 responses to LinkedIn | Message not working | Try different message |
| High open rate, no clicks | Subject line good, offer weak | Improve preview quality |
| Claims but no payment | Price too high OR checkout broken | Check Stripe, consider discount |

---

## Failure Modes to Avoid

1. **Not following up** — 80% of sales happen after the 3rd contact
2. **Not sending enough outreach** — Need 50+ touches to get 1 customer
3. **Waiting for inbound** — No one will find Peek without outbound
4. **Giving up too early** — Week 1 is validation, not revenue

---

*Last updated: 2026-04-19 16:05 GMT+2*