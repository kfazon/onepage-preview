# Peek — Email Sequences (Resend-Ready)
**Version:** 1.0 | **Date:** 2026-04-19

---

## How to Use This Guide

1. Copy the HTML or plain text into Resend
2. Replace `{VARIABLES}` with actual data
3. Create a Sequence with 3 emails per market
4. Set delays: Day 0, Day 3, Day 10

---

## Spain — Email Sequence

### Subject Line Options (A/B Test)

| # | Subject | Type |
|:---|:---|:---|
| A | Así podría verse la web de {business_name} | Personalized |
| B | Tu negocio merece una página web profesional | Value prop |
| C | ({city}) — Tu negocio online en 5 minutos | Urgency + local |
| D | ¿Sabías que tus clientes te buscan en Google? | Question hook |

**Test:** Send 33% to each subject line variant. After 24h, use the winning subject for the rest.

---

### Email 1 — Day 0

**Subject:** `{A|B|C|D}` (use winning variant)

```html
<h2>Hola {contact_name},</h2>

<p>He creado una <strong>vista previa gratuita</strong> para {business_name}.</p>

<p>Puedes verla aquí → <a href="{preview_url}">{preview_url}</a></p>

<p>Lo que incluye:</p>
<ul>
  <li>✓ Tu nombre, dirección y horarios de apertura</li>
  <li>✓ Página profesional para tu negocio</li>
  <li>✓ Mapa de ubicación (Google Maps)</li>
  <li>✓ Botón de WhatsApp para reservas</li>
  <li>✓ Sección de opiniones (Google, Yelp)</li>
  <li>✓ Código QR para imprimir</li>
</ul>

<p><strong>Gratis. Sin compromiso.</strong></p>

<p>Si te gusta, puedes activarla por <strong>€99/mes</strong> — con tu propio dominio (ej: tudominio.es), sin marca de Peek, y hosting incluido.</p>

<p>¿Quieres verla? → <a href="{preview_url}">Haz clic aquí</a></p>

<p>Saludos,<br>El equipo Peek</p>

<hr>
<p style="font-size:12px; color:#888;">
Peek | {company_address}<br>
<a href="{privacy_url}">Política de privacidad</a> | 
<a href="{optout_url}">Cancelar suscripción</a><br><br>
Este email fue enviado a {email} porque generamos una vista previa gratuita 
para {business_name} usando información disponible públicamente en registros comerciales.
</p>
```

---

### Email 2 — Day 3 (No Click on Email 1)

**Subject:** Re: Tu vista previa para {business_name}

```html
<h2>Hola {contact_name},</h2>

<p>Quería saber si tuviste oportunidad de ver la vista previa para <strong>{business_name}</strong>.</p>

<p>Aquí está → <a href="{preview_url}">{preview_url}</a></p>

<p>La página estará disponible unos días más. Después la quitamos.</p>

<p>Si tienes cualquier pregunta, escríbeme directamente — estoy aquí para ayudarte.</p>

<p>Saludos,<br>El equipo Peek</p>

<hr>
<p style="font-size:12px; color:#888;">
<a href="{optout_url}">Cancelar suscripción</a>
</p>
```

---

### Email 3 — Day 10 (No Claim)

**Subject:** Última oportunidad — tu vista previa expira pronto

```html
<h2>Hola {contact_name},</h2>

<p>La vista previa para <strong>{business_name}</strong> expira pronto.</p>

<p>Aquí la tienes una última vez → <a href="{preview_url}">{preview_url}</a></p>

<p><strong>Oferta especial de lanzamiento: €99/mes</strong></p>

<ul>
  <li>✓ Tu propio dominio (ej: tudominio.es)</li>
  <li>✓ Sin marca de Peek</li>
  <li>✓ SSL incluido</li>
  <li>✓ Botón WhatsApp</li>
  <li>✓ Código QR</li>
  <li>✓ Cancelar cuando quieras</li>
</ul>

<p>Si te interesa → <a href="{checkout_url}">Activa tu página aquí</a></p>

<p>Si ya no te interesa, simplemente ignora este mensaje — no volveremos a contactarte.</p>

<p>Saludos,<br>El equipo Peek</p>

<hr>
<p style="font-size:12px; color:#888;">
<a href="{optout_url}">Cancelar suscripción</a>
</p>
```

---

## Poland — Email Sequence

### Subject Line Options

| # | Subject | Type |
|:---|:---|:---|
| A | Tak mogłaby wyglądać strona {business_name} | Personalized |
| B | Twój biznes na to zasługuje — zobacz za darmo | Value prop |
| C | ({city}) — Twoja firma online w 5 minut | Urgency + local |
| D | Czy wiesz, że klienci szukają Cię w Google? | Question hook |

---

### Email 1 — Day 0

