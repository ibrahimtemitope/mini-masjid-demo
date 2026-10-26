export type CurrencyCode = 'DKK' | 'EUR' | 'GBP' | 'USD';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rateFromDkk: number;
  suffix: boolean;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  DKK: { code: 'DKK', symbol: 'kr.', rateFromDkk: 1, suffix: true },
  EUR: { code: 'EUR', symbol: '€', rateFromDkk: 0.134, suffix: false },
  GBP: { code: 'GBP', symbol: '£', rateFromDkk: 0.114, suffix: false },
  USD: { code: 'USD', symbol: '$', rateFromDkk: 0.146, suffix: false },
};

export function formatPrice(dkkAmount: number, currency: CurrencyCode): string {
  const cfg = CURRENCIES[currency];
  const converted = Math.round(dkkAmount * cfg.rateFromDkk);
  if (cfg.suffix) {
    return `${converted.toLocaleString('da-DK')} ${cfg.symbol}`;
  }
  return `${cfg.symbol}${converted.toLocaleString('en-US')}`;
}

export type EditionId = 'aqsa-xl' | 'nabawi-xl' | 'aqsa-mini';

export interface ProductEdition {
  id: EditionId;
  shopifyHandle: string;
  badge: string;
  badgeTone: 'aqsa' | 'olive' | 'dome';
  name: string;
  shortName: string;
  plaqueText: string;
  subtitle: string;
  dimensions: string;
  ageRange: string;
  assemblyTime: string;
  priceDkk: number;
  accentHex: string;
  domeLabel: string;
  primaryImage: string;
  lifestyleImage: string;
  isWalkIn: boolean;
  threeModelVariant: 'aqsa' | 'nabawi';
  highlights: string[];
}

export const PRODUCT_EDITIONS: ProductEdition[] = [
  {
    id: 'aqsa-xl',
    shopifyHandle: 'cardboard-mosque-playhouse-for-kids',
    badge: 'Flagship Walk-In XL',
    badgeTone: 'aqsa',
    name: 'MiniMasjid® Al-Aqsa XL Edition',
    shortName: 'Al-Aqsa XL',
    plaqueText: 'AL AQSA',
    subtitle:
      'Inspired by the iconic golden Dome of the Rock & cobalt Jerusalem tilework — spacious enough for children to step inside, sit, read, and pray.',
    dimensions: '120 × 120 × 145 cm',
    ageRange: 'Ages 1–8 yrs',
    assemblyTime: 'Under 5 min · Zero tools',
    priceDkk: 595,
    accentHex: '#1F4175',
    domeLabel: 'Golden Octagonal Dome & 4 Blue-Spired Minarets',
    primaryImage: '/assets/aqsa-studio.png',
    lifestyleImage: '/assets/aqsa-candlelight-home.jpg',
    isWalkIn: true,
    threeModelVariant: 'aqsa',
    highlights: [
      'Full 145 cm walk-in height — siblings can play & read inside together',
      'Intricate cobalt-blue geometric frieze & stained-glass arched windows',
      'Folds completely flat in minutes to slide behind a sofa or wardrobe',
      'Heavy-duty, child-safe, 100% recyclable engineered board',
    ],
  },
  {
    id: 'nabawi-xl',
    shopifyHandle: 'minimasjid-nabawi-edition',
    badge: 'Madinah Sanctuary XL',
    badgeTone: 'olive',
    name: 'MiniMasjid® Masjid an-Nabawi XL Edition',
    shortName: 'Nabawi XL',
    plaqueText: 'BAB AS SALAM',
    subtitle:
      'Featuring the beloved Green Dome of Madinah, Bab As-Salam entrance plaque, mashrabiya latticework windows, and four emerald minarets.',
    dimensions: '120 × 120 × 145 cm',
    ageRange: 'Ages 1–8 yrs',
    assemblyTime: 'Under 5 min · Zero tools',
    priceDkk: 595,
    accentHex: '#49572A',
    domeLabel: 'Emerald Green Dome & Bab As-Salam Archway',
    primaryImage: '/assets/nabawi-studio.png',
    lifestyleImage: '/assets/aqsa-kid-inside-home.jpg',
    isWalkIn: true,
    threeModelVariant: 'nabawi',
    highlights: [
      'Full 145 cm walk-in height with iconic Green Dome & crescent finial',
      'Warm sand-stone facade with Bab As-Salam plaque & hanging lantern details',
      'Tool-free interlocking slot engineering — unfolds & packs flat effortlessly',
      '7.5% of profits directly fund meaningful community projects',
    ],
  },
  {
    id: 'aqsa-mini',
    shopifyHandle: 'minimasjid-al-aqsa-mini-version',
    badge: 'Compact Gift Edition',
    badgeTone: 'dome',
    name: 'MiniMasjid® Al-Aqsa — Mini Version',
    shortName: 'Al-Aqsa Mini',
    plaqueText: 'AL AQSA MINI',
    subtitle:
      'A charming compact edition made for bookshelves, Ramadan corners, smaller bedrooms, and thoughtful Eid or birthday gifting.',
    dimensions: 'Compact Play & Decor Scale',
    ageRange: 'All Ages · Decor & Play',
    assemblyTime: '2 min · Slot-together',
    priceDkk: 299,
    accentHex: '#9B731F',
    domeLabel: 'Compact Golden Dome Ramadan Corner Edition',
    primaryImage: '/assets/aqsa-candlelight-home.jpg',
    lifestyleImage: '/assets/aqsa-studio.png',
    isWalkIn: false,
    threeModelVariant: 'aqsa',
    highlights: [
      'Perfect centerpiece for family Ramadan & Eid decoration tables',
      'Glows warmly with a safe LED tea-light or lantern placed inside',
      'Accessible gift price with free worldwide shipping included',
      'Same patented architectural detailing & recyclable board',
    ],
  },
];

