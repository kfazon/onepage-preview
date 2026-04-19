# Apollo.io Search Configurations

Step-by-step instructions for running outreach prospect searches on Apollo.io for DE, ES, and PL markets.

---

## Market 1: DE — Hair Salons

### Search URL / Filter Configuration
**URL:** `https://app.apollo.io/enrich/person-search`

Or use the People Search with these filters:

| Filter | Value |
|---|---|
| Location | Germany (or specific cities: Berlin, Hamburg, Munich, Köln, Düsseldorf, Frankfurt) |
| Title Keywords | `Inhaber`, `Geschäftsführer`, `Besitzer`, `Friseur`, `Salon` |
| Subtitle Keywords | `Friseur`, `Hair`, `Salon`, `Kosmetik` |
| Company Industry | `Consumer Services` → `Hair Salons & Salons` |
| Company Size | `1-10`, `11-50` |
| Numbers Filter | `Has Phone Number` ✓ |

### Website Exists Filter (to find businesses WITHOUT a website)
Apollo does **not** have a direct "no website" filter, so use a workaround:
- Filter: `Has Email` ✓ AND `Has Phone Number` ✓
- **Then export and cross-reference** against builtwith.com / similarweb.com to flag businesses that already have a website
- Alternatively: search for businesses that match **all** of the below negative signals:
  - No LinkedIn company page detected
  - No public email domain (e.g. `@gmail.com`, `@web.de` patterns indicate personal email, not business website)
  - Small Instagram follower count (<500) — use Apollo's social info

### Export Format
**CSV columns to include:**
```
first_name, last_name, name, title, company_name, company_industry, company_size, city, state, country, email, phone_number, linkedin_url, personal_email
```

### Expected Results
- **Per city:** 50–150 relevant contacts
- **DE national:** 800–2,000 total

### Cost Estimate
- Apollo paid plans start at $49/mo (500 credits = ~500 contacts)
- DE hair salons + owners: ~1,500 credits
- **Estimated cost:** $49–$149 depending on plan tier

### Quality Tips
**✅ Look for:**
- Titles: `Inhaber`, `Geschäftsführer`, `Besitzer`, `Inhaberin`
- Company names with `Friseur`, `Hair`, `Salon`, `Kosmetik`, `Studio`
- Verified email addresses

**❌ Avoid:**
- Chain/franchise salons (e.g. `Rossmann`, `Super Cut`) — these have marketing teams, not SMB owners
- Businesses with >50 employees on LinkedIn
- Contacts with generic titles like `Manager`, `Employee` (not decision-makers)

---

## Market 2: DE — Restaurants & Cafés

### Search URL / Filter Configuration
**URL:** `https://app.apollo.io/enrich/person-search`

| Filter | Value |
|---|---|
| Location | Germany |
| Title Keywords | `Inhaber`, `Geschäftsführer`, `Besitzer`, `Koch`, `Restaurantleiter` |
| Company Industry | `Food & Beverage` → `Restaurants`, `Cafes` |
| Company Size | `1-10`, `11-50` |
| Numbers Filter | `Has Phone Number` ✓ |

### Website Exists Filter (same workaround as Market 1)
Cross-reference exported emails against domain WHOIS to identify businesses that already own a domain/website.

### Export Format
Same columns as Market 1.

### Expected Results
- **DE national:** 1,200–3,000 contacts

### Cost Estimate
- ~2,000 credits → **$49–$149/mo**

### Quality Tips
**✅ Look for:**
- Titles: `Inhaber`, `Restaurantinhaber`, `Café-Besitzer`, `Geschäftsführer`
- Company names with `Restaurant`, `Café`, `Bistro`, `Gasthaus`, `Gaststätte`, `Imbiss`
- Independent (non-chain) establishments

**❌ Avoid:**
- Chain restaurants (e.g. `Maredo`, `Vapiano`, `Noodles & Company`) — corporate ownership
- Hotel restaurants (titles often `Hotel Manager`, not the restaurant decision-maker)

---