```html
<h2>Dzień dobry {contact_name},</h2>

<p>Stworzyliśmy <strong>bezpłatny podgląd</strong> strony dla {business_name}.</p>

<p>Zobacz tutaj → <a href="{preview_url}">{preview_url}</a></p>

<p>Co zawiera podgląd:</p>
<ul>
  <li>✓ Nazwa, adres i godziny otwarcia</li>
  <li>✓ Profesjonalna strona dla Twojego biznesu</li>
  <li>✓ Mapa dojazdu (Google Maps)</li>
  <li>✓ Przycisk WhatsApp do rezerwacji</li>
  <li>✓ Sekcja opinii (Google, Yelp)</li>
  <li>✓ Kod QR do wydruku</li>
</ul>

<p><strong>Bezpłatnie. Bez zobowiązań.</strong></p>

<p>Jeśli Ci się podoba, możesz aktywować ją za <strong>59€/miesiąc</strong> — z własną domeną (np. twoja-firma.pl), bez logo Peek, hosting w cenie.</p>

<p>Chcesz zobaczyć? → <a href="{preview_url}">Kliknij tutaj</a></p>

<p>Pozdrawiam,<br>Zespół Peek</p>

<hr>
<p style="font-size:12px; color:#888;">
Peek | {company_address}<br>
<a href="{privacy_url}">Polityka prywatności</a> | 
<a href="{optout_url}">Wypisz się</a><br><br>
Ten email został wysłany do {email}, ponieważ wygenerowaliśmy bezpłatny 
podgląd strony dla {business_name} używając publicznie dostępnych danych.
</p>
```

---

### Email 2 — Day 3

**Subject:** Re: Twój bezpłatny podgląd dla {business_name}

```html
<h2>Dzień dobry {contact_name},</h2>

<p>chciałem sprawdzić, czy miałeś/-aś okazję zobaczyć podgląd dla <strong>{business_name}</strong>.</p>

<p>Tutaj jest → <a href="{preview_url}">{preview_url}</a></p>

<p>Strona będzie dostępna jeszcze kilka dni.</p>

<p>Pozdrawiam,<br>Peek</p>

<hr>
<p style="font-size:12px; color:#888;">
<a href="{optout_url}">Wypisz się</a>
</p>
```

---

### Email 3 — Day 10

**Subject:** Ostatnia szansa — Twój podgląd wkrótce zniknie

```html
<h2>Dzień dobry {contact_name},</h2>

<p>podgląd strony dla <strong>{business_name}</strong> wkrótce wygaśnie.</p>

<p>Oto link → <a href="{preview_url}">{preview_url}</a></p>

<p><strong>Cena specjalna: 59€/miesiąc</strong></p>

<ul>
  <li>✓ Własna domena (np. twoja-firma.pl)</li>
  <li>✓ Bez logo Peek</li>
  <li>✓ SSL w cenie</li>
  <li>✓ Przycisk WhatsApp</li>
  <li>✓ Kod QR</li>
</ul>

<p>Jeśli zainteresowany → <a href="{checkout_url}">Aktywuj tutaj</a></p>

<p>Pozdrawiam,<br>Peek</p>

<hr>
<p style="font-size:12px; color:#888;">
<a href="{optout_url}">Wypisz się</a>
</p>
```

---

## Germany (LinkedIn Message Templates)

**Note:** DE market = LinkedIn only (no mass cold email). These are for LinkedIn InMail, not email.

### Connection Request Message

```
Hi {first_name}, I noticed {business_name} in {city} — we built a free 
preview website for similar businesses. Want to see what yours could look like?
```

Max 300 characters. Keep it SHORT.

### Follow-Up (After Connection Accepted)

```
Hi {first_name}, thanks for connecting!

Here's the preview we made for {business_name}:
{preview_url}

It shows your address, hours, photos, WhatsApp button, and reviews.
Your own domain from €149/month.

Want to see it? Just click — no signup needed.

{name}
```

### Reminder (Day 5, no response)

```
Hi {first_name}, just checking in — did you get a chance to look at the preview?
{preview_url}

The preview stays online a few more days.

{name}
```

### Final (Day 12, no response)

```
Hi {first_name}, this is your last reminder — the preview for {business_name} expires soon.
{preview_url}

If you're happy with your current setup, no worries — just ignore this.

But if you ever wanted a professional page without spending weeks building it:
{checkout_url}

{name}
```

---

## Key Variables to Replace

| Variable | Where to get it |
|:---|:---|
| `{contact_name}` | First name from Apollo/LinkedIn |
| `{business_name}` | Business name from data |
| `{email}` | Email address |
| `{city}` | City from data |
| `{preview_url}` | Generated preview URL |
| `{checkout_url}` | Stripe Checkout Link for market |
| `{optout_url}` | Opt-out URL (`/optout?email={email}`) |
| `{privacy_url}` | Privacy policy URL |
| `{company_address}` | Kristijan's company address |

---

## Resend Setup Instructions

1. Log into Resend → Dashboard
2. Go to **Audience** → **Contacts** → Import CSV (Apollo export)
3. Go to **Sequences** → **Create Sequence**
4. Name: `ES-Cold-Email-{date}` or `PL-Cold-Email-{date}`
5. Add 3 emails with delays: 0 days, 3 days, 10 days
6. Paste HTML templates above
7. Add your contacts as recipients
8. Set send schedule: Tuesday-Thursday, 9-11am local time

---

*Last updated: 2026-04-19 16:58 GMT+2*