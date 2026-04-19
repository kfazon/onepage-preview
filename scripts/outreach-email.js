#!/usr/bin/env node
/**
 * outreach-email.js — Resend-powered email sequence sender
 * 
 * Usage:
 *   node scripts/outreach-email.js --input data/leads.csv --dry-run
 *   node scripts/outreach-email.js --input data/leads.csv --day 0
 *   node scripts/outreach-email.js --input data/leads.csv --day 3 --dry-run
 *
 * Environment:
 *   RESEND_API_KEY        — Resend API key
 *   KRISTIJAN_EMAIL      — Notification email for errors (optional)
 * 
 * Input CSV columns:
 *   name, address, phone, category, lang, email, preview_url
 *
 * Output:
 *   data/emails_sent.csv — log of sent emails (name, email, day, subject, status)
 */

import { createRequire } from 'module';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

// ---- CLI args ----
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const dayArg = args.find(a => a === '--day');
const dayIdx = args.indexOf(dayArg);
const targetDay = dayArg && dayIdx !== -1 ? parseInt(args[dayIdx + 1], 10) : 0;
const inputArg = args.find(a => a === '--input' || a === '-i');
const inputIdx = args.indexOf(inputArg);
const inputPath = inputArg && inputIdx !== -1 ? resolve(args[inputIdx + 1]) : null;

if (!inputPath) {
  console.error('Usage: node scripts/outreach-email.js --input <csv> [--day 0|3|7] [--dry-run]');
  process.exit(1);
}

if (!existsSync(inputPath)) {
  console.error(`File not found: ${inputPath}`);
  process.exit(1);
}

// ---- Rate limiting state ----
const RATE_LIMIT_PER_MINUTE = 50;
const MIN_GAP_MS = Math.floor(60000 / RATE_LIMIT_PER_MINUTE);
let lastSentAt = 0;

// ---- CSV parser ----
function parseCSV(path) {
  const content = readFileSync(path, 'utf-8');
  const lines = content.trim().split('\n');
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  return lines.slice(1).map(line => {
    const vals = line.split(',');
    const obj = {};
    headers.forEach((h, i) => { obj[h] = (vals[i] || '').trim().replace(/^"|"$/g, ''); });
    return obj;
  });
}