## Market 3: DE — Tradesmen (Electricians, Plumbers, Carpenters)

### Search URL / Filter Configuration
**URL:** `https://app.apollo.io/enrich/person-search`

| Filter | Value |
|---|---|
| Location | Germany |
| Title Keywords | `Inhaber`, `Geschäftsführer`, `Meister`, `Betriebsleiter` |
| Company Industry | `Construction` → `Plumbing`, `Electrical`, `Carpentry`, `Handyman` |
| Company Size | `1-10`, `11-50` |
| Numbers Filter | `Has Phone Number` ✓ |

### Website Exists Filter
Same cross-reference method. Tradesmen often work solo or with very small crews — many won't have a website yet. Look for `Handwerk` in company name.

### Export Format
Same columns as Market 1.

### Expected Results
- **DE national:** 800–1,500 contacts

### Cost Estimate
- ~1,200 credits → **$49–$99/mo**

### Quality Tips
**✅ Look for:**
- Company names with `Elektro`, `Sanitär`, `Heizung`, `Dachdecker`, `Tischler`, `Maler`, `Handwerk`
- Titles: `Installateur-Meister`, `Elektro-Meister`, `Betriebsmeister`
- Small company size (1–5 employees) = high likelihood of no website

**❌ Avoid:**
- Large construction firms (>50 employees) — they have websites already
- Companies with `GmbH & Co. KG` in the name (larger operations)

---

## Market 4: ES — Restaurants

### Search URL / Filter Configuration
**URL:** `https://app.apollo.io/enrich/person-search`

| Filter | Value |
|---|---|
| Location | Spain |
| Title Keywords | `Dueño`, `Propietario`, `Gerente`, `Director`, `Jefe de cocina` |
| Company Industry | `Food & Beverage` → `Restaurants`, `Cafes`, `Bars` |
| Company Size | `1-10`, `11-50` |
| Numbers Filter | `Has Phone Number` ✓ |

### Website Exists Filter
Same workaround. Cross-reference with WHOIS/domain data for `.es` domains.

### Export Format
Same columns as Market 1.

### Expected Results
- **ES national:** 1,500–3,500 contacts

### Cost Estimate
- ~2,500 credits → **$99–$199/mo**

### Quality Tips
**✅ Look for:**
- Titles: `Dueño`, `Propietario`, `Titular`
- Company names with `Restaurante`, `Bar`, `Café`, `Bodega`, `Taberna`, `Mesón`
- Independent (non-chain) establishments

**❌ Avoid:**
- Restaurant chains (e.g. `Carls Jr.`, `Foster's Hollywood`, `TelePizza`)
- Hotel restaurants

---

## Market 5: ES — Personal Services

Hair salons, beauty studios, pet services, dry cleaners, etc.

### Search URL / Filter Configuration
**URL:** `https://app.apollo.io/enrich/person-search`

| Filter | Value |
|---|---|
| Location | Spain |
| Title Keywords | `Dueño`, `Propietario`, `Gerente`, `Titular` |
| Company Industry | `Consumer Services` → `Hair Salons & Salons`, `Pet Care`, `Dry Cleaning` |
| Company Size | `1-10`, `11-50` |
| Numbers Filter | `Has Phone Number` ✓ |

### Website Exists Filter
Same approach. Many personal service businesses are solo operators with no website yet.

### Export Format
Same columns as Market 1.

### Expected Results
- **ES national:** 1,200–2,500 contacts

### Cost Estimate
- ~2,000 credits → **$99–$149/mo**

### Quality Tips
**✅ Look for:**
- Titles: `Dueño`, `Propietario`, `Autónomo` (self-employed in Spain)
- Company names with `Peluquería`, `Salón de belleza`, `Centro estética`, `Veterinaria`, `Lavandería`

**❌ Avoid:**
- Chain beauty salons (`Salón de Belleza` chains, `Yves Rocher`, etc.)
- Large pet store chains

---

## Market 6: PL — Restaurants

### Search URL / Filter Configuration
**URL:** `https://app.apollo.io/enrich/person-search`

