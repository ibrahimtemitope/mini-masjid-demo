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
  tag: string;
  name: string;
  shortName: string;
  oneLiner: string;
  dimensions: string;
  priceDkk: number;
  primaryImage: string;
  secondaryImage: string;
  isWalkIn: boolean;
  threeModelVariant: 'aqsa' | 'nabawi';
}

export const PRODUCT_EDITIONS: ProductEdition[] = [
  {
    id: 'aqsa-xl',
    shopifyHandle: 'cardboard-mosque-playhouse-for-kids',
    tag: 'Walk-In XL · 145 cm',
    name: 'Al-Aqsa XL Edition',
    shortName: 'Al-Aqsa XL',
    oneLiner: 'Walk-in playhouse · 120 × 120 × 145 cm',
    dimensions: '120 × 120 × 145 cm',
    priceDkk: 595,
    primaryImage: '/assets/aqsa-studio.png',
    secondaryImage: '/assets/aqsa-kid-inside-home.jpg',
    isWalkIn: true,
    threeModelVariant: 'aqsa',
  },
  {
    id: 'nabawi-xl',
    shopifyHandle: 'minimasjid-nabawi-edition',
    tag: 'Walk-In XL · 145 cm',
    name: 'Masjid an-Nabawi XL',
    shortName: 'Nabawi XL',
    oneLiner: 'Walk-in playhouse · 120 × 120 × 145 cm',
    dimensions: '120 × 120 × 145 cm',
    priceDkk: 595,
    primaryImage: '/assets/nabawi-studio.png',
    secondaryImage: '/assets/step-2-slot.png',
    isWalkIn: true,
    threeModelVariant: 'nabawi',
  },
  {
    id: 'aqsa-mini',
    shopifyHandle: 'minimasjid-al-aqsa-mini-version',
    tag: 'Compact Edition',
    name: 'Al-Aqsa Mini',
    shortName: 'Al-Aqsa Mini',
    oneLiner: 'Compact scale for play, decor & gifting',
    dimensions: 'Compact Scale',
    priceDkk: 299,
    primaryImage: '/assets/aqsa-mini-clean.jpg',
    secondaryImage: '/assets/aqsa-candlelight-home.jpg',
    isWalkIn: false,
    threeModelVariant: 'aqsa',
  },
];

export interface BundleTier {
  qty: 1 | 2 | 3;
  label: string;
  badge?: string;
  discountPct: number;
}

export const BUNDLE_TIERS: BundleTier[] = [
  { qty: 1, label: 'Buy 1', discountPct: 0 },
  { qty: 2, label: 'Buy 2', badge: '-10%', discountPct: 0.1 },
  { qty: 3, label: 'Buy 3', badge: '-17%', discountPct: 0.173 },
];

export interface CustomerReview {
  id: string;
  parentName: string;
  location: string;
  editionPurchased: string;
  quote: string;
}

// Placeholder reviews — swap directly with real customer reviews anytime
export const PLACEHOLDER_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    parentName: 'Amina K.',
    location: 'Copenhagen',
    editionPurchased: 'Al-Aqsa XL',
    quote:
      'Built in under 5 minutes with zero tools. Our 4-year-old brings his prayer mat and books inside every evening.',
  },
  {
    id: 'rev-2',
    parentName: 'Yusuf & Sara',
    location: 'Malmö',
    editionPurchased: 'Nabawi XL',
    quote:
      'Much bigger and sturdier than expected — both kids sit inside easily, and it folds flat behind our sofa.',
  },
  {
    id: 'rev-3',
    parentName: 'Fatima H.',
    location: 'London',
    editionPurchased: 'Al-Aqsa Mini',
    quote:
      'Looks beautiful glowing in our living room. The best Eid gift we have ever bought.',
  },
];

export const BRAND_STORY_VIDEO_URL =
  'https://minimasjidstore.com/cdn/shop/videos/c/vp/3f7675af2fac45ab9c966aff6c20aedc/3f7675af2fac45ab9c966aff6c20aedc.HD-1080p-4.8Mbps-90875093.mp4';

export const STORE_FAQS = [
  {
    q: 'How big is the XL Edition?',
    a: '120 × 120 × 145 cm — big enough for children aged 1–8 to walk inside, sit, read, and play.',
  },
  {
    q: 'How easy is it to build and store?',
    a: 'Slots together in under 5 minutes with zero tools or glue, and folds completely flat behind a sofa when not in use.',
  },
  {
    q: 'What material is it made from?',
    a: 'Durable, child-safe, 100% recyclable heavy-duty board protected by an official design patent.',
  },
  {
    q: 'Is shipping free?',
    a: 'Yes — free worldwide shipping is included on every order, and 7.5% of profits support community projects.',
  },
];
