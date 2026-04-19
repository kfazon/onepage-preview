// Generate example previews
import { generatePreview } from '@onepage/generator';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'apps/web/public/examples');

const examples = [
  {
    slug: 'cafe-morgenrot',
    data: {
      name: 'Café Morgenrot',
      tagline: 'Specialty Coffee & Brunch',
      description: 'The best specialty coffee in Prenzlauer Berg. Fresh pastries daily, legendary weekend brunch.',
      address: 'Kastanienallee 42, 10435 Berlin',
      phone: '+49 30 1234 5678',
      email: 'hallo@cafemorgenrot.de',
      hours: 'Mon–Fri 7:30–18:00, Sat–Sun 9:00–17:00',
      whatsapp: '+493012345678',
      template: 'launch-teaser',
      lang: 'de',
      brandColor: '#d4a574',
      pageUrl: 'https://peek-preview.pages.dev/examples/cafe-morgenrot',
      images: [
        'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800',
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
        'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800'
      ],
      reviews: [
        {name: 'Marco K.', text: 'Best coffee in Berlin! The weekend brunch is amazing.', rating: 5, source: 'Google'},
        {name: 'Sarah L.', text: 'Cozy atmosphere and great WiFi for working.', rating: 5, source: 'Yelp'},
        {name: 'Thomas B.', text: 'My daily stop. Never disappoints.', rating: 4, source: 'Google'}
      ]
    }
  },
  {
    slug: 'salon-haarglueck',
    data: {
      name: 'Studio Haarglück',
      tagline: 'Hair Salon',
      description: 'Modern hair salon in Charlottenburg. Expert colorists and stylists for all hair types.',
      address: 'Kurfürstendamm 89, 10709 Berlin',
      phone: '+49 30 8901 2345',
      email: 'info@studio-haarglueck.de',
      hours: 'Tue–Sat 9:00–19:00',
      whatsapp: '+493089012345',
      template: 'launch-teaser',
      lang: 'de',
      brandColor: '#c4a7e7',
      pageUrl: 'https://peek-preview.pages.dev/examples/salon-haarglueck',
      images: [
        'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800',
        'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800'
      ],
      reviews: [
        {name: 'Anna M.', text: 'Finally a salon that understands my hair!', rating: 5, source: 'Google'},
        {name: 'Julia S.', text: 'Best balayage in Berlin, period.', rating: 5, source: 'Yelp'}
      ]
    }
  },
  {
    slug: 'bodega-madrid',
    data: {
      name: 'La Bodega Madrid',
      tagline: 'Tapas & Wine Bar',
      description: 'Authentic Spanish tapas in the heart of Madrid. Sangria, paella, and the best jamón ibérico.',
      address: 'Calle Mayor 15, 28013 Madrid',
      phone: '+34 912 345 678',
      email: 'reservas@labodegamadrid.es',
      hours: 'Daily 12:00–00:00',
      whatsapp: '+34612345678',
      template: 'launch-teaser',
      lang: 'es',
      brandColor: '#e07b53',
      pageUrl: 'https://peek-preview.pages.dev/examples/bodega-madrid',
      images: [
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800'
      ],
      reviews: [
        {name: 'Carlos R.', text: '¡Las mejores tapas de Madrid!', rating: 5, source: 'Google'},
        {name: 'María G.', text: 'Authentic atmosphere and delicious wine.', rating: 5, source: 'TripAdvisor'}
      ]
    }
  },
  {
    slug: 'foto-anna',
    data: {
      name: 'Foto Anna Kowalska',
      tagline: 'Fotografia Ślubna',
      description: 'Award-winning wedding photographer in Warsaw. Capturing authentic moments and emotions.',
      address: 'ul. Nowy Świat 33, 00-029 Warszawa',
      phone: '+48 22 123 45 67',
      email: 'anna@fotoanna.pl',
      hours: 'Mon–Fri 10:00–18:00',
      whatsapp: '+48600123456',
      template: 'product-spotlight',
      lang: 'pl',
      brandColor: '#b8a9c9',
      pageUrl: 'https://peek-preview.pages.dev/examples/foto-anna',
      images: [
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800',
        'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800'
      ],
      reviews: [
        {name: 'Kasia & Piotr', text: 'Najlepsza fotografka ślubna!', rating: 5, source: 'Google'},
        {name: 'Marta W.', text: 'Profesjonalna obsługa, piękne zdjęcia.', rating: 5, source: 'Google'}
      ]
    }
  },
  {
    slug: 'tech-meetup',
    data: {
      name: 'Tech Meetup Berlin',
      tagline: 'March Meetup — AI & Startups',
      description: 'Monthly gathering of Berlin tech scene. Keynote by industry leaders, networking, pizza & beer.',
      address: 'Betahaus, Röbelstraße 3, 10969 Berlin',
      hours: 'Thursday, March 20, 2025 — 18:00–22:00',
      template: 'event-waitlist',
      lang: 'en',
      brandColor: '#7dd3fc',
      pageUrl: 'https://peek-preview.pages.dev/examples/tech-meetup',
      images: ['https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'],
      speakers: [
        {name: 'Dr. Sarah Chen', role: 'AI Researcher, DeepMind'},
        {name: 'Marcus Weber', role: 'Founder, BerlinTech VC'},
        {name: 'Lisa Park', role: 'CTO, StartupBerlin'}
      ]
    }
  }
];

for (const { slug, data } of examples) {
  const result = generatePreview(data);
  if (!result.ok) {
    console.error(`Failed to generate ${slug}`);
    continue;
  }

  const htmlPath = path.join(OUT_DIR, `${slug}.html`);
  const jsonPath = path.join(OUT_DIR, `${slug}.json`);

  fs.writeFileSync(htmlPath, result.html, 'utf-8');
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf-8');

  console.log(`✓ Generated ${slug}.html (${result.html.length} bytes)`);
  console.log(`✓ Saved ${slug}.json`);
}

console.log('\nAll examples generated!');
