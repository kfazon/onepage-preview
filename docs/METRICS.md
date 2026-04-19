# Metrics — Peek Operational KPIs

**Purpose:** Define what success/failure looks like and how it is measured.
**Owner:** Maestro (tracks weekly)

---

## 1. Outreach Metrics

### Email Campaigns (ES + PL markets)

| Metric | Target | Warning | Critical |
|:---|:---|:---|:---|
| Deliverability rate | >95% | 90-95% | <90% |
| Bounce rate | <3% | 3-5% | >5% |
| Open rate | 35-45% | 30-35% | <30% |
| Click rate | 3-8% | 2-3% | <2% |
| Reply rate | 5-10% | 3-5% | <3% |

### LinkedIn Warm Outreach (DE market)

| Metric | Target | Warning |
|:---|:---|:---|
| Connection acceptance rate | >40% | 30-40% |
| Response rate | >20% | 15-20% |
| Preview click rate | >50% of responses | 30-50% |

### Inbound (SEO)

| Metric | Target | Warning |
|:---|:---|:---|
| Landing page visitors | 100+/month | <50 |
| Form submission rate | >5% | 2-5% |
| Email → Claim conversion | >15% | 5-15% |

---

## 2. Conversion Funnel

### Target Funnel (per 1,000 emails sent)

```
1,000 emails sent
  └── 400 open (40%)
      └── 50 click (12.5%)
          └── 5 claim (10% of clicks)
              └── 2 reply (40%)
                  └── 1 payment (50% close)

Overall: 1 paying customer / 1,000 emails = 0.1%
```

### Per-Market Targets

**DE (LinkedIn warm):**
| Stage | Target | Weekly |
|:---|:---|:---|
| Connections sent | 50 | 50 |
| Acceptances | 20 | 20 |
| Responses | 4 | 4 |
| Claims | 1 | 1 |
| Payments | 0.5 | 1 per 2 weeks |

**ES + PL (Cold email):**
| Stage | Target | Per Campaign (2,000 emails) |
|:---|:---|:---|
| Emails sent | 2,000 | 2,000 |
| Opens | 800 (40%) | 800 |
| Clicks | 100 (12.5%) | 100 |
| Claims | 10 (10%) | 10 |
| Payments | 3-5 (30-50% close) | 3-5 |

---

## 3. Financial Metrics

### Revenue Targets

| Month | Target MRR | Minimum | Notes |
|:---|:---|:---|:---|
| 1-2 | €0 | €0 | Setup phase |
| 3-4 | €447-894 | €298 | 3-6 customers (DE+ES) |
| 6 | €1,788-2,682 | €1,192 | 12-18 customers |
| 9 | €4,464-5,952 | €2,978 | 30-40 customers |
| 12 | €7,437-10,413 | €4,464 | 50-70 customers |

### Unit Economics

| Metric | DE | ES | PL |
|:---|:---|:---|:---|
| Monthly price | €149 | €99 | €59 |
| Annual price | €1,490 | €990 | €590 |
| Hosting cost | ~€8/mo | ~€6/mo | ~€5/mo |
| Gross margin | ~95% | ~94% | ~92% |
| LTV (2 year) | ~€3,000 | ~€2,000 | ~€1,200 |
| Target CAC | €50-150 | €30-100 | €20-60 |

### CAC Calculation

```
CAC = (Apollo $49 + Resend $20 + Kristijan time) / customers acquired
```

Apollo: $49/month ÷ ~50 customers = ~$1/customer
Resend: $20/month ÷ ~20,000 emails = $0.001/email
Time: Kristijan's time per customer (target: <30 min)

Target: CAC < 30% of first-year LTV

---

## 4. Customer Metrics

### Retention

| Metric | Target | Warning | Critical |
|:---|:---|:---|:---|
| Monthly churn | <5% | 5-8% | >8% |
| Annual churn | <40% | 40-60% | >60% |
| Net Revenue Retention | >100% | 90-100% | <90% |

### Customer Health

| Signal | Good | Warning |
|:---|:---|:---|
| Page views (first month) | >100 | <20 |
| Contact form submissions | >1 | 0 |
| Time on site | >2 min | <30 sec |
| Return visits | >3 | 0 |

---

## 5. Product Metrics

### Generator

| Metric | Target |
|:---|:---|
| Generation success rate | >99% |
| p95 generation latency | <2 sec |
| Template coverage | 3 core + variants |
| Language coverage | 5+ languages |

### Landing Pages

| Metric | Target |
|:---|:---|
| Page load time | <2 sec |
| Mobile conversion | >60% of visits |
| Cookie consent rate | >80% accept |
| Privacy page views | >10% of visitors |

---

## 6. Weekly Report Template

Copy this into Google Sheets every Monday:

```
══════════════════════════════════════════
WEEKLY REPORT — Week [N] (2026-XX-XX)
══════════════════════════════════════════

OUTREACH:
- Emails sent: [X]
- Open rate: [X]%
- Click rate: [X]%
- Bounce rate: [X]%
- Claims: [X]
- Claim rate (from clicks): [X]%

LINKEDIN (DE):
- Connections sent: [X]
- Acceptances: [X]
- Responses: [X]

INBOUND (SEO):
- Landing page visits: [X]
- Form submissions: [X]
- Email → Claim: [X]%

SALES:
- Active conversations: [X]
- Awaiting payment: [X]
- Paid this week: [X]

FINANCIAL:
- MRR: €[X]
- New customers: [X]
- Churned: [X]
- Revenue this week: €[X]

PRODUCT:
- Generator uptime: [X]%
- New signups: [X]
- Opt-outs: [X]

WINS: [What worked]
FAILS: [What didn't]
NEXT WEEK: [Priorities]

══════════════════════════════════════════
```

---

## 7. How to Track

### Tools

| Tool | Used For |
|:---|:---|
| Resend dashboard | Open rates, click rates, bounces |
| Apollo.io | Lead count, data quality |
| Stripe dashboard | Payments, MRR, churn |
| Google Sheets | CRM, weekly reports, funnel tracking |
| Cloudflare Analytics | Page views, traffic sources |

### Update Frequency

- **Daily (morning):** Check for new claims, payments, issues
- **Weekly (Monday):** Full metrics review + report
- **Monthly (1st):** Revenue review, churn analysis, goal check

---

*Last updated: 2026-04-19 15:15 GMT+2*