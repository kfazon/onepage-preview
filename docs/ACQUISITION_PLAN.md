# Peek — Customer Acquisition Plan (Akvizicija Kupaca)
**Version:** 1.0
**Date:** 2026-03-28
**Target market:** Njemačka (Faza 1)
**Goal:** Sistematična, repetabilna akvizicija 20+ paying customers u 12 tjedana

---

## Sadržaj
1. [Kratki pregled funnela](#1-funnel)
2. [Data sourcing](#2-data)
3. [Lead enrichment](#3-enrichment)
4. [Preview generation](#4-preview)
5. [Email sequence](#5-email)
6. [Claim flow](#6-claim)
7. [Sales i payment](#7-sales)
8. [Deploy i onboarding](#8-deploy)
9. [Metrics](#9-metrics)
10. [Operativni ritam](#10-ritam)

---

## 1. Acquisition Funnel

```
[DATA]              [GENERACIJA]         [OUTREACH]        [CONVERSION]
1,000 poduzeća  →  1,000 previewa   →  1,000 emailova →  50 klikova (5%)
                                                                    ↓
[CLAIM]              [SALES]              [PAYMENT]          [DEPLOY]
20 zahtjeva       →  10 kontaktirano  →  5 plaćeno      →  5 live (0.5%)
(2% od klikova)      (50% reply)         (50% close)        (100%)
```

**Target brojevi (DE tržište):**

| Faza | Poslano | Klikovi | Claim | Sales |
|------|---------|---------|-------|-------|
| Mjesec 1 | 200 | 10 | 2 | 1 |
| Mjesec 2 | 500 | 25 | 8 | 3 |
| Mjesec 3 | 1,000 | 50 | 16 | 8 |
| Mjesec 4+ | 2,000/mj | 100+ | 32+ | 15+ |

---

## 2. Data Sourcing — B2B Liste

### 2.1 Preporučeni izvori

**Tier 1 — Besplatno / jeftino:**

| Izvor | Što daje | Ograničenje |
|-------|---------|-------------|
| **Apollo.io** | Email, phone, company info, enrichment | $49/mj (10K kontakata) |
| **Google Maps API** | Naziv, adresa, category, reviews | 28K req/mj free |
| **Hunter.io** | Email finder po domeni | $49/mj (2K searches) |
| **LinkedIn Sales Nav** | Kontakt osobe, title | $99+/mj |

**Tier 2 — Bulk data:**

| Provider | Cijena | Kvaliteta |
|----------|--------|----------|
| Apollo.io | $49/mj | Visoka |
| Clearbit | $200/mj | Vrlo visoka |
| ZoomInfo | $5K+/mj | Najviša (pre skupo) |

**Preporučujem: Apollo.io — $49/mj**
- 10,000 kontakata/mj
- Email verification uključen
- Filters: zemlja, industrija, veličina, lokacija
- Bulk export u CSV

### 2.2 ICP Filter — Tko ide na listu

```
✅ UKLJUČENO:
- Mikro/malo poduzeće (1-9 zaposlenih)
- Ima fizičku lokaciju (kafić, frizer, mehaničar, fotograf)
- NEMA website (provjeri domain)
- Njemačko govorno područje (DE, AT, CH)
- B2C ili B2B usluga

❌ ISKLJUČENO:
- Velike tvrtke (50+ zaposlenih)
- E-commerce (trebaju full site)
- Tech/SaaS (znaju sami)
- Prethodno contactirani
- Opted-out
```

### 2.3 Data Schema

```csv
business_name, owner_email, phone, address, city, postal_code, country,
category, google_maps_url, domain, website_found, preview_url,
outreach_sent_1, outreach_open_1, outreach_click_1,
outreach_sent_2, outreach_open_2, outreach_click_2,
claim_submitted, claimed_at, payment_status, paid_at, live_url, tier
```

---

## 3. Lead Enrichment

### 3.1 Enrichment Workflow

```
[CSV iz Apollo/Google Maps]
        ↓
[Provjeri domain — ima li website?]
  → DNS lookup: "cafemorgenrot.de" → A record?
  → Ako ima website → REMOVE (ne spada u ICP)
        ↓
[Provjeri email validnost]
  → Apollo verify ili Hunter check
  → Ako nevaljan → REMOVE
        ↓
[Enrichment]
  → Dodaj owner name, title, company size
  → Označi jezik: DE/AT/CH
        ↓
[Final lista — 800 validnih leadsova]
```

### 3.2 Domain Check — kako znamo da nema web

```
Za svaki business:
1. Napravi domain od imena: "cafemorgenrot.de"
2. DNS lookup — ako postoji A record → ima web → REMOVE
3. Ako ne postoji → CANDIDATE

Tools:
- dig ili nslookup (besplatno)
- curl + host
```

---

## 4. Preview Generation

### 4.1 Batch Script

```javascript
// scripts/batch-generate.js
import { generatePreview } from '@onepage/generator';
import { readCSV, writeCSV } from './utils/csv.js';

const leads = await readCSV('./data/de_leads_filtered.csv');
const results = [];

for (const lead of leads) {
  const result = generatePreview({
    name: lead.business_name,
    address: lead.full_address,
    phone: lead.phone,
    template: detectTemplate(lead.category),
    lang: 'de',
    brandColor: detectBrandColor(lead.category),
  });

  results.push({
    ...lead,
    preview_url: `https://peek-preview.pages.dev/api/preview?name=${encodeURIComponent(lead.business_name)}&lang=de`,
    generated_at: new Date().toISOString(),
  });

  // Rate limit: 1 req/sec
  await sleep(1000);
}

await writeCSV('./data/de_leads_with_preview.csv', results);
```

### 4.2 Generator Poziv — NJEMAČKI

```javascript
generatePreview({
  name: "Café Morgenrot",
  tagline: "Gute-Laune-Café im Herzen von Berlin",
  description: "Kaffeespezialitäten und hausgemachte Kuchen in gemütlicher Atmosphäre.",
  address: "Torstraße 42, 10119 Berlin",
  phone: "+49 30 12345678",
  hours: "Mo-Fr 08:00-18:00 · Sa 09:00-17:00",
  mapUrl: "https://maps.google.com/?q=Café+Morgenrot+Berlin",
  template: "launch-teaser",
  lang: "de",  // ← OBAVEZNO
  brandColor: "#c8a86b",
  services: ["Kaffee", "Kuchen", "Frühstück"],
});
```

---

## 5. Email Outreach Sequence — 3 Emails, 14 Dana

**Sve na NJEMAČKOM. Nikad engleski za DE tržište.**

### 5.1 Email #1 — Dan 0

**Subject variants (A/B test):**
- A: "So sieht Ihre Website aus — kostenlos für [Name]"
- B: "[Name] — das ist Ihre neue Website (kostenlos)"
- C: "Ihre kostenlose Website ist fertig"

```
Betreff: So sieht Ihre Website aus — kostenlos für Café Morgenrot

---

Hallo [Owner Name],

ich bin's — Peek.

Ich habe gerade für Café Morgenrot eine kostenlose Website erstellt.
Sie ist in 2 Minuten fertig und sieht so aus:

👉 https://preview.peek.dev/cafe-morgenrot-berlin

Was Sie dort sehen:
✓ Ihre Adresse, Öffnungszeiten und Telefonnummer
✓ Eine professionelle Startseite für Ihr Café
✓ Anfahrtskarte
✓ Kontaktformular

Alles kostenlos. Keine Kreditkarte. Keine Verpflichtung.

Wenn Ihnen die Seite gefällt, können wir sie für €149/Monat
auf Ihrem eigenen Domain veröffentlichen.

Möchten Sie, dass wir die Seite veröffentlichen?
Einfach auf den Link klicken und "Ja, ich will" sagen.

Viele Grüße,
Das Peek-Team

---

P.S. Wenn Sie keine Website möchten, antworten Sie einfach
mit "STOP" — dann hören wir auf.

Peek · [Firmenadresse]
Privacy: https://peek.dev/privacy | Unsubscribe: https://peek.dev/optout?e=[EMAIL]
```

### 5.2 Email #2 — Dan 3 (clickers only)

```
Betreff: Re: So sieht Ihre Website aus — haben Sie schon reingeschaut?

---

Hallo [Owner Name],

vor ein paar Tagen habe ich Ihnen eine kostenlose Website
für [Business Name] geschickt.

Ich wollte kurz nachfragen — haben Sie sich die Seite schon
angeschaut?

👉 https://preview.peek.dev/cafe-morgenrot-berlin

Die Seite ist noch bis Ende der Woche online.

Einfach auf den Link klicken und "Ja, ich will" sagen.

Schöne Grüße,
Das Peek-Team

---

Unsubscribe: https://peek.dev/optout?e=[EMAIL]
```

### 5.3 Email #3 — Dan 7 (clickers, no claim)

```
Betreff: Letzte Chance — Ihre Website wird am Montag gelöscht

---

Hallo [Owner Name],

kurze Info: Die kostenlose Website für [Business Name]
wird am Montag gelöscht.

👉 https://preview.peek.dev/cafe-morgenrot-berlin

Wenn Sie die Seite behalten möchten, kostet das nur
€149/Monat — inklusive:

✓ Ihr eigener Domain (z.B. cafe-morgenrot.de)
✓ SSL-Zertifikat
✓ Professionelles Design
✓ Google Analytics

Jetzt sichern: https://preview.peek.dev/cafe-morgenrot-berlin

Schöne Grüße,
Das Peek-Team

---

Unsubscribe: https://peek.dev/optout?e=[EMAIL]
```

### 5.4 GDPR Compliance — Obavezno u svakom emailu

```
1. Unsubscribe link — obavezan
2. Physical address — Kristijanova firma
3. Privacy policy link
4. Obavijest: "Ovo je poslovni email poslan na [EMAIL] iz javnog registra"
5. "STOP" reply opcija
```

### 5.5 Email Send — Resend Setup

```javascript
// scripts/send-outreach.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const batch = await readCSV('./data/de_leads_with_preview.csv');

for (const lead of batch) {
  try {
    await resend.emails.send({
      from: 'Peek <hallo@peek.dev>',
      to: lead.email,
      subject: `So sieht Ihre Website aus — kostenlos für ${lead.business_name}`,
      html: EMAIL_TEMPLATE_DE({ ...lead }),
      headers: {
        'List-Unsubscribe': `<https://peek.dev/optout?e=${lead.email}>`,
        'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
        'X-Peek-Campaign': 'de-launch-1',
      },
    });

    console.log(`✅ Sent to ${lead.business_name}`);
    await sleep(1200); // Rate limit: 50/min max

  } catch (error) {
    console.log(`❌ Failed: ${lead.email}`);
  }
}
```

### 5.6 UTM Tracking

```
Preview URL:
https://peek-preview.pages.dev/api/preview?name=...
  &utm_source=email
  &utm_medium=outreach
  &utm_campaign=de-launch-1
  &utm_content=email_1
  &lead_id=ABC123
```

---

## 6. Claim Flow

### 6.1 Što se dešava kada korisnik pošalje claim

```
Korisnik klikne "Ja, ich will"
        ↓
[Webhook ili email trigger]
  → Spremi u KV store: claim { business_name, email, preview_url, claimed_at }
  → Pošalji automatsku potvrdu korisniku
        ↓
[Email → Kristijan]
  → "Novi claim: Café Morgenrot — hallo@cafemorgenrot.de"
        ↓
[Kristijan kontaktira korisnika]
  → Personalizirani email s ponudom
  → Priloži ugovor (PDF)
        ↓
[Sales conversation]
  → Odgovori na pitanja
  → Pošalji Stripe checkout link
        ↓
[Korisnik plaća]
```

### 6.2 Claim Confirmation — automatski

```
From: Peek <hallo@peek.dev>
To: hallo@cafemorgenrot.de
Subject: Wir haben Ihre Anfrage erhalten

---

Hallo,

vielen Dank für Ihr Interesse!

Wir melden uns innerhalb von 24 Stunden bei Ihnen —
mit Ihrem persönlichen Angebot.

Schöne Grüße,
Das Peek-Team

---

Peek · Privacy: https://peek.dev/privacy
```

### 6.3 Kristijan — follow-up (24h)

```
From: [Kristijan] <[kristijan@peek.dev]>
To: hallo@cafemorgenrot.de
Subject: Ihr persönliches Angebot — Café Morgenrot

---

Hallo,

vielen Dank für Ihr Interesse an Peek!

Ich bin [Kristijan] — ich kümmere mich persönlich um Ihr Projekt.

┌─────────────────────────────────────────────────────┐
│  Go Live — €149/Monat                               │
│                                                     │
│  ✓ Ihr eigener Domain (cafe-morgenrot.de)          │
│  ✓ SSL-Zertifikat                                  │
│  ✓ Peek Hosting                                    │
│  ✓ Google Analytics                                │
│  ✓ Kontaktformular                                 │
│  ✓ 5 GB Traffic/Monat                              │
│                                                     │
│  Vertragslaufzeit: 12 Monate                       │
│  Kündigung: 30 Tage im Voraus                      │
└─────────────────────────────────────────────────────┘

Anbei der Vertrag — einfach unterschreiben und zurück.

Fragen? Schreiben Sie uns jederzeit.

Schöne Grüße,
[Kristijan]
```

---

## 7. Sales i Naplata

### 7.1 Stripe Checkout

```javascript
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const session = await stripe.checkout.sessions.create({
  mode: 'subscription',
  payment_method_types: ['card'],
  line_items: [{
    price_data: {
      currency: 'eur',
      product_data: {
        name: 'Peek Go Live — Café Morgenrot',
        description: 'Website-Hosting inkl. Domain, SSL, Analytics',
      },
      unit_amount: 14900, // €149.00
      recurring: { interval: 'month' },
    },
    quantity: 1,
  }],
  customer_email: 'hallo@cafemorgenrot.de',
  success_url: 'https://peek.dev/danke?session_id={CHECKOUT_SESSION_ID}',
  cancel_url: 'https://peek.dev/kontakt',
  metadata: {
    business_name: 'Café Morgenrot',
    preview_url: 'https://preview.peek.dev/cafe-morgenrot-berlin',
  },
});

// Pošalji klijentu
console.log(session.url);
```

### 7.2 Proces Plaćanja

```
Korisnik plati (Stripe webhook: checkout.session.completed)
        ↓
[Webhook trigger]
  → Spremi u KV: payment { business_name, email, paid_at }
  → Pošalji "Hvala" korisniku
  → Notifikacija Kristijanu
        ↓
[Kristijan provjerava u Stripe]
  → Izdaje invoice (reverse charge za EU B2B)
  → Knjiži u knjigovodstvo
        ↓
[Deploy na custom domain]
```

### 7.3 Fakturiranje

**Za EU B2B (reverse charge):**
- Kristijan izdaje fakturu BEZ PDV-a (0% VAT)
- Klijent sam obračunava VAT u svojoj državi
- Na fakturi: "VAT reverse charge — Art. 196 EU VAT Directive"

---

## 8. Deploy i Onboarding

### 8.1 Deploy Flow

```
Payment confirmed (Stripe webhook)
        ↓
[Kristijan prima notifikaciju]
  → "Café Morgenrot je platio!"
        ↓
[Kristijan pita klijenta]
  → "Koji domain želite?" → "cafe-morgenrot.de"
        ↓
[Registracija domaina] (ako ne postoji)
  → Preko Kristijanove firme
  → DNS setup u Cloudflare:
    CNAME @ → peek-preview.pages.dev (DNS only)
        ↓
[Cloudflare Pages → Custom Domains]
  → Dodaj cafe-morgenrot.de
  → SSL automatski (Cloudflare)
        ↓
[Test]
  → curl -sI https://cafe-morgenrot.de → 200 OK
        ↓
[Klijent dobiva email]
  → "Vaša stranica je live: https://cafe-morgenrot.de"
  → Upute za Google Analytics
```

### 8.2 DNS Setup (Cloudflare)

```
DNS → Add record:
  Type: CNAME
  Name: @ (ili cafe)
  Target: peek-preview.pages.dev
  Proxy: DNS only (grey cloud)

Ili za subdomain:
  Type: CNAME
  Name: www
  Target: peek-preview.pages.dev
  Proxy: DNS only
```

### 8.3 Onboarding Email (automatski)

```
From: Peek <hallo@peek.dev>
To: hallo@cafemorgenrot.de
Subject: Ihre Website ist live! 🎉

---

Hallo!

Die Website für Café Morgenrot ist jetzt live:

👉 https://cafe-morgenrot.de

Was Sie bekommen:
✓ Ihre eigene Domain
✓ SSL-Zertifikat
✓ Hosting bei Peek
✓ Kontaktformular

Google Analytics einrichten:
→ analytics.google.com → Property erstellen
→ Tracking-Code → Pošaljite nama → dodamo

Fragen? Schreiben Sie uns jederzeit.

Schöne Grüße,
Das Peek-Team

---

Peek · Privacy: https://peek.dev/privacy
```

---

## 9. Metrics i Optimizacija

### 9.1 Ključni KPIs

**Outreach:**
| Metric | Cilj |
|--------|------|
| Open rate | 35-45% |
| Click rate | 3-8% |
| Bounce rate | < 5% |
| Claim rate (od klikova) | 10-20% |
| Claim rate (od poslanih) | 1-3% |

**Sales:**
| Metric | Cilj |
|--------|------|
| Reply rate | 10-20% |
| Close rate | 30-50% |
| Sales cycle | 3-7 dana |
| LTV | > €1,788 |

**Financial:**
| Metric | Cilj |
|--------|------|
| MRR M3 | €2K+ |
| ARR Y1 | €24K+ |
| CAC | €50-€150 |
| LTV/CAC | > 10x |
| Churn | < 10%/mj |

### 9.2 Tjedni Report Template

```
OUTREACH (ovaj tjedan)
- Poslano: 500 emailova
- Open rate: 42%
- Click rate: 5.2%
- Bounce: 3.1%
- Claim: 4

SALES
- Active claims: 8
- In conversation: 5
- Awaiting payment: 2
- Paid: 1 (€149)

FINANCIAL
- MRR: €447
- New customers: 1
- Churned: 0
```

### 9.3 A/B Testiranje

```
Tjedan 1: Testiraj 3 subjecta (100 svaki)
  → A: 40% open
  → B: 45% open ✅ WINNER
  → C: 38% open

Tjedan 2+: Koristi B, povećaj volume
```

---

## 10. Operativni Ritam

### Dnevni (Automatizirano)
```
08:00 — Novi leadsovi iz Apollo
09:00 — Batch preview generation
10:00 — Email send batch
11:00 — Check claim webhook
14:00 — Kristijan: Odgovori na mailove
16:00 — Kristijan: Pošalji Stripe linkove
18:00 — Deploy (ako ima novih plaćanja)
```

### Tjedni (Ponedjeljak)
```
09:00 — Tjedni report
10:00 — A/B test analiza
11:00 — Provjeri Stripe paymente
12:00 — Planiraj novi batch (1,000 leadsova)
```

### Mjesečni (1. u mjesecu)
```
- MRR growth review
- Churn analysis
- Budget review (Apollo, Resend)
- Goal check
```

---

## 11. Alati i Stack

| Kategorija | Alat | Cijena | Koristi |
|-----------|------|--------|---------|
| Email sending | **Resend** | €20/mj (50K emailova) | Outreach |
| B2B data | **Apollo.io** | $49/mj (10K kontakata) | Lead lista |
| Payment | **Stripe** | 2.9% + €0.25 po tx | Naplata |
| Hosting | **Cloudflare Pages** | €0 (do 100GB) | Website |
| Spreadsheet | **Google Sheets** | Besplatno | CRM |
| Email finding | **Hunter.io** | $49/mj (opcionalno) | Enrichment |

---

## 12. Kristijanove Zadaće — To-Do Lista

### Odmah (Tjedan 1):
- [ ] Otvori Apollo.io account ($49/mj)
- [ ] Otvori Resend account (€20/mj)
- [ ] Setup Stripe (ako već nemaš)
- [ ] Verificiraj domain za slanje emaila (hallo@peek.dev)
- [ ] Napravi pravni template za ugovor (B2B hosting)
- [ ] Prvi test: 50 emailova (ručno ili skripta)

### Kontinuirano:
- [ ] Provjerava notifikacije (claim, payment) dnevno
- [ ] Šalje personalizirane emailove claimerima (24h reply)
- [ ] Izdaje invoice za svako plaćanje
- [ ] Radi DNS setup za nove klijente
- [ ] Mjesečno: provjeri troškove i MRR

---

**Document status:** Gotov
**Sljedeći korak:** Kristijan otvara accounts (Apollo, Resend) + ja pišem batch generation skriptu
