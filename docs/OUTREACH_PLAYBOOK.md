# Peek — Outreach Playbook
**Version:** 1.0 | **Date:** 2026-04-19 | **Owner:** Maestro + Hobotnica

---

## Purpose

Step-by-step playbooks for each outreach channel. Legal-safe for all markets.

---

## Playbook 1: DE — LinkedIn Warm Outreach

**Legal basis:** Professional context, no mass automation, personal connection
**Risk:** Low (no cold email, professional platform)
**Volume:** 10-20 connections/day max

### Step 1: Find Prospects

1. Go to LinkedIn → Sales Navigator
2. Search filters:
   - Location: Berlin, Hamburg, Munich, Cologne, Düsseldorf (start with Berlin)
   - Industry: Restaurants, Food & Beverage, Personal Care, Trades
   - Company size: 1-10 employees (micro-businesses)
   - Keywords in title: "Inhaber", "Geschäftsführer", "Besitzer"

### Step 2: Manual Connection Request

Send connection request with this message template (short!):

```
Hi [Name],

I noticed [Business Name] in [City] — we actually built a free 
preview website for similar businesses. 

Would you like to see what yours could look like?

[First Name]
```

### Step 3: If They Accept — Follow Up

Send message:

```
Hi [Name], thanks for connecting!

Here's the preview we made for [Business Name]:
[preview_link]

It's free to claim, and if you want your own domain it starts 
at €149/month.

Want to see it? Just click the link — no signup needed.

[First Name]
```

### Step 4: Follow Up (Day 3-4, no response)

```
Hi [Name], did you get a chance to look at the preview?

[preview_link]

Happy to answer any questions.

[First Name]
```

### Step 5: Final Follow Up (Day 10)

```
Hi [Name], the preview for [Business Name] is expiring soon.

[preview_link]

If you're happy with your current web presence, no worries — 
just ignore this message.

But if you ever want a professional page without spending 
weeks building it, we're here.

[First Name]
```

### Tracking

Keep spreadsheet:
```
Name | Business | City | LinkedIn URL | Preview URL | Status | Notes
```

Status: `connected` → `preview_sent` → `interested` → `claimed` → `paid` | `not_interested` | `no_response`

---

## Playbook 2: DE — Inbound (SEO Lead)

**Legal basis:** They opt-in via form
**Risk:** Zero (they asked for it)
**Volume:** Depends on SEO performance

### Step 1: Create SEO Landing Pages

Create pages targeting:
- `/de/friseur-berlin/` — "Kostenlose Website für Friseur in Berlin"
- `/de/restaurant-muenchen/` — "Website für Restaurant in München"
- `/de/café-hamburg/` — "One-Page Website für Café"
- `/de/handwerker-köln/` — "Website für Handwerker in Köln"

Each page shows:
- Example preview for fictional business of that type
- "Want your own free preview?" form → capture email
- German language, DE prices, Impressum link

### Step 2: When Email Comes In

1. Receive email via form submission
2. AI generates preview with business name from email domain or manual
3. Send email:

```
Betreff: Ihre kostenlose Website-Vorschau ist fertig

Hallo,

wir haben eine kostenlose Vorschau für Sie erstellt.

Hier ist sie → [preview_link]

Was Sie dort sehen:
✓ Ihre Adresse und Öffnungszeiten
✓ Professionelles Design
✓ Kontaktformular
✓ Mobile-optimiert

Wenn Ihnen die Seite gefällt, können Sie sie für €149/Monat 
auf Ihrem eigenen Domain live schalten.

Einfach auf den Link klicken und "Ja, ich will" sagen.

Viele Grüße,
Das Peek-Team

---

Peek · [Adresse]
Privacy: https://peek-preview.pages.dev/privacy
Unsubscribe: [optout_link]
```

### Step 3: Follow Up Sequence

Day 3:
```
Betreff: Re: Ihre Vorschau für [Business Name]

Hallo,

wollten wir kurz nachfragen — haben Sie sich die Vorschau 
für [Business Name] schon angeschaut?

[preview_link]

Die Seite ist noch einige Tage online.

Viele Grüße,
Peek
```

