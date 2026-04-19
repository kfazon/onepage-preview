# Peek — Apollo.io Search Configuration

**Version:** 1.0 | **Date:** 2026-04-19 | **Purpose:** Step-by-step Apollo.io search filters to find businesses WITHOUT websites

---

## Why Filter Out Businesses WITH Websites

We only want businesses that:
1. Have NO existing website (or have a terrible one)
2. Are likely to need our product
3. Are in our target market (DE/ES/PL micro-businesses)

Apollo gives us company data including `website` — we filter OUT any company that has a website domain.

---

## Apollo.io Account Setup

1. Go to [apollo.io](https://apollo.io)
2. Sign up for trial or paid plan ($49/month)
3. Navigate to **People Search**

---

## Search 1: Spain — Restaurants & Cafés

### Step 1: Create new search

**Search Name:** `ES - Food - No Website`

### Step 2: Set filters

```
LOCATION:
  Countries: [x] Spain
  
  Cities (optional): Madrid, Barcelona, Valencia, Sevilla, Málaga
  
COMPANY:
  Industries: [x] Restaurants and Cafes
              [x] Food & Beverage
              [x] Hospitality
              
  Company Sizes: [x] 1-10 employees
                 [x] 11-50 employees
                 
  Technologies: (leave empty)
  
  Founded: (leave empty)
  
  Keywords: restaurant, cafetería, bar, pub, tapas, café, coffee
```

### Step 3: Enrichment filter — WEBSITES ONLY

After running search, add enrichment filter:
```
  Website: EXISTS (has website domain)
```

**Wait — we want businesses WITHOUT websites. So:**
```
  Website: DOES NOT EXIST
```

### Step 4: Export

- Click "Export All" → Download CSV
- Save as: `data/apollo-es-food-YYYY-MM-DD.csv`
- Columns to include: first_name, last_name, email, company, website, city, state, country, LinkedIn URL

---

## Search 2: Spain — Personal Services (Salons, Gyms, etc.)

**Search Name:** `ES - Services - No Website`

```
LOCATION:
  Countries: [x] Spain
  
COMPANY:
  Industries: [x] Personal Care Services
              [x] Health, Wellness and Fitness
              [x] Beauty
              
  Company Sizes: [x] 1-10 employees
                 [x] 11-50 employees
                 
  Website: DOES NOT EXIST
```

Export: `data/apollo-es-services-YYYY-MM-DD.csv`

---

## Search 3: Spain — Retail & Shops

**Search Name:** `ES - Retail - No Website`

```
LOCATION:
  Countries: [x] Spain
  
COMPANY:
  Industries: [x] Retail
              [x] Consumer Goods
              [x] Furniture and Home Decor
              
  Company Sizes: [x] 1-10 employees
                 [x] 11-50 employees
                 
  Website: DOES NOT EXIST
```

Export: `data/apollo-es-retail-YYYY-MM-DD.csv`

---

## Search 4: Poland — Food & Beverage

**Search Name:** `PL - Food - No Website`

```
LOCATION:
  Countries: [x] Poland
  
  Cities: Warsaw, Kraków, Gdańsk, Wrocław, Poznań, Łódź
  
COMPANY:
  Industries: [x] Restaurants and Cafes
              [x] Food & Beverage
              [x] Hospitality
              
  Company Sizes: [x] 1-10 employees
                 [x] 11-50 employees
                 
  Website: DOES NOT EXIST
```

Export: `data/apollo-pl-food-YYYY-MM-DD.csv`

---

## Search 5: Poland — Services

**Search Name:** `PL - Services - No Website`

```
LOCATION:
  Countries: [x] Poland
  
COMPANY:
  Industries: [x] Personal Care Services
              [x] Health, Wellness and Fitness
              [x] Beauty
              [x] Auto Repair
              [x] Home Services
              
  Company Sizes: [x] 1-10 employees
                 [x] 11-50 employees
                 
  Website: DOES NOT EXIST
```

Export: `data/apollo-pl-services-YYYY-MM-DD.csv`

---

## Search 6: Germany — For LinkedIn only

**Note:** We don't do mass cold email in DE. This is for LinkedIn research only.

**Search Name:** `DE - Research Only`

```
LOCATION:
  Countries: [x] Germany
  
  Cities: Berlin, Hamburg, Munich, Cologne, Düsseldorf
  
COMPANY:
  Industries: [x] Restaurants and Cafes
              [x] Personal Care Services
              [x] Health, Wellness and Fitness
              [x] Construction
              [x] Trades
              
  Company Sizes: [x] 1-10 employees
                 
  Website: EXISTS (we want their website to check quality)
```

**Use for:** Find contact names + LinkedIn profiles for warm outreach.

---

## Important: "Website DOES NOT EXIST" Filter

Apollo sometimes doesn't have complete data. To maximize quality:

1. Run search with `Website: DOES NOT EXIST`
2. ALSO manually filter in Google Sheets after export:
   - Remove any where `website` column has a real domain
   - Look for: real website URLs, avoid @gmail.com emails for companies

3. Final quality check:
   - Does the email domain match the company (e.g., info@cafemorgenrot.es)?
   - Does the company name match the email pattern?
   - Remove obvious invalid entries

---

## Target Numbers Per Market

| Market | Vertical | Target Leads | Export File |
|:---|:---|:---|:---|
| ES | Food & Beverage | 2,000 | apollo-es-food.csv |
| ES | Personal Services | 1,500 | apollo-es-services.csv |
| ES | Retail | 1,000 | apollo-es-retail.csv |
| PL | Food & Beverage | 2,000 | apollo-pl-food.csv |
| PL | Personal Services | 2,000 | apollo-pl-services.csv |
| **Total** | | **8,500** | |

---

## Apollo API Alternative

If Apollo web UI is too slow, use the Apollo API:

```bash
curl -X POST 'https://api.apollo.io/v1/mixouts' \
  -H 'Content-Type: application/json' \
  -H 'X-Api-Key: YOUR_API_KEY' \
  -d '{
    "api_key": "YOUR_API_KEY",
    "q_industry": "Restaurants",
    "q_country": "Spain",
    "page_size": 100,
    "website_exclude": true
  }'
```

See `scripts/apollo-scrape.js` for the full script that uses Apollo API.

---

## Apollo API Key Setup

1. Apollo.io → Settings → Integrations → API
2. Copy your API key
3. Add to environment:
   ```bash
   export APOLLO_API_KEY=your_key_here
   ```
4. Or add to `~/.env` file in the project root

---

## Cost

- Apollo paid plan: $49/month
- Includes: 5,000 credits/month
- Each search result page = 1 credit
- 8,500 leads = ~8,500 credits = ~$49/month
- We need to run this monthly for new data

---

*Last updated: 2026-04-19 15:20 GMT+2*