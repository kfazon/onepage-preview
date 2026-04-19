# Peek — Domain Warmup Guide
**Version:** 1.0 | **Date:** 2026-04-19

---

## Why Warmup Matters

When you start sending emails from a new domain or new email address, internet email systems (Gmail, Outlook, etc.) don't trust you yet. If you send 1,000 emails on day 1 from a cold domain:

- Emails go to **spam** (Gmail might put 30-70% in spam)
- Your domain can get **blacklisted**
- Outlook/Office 365 might **reject** emails entirely

**Warmup** = gradually build domain reputation over 4-6 weeks so email providers trust you.

---

## Warmup Schedule

### Week 1 — Testing Phase (10-25 emails/day)

**Day 1-2:** 10 emails/day to personal contacts (friends, colleagues)
- Send to emails you know personally
- Ask them to reply and add you to contacts

**Day 3-4:** 15 emails/day
- Mix of personal + a few real leads
- All must be relevant, personalized

**Day 5-7:** 20-25 emails/day
- Start sending to real Apollo leads
- Monitor delivery rates

**Target open rate this week:** 30-40%
**Target spam rate:** <2%

---

### Week 2 — Ramp-Up (50-100 emails/day)

**Day 8-10:** 50 emails/day
- Mix of leads from Apollo
- A/B test subject lines

**Day 11-14:** 75-100 emails/day
- Continue scaling
- Check Resend dashboard for bounce rates

**If bounce rate > 5%:** STOP, investigate bounces, remove bad addresses.

---

### Week 3 — Scale (150-300 emails/day)

**Day 15-18:** 150 emails/day
- Your main outreach campaign
- Keep monitoring

**Day 19-21:** 200-300 emails/day
- Full campaign pace
- Target open rate: 35-45%

---

### Week 4+ — Full Speed (500+/day)

**Day 22+:** 500 emails/day max (for DE/ES/PL combined)
- Don't exceed 500-1000/day from a single sending domain
- If you need more volume: add a second sending domain

---

## Warmup Email Templates

### Day 1 — Personal Introduction

```
Subject: Quick question about email deliverability

Hi {name},

I'm setting up a new email address for my business and wanted to make sure 
you receive my emails properly.

Could you reply to this email so I know it landed in your inbox?

Thanks!
{name}
```

**Purpose:** Gets your first "positive signal" — a direct reply. Most important email you'll send.

---

### Day 2-3 — Newsletter-Style Test

```
Subject: {first_name}, I found something useful for your business

Hi {first_name},

I came across {business_name} and thought you might find this interesting.

[Short paragraph about a relevant topic — NOT a sales email]

Would love to hear your thoughts.

Best,
{name}
```

**Purpose:** Get opens, clicks, replies. Build engagement signals.

---

## Monitoring Checklist

Every morning during warmup, check:

### Resend Dashboard
- [ ] **Delivery rate** — should be >95%
- [ ] **Bounce rate** — should be <3%
- [ ] **Open rate** — should be >30%
- [ ] **Spam reports** — should be 0

### If something goes wrong:

| Problem | Cause | Fix |
|:---|:---|:---|
| Delivery <90% | Bad list quality | Clean list, remove bounces |
| Bounce >5% | Invalid email addresses | Remove bounced immediately |
| Open rate <20% | Bad subject lines | A/B test new subjects |
| Spam reports >0 | Content triggers | Check for spam words |

---

## Spam Words to Avoid

Don't use these in subject lines or email body:

| Category | Words |
|:---|:---|
| Money | "free", "guarantee", "cash", "earn", "make money" |
| Urgency | "act now", "limited time", "expires", "deadline", "urgent" |
| Sales | "buy", "cheap", "discount", "save", "offer" |
| Suspicious | "click here", "winner", "congratulations", "selected" |

**Better alternatives:**
- "free" → "no cost"
- "guarantee" → "promise"
- "act now" → "when you're ready"
- "limited time" → "while available"

---

## Dedicated vs. Personal Sending Domain

### Option A: Use Personal Email (e.g., from Kristijan's company)
- Lower risk of blacklist
- Already has some reputation
- Professional-looking (from real company)

### Option B: Use a Dedicated Sending Subdomain
- Create: `mail.peek-preview.pages.dev` or `outreach.peek-preview.pages.dev`
- Set up SPF, DKIM, DMARC records
- Keeps main domain clean if something goes wrong
- Use this subdomain ONLY for outreach

**Recommended:** Use Option B (dedicated subdomain) for cold outreach.

---

## DNS Setup for Sending Domain

If using a dedicated sending subdomain, add these DNS records:

### SPF Record
```
TXT record for: outreach.peek-preview.pages.dev
Value: v=spf1 include:resend.com ~all
```

### DKIM Record
Resend provides this automatically. Resend Dashboard → Domains → Add your domain → Resend gives you the DKIM record to add.

### DMARC Record
```
TXT record for: _dmarc.outreach.peek-preview.pages.dev
Value: v=DMARC1; p=quarantine; rua=mailto:your@email.com; pct=100
```

---

## Volume Limits by Email Provider

| Provider | Daily Limit (new domain) | After Warmup |
|:---|:---|:---|
| Gmail | 500 | 2,000 |
| Outlook/Hotmail | 100 | 500 |
| Corporate Exchange | Varies | Varies |

**Practical limit:** Don't send more than 500/day from a single sending domain.

---

## Quick Checklist Before First Campaign Send

- [ ] SPF record added
- [ ] DKIM record added (via Resend)
- [ ] DMARC record added
- [ ] Sent test email to personal address
- [ ] Test email landed in INBOX (not spam)
- [ ] First 10 emails sent with 1-hour gaps
- [ ] First batch open rate >30%
- [ ] Bounce rate <3%

---

*Last updated: 2026-04-19 16:58 GMT+2*