export interface BundleTier {
  qty: 1 | 2 | 3;
  title: string;
  tag?: string;
  tagTone?: 'dome' | 'clay';
  subtitle: string;
  discountPct: number;
}

export const BUNDLE_TIERS: BundleTier[] = [
  {
    qty: 1,
    title: '1× Family Playhouse',
    subtitle: 'Free worldwide shipping included',
    discountPct: 0,
  },
  {
    qty: 2,
    title: '2× Sibling & Cousin Gift Set',
    tag: 'Most Popular · Save 10%',
    tagTone: 'dome',
    subtitle: 'Keep one at home & gift one for Eid or Ramadan',
    discountPct: 0.10,
  },
  {
    qty: 3,
    title: '3× Family, Masjid & Madrasah Pack',
    tag: 'Best Value · Save 17.3%',
    tagTone: 'clay',
    subtitle: 'Ideal for cousins, playgroups, or donating one to a child',
    discountPct: 0.173,
  },
];

export interface CustomerReview {
  id: string;
  parentName: string;
  location: string;
  editionPurchased: string;
  rating: number;
  headline: string;
  quote: string;
  dateLabel: string;
}

// Placeholder family reviews — swap directly with Jacub's real customer reviews when ready
export const PLACEHOLDER_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    parentName: 'Amina K.',
    location: 'Copenhagen, Denmark',
    editionPurchased: 'Al-Aqsa XL Edition',
    rating: 5,
    headline: 'Our 4-year-old asks to pray inside his “little Al-Aqsa” every evening!',
    quote:
      'Honestly exceeded every expectation. It took me and my son less than five minutes to slot together with zero tools, and now he brings his tiny prayer mat and storybooks inside every single night instead of asking for YouTube.',
    dateLabel: 'Verified Buyer',
  },
  {
    id: 'rev-2',
    parentName: 'Yusuf & Sara M.',
    location: 'Malmö, Sweden',
    editionPurchased: 'Masjid an-Nabawi XL',
    rating: 5,
    headline: 'Way bigger and sturdier in real life than we imagined',
    quote:
      'Both our 3-year-old and 6-year-old sit inside comfortably with cushions and an LED lantern. When grandparents visited on Sunday, we unslotted it and slid it right behind the living-room sofa in two minutes.',
    dateLabel: 'Verified Buyer',
  },
  {
    id: 'rev-3',
    parentName: 'Fatima H.',
    location: 'London, United Kingdom',
    editionPurchased: '2× Sibling & Cousin Gift Set',
    rating: 5,
    headline: 'The best Eid gift we have ever bought for our nieces',
    quote:
      'Ordered one Al-Aqsa XL for home and one Nabawi XL for my sister’s kids. The tilework print looks gorgeous in our living room — it doesn’t look like plastic clutter at all, it looks like a real piece of Islamic art.',
    dateLabel: 'Verified Buyer',
  },
  {
    id: 'rev-4',
    parentName: 'Ibrahim A.',
    location: 'Aarhus, Denmark',
    editionPurchased: 'Al-Aqsa XL Edition',
    rating: 5,
    headline: 'Screen-free hours of play, Alhamdulillah',
    quote:
      'My kids call the adhan from the corner minarets and invite us in for Qur’an stories. Knowing 7.5% also goes back to community projects made ordering a complete no-brainer for our family.',
    dateLabel: 'Verified Buyer',
  },
  {
    id: 'rev-5',
    parentName: 'Khadija R.',
    location: 'Oslo, Norway',
    editionPurchased: 'Al-Aqsa — Mini Version',
    rating: 5,
    headline: 'Made our Ramadan table glow so beautifully',
    quote:
      'We placed a warm flameless candle inside the Mini Version on our hallway console and the children gather around it right before Maghrib. Already planning to get the full 145 cm XL next!',
    dateLabel: 'Verified Buyer',
  },
  {
    id: 'rev-6',
    parentName: 'Bilal T.',
    location: 'Rotterdam, Netherlands',
    editionPurchased: '3× Family & Madrasah Pack',
    rating: 5,
    headline: 'Bought 3 for our weekend Islamic school class',
    quote:
      'Fast free delivery and rock-solid recyclable board. The youngest class absolutely lit up walking through the Bab As-Salam archway — every Muslim playgroup should have one.',
    dateLabel: 'Verified Buyer',
  },
];