Day 10:
```
Betreff: Letzte Chance — Ihre Vorschau wird gelöscht

Hallo,

kurze Info: Die Vorschau für [Business Name] wird am [Datum] 
gelöscht.

[preview_link]

Wenn Sie die Seite behalten möchten, klicken Sie einfach 
auf den Link und sagen "Ja".

Sonst kein Problem — einfach ignorieren.

Viele Grüße,
Peek
```

---

## Playbook 3: ES + PL — Cold Email (Mass Campaign)

**Legal basis:** GDPR legitimate interest + B2B context
**Risk:** Medium (proper opt-out required)
**Volume:** Start with 500/day, scale to 2,000/day

### Step 1: Apollo.io Data Export

1. Log into Apollo.io
2. Create search:
   - Country: Spain OR Poland
   - Industries: Food & Beverage, Personal Care Services, Construction, Retail
   - Company sizes: 1-10 employees
   - Has email: yes
   - Has website: yes (to filter out ones that have sites)

3. **Filter out businesses with websites:**
   - Remove all where `website` field is not null/empty
   - We only want businesses WITHOUT websites

4. Export to CSV: business_name, email, phone, address, city, country, domain, website_found

5. Target: 2,000 per country (ES + PL)

### Step 2: Generate Preview for Each

Run `scripts/batch-generate.js`:
```bash
node scripts/batch-generate.js --input=data/apollo-es-2000.csv --output=data/es-previews.csv --lang=es
node scripts/batch-generate.js --input=data/apollo-pl-2000.csv --output=data/pl-previews.csv --lang=pl
```

### Step 3: Send Email Sequence

Run `scripts/outreach-email.js`:
```bash
node scripts/outreach-email.js --input=data/es-previews.csv --market=es --dry-run=false
```

### Email 1 — Day 0 (Spanish)

```
Subject: Así podría verse la web de [Nombre del negocio]

Hola [Nombre],

He creado una vista previa gratuita para [Nombre del negocio].

Puedes verla aquí → [preview_link]

¿Qué incluye tu vista previa:
✓ Tu nombre, dirección y horarios
✓ Una página profesional para tu negocio  
✓ Mapa de ubicación
✓ Formulario de contacto

Todo gratis. Sin compromiso.

Si te gusta, puedes activarla por €99/mes — con tu propio 
dominio, sin marca de Peek, y hosting incluido.

¿Quieres verla? → [preview_link]

Saludos,
El equipo Peek

---

Peek | [Dirección de la empresa]
Privacy: https://peek-preview.pages.dev/privacy
Unsubscribe: [optout_link]

Este email fue enviado a [email] porque generamos una vista 
previa gratuita para [nombre del negocio] usando información 
disponible públicamente en registros comerciales.
```

### Email 2 — Day 3 (Spanish, no click)

```
Subject: Re: Tu web gratuita para [Nombre]

Hola [Nombre],

quería saber si tuviste oportunidad de ver la vista previa
para [Nombre].

Aquí está → [preview_link]

La página estará disponible unos días más.

Si tienes alguna pregunta, escríbeme.

Saludos,
Peek

---
Baja: [optout_link]
```

### Email 3 — Day 10 (Spanish, no claim)

```
Subject: Última oportunidad — tu web expira pronto

Hola [Nombre],

la vista previa para [Nombre] expira pronto.

Aquí la tienes una última vez → [preview_link]

Precio especial de lanzamiento: €99/mes
- Tu propio dominio (ej: tudominio.es)
- Sin marca de Peek
- SSL incluido
- Hosting profesional

Si te interesa, solo tienes que hacer clic → [stripe_checkout_link]

Saludos,
Peek

---
Baja: [optout_link]
```

### Polish Email 1