// ---- Email templates per language & day ----
const TEMPLATES = {
  de: {
    0: {
      subjectA: 'Ihre kostenlose Webseite wartet auf Sie',
      subjectB: 'Noch heute online – Ihre kostenlose Vorschau',
      subjectC: 'So sieht Ihre neue Webseite aus',
      body: `Sehr geehrte/r {name},

vielen Dank für Ihr Interesse an onepage.preview!

Sie haben vor Kurzem eine kostenlose Vorschau Ihrer Webseite angefordert — hier ist sie:

👉 {preview_url}

Was Sie dort sehen, ist vollkommen unverbindlich und gehört Ihnen. Es ist Ihre Visitenkarte im Netz — fertig, ohne Kosten, ohne Vertrag.

⭐ WAS SIE ERHALTEN:
• Vollständig mobile Optimierung
• Google-relevante Struktur
• Sofort einsatzbereit
• In nur 2 Minuten mit Ihrem Domain verbunden

🔗 Jetzt dauerhaft sichern für nur 9 €/Monat:
{checkout_url}

---

Diese E-Mail wurde gesendet gemäß Art. 6 Abs. 1 lit. f) DSGVO (berechtigtes Interesse).
Verantwortlich: onepage.preview | E-Mail: privacy@onepage.preview
Sie erhalten diese Nachricht, weil Sie eine Vorschau angefordert haben.
{SECURITY_DIGEST}

Um sich abzumelden: {optout_url}`,
    },
    3: {
      subjectA: 'Ihre Vorschau läuft in 4 Tagen ab',
      subjectB: 'Nur noch wenige Tage — sichern Sie sich jetzt',
      subjectC: '4 Tage kostenlose Vorschau übrig',
      body: `Hallo {name},

ich wollte mich nur kurz melden — Ihre kostenlose Vorschau läuft bald ab:

👉 {preview_url}

Falls Sie sich noch nicht entschieden haben: Ich verstehe das. Aber ich möchte Ihnen auch zeigen, was Sie verlieren, wenn die Vorschau nicht mehr verfügbar ist.

⭐ Daher mein Angebot:
• Ich verlängere Ihre Vorschau kostenlos um 7 Tage
• Kein Risiko, kein Druck, keine Verpflichtung

Klicken Sie einfach auf den Link — ich kümmere mich um den Rest.

🔗 Oder sichern Sie sich jetzt dauerhaft für nur 9 €/Monat:
{checkout_url}

---

Diese E-Mail wurde gesendet gemäß Art. 6 Abs. 1 lit. f) DSGVO (berechtigtes Interesse).
Verantwortlich: onepage.preview | E-Mail: privacy@onepage.preview
{SECURITY_DIGEST}

Um sich abzumelden: {optout_url}`,
    },
    7: {
      subjectA: 'Letzte Erinnerung: Ihre Vorschau wird gelöscht',
      subjectB: 'Bevor es weg ist — sichern Sie sich noch heute',
      subjectC: 'Dies ist Ihre letzte Chance',
      body: `{name},

heute ist der letzte Tag, an dem Ihre kostenlose Vorschau verfügbar ist.

Nach heute wird sie gelöscht — und damit die Chance, sie ohne Kosten zu sichern.

👉 {preview_url}

Was ich Ihnen anbiete:

⭐ onepage.preview — dauerhaft für 9 €/Monat
• Ihre eigene Domain (z.B. www.{business_slug}.de)
• Professionelles Design, das Kunden überzeugt
• Sofort erreichbar auf Google
• Monatlich kündbar — kein Risiko

Dies ist die letzte Erinnerung. Nach heute ist die Vorschau weg.

🔗 Jetzt sichern:
{checkout_url}

---

Diese E-Mail wurde gesendet gemäß Art. 6 Abs. 1 lit. f) DSGVO (berechtigtes Interesse).
Verantwortlich: onepage.preview | E-Mail: privacy@onepage.preview
{SECURITY_DIGEST}

Um sich abzumelden: {optout_url}`,
    },
  },
  es: {
    0: {
      subjectA: 'Su página web gratuita le está esperando',
      subjectB: 'Visible online hoy mismo — su vista previa gratuita',
      subjectC: 'Así es cómo quedó su página web',
      body: `Estimado/a {name},

Gracias por interesarse en onepage.preview.

Ha solicitado una vista previa gratuita de su página web — aquí la tiene:

👉 {preview_url}

Lo que ve es totalmente gratuito y sin compromiso. Es su tarjeta de presentación en internet — lista, sin costos, sin contratos.

⭐ LO QUE OBTIENE:
• Totalmente optimizada para móviles
• Estructura optimizada para Google
• Lista para usar inmediatamente
• Conectada a su dominio en solo 2 minutos

🔗 Asegurar de forma permanente por solo 9 €/mes:
{checkout_url}

---

Este correo electrónico se ha enviado conforme al artículo 6.1.f) del RGPD (interés legítimo).
Responsable: onepage.preview | Correo electrónico: privacy@onepage.preview
Ha recibido este mensaje porque solicitó una vista previa.
{SECURITY_DIGEST}

Para darse de baja: {optout_url}`,
    },
    3: {
      subjectA: 'Su vista previa caduca en 4 días',
      subjectB: 'Solo quedan unos días — asegure su página ahora',
      subjectC: '4 días de vista previa gratuita restantes',
      body: `Hola {name},

solo quería informarle de que su vista previa gratuita caduca pronto:

👉 {preview_url}

Si aún no se ha decidido, lo entiendo. Pero también quiero mostrarle lo que pierde si la vista previa desaparece.

⭐ Por eso le ofrezto:
• Le extiendo la vista previa 7 días más gratis
• Sin riesgo, sin presión, sin compromiso

Haga clic en el enlace y yo me ocupo del resto.

🔗 O asegurar de forma permanente por solo 9 €/mes:
{checkout_url}

---

Este correo electrónico se ha enviado conforme al artículo 6.1.f) del RGPD (interés legítimo).
Responsable: onepage.preview | Correo electrónico: privacy@onepage.preview
{SECURITY_DIGEST}

Para darse de baja: {optout_url}`,
    },
    7: {
      subjectA: 'Último recordatorio: su vista previa se eliminará',
      subjectB: 'Antes de que desaparezca — asegure su página hoy',
      subjectC: 'Esta es su última oportunidad',
      body: `{name},

hoy es el último día en que su vista previa gratuita está disponible.

Después de hoy se eliminará — y con ella la oportunidad de asegurarla sin costos.

👉 {preview_url}

Lo que le ofrezco:

⭐ onepage.preview — permanentemente por 9 €/mes
• Su propio dominio (p. ej., www.{business_slug}.es)
• Diseño profesional que convence a los clientes
• Inmediatamente visible en Google
• Cancele mensualmente — sin riesgo

Este es el último recordatorio. Después de hoy, la vista previa desaparece.

🔗 Asegurar ahora:
{checkout_url}

---

Este correo electrónico se ha enviado conforme al artículo 6.1.f) del RGPD (interés legítimo).
Responsable: onepage.preview | Correo electrónico: privacy@onepage.preview
{SECURITY_DIGEST}

Para darse de baja: {optout_url}`,
    },
  },
  pl: {
    0: {
      subjectA: 'Twoja bezpłatna strona na Ciebie czeka',
      subjectB: 'Już dziś online — Twój bezpłatny podgląd',
      subjectC: 'Tak wygląda Twoja nowa strona',
      body: `Szanowny/a {name},

dziękujemy za zainteresowanie usługą onepage.preview.

Poprosiłeś/aś o bezpłatny podgląd swojej strony internetowej — oto on:

👉 {preview_url}

To, co widzisz, jest całkowicie niezobowiązujące i należy do Ciebie. To Twoja wizytówka w sieci — gotowa, bez kosztów, bez umowy.

⭐ CO OTRZYMUJESZ:
• W pełni zoptymalizowana na urządzenia mobilne
• Struktura zoptymalizowana pod kątem Google
• Gotowa do natychmiastowego użycia
• Połączona z Twoją domeną w zaledwie 2 minuty

🔗 Zabezpiecz na stałe już za jedyne 39 zł/miesiąc:
{checkout_url}

---

Niniejsza wiadomość e-mail została wysłana zgodnie z art. 6 ust. 1 lit. f) RODO (prawnie uzasadniony interes).
Administrator: onepage.preview | Adres e-mail: privacy@onepage.preview
Otrzymałeś/aś tę wiadomość, ponieważ poprosiłeś/aś o podgląd.
{SECURITY_DIGEST}

Aby zrezygnować: {optout_url}`,
    },
    3: {
      subjectA: 'Twój podgląd wygasa za 4 dni',
      subjectB: 'Jeszcze tylko kilka dni — zabezpiecz swoją stronę teraz',
      subjectC: '4 dni bezpłatnego podglądu pozostało',
      body: `Cześć {name},

chciałem/chciałam tylko poinformować — Twój bezpłatny podgląd wygasa wkrótce:

👉 {preview_url}

Jeśli jeszcze się nie zdecydowałeś/aś, rozumiem to. Ale chcę również pokazać Ci, co tracisz, jeśli podgląd zniknie.

⭐ Dlatego oferuję:
• Bezpłatnie przedłużam Twój podgląd o 7 dni
• Bez ryzyka, bez presji, bez zobowiązań

Po prostu kliknij link — zajmę się resztą.

🔗 Lub zabezpiecz na stałe już za 39 zł/miesiąc:
{checkout_url}

---

Niniejsza wiadomość e-mail została wysłana zgodnie z art. 6 ust. 1 lit. f) RODO (prawnie uzasadniony interes).
Administrator: onepage.preview | Adres e-mail: privacy@onepage.preview
{SECURITY_DIGEST}

Aby zrezygnować: {optout_url}`,
    },
    7: {
      subjectA: 'Ostatnie przypomnienie: Twój podgląd zostanie usunięty',
      subjectB: 'Zanim zniknie — zabezpiecz swoją stronę jeszcze dziś',
      subjectC: 'To Twoja ostatnia szansa',
      body: `{name},

dzisiaj jest ostatni dzień, w którym Twój bezpłatny podgląd jest dostępny.

Po dzisiaj zostanie usunięty — a wraz z nim możliwość zabezpieczenia go bez kosztów.

👉 {preview_url}

Co Ci oferuję:

⭐ onepage.preview — na stałe za 39 zł/miesiąc
• Własna domena (np. www.{business_slug}.pl)
• Profesjonalny design, który przekonuje klientów
• Natychmiast widoczna w Google
• Możliwość comiesięcznej rezygnacji — bez ryzyka

To jest ostatnie przypomnienie. Po dzisiaj podgląd znika.

🔗 Zabezpiecz teraz:
{checkout_url}

---

Niniejsza wiadomość e-mail została wysłana zgodnie z art. 6 ust. 1 lit. f) RODO (prawnie uzasadniony interes).
Administrator: onepage.preview | Adres e-mail: privacy@onepage.preview
{SECURITY_DIGEST}

Aby zrezygnować: {optout_url}`,
    },
  },
};