export const BRAND_STORY_VIDEO_URL =
  'https://minimasjidstore.com/cdn/shop/videos/c/vp/3f7675af2fac45ab9c966aff6c20aedc/3f7675af2fac45ab9c966aff6c20aedc.HD-1080p-4.8Mbps-90875093.mp4';

export const STORE_FAQS = [
  {
    q: 'Why is MiniMasjid® 595 kr — and what makes it different from an ordinary cardboard toy?',
    a: 'MiniMasjid® is a patented, architectural-scale walk-in structure (120 × 120 × 145 cm) crafted in exclusive batches from heavy-duty, child-safe recyclable board. Because an oversized 145 cm parcel costs significantly more to ship internationally, we include Free Shipping on every order — plus 7.5% of profits support meaningful community projects.',
  },
  {
    q: 'Is it genuinely large enough for children to sit and play inside?',
    a: 'Yes! At 120 cm wide × 120 cm deep × 145 cm tall, children aged 1–8 can step right through the arched doorway, place a soft rug or cushions inside, read Qur’an stories, role-play, and enjoy cozy screen-free play.',
  },
  {
    q: 'How fast is assembly — and can we fold it flat when guests visit?',
    a: 'Most parents and kids slot it together in under 5 minutes with zero tools, glue, or screws. When playtime is over, simply unslot the panels and store it flat behind a sofa, under a bed, or inside a wardrobe.',
  },
  {
    q: 'What is the difference between the Al-Aqsa XL, Masjid an-Nabawi XL, and Mini Version?',
    a: 'Both XL Editions share our full 120 × 120 × 145 cm walk-in dimensions (595 kr): Al-Aqsa XL features cobalt-blue Jerusalem tilework and the Golden Dome, while Masjid an-Nabawi XL features the Madinah Green Dome and Bab As-Salam entrance. The Mini Version (299 kr) is a smaller compact edition ideal for Ramadan decor tables and gifting.',
  },
  {
    q: 'Do you ship internationally and support multiple currencies?',
    a: 'Yes — we ship worldwide from Aarhus, Denmark with multi-currency checkout (DKK, EUR, GBP, USD) and free shipping included on all orders.',
  },
];