```
Subject: Tak mogłaby wyglądać strona [Nazwa firmy]

Dzień dobry [Imię],

Stworzyliśmy bezpłatny podgląd strony dla [Nazwa firmy].

Zobacz tutaj → [preview_link]

Co zawiera podgląd:
✓ Nazwa, adres i godziny otwarcia
✓ Profesjonalna strona dla Twojego biznesu
✓ Mapa dojazdu
✓ Formularz kontaktowy

Wszystko za darmo. Bez zobowiązań.

Jeśli Ci się podoba, możesz aktywować ją za 59€/miesiąc —
z własną domeną, bez logo Peek, hosting w cenie.

Chcesz zobaczyć? → [preview_link]

Pozdrawiam,
Zespół Peek

---
Peek | [Adres firmy]
Polityka prywatności: https://peek-preview.pages.dev/privacy
Wypisz się: [optout_link]

Ten email został wysłany do [email], ponieważ wygenerowaliśmy 
bezpłatny podgląd strony dla [nazwa firmy] używając publicznie 
dostępnych danych z rejestrów handlowych.
```

### Polish Email 2

```
Subject: Re: Twój bezpłatny podgląd dla [Nazwa firmy]

Dzień dobry [Imię],

chciałem sprawdzić, czy miałeś/-aś okazję zobaczyć podgląd
dla [Nazwa].

Tutaj jest → [preview_link]

Strona będzie dostępna jeszcze kilka dni.

Pozdrawiam,
Peek

---
Wypisz się: [optout_link]
```

### Polish Email 3

```
Subject: Ostatnia szansa — Twój podgląd wkrótce zniknie

Dzień dobry [Imię],

podgląd strony dla [Nazwa] wkrótce wygaśnie.

Oto link → [preview_link]

Cena specjalna: 59€/miesiąc
- Własna domena (np. twoja-firma.pl)
- Bez logo Peek
- SSL w cenie
- Hosting profesjonalny

Kliknij tutaj jeśli zainteresowany → [stripe_checkout_link]

Pozdrawiam,
Peek

---
Wypisz się: [optout_link]
```

---

## Playbook 4: CRM Tracking

### Spreadsheet Structure

Create Google Sheet with tabs:
- `Leads_DE` — LinkedIn warm leads
- `Leads_ES` — Spanish cold email leads  
- `Leads_PL` — Polish cold email leads
- `Claims` — All claim form submissions
- `Customers` — Paid customers
- `Revenue` — Payment tracking

### Columns for Leads tabs

```
Date | Name | Business | Email | Phone | City | Country | Source | Preview_URL | Email_1_Sent | Email_1_Open | Email_1_Click | Email_2_Sent | Email_3_Sent | Claim | Paid | Revenue | Notes
```

### Metrics to Track

**Weekly:**
- Emails sent
- Open rate (target: 35-45%)
- Click rate (target: 3-8%)
- Claims
- Sales
- Revenue

**Monthly:**
- MRR
- New customers
- Churn
- CAC
- LTV

---

## Playbook 5: Stripe Payment → Deploy Flow

### When Payment Comes In

1. Stripe webhook fires: `checkout.session.completed`
2. Log payment in KV store
3. Email to Kristijan: "NEW PAYMENT: [Business Name] - €149"
4. Kristijan contacts customer: "Which domain do you want?"
5. Customer responds with desired domain
6. Kristijan registers domain (if not exists)
7. Kristijan sets up DNS: CNAME → peek-preview.pages.dev
8. Kristijan adds custom domain in Cloudflare Pages
9. Email to customer: "Your site is live: https://[domain]"
10. Update spreadsheet: paid ✅

### DNS Setup for Customer

```
Type: CNAME
Name: @ (or subdomain)
Target: peek-preview.pages.dev
Proxy: DNS only (grey cloud)
```

### Verification

```bash
curl -sI https://[customer-domain.com] | head -1
# Should return: HTTP/2 200
```

---

## Troubleshooting

### Emails going to spam
- Check SPF/DKIM setup in Resend
- Warm up new sending domain slowly (start with 50/day)
- Avoid spam trigger words ("free", "guarantee", "act now")
- Use custom domain (not @gmail.com)

### Low open rates
- A/B test subject lines
- Send at different times (test Tuesday/Thursday 9-11am local)
- Personalize subject with business name

### High bounce rates
- Verify emails with Apollo before sending
- Remove bounced emails immediately
- Start with smaller list (500) to build reputation

### No claims
- Improve preview quality (use real business data)
- Follow up more aggressively (3 emails, not 2)
- Lower price in follow-up email

---

*Last updated: 2026-04-19 15:15 GMT+2*