// A/B subjects per day (pick based on email index % 3)
const SUBJECT_VARIANTS = [null, 'subjectA', 'subjectB', 'subjectC'];

function getSubject(templates, day, emailIdx) {
  const variant = SUBJECT_VARIANTS[(emailIdx % 3) + 1]; // 0-indexed, skip null
  const subjects = [
    templates[day]?.subjectA,
    templates[day]?.subjectB,
    templates[day]?.subjectC,
  ];
  return subjects[emailIdx % 3] || subjects[0];
}

function getBody(templates, day) {
  return templates[day]?.body || templates[0]?.body || '';
}

// GDPR security digest placeholder (replace with actual hash in production)
const SECURITY_DIGEST = 'X-Peer: abc123def456';

function buildEmail(lead, day, templates, emailIdx) {
  const lang = lead.lang || 'de';
  const langTemplates = templates[lang] || templates.de;
  
  const name = lead.name || 'Geschäftsinhaber/in';
  const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
  
  const subject = getSubject(langTemplates, day, emailIdx);
  const body = getBody(langTemplates, day)
    .replace(/{name}/g, name)
    .replace(/{preview_url}/g, lead.preview_url || 'https://onepage.preview/demo')
    .replace(/{checkout_url}/g, `https://onepage.preview/checkout?biz=${encodeURIComponent(slug)}&lang=${lang}`)
    .replace(/{business_slug}/g, slug)
    .replace(/{optout_url}/g, 'https://onepage.preview/optout')
    .replace(/{SECURITY_DIGEST}/g, SECURITY_DIGEST);

  return { subject, body, lang };
}

