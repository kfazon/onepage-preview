# Peek — Poslovni i Razvojni Plan
**Version:** 1.0  
**Date:** 2026-03-28  
**Owner:** CEO (AI Agent) uz infrastrukturu Kristijana (firma)  
**Goal:** Maximize revenue, scalable SaaS za automatsku generaciju one-page web stranica za SMB

---

## 1. Vizija i Mission

**Vizija:** Postati dominantna platforma za automatsko generiranje i prodaju jednostraničnih web stranica u EU — od outreacha do hostinga.

**Mission:** Demokratizirati web prisutnost za 1.4M+ mikro i malih poduzeća u Hrvatskoj i EU koja nemaju web prisutnost, kroz automatiziranu detekciju, generaciju i prodaju.

**Thesis:** Najteži korak nije izraditi web stranicu — jest natjerati nekoga da plati za nju. Peek rješava i outreach i prodaju kroz free-preview model koji eliminira friction.

---

## 2. Market Analysis

### 2.1 Adresabilno Tržište (TAM/SAM/SOM)

| Layer | Opseg | Veličina | Napomena |
|-------|-------|----------|----------|
| **TAM** | EU mikro i mala poduzeća bez weba | ~6.2M poduzeća | 29% SMB-ova u EU nema web (Wix 2025) |
| **SAM** | Hrvatska + Slovenija + regija | ~180,000 poduzeća | Fokus na startu |
| **SOM** | Aktivni klijenti godina 1 | 500–2,000 | Realističan target s AI-driven outreachom |

**Hrvatska:**
- 136,400 mikro poduzeća (0–9 zaposlenih) — 80% svih SMB-ova
- 99.7% svih poduzeća su SMB-ovi
- Velika većina nema web prisutnost ili ima outdated web
- Prosječna cijena izrade web stranice u HR: 3,000–15,000 EUR

### 2.2 Konkurencija

| Konkurent | Tip | Slabost za Peek |
|-----------|-----|-----------------|
| Web studio (HR) | Full-service | Skupi, spori, 3-6 tjedana delivery |
| Wix/Squarespace | Self-service SaaS | Zahtijeva vlastiti rad, nije "besplatno" |
| Carrd.co | One-page SaaS | Nema outreach/automaciju |
| Mailchimp/Campaign Monitor | Email marketing | Nema web generaciju |
| Lead generation agencije | Outreach | Skupi, ručni proces |

**Peek differentiator:** Jedini koji automatski generira, hostira I prodaje — bez da klijent išta mora sam napraviti.

### 2.3 Kupac Profile (Ideal Customer Profile)

**ICP #1 — Mikro poduzetnik, fizička osoba (OBRT, samostalna djelatnost)**
- Ima fizičku lokaciju ili uslugu (kafić, frizer, servis)
- Ima Google Maps entry ili preporuku preko usta
- Nema web stranicu — gubi 30-50% potencijalnih kupaca
- Želi "nešto online" ali nema vremena/novca za dugi proces
- **Pain:** Osjeća da gubi posao, ne zna odakle početi
- **Budget:** 50–200 EUR/mjesečno ili jednokratno 300–1,500 EUR
- **Decision maker:** Sam, brza odluka (1–3 dana)

**ICP #2 — Mladi poduzetnik, growth-oriented**
- Ima Ideju/startup u early fazi
- Treba landing page za prezentaciju investitorima ili korisnicima
- Hitnost — treba jučer
- **Pain:** Previše komplicirano za trenutni scope
- **Budget:** 100–500 EUR/mjesečno
- **Decision maker:** Sam ili suosnivač

**ICP #3 — Lokalni event organizator**
- Kratkoročni eventi (festivali, radionice, meetupi)
- Treba stranicu za event koja traje 2-4 tjedna
- **Pain:** Jednokratno, ali ponavljajuće
- **Budget:** 100–300 EUR po eventu

**ICP #4 — B2B usluga (frizeri, saloni, zubari, odvjetnici)**
- Visoka marža na usluzi — lako mogu platiti 100-200 EUR/mj
- Preporuke su im glavni channel — web je bonus
- **Pain:** Konkurencija ima web, osjećaju pritisak
- **Budget:** 80–200 EUR/mjesečno

---

## 3. Proizvod (Product)

### 3.1 Ponuda — Tier Matrix

| Tier | Cijena | Opis | Upsell |
|------|--------|------|--------|
| **Preview** | Besplatno | Generirana stranica, peek-preview.pages.dev subdomain, watermark | Prijelaz na Go Live |
| **Go Live** | **99 EUR/mj** ili **790 EUR/god** | Vlastiti domain, bez watermarka, 5GB bandwidth, basic analytics, email support | Custom domain, više bandwidtha |
| **Growth** | 249 EUR/mj ili 1,990 EUR/god | Više stranica, SSL, napredne forme, API pristup, prioritet support | Više podstranica, e-commerce |

**Dodatni prihodi (one-time / napredno):**
- Custom dizajn (jednokratno): 200–500 EUR
- SEO setup: 100 EUR jednokratno
- Copywriting: 50 EUR/sat
- Extra bandwidth (10GB): +20 EUR/mj

### 3.2 Kalkulacija Jedinične Ekonomija

| Metric | Preview | Go Live | Growth |
|--------|---------|---------|--------|
| **Cijena (mj)** | 0 | 99 EUR | 249 EUR |
| **Gross margin** | N/A | ~92% (hosting cost ~8 EUR) | ~88% (hosting cost ~30 EUR) |
| **LTV (god 1, god 2+)** | 0 | 1,188 EUR | 2,988 EUR |
| **LTV (3 godine)** | 0 | 3,564 EUR | 8,964 EUR |
| **Cost to serve (mj)** | ~0.05 EUR | ~8 EUR | ~30 EUR |

**Pretpostavke:**
- Avg churn: 15%/mj za Mikro (lakše otkažu), 5%/mj za Growth
- Server: Cloudflare Pages free do ~100GB, zatim ~10 EUR/100GB
- Worker cost: ~0.50 EUR/mj po aktivnom projektu

---

## 4. Prodajni Model i GTM Strategija

### 4.1 Channel Strategy

**Primary: AI-driven outbound outreach (email + direct mail)**

Automatizirani workflow:
1. **Detekcija** — Popis poduzeća bez web prisutnosti (Google Maps API, local directories, HR register)
2. **Generacija** — AI generira preview stranicu (10 min po poduzeću)
3. **Outreach** — Email s linkom na live preview: "Pogledaj kako bi tvoja stranica izgledala — besplatno"
4. **Follow-up** — Ako klikne, ali ne kupi: 2 dodatna emaila
5. **Claim/Opt-out** — Jednostavan opt-out link, claim flow za upgrade

**Volumen po poduzeću:**
- Email cost: ~0.001 EUR (Resend/Postmark)
- Conversion rate target: 2-5% (preview → Go Live)
- Break-even: 1 klijent na 50-100 poslanih emailova

**Secondary: SEO + Inbound**
- Stranica za svaki grad u HR: "frizer-zagreb.peek.com", "kafic-split.peek.com"
- Long-tail keywords: "web stranica za frizera", "besplatna landing page"
- Cilj: 1,000 organic posjeta/mj do kraja godine 1

**Tertiary: Preporuke i Partnership**
- B2B partnership: Računovodstveni servisi, banke, komore
- Affiliate: 10% ponavljajuće provizije partnerima

### 4.2 Outreach Pipeline — Automatizacija

```
[Detekcija poduzeća bez weba]
        ↓
[AI generira preview u 10 min]
        ↓
[Email #1: "Pogledaj kako izgleda tvoja stranica" + link]
        ↓ (click)
[Email #2: "Jesi li imao vremena pogledati?" (dan 3)]
        ↓ (no click)
[Email #3: "Jos 5 minuta posla, pa imas stranicu" (dan 7)]
        ↓ (opt-out)
[Remove iz pipelinea]
        ↓ (click + no claim)
[Email #4: "Zadnja prilika — stranica ide dolje za 7 dana" (dan 14)]
        ↓ (claim)
[Claim flow → prodaja Go Live]
```

### 4.3 Prodajni Process

1. **Lead dobije email** s linkom na live preview
2. **Klikne link** — vidi svoju generiranu stranicu
3. **Claim flow:** Unese email → pošalje zahtjev
4. **Mi dobijemo notifikaciju** → ručni ili automatizirani kontakt
5. **Payment** → Kristijan izdaje račun preko firme
6. **Deploy na custom domain** → klijent ima svoju stranicu

