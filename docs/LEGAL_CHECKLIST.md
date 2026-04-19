# Peek — Legal Checklist for Kristijan

**Version:** 1.0 | **Date:** 2026-04-19 | **Owner:** Kristijan

---

## Purpose

Things Kristijan must verify with a lawyer or do himself before launch. This is NOT legal advice — it's a guide to what needs attention.

---

## Before Any Outreach

### 1. Company Registration

Kristijan needs to confirm:

- [ ] His company is properly registered (GmbH, UG, or sole trader)
- [ ] VAT ID (USt-IdNr.) is active and verified
- [ ] Trade register entry is current (Handelsregister)

**If sole trader (Einzelunternehmer):**
- Cold email to B2B is MORE RESTRICTED in DE
- Consider forming a GmbH for liability protection

### 2. Impressum

The `/impressum` page is created but has placeholder data. Kristijan must:

- [ ] Replace "Musterstraße 12, 10115 Berlin" with his REAL company address
- [ ] Replace "Musterstadt GmbH" with his REAL company name
- [ ] Add his REAL Handelsregister number (HRB or HRA)
- [ ] Add his REAL VAT ID (USt-IdNr.)
- [ ] Verify the email address is monitored
- [ ] Verify the phone number is working

**Template for DE Impressum:**
```
Angaben gemäß § 5 TMG und § 55 Abs. 2 RStV:

[Firma Name]
[Rechtsform: z.B. GmbH]
[Straße und Hausnummer]
[PLZ Ort]
Deutschland

E-Mail: [kristijan's email]
Telefon: [phone number]

Handelsregister: [HRB/HRA Nummer] Amtsgericht [City]
USt-IdNr.: [DE + 9 digits]

Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:
[Name, Anschrift]
```

### 3. Privacy Policy (Datenschutzerklärung)

The `/privacy` page exists but Kristijan should:

- [ ] Verify it covers all data processing activities
- [ ] Add his real company name and address
- [ ] Confirm email address is correct
- [ ] Consider having a lawyer review the template

**Key elements that must be in the privacy policy:**
- Controller identity (Kristijan's company)
- Purpose of data processing (outreach, payment, hosting)
- Legal basis (legitimate interest for B2B, consent for form submissions)
- Data retention periods
- Rights of data subjects (access, deletion, objection)
- Cookie details
- Third-party services (Resend, Stripe, Cloudflare, Apollo)

### 4. Cookie Consent Banner

- [x] Cookie banner is implemented
- [ ] Verify it blocks non-essential cookies until consent
- [ ] If we add analytics (e.g., Google Analytics), ensure consent is required

---

## Before Cold Email (ES + PL markets only)

### 5. GDPR — Legitimate Interest Assessment

For B2B cold email under GDPR Art. 6(1)(f) legitimate interest:

Kristijan should document:
- [ ] Purpose: We send promotional emails about our service to businesses
- [ ] Necessity: Email is the only way to reach micro-businesses without websites
- [ ] Balancing test: Businesses can easily opt-out, we only email B2B

**This is our defense if someone files a complaint. Keep records of:**
- When we started emailing
- What list/source we used
- That opt-out mechanism works

### 6. List Quality

- [ ] Apollo.io data is collected in a business context (they scrape public data)
- [ ] We only email company domains (@company.es, @company.pl) — NOT personal emails
- [ ] We remove bounces and opt-outs immediately

### 7. Email Footer Compliance

Every email must include:
- [ ] Company name and address
- [ ] Privacy policy link
- [ ] One-click unsubscribe link
- [ ] Clear identification that this is advertising (for DE)

---

## Before LinkedIn Outreach (DE market)

### 8. LinkedIn Terms of Service

- [ ] LinkedIn Sales Navigator is designed for B2B outreach
- [ ] Personal (not automated) messages are fine
- [ ] Don't connect with fake profiles or deceptive practices
- [ ] Don't spam — keep volume reasonable (10-20/day max)

---

## Payment Setup (Stripe)

### 9. Stripe Account

- [ ] Kristijan's Stripe account is verified (business verification)
- [ ] Bank account is connected for payouts
- [ ] Payout schedule is set (weekly/monthly)

### 10. Invoice Compliance

Kristijan must issue proper invoices:
- [ ] Invoice template follows EU format
- [ ] Reverse charge is noted for B2B (when customer has VAT ID)
- [ ] Invoice numbers are sequential
- [ ] Invoices are stored for 10 years (tax requirement)

### 11. Tax Obligations

- [ ] Kristijan understands VAT rules for digital services in EU
- [ ] For DE customers: Kristijan's company must charge German VAT (19%)
- [ ] For ES/PL customers: Use reverse charge (0% VAT, customer pays their own country's VAT)
- [ ] Quarterly/monthly VAT returns are filed

---

## If Kristijan Gets a Legal Warning (Abmahnung)

**DO:**
1. Don't ignore it
2. Note the deadline to respond
3. Contact a lawyer immediately
4. Preserve all evidence

**DON'T:**
1. Don't sign anything without lawyer review
2. Don't admit fault
3. Don't pay without legal advice

---

## When to Get a Lawyer

- Before expanding to Austria (TKG is strict)
- If we get an Abmahnung in Germany
- If a GDPR complaint is filed against us
- Before hiring employees
- Before forming new companies in other countries

---

## Recommended Legal Resources (DE)

| Resource | Use |
|:---|:---|
| [IT-Recht Kanzlei](https://www.it-recht-kanzlei.de/) | Impressum + Privacy Policy generator (paid) |
| [Anwalt.de](https://www.anwalt.de/) | Find local lawyer for Abmahnungen |
| [IHK Berlin](https://www.ihk-berlin.de/) | Free business advice |
| [BMJ Europa](https://europa.eu/) | EU VAT rules for digital services |

---

## Quick Legal Risk Summary

| Activity | Risk Level | Mitigation |
|:---|:---|:---|
| LinkedIn warm outreach (DE) | LOW | Personal messages, professional context |
| SEO / inbound (all markets) | LOW | They opt-in, we follow GDPR |
| Cold email ES/PL (company domains) | MEDIUM | GDPR legitimate interest, proper opt-out |
| Cold email DE (to GmbH/AG only) | MEDIUM | UWG §7(3) exception, company domains only |
| Mass cold email AT (Austria) | HIGH | TKG §174 — DON'T DO IT |
| Cold email to personal emails (all) | HIGH | Not GDPR compliant, DON'T DO |
| Selling without proper invoices | HIGH | Tax violation, DON'T DO |

---

*Last updated: 2026-04-19 15:20 GMT+2*