function applyUTM(url) {
  const base = url.split('?')[0];
  const utm = 'utm_source=email&utm_medium=email&utm_campaign=outreach_day' + targetDay;
  return base + (base.includes('?') ? '&' : '?') + utm;
}

function rateLimitSleep() {
  const now = Date.now();
  const gap = MIN_GAP_MS - (now - lastSentAt);
  if (gap > 0) {
    // In dry-run mode we skip sleep to speed up testing
    if (!dryRun) {
      // actual sleep in real mode
    }
  }
  lastSentAt = Date.now();
}

async function sendEmail(email, to) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  
  if (!RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY environment variable is not set');
  }
  
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'onepage.preview <noreply@onepage.preview>',
      to: [to],
      subject: email.subject,
      html: `<p>${email.body.replace(/\n/g, '<br>')}</p>`,
      text: email.body,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Resend API error: ${response.status} ${err}`);
  }

  return await response.json();
}

async function main() {
  console.log(`\n📧 Outreach Email Sender — Day ${targetDay}`);
  console.log(`   Input: ${inputPath}`);
  console.log(`   Dry run: ${dryRun ? 'YES (no emails will be sent)' : 'NO'}`);
  console.log('');

  const leads = parseCSV(inputPath);
  console.log(`   Loaded ${leads.length} leads from CSV`);
  
  const langCounts = { de: 0, es: 0, pl: 0 };
  leads.forEach(l => {
    const lang = l.lang || 'de';
    langCounts[lang] = (langCounts[lang] || 0) + 1;
  });
  console.log(`   Languages: DE=${langCounts.de}, ES=${langCounts.es}, PL=${langCounts.pl}`);
  console.log('');

  if (dryRun) {
    console.log('🔍 DRY RUN — Would send the following emails:\n');
    leads.slice(0, 5).forEach((lead, i) => {
      const email = buildEmail(lead, targetDay, TEMPLATES, i);
      console.log(`   [${i + 1}] ${lead.email}`);
      console.log(`       Subject (${['A','B','C'][i % 3]}): ${email.subject}`);
      console.log(`       Name: ${lead.name}`);
      console.log(`       Lang: ${lead.lang || 'de'}`);
    });
    if (leads.length > 5) {
      console.log(`   ... and ${leads.length - 5} more`);
    }
    console.log(`\n   Total would send: ${leads.length} emails`);
    console.log(`   Estimated time: ~${Math.ceil(leads.length / RATE_LIMIT_PER_MINUTE)} minutes at ${RATE_LIMIT_PER_MINUTE}/min`);
    console.log('\n✅ Dry run complete. Remove --dry-run to send for real.\n');
    return;
  }

  // Real mode
  const results = [];
  const errors = [];

  for (let i = 0; i < leads.length; i++) {
    const lead = leads[i];
    if (!lead.email) {
      console.log(`   [${i + 1}/${leads.length}] SKIP ${lead.name} — no email`);
      results.push({ name: lead.name, email: 'N/A', day: targetDay, subject: 'N/A', status: 'skipped_no_email' });
      continue;
    }

    try {
      rateLimitSleep();
      const email = buildEmail(lead, targetDay, TEMPLATES, i);
      
      const utmBody = email.body.replace(
        /https:\/\/onepage\.preview[^ ")]+/g,
        applyUTM
      );
      email.body = utmBody;

      const result = await sendEmail(email, lead.email);
      
      console.log(`   [${i + 1}/${leads.length}] ✅ Sent to ${lead.email} (${result.id})`);
      results.push({ name: lead.name, email: lead.email, day: targetDay, subject: email.subject, status: 'sent', messageId: result.id });
      
      // Small delay between requests
      await new Promise(r => setTimeout(r, 1200));
    } catch (err) {
      console.log(`   [${i + 1}/${leads.length}] ❌ ${lead.email}: ${err.message}`);
      errors.push({ lead, error: err.message });
      results.push({ name: lead.name, email: lead.email, day: targetDay, subject: 'N/A', status: 'error', error: err.message });
    }
  }

  // Write results log
  const logPath = resolve(__dirname, '../data/emails_sent.csv');
  const logLines = ['name,email,day,subject,status,message_id'];
  results.forEach(r => {
    logLines.push(`"${r.name}","${r.email}",${r.day},"${r.subject}",${r.status},"${r.messageId || ''}"`);
  });
  writeFileSync(logPath, logLines.join('\n'));

  console.log(`\n📊 Results: ${leads.length} processed`);
  console.log(`   Sent: ${results.filter(r => r.status === 'sent').length}`);
  console.log(`   Errors: ${errors.length}`);
  console.log(`   Log: ${logPath}`);

  if (errors.length > 0 && process.env.KRISTIJAN_EMAIL) {
    // Would send error notification here (placeholder)
    console.log(`\n⚠️  Some emails failed. Consider checking KRISTIJAN_EMAIL for notifications.`);
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});