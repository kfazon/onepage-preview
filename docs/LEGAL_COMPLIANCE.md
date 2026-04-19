# Peek — Legal Compliance Guide
**Version:** 1.0 | **Date:** 2026-04-19 | **Owner:** Maestro

---

## Purpose

This document explains what we can legally do in each target market. Kristijan is the legal entity (company owner) — he bears the risk. Read this before any outreach.

---

## Research Sources

- Germany: UWG §7 (Gesetz gegen den unlauteren Wettbewerb)
- Austria: TKG §174 (Telekommunikationsgesetz)
- Spain: LSSI + GDPR
- Poland: UODO + RODO
- General: GDPR Article 6(1)(f) legitimate interest

---

## Country-by-Country Rules

### 🇩🇪 Germany

#### Cold Email (B2B)

**§7(3) UWG allows cold email WITHOUT prior consent if ALL of:**
1. Email sent to **company address** (GmbH, UG, AG, OHG, KG) — NOT a sole trader (Gewerbetreibende, Einzelunternehmer)
2. Email address obtained in context of **sale of goods/services** to the recipient
3. Used for **direct marketing of similar products/services**
4. Recipient was given **opt-out at time of collection** AND in every email
5. Email **clearly identifies as advertising**

**Practical interpretation:**
- Email to `info@cafemorgenrot.de` (company domain) = ✅ OK (if conditions met)
- Email to `hans.muller@gmail.com` (personal email of sole trader) = ❌ NOT OK — needs prior consent
- Email to `@gmx.de`, `@web.de` (consumer email) = ❌ NOT OK

#### What "sale context" means
- If we buy a list from Apollo.io that was collected in a business context = likely OK
- If we scraped from Google Maps = arguable, but legitimate interest defense applies
- If we can't prove business context = don't email

#### Required in every email:
```
- Subject line: clearly advertising (no deceptive "RE:" tricks)
- Body: "Diese E-Mail ist eine Werbemitteilung"
- Opt-out link: one-click unsubscribe
- Physical address of sender (Kristijan's company)
- Privacy policy link
- If individual: "Diese E-Mail wurde an [email] gesendet, basierend auf öffentlich zugänglichen Unternehmensdaten"
```

#### Penalties:
- UWG: Up to €300,000 per violation + cease-and-desist letters from competitors
- GDPR: Up to €20M or 4% of global revenue
- Abmahnungen (warning letters) are common — €200-500 per violation

#### Safe approach:
- ✅ Email to company domains (gmbh.de, de domain)
- ✅ LinkedIn warm outreach (professional context)
- ✅ Inbound opt-in (they fill form)
- ❌ Mass email to gmail/gmx/web.de (personal email)
- ❌ Email to Gewerbetreibende without consent

---

### 🇦🇹 Austria

**TKG §174:** Sending unsolicited commercial emails requires **prior consent** (opt-in). No exceptions for B2B.

**Additionally:** Must check RTR Robinson list before sending.
URL: https://www.rtr.at/TKP/service/ecg-liste/ecg-list.en.html

#### Safe approach:
- ✅ Inbound only (opt-in form on website)
- ✅ LinkedIn warm outreach
- ❌ Mass cold email — NOT LEGAL under any circumstance

---

### 🇪🇸 Spain

**LSSI + GDPR:** B2B cold email allowed under legitimate interest (GDPR Art. 6(1)(f)).

**Requirements:**
- Clear identification as commercial communication
- Easy opt-out mechanism
- Privacy policy link
- Physical address

**Who is protected:**
- Personas físicas (individuals, natural persons) = need consent
- Empresas (companies: SL, SA, SLU, SLNE) = legitimate interest OK

**Safe approach:**
- ✅ Email to company domains (@company.es, @gmail.com for individuals who are sole traders — be careful)
- ✅ Mass campaigns with proper setup
- ❌ Personal @gmail/@hotmail of individual business owners without consent

---

### 🇵🇱 Poland

**RODO + UODO:** B2B cold email allowed under legitimate interest.

**Requirements:**
- Easy opt-out in every email
- Clear identification of sender
- Privacy policy

**Safe approach:**
- ✅ B2B cold email to company domains
- ✅ Mass campaigns with proper setup
- Personal email addresses (sole traders) = borderline, use caution

---

### 🇭🇷 Croatia

**GDPR:** Legitimate interest applies.

**Safe approach:**
- ✅ B2B cold email
- ✅ Mass campaigns

---

## Practical Rules for Peek Outreach

### DE Market — What We Do

```
OUTREACH CHANNELS:
1. LinkedIn warm outreach (personal message, not automated)
2. Inbound form on landing page (they opt-in)
3. SEO / organic traffic (no outreach needed)
4. Referrals from existing customers

WHAT WE DO NOT DO IN DE:
- Mass cold email campaigns
- Purchased email lists
- Automated LinkedIn DMs
- Any email to personal email domains (gmail, gmx, web.de)
```

### ES + PL Market — What We Do

```
OUTREACH CHANNELS:
1. Cold email to company domains (@company.es, @company.pl)
2. LinkedIn warm outreach
3. Inbound form
4. Referrals

REQUIREMENTS FOR EVERY EMAIL:
- Opt-out link
- Physical address
- Privacy policy
- Clear "advertising" identification
- GDPR compliance notice
```

---

## Impressum Requirements (DE)

Every commercial website targeting DE must have Impressum with:
- Full company name (Rechtsform: GmbH, UG, etc.)
- Complete street address
- Email + phone
- Trade register number (Handelsregister)
- VAT ID (USt-IdNr.)
- Responsible for content (Verantwortlicher)

**We have created `/impressum` page — Kristijan must update with real company details.**

---

## Cookie Consent

GDPR §25 TDDDG requires consent for non-essential cookies.

**Our implementation:**
- ✅ Cookie consent banner on all landing pages
- ✅ No tracking cookies until consent
- ✅ localStorage remembers consent

**Note:** Analytics tools (if we add them) need consent banner.

---

## Data Storage Rules

- Store only: business name, email, preview URL, claim status
- Delete on opt-out within 24 hours
- Max retention: 2 years for inactive contacts
- Document: what data we collected, from where, when

---

## When Kristijan Should Get a Lawyer

- If we get an Abmahnung (cease-and-desist) in DE
- If Austria outreach causes issues
- If we want to scale to FR or IT (different rules)
- Before EU expansion beyond current markets

---

## Summary Cheat Sheet

| Market | Cold Email B2B | Mass Email | LinkedIn | Inbound | Notes |
|:---|:---|:---|:---|:---|:---|
| DE | ✅ Co. only | ❌ | ✅ Warm | ✅ | No personal email |
| AT | ❌ NO | ❌ NO | ✅ Warm | ✅ | Strict opt-in |
| ES | ✅ Co. domains | ✅ | ✅ Warm | ✅ | GDPR LI |
| PL | ✅ Co. domains | ✅ | ✅ Warm | ✅ | GDPR LI |
| HR | ✅ Yes | ✅ | ✅ Warm | ✅ | GDPR LI |

**LI = Legitimate Interest**
**Co. = Company domain (not personal email)**

---

*Last updated: 2026-04-19 15:15 GMT+2*