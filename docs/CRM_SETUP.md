# Peek — CRM Setup Guide

**Version:** 1.0 | **Date:** 2026-04-19

---

## Purpose

Kristijan's operational CRM. Simple Google Sheets — no paid tools needed.

---

## Sheet 1: `Leads_ES`

Columns (A through S):

| Col | Header | Notes |
|:---|:---|:---|
| A | Date | YYYY-MM-DD |
| B | Business Name | |
| C | Contact Name | First + Last |
| D | Email | |
| E | Phone | |
| F | City | |
| G | Country | ES |
| H | Domain | website if exists |
| I | Website Found | TRUE/FALSE (Apollo field) |
| J | Apollo URL | Link to Apollo record |
| K | Preview URL | Generated preview link |
| L | Email 1 Sent | YYYY-MM-DD or empty |
| M | Email 1 Opened | Y/N (Resend tracks) |
| N | Email 2 Sent | YYYY-MM-DD or empty |
| O | Email 3 Sent | YYYY-MM-DD or empty |
| P | Claimed | Y/N |
| Q | Status | no_response / interested / claimed / paid / opted_out |
| R | Revenue | €amount or 0 |
| S | Notes | Free text |

---

## Sheet 2: `Leads_PL`

Same columns as Leads_ES, Country = PL.

---

## Sheet 3: `Leads_DE_LinkedIn`

| Col | Header | Notes |
|:---|:---|:---|
| A | Date | YYYY-MM-DD |
| B | Business Name | |
| C | Contact Name | LinkedIn name |
| D | LinkedIn URL | Profile URL |
| E | Email | If found |
| F | City | Berlin, Hamburg, Munich... |
| G | Country | DE |
| H | Connection Sent | YYYY-MM-DD |
| I | Connection Accepted | YYYY-MM-DD |
| J | Message Sent | YYYY-MM-DD |
| K | Preview URL | |
| L | Response | Y/N |
| M | Follow Up 1 | YYYY-MM-DD |
| N | Follow Up 2 | YYYY-MM-DD |
| O | Claimed | Y/N |
| P | Status | connected / responded / interested / claimed / paid / no_response |
| Q | Revenue | €amount or 0 |
| R | Notes | |

---

## Sheet 4: `Claims`

| Col | Header | Notes |
|:---|:---|:---|
| A | Date | YYYY-MM-DD |
| B | Business Name | |
| C | Email | |
| D | Phone | |
| E | City | |
| F | Country | DE/ES/PL |
| G | Source | form / email_claim / linkedin |
| H | Preview URL | |
| I | Checkout Link Sent | YYYY-MM-DD |
| J | Stripe Session ID | |
| K | Paid | Y/N |
| L | Payment Date | YYYY-MM-DD |
| M | Amount | € |
| N | Domain Wanted | |
| O | Domain Live | Y/N |
| P | Domain Live Date | YYYY-MM-DD |
| Q | Notes | |

---

## Sheet 5: `Customers`

| Col | Header | Notes |
|:---|:---|:---|
| A | Date Paid | YYYY-MM-DD |
| B | Business Name | |
| C | Contact Email | |
| D | Domain | e.g. cafemorgenrot.de |
| E | Country | DE/ES/PL |
| F | Plan | Go Live / Growth |
| G | Monthly Price | € |
| H | Annual Value | € (monthly × 12) |
| I | Stripe Customer ID | |
| J | Stripe Subscription ID | |
| K | First Payment Date | |
| L | Next Billing Date | |
| M | Churned | Y/N |
| N | Churn Date | YYYY-MM-DD |
| O | LTV | € total paid |
| P | Notes | |

---

## Sheet 6: `Revenue`

| Col | Header | Notes |
|:---|:---|:---|
| A | Month | YYYY-MM |
| B | MRR | € |
| C | New MRR | € from new customers |
| D | Churn MRR | € lost |
| E | Net New MRR | New - Churn |
| F | Active Customers | Count |
| G | New Customers | Count |
| H | Churned Customers | Count |
| I | Revenue This Month | € |

---

## How to Use

### Daily
1. Export Resend events → paste into Leads_ES/PL tabs
2. Check for new claims → update Claims tab
3. Send Stripe Checkout links → update Claims tab

### Weekly (Monday)
1. Run weekly metrics report (copy from METRICS.md template)
2. Update Revenue tab
3. Archive leads with status "no_response" after 30 days

### Monthly (1st)
1. Calculate churn rate
2. Update LTV in Customers tab
3. Review which verticals perform best

---

## Formulas for Revenue Tab

```
MRR = SUMIF(Customers!G:G, "Go Live", Customers!G:G) + SUMIF(Customers!G:G, "Growth", Customers!G:G)*2
Active Customers = COUNTIF(Customers!M:M, "N")
Churn Rate = Churned Customers / Total Customers at start of month
```

---

*Last updated: 2026-04-19 15:20 GMT+2*