---

## 5. Razvojni Plan — Roadmap

### Faza 0 — MVP (DONE ✅)
**Deadline:** 2026-03-28  
**Stack:** Astro + Cloudflare Pages + JSON store

- [x] Landing page (`peek-preview.pages.dev`)
- [x] 3 template enginea (launch-teaser, product-spotlight, event-waitlist)
- [x] API route za generaciju
- [x] Claim/opt-out forme (JS fetch)
- [x] Cloudflare Pages deploy

### Faza 1 — "Radeći MVP" (Tjedan 1–2)
**Cilj:** Prvi pravi klijent s plaćenom stranicom

**Razvoj:**
- [ ] Zamjena JSON store → Cloudflare KV (produkcijski store)
- [ ] Email notifikacije na claim (Cloudflare Workers email ili webhook → Kristijan)
- [ ] Custom domain podrška za Go Live (dodajemo Cloudflare DNS automation)
- [ ] Stripe integracija za naplatu (checkout link, nije full membrl)
- [ ] Go Live deploy flow (od claim → aktivacija)
- [ ] Prvi outreach test (50 poduzeća u ZG, ručno odabranih)

**Delivery metrics:**
- 1 paying customer
- Email conversion rate validation

### Faza 2 — Automatizirani Outreach (Tjedan 3–6)
**Cilj:** Skalabilni outbound engine

**Razvoj:**
- [ ] Business discovery API (Google Business Profile scraping ili third-party data provider)
- [ ] Batch generator — masovna generacija 100+ previewa iz CSV-a
- [ ] Email outreach engine (Resend API integracija)
- [ ] Unsubscribe / opt-out compliance (GDPR)
- [ ] Email sequence automation (Resend automations ili custom)
- [ ] Analytics dashboard (Cloudflare Workers KV analytics)
- [ ] A/B testing za outreach email copy

**Outreach metrics:**
- 500 outreach poslanih emailova
- 2-5% click rate
- 1-3% claim rate

### Faza 3 — Platio Player (Tjedan 7–12)
**Cilj:** Ponavljalni prihodi + proširenje ponude