| Filter | Value |
|---|---|
| Location | Poland |
| Title Keywords | `Właściciel`, `Kierownik`, `Dyrektor`, `Szef kuchni` |
| Company Industry | `Food & Beverage` → `Restaurants`, `Cafes`, `Bars` |
| Company Size | `1-10`, `11-50` |
| Numbers Filter | `Has Phone Number` ✓ |

### Website Exists Filter
Same cross-reference. Polish businesses ending in `.pl` domain WHOIS check.

### Export Format
Same columns as Market 1.

### Expected Results
- **PL national:** 1,000–2,500 contacts

### Cost Estimate
- ~1,800 credits → **$49–$149/mo**

### Quality Tips
**✅ Look for:**
- Titles: `Właściciel`, `Właścicielka`, `Kierownik restauracji`
- Company names with `Restauracja`, `Kawiarnia`, `Bar`, `Bistro`, `Stołówka`

**❌ Avoid:**
- Chain restaurants (`PizzaPortal`, `McDonald's`, `KFC` affiliates — they have corporate ownership)
- Hotel restaurants

---

## Market 7: PL — Personal Services

Hair salons, beauty studios, pet services, dry cleaners, etc.

### Search URL / Filter Configuration
**URL:** `https://app.apollo.io/enrich/person-search`

| Filter | Value |
|---|---|
| Location | Poland |
| Title Keywords | `Właściciel`, `Kierownik`, `Dyrektor`, `Właścicielka` |
| Company Industry | `Consumer Services` → `Hair Salons & Salons`, `Pet Care`, `Dry Cleaning` |
| Company Size | `1-10`, `11-50` |
| Numbers Filter | `Has Phone Number` ✓ |

### Website Exists Filter
Same approach.

### Export Format
Same columns as Market 1.

### Expected Results
- **PL national:** 800–2,000 contacts

### Cost Estimate
- ~1,500 credits → **$49–$99/mo**

### Quality Tips
**✅ Look for:**
- Titles: `Właściciel`, `Właścicielka`, `Autonomiczny` (Polish self-employed sole trader)
- Company names with `Fryzjerski`, `Salon urody`, `Weterynaria`, `Pielęgnacja`, `Kosmetologia`
- Small towns outside Warsaw/Kraków/Wroclaw = higher likelihood of no website

**❌ Avoid:**
- Chain salons (e.g. across Poland)
- Large veterinary hospital groups

---

## General Apollo Tips

### Credits Budgeting
| Market | Vertical | Est. Contacts | Credits Used | Cost |
|---|---|---|---|---|
| DE | Hair Salons | 1,500 | 1,500 | $49–$99 |
| DE | Restaurants & Cafés | 2,000 | 2,000 | $99 |
| DE | Tradesmen | 1,200 | 1,200 | $49–$99 |
| ES | Restaurants | 2,500 | 2,500 | $99–$199 |
| ES | Personal Services | 2,000 | 2,000 | $99–$149 |
| PL | Restaurants | 1,800 | 1,800 | $49–$99 |
| PL | Personal Services | 1,500 | 1,500 | $49–$99 |
| **TOTAL** | | **~12,500** | **~12,500** | **~$300–$600/mo** |

### CSV Export Checklist
Before exporting, ensure you select these columns:
- [ ] `first_name`, `last_name` — for personalization
- [ ] `title` — to verify decision-maker role
- [ ] `company_name` — for context
- [ ] `company_industry` — for segmentation
- [ ] `company_size` — to filter out large chains
- [ ] `city`, `state`, `country` — for geo-targeting
- [ ] `email` — for outreach
- [ ] `phone_number` — for WhatsApp
- [ ] `linkedin_url` — for LinkedIn outreach
- [ ] `personal_email` — fallback email
- [ ] `number_of_employees` — to confirm small business

### Anti-Fraud Note
- Do NOT scrape Apollo data at scale without a paid plan — it violates their TOS
- Respect rate limits on API calls
- Re-exporting purchased contact data to third parties is prohibited by Apollo's ToS

---