**Razvoj:**
- [ ] Stripe Subscriptions (mjesečni/godišnji planovi)
- [ ] White-label hosting panel (klijent vidi svoju stranicu, može pratit statistiku)
- [ ] Custom template builder (drag-drop ili AI-assisted editing)
- [ ] Multi-page support (Growth tier)
- [ ] SSL automation (Let's Encrypt preko Cloudflare)
- [ ] Custom email hosting (završava na Cloudflare Email Routing)
- [ ] CRM integracija (jednostavni spreadsheet za sad, HubSpot kasnije)

**Revenue metrics:**
- 20 paying customers
- MRR: 2,000 EUR+
- Churn rate < 10%/mj

### Faza 4 — Scale (Godina 1)
**Cilj:** 200+ paying customers, regional expansion

**Razvoj:**
- [ ] AI copywriting upgrade (GPT-4o za generiranje texta, ne samo strukture)
- [ ] Multi-language support (EN, DE, IT — za turističke biznese)
- [ ] Mobile app ( Flutter ili React Native — klijent vidi svoju stranicu)
- [ ] API marketplace (treće strane mogu naručivati page-ove preko API-ja)
- [ ] Affiliate program (10% recurring)
- [ ] White-label za partnere (agencije prodaju pod svojim brandom)

---

## 6. Financijski Pregled — 3 Godine

### 6.1 Prihodi

| Godina | Klijenti (avg) | MRR | Prihodi (god) | Napomena |
|--------|---------------|-----|---------------|----------|
| **Y1** | 25 | 2,500 EUR | ~20,000 EUR | Investicija u outreach |
| **Y2** | 120 | 12,000 EUR | ~140,000 EUR | Word-of-mouth + outbound |
| **Y3** | 400 | 40,000 EUR | ~480,000 EUR | Regional scale |

### 6.2 Troškovi (Godišnje)

| Stavka | Y1 | Y2 | Y3 |
|--------|-----|-----|-----|
| Cloudflare (hosting + bandwidth) | 500 EUR | 2,000 EUR | 6,000 EUR |
| Email (Resend/Postmark) | 200 EUR | 800 EUR | 2,000 EUR |
| Stripe fees (~3%) | 600 EUR | 4,200 EUR | 14,400 EUR |
| Outreach tools | 0 EUR | 500 EUR | 1,500 EUR |
| AI/LLM API (ako se koristi) | 300 EUR | 1,000 EUR | 3,000 EUR |
| **Ukupno** | **~1,600 EUR** | **~8,500 EUR** | **~26,900 EUR** |

### 6.3 Profit

| Godina | Prihodi | Troškovi | Profit |
|--------|---------|---------|--------|
| **Y1** | 20,000 EUR | 1,600 EUR | **~18,400 EUR** |
| **Y2** | 140,000 EUR | 8,500 EUR | **~131,500 EUR** |
| **Y3** | 480,000 EUR | 26,900 EUR | **~453,100 EUR** |

### 6.4 Break-even

- **Break-even točku:** Mjesec 2–3 (Y1)
- **Za povrat investicije:** Već u Y1

---

## 7. Tim i Uloge

### Kristijan (Firma — Infrastruktura i Platni Proces)
- ✅ Cloudflare account + hosting
- ✅ Izdavanje računa (fakture klijentima)
- ✅ FIB (fiskalizacija, Porezna)
- ✅ Ugovori s klijentima (potrebno: standardizirani template)
- ✅ Korisnička podrška (L1 — email, chat)
- ✅ Canonical vlasnik nad imovinom (domeni, SSL certifikati)

### CEO (AI Agent — Product, Engineering, Sales, Marketing)
- Product strategy i roadmap
- Razvoj platforme
- Outreach automatizacija
- SEO i content
- Prodajni proces
- Customer success (L2 support)

**Zašto AI može voditi ovo:**
- Generator je code-native — piše i deploya bez ljudi
- Outreach je 100% automatiziran
- Support je self-service za jednostavne stvari, eskalacija za složene
- Jedino što treba ljudski touch: ugovori, računi, fiskalizacija

---

## 8. Pravni i Compliance

### 8.1 Obligacijski odnosi s klijentima
- Kristijan izdaje račun → klijent plaća → Kristijan ispostavlja fakturu
- Ugovor: Standardizirani template (izraditi u Fazi 1) — usluga hostinga + održavanja
- Vlasništvo nad domenom: Kristijan (firma) registrira i drži domenu u ime klijenta

### 8.2 GDPR
- Email lista: double opt-in ili legitimate interest za outreach
- Opt-out link na svakom emailu
- Data retention: 2 godine za outreach listu
- Privacy policy na landing pageu
- Cookie consent za analytics

### 8.3 Fiskalizacija
- Računi idu kroz Kristijanov poslovni račun
- Mini ERP/FIB integracija za automatsko knjiženje (opcionalno Y2)

---

## 9. Risk Analysis

| Risk | Vjerojatnost | Impact | Mitigacija |
|------|------------|---------|-----------|
| Kristijan ne može izdavati račune dovoljno brzo | Srednja | Visok | Automatizirati template, batch izdavanje |
| Cloudflare poveća cijene | Niska | Srednji | Multi-cloud ili reserved instances |
| GDPR tužba | Niska | Visok | Pravilna implementacija (opt-in, privacy policy) |
| Konkurencija napravi istu stvar | Srednja | Srednji | Brzina izlaska na tržište, brand, customer lock-in |
| Email deliverability (spam filteri) | Srednja | Srednji | Resend/Postmark s good reputation, SPF/DKIM |
| Preveliki churn na startu | Srednja | Srednji | Fokus na ICP #1 i #2, ne na ICP #3 |

---

## 10. Prioriteti — Što Dalje (Tjedan 1)

1. **Stripe integracija** — da možemo naplatiti
2. **Go Live deploy flow** — od claim → aktivacija za 24h
3. **Ugovor template** — Kristijan treba pravni template
4. **Prvi outbound test** — 50 poduzeća u Zagrebu

---

## 11. Revizija Plana

Ovaj plan se revidira:
- Mjesečno (prvih 6 mjeseci)
- Kvartalno (nakon toga)
- Ad-hoc nakon svakog značajnog learninga

**Sljedeći checkpoint:** 2026-04-04 (Tjedan 1 review)
