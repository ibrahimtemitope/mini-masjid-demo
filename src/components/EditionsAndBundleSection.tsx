import React, { useState } from 'react';
import {
  Check,
  Gift,
  Heart,
  Rotate3d,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from 'lucide-react';
import {
  BUNDLE_TIERS,
  CurrencyCode,
  EditionId,
  PRODUCT_EDITIONS,
  ProductEdition,
  formatPrice,
} from '../data/storeData';
import { MasjidVariant } from './InteractiveMasjid3DAtelier';

interface Props {
  currency: CurrencyCode;
  selectedEditionId: EditionId;
  onSelectEdition: (id: EditionId) => void;
  onInspectIn3D: (variant: MasjidVariant) => void;
  onAddToBag: (edition: ProductEdition, qty: 1 | 2 | 3, giftNote: string) => void;
}

export const EditionsAndBundleSection: React.FC<Props> = ({
  currency,
  selectedEditionId,
  onSelectEdition,
  onInspectIn3D,
  onAddToBag,
}) => {
  const [bundleQty, setBundleQty] = useState<1 | 2 | 3>(2);
  const [includeGiftCard, setIncludeGiftCard] = useState<boolean>(false);
  const [giftNote, setGiftNote] = useState<string>('');

  const activeEdition =
    PRODUCT_EDITIONS.find((e) => e.id === selectedEditionId) || PRODUCT_EDITIONS[0];
  const activeBundle = BUNDLE_TIERS.find((b) => b.qty === bundleQty) || BUNDLE_TIERS[0];

  const rawTotalDkk = activeEdition.priceDkk * bundleQty;
  const discountedTotalDkk = Math.round(rawTotalDkk * (1 - activeBundle.discountPct));
  const givebackDkk = Math.round(discountedTotalDkk * 0.075);

  return (
    <section id="editions" className="bg-sand-50 py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Part 1: All 3 Real Editions Pedestal Showcase */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[12.5px] font-bold uppercase tracking-[0.16em] text-olive-600">
            Explore Our Complete Collection
          </p>
          <h2 className="mt-3 font-display text-3xl font-medium text-olive-900 sm:text-5xl">
            Three Patented Editions.{' '}
            <span className="italic text-olive-600">Crafted in Exclusive Batches.</span>
          </h2>
          <p className="mt-4 text-[16.5px] leading-relaxed text-olive-800/80">
            Choose between our two full-size <strong>145 cm Walk-In XL Sanctuaries</strong> or our
            compact <strong>Mini Edition</strong> for Ramadan corners and thoughtful gifting.
          </p>
        </div>

        {/* 3 Pedestal Cards */}
        <div className="mt-12 grid gap-7 lg:grid-cols-3">
          {PRODUCT_EDITIONS.map((edition) => {
            const isSelected = edition.id === selectedEditionId;

            return (
              <div
                key={edition.id}
                className={`group flex flex-col justify-between rounded-[2rem] border p-6 transition-all duration-300 hover:-translate-y-1.5 sm:p-7 ${
                  isSelected
                    ? 'border-olive-800 bg-white shadow-plush-lg ring-2 ring-olive-800/15'
                    : 'border-sand-300 bg-white/90 shadow-plush hover:border-olive-600/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-sand-100 px-3.5 py-1 text-[12px] font-bold text-olive-800">
                      {edition.badge}
                    </span>
                    <span className="font-mono text-[12px] font-semibold text-olive-600">
                      {edition.ageRange}
                    </span>
                  </div>

                  {/* Clean Studio Photo Pedestal */}
                  <div className="relative mt-5 overflow-hidden rounded-2xl bg-sand-100">
                    <img
                      src={edition.primaryImage}
                      alt={edition.name}
                      className="aspect-[4/3.8] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {edition.isWalkIn && (
                      <button
                        type="button"
                        onClick={() => onInspectIn3D(edition.threeModelVariant)}
                        className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-night-950/80 px-3 py-1.5 text-[11.5px] font-semibold text-sand-50 backdrop-blur-md hover:bg-night-950"
                      >
                        <Rotate3d className="h-3.5 w-3.5 text-dome-300" />
                        <span>View in 3D</span>
                      </button>
                    )}
                  </div>

                  <div className="mt-5 flex items-baseline justify-between gap-2">
                    <h3 className="font-display text-xl font-semibold text-olive-900">
                      {edition.name}
                    </h3>
                  </div>

                  <p className="mt-1 font-display text-2xl font-bold text-olive-800">
                    {formatPrice(edition.priceDkk, currency)}
                  </p>

                  <p className="mt-2.5 text-[14.5px] leading-relaxed text-olive-800/80">
                    {edition.subtitle}
                  </p>

                  <div className="my-4 h-px bg-sand-200" />

                  <ul className="space-y-2 text-[13.5px] text-olive-800">
                    {edition.highlights.slice(0, 3).map((hl, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-olive-600" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#bundle-builder"
                  onClick={() => onSelectEdition(edition.id)}
                  className={`mt-6 inline-flex w-full items-center justify-center rounded-full px-5 py-3.5 text-[14.5px] font-bold transition-colors ${
                    isSelected
                      ? 'bg-olive-800 text-sand-50 hover:bg-olive-900'
                      : 'border border-olive-800/20 bg-sand-100 text-olive-900 hover:bg-sand-200'
                  }`}
                >
                  {isSelected ? 'Selected in Configurator ↓' : `Select ${edition.shortName}`}
                </a>
              </div>
            );
          })}
        </div>

        {/* Part 2: Flagship Family & Sibling Bundle Configurator (Replaces raw "BUY IN BULK" app!) */}
        <div
          id="bundle-builder"
          className="mt-20 overflow-hidden rounded-[2.25rem] border border-sand-300 bg-white shadow-plush-lg"
        >
          <div className="grid lg:grid-cols-12">
            {/* Left Gallery & Batch Transparency */}
            <div className="flex flex-col justify-between bg-sand-100/75 p-7 sm:p-10 lg:col-span-5">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-olive-800 px-3.5 py-1 text-[11.5px] font-semibold text-sand-50">
                  <Truck className="h-3.5 w-3.5 text-dome-300" />
                  <span>Exclusive Batch · Free Worldwide Shipping</span>
                </span>

                <h3 className="mt-4 font-display text-2xl font-semibold text-olive-900 sm:text-3xl">
                  {activeEdition.name}
                </h3>
                <p className="mt-1 font-mono text-[13px] font-semibold text-olive-600">
                  Dimensions: {activeEdition.dimensions} · {activeEdition.assemblyTime}
                </p>

                <div className="mt-6 overflow-hidden rounded-2xl border border-sand-300 bg-white">
                  <img
                    src={activeEdition.lifestyleImage}
                    alt={activeEdition.name}
                    className="aspect-[4/3.6] w-full object-cover"
                  />
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-olive-600/20 bg-olive-50 p-4">
                <div className="flex items-start gap-3">
                  <Heart className="mt-0.5 h-5 w-5 shrink-0 text-olive-700" />
                  <p className="text-[13.5px] leading-relaxed text-olive-900">
                    <strong>7.5% Sadaqah & Community Pledge:</strong> Your order contributes{' '}
                    <strong>{formatPrice(givebackDkk, currency)}</strong> directly toward meaningful
                    community & children’s projects.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Interactive Bundle Selector */}
            <div className="p-7 sm:p-10 lg:col-span-7">
              {/* Step 1: Choose Edition */}
              <div>
                <p className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-olive-600">
                  Step 1 · Choose Your Edition
                </p>
                <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                  {PRODUCT_EDITIONS.map((ed) => {
                    const active = ed.id === selectedEditionId;
                    return (
                      <button
                        key={ed.id}
                        type="button"
                        onClick={() => onSelectEdition(ed.id)}
                        className={`rounded-2xl border p-3.5 text-left transition-all ${
                          active
                            ? 'border-olive-800 bg-olive-50 ring-2 ring-olive-800/15'
                            : 'border-sand-300 bg-white hover:border-olive-600/40'
                        }`}
                      >
                        <p className="text-[14px] font-bold text-olive-900">{ed.shortName}</p>
                        <p className="mt-0.5 text-[13px] font-semibold text-olive-700">
                          {formatPrice(ed.priceDkk, currency)}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Choose Family / Sibling / Madrasah Bundle */}
              <div className="mt-7">
                <p className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-olive-600">
                  Step 2 · Choose Quantity or Gift Bundle
                </p>
                <div className="mt-3 space-y-3">
                  {BUNDLE_TIERS.map((tier) => {
                    const active = tier.qty === bundleQty;
                    const tierRaw = activeEdition.priceDkk * tier.qty;
                    const tierFinal = Math.round(tierRaw * (1 - tier.discountPct));

                    return (
                      <button
                        key={tier.qty}
                        type="button"
                        onClick={() => setBundleQty(tier.qty)}
                        className={`flex w-full items-center justify-between gap-4 rounded-2xl border p-4 text-left transition-all ${
                          active
                            ? 'border-olive-800 bg-olive-50/85 ring-2 ring-olive-800/15'
                            : 'border-sand-300 bg-white hover:border-olive-600/40'
                        }`}
                      >
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[15.5px] font-bold text-olive-900">
                              {tier.title}
                            </span>
                            {tier.tag && (
                              <span className="rounded-full bg-dome-400/35 px-2.5 py-0.5 text-[11.5px] font-bold text-olive-900">
                                {tier.tag}
                              </span>
                            )}
                          </div>
                          <p className="mt-0.5 text-[13.5px] text-olive-700">{tier.subtitle}</p>
                        </div>

                        <div className="text-right">
                          <p className="font-display text-xl font-bold text-olive-900">
                            {formatPrice(tierFinal, currency)}
                          </p>
                          {tier.discountPct > 0 && (
                            <p className="text-[12.5px] text-olive-600 line-through">
                              {formatPrice(tierRaw, currency)}
                            </p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Optional Ramadan / Eid Gift Note */}
              <div className="mt-6 rounded-2xl border border-sand-300 bg-sand-50/70 p-4">
                <label className="flex cursor-pointer items-center gap-2.5 text-[14px] font-semibold text-olive-900">
                  <input
                    type="checkbox"
                    checked={includeGiftCard}
                    onChange={(e) => setIncludeGiftCard(e.target.checked)}
                    className="h-4 w-4 rounded accent-olive-800"
                  />
                  <Gift className="h-4 w-4 text-dome-600" />
                  <span>Sending as a Ramadan, Eid, or Birthday gift? Add a free note</span>
                </label>

                {includeGiftCard && (
                  <input
                    type="text"
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    placeholder="Write your heartfelt dua or gift message for the child..."
                    className="mt-3 w-full rounded-xl border border-sand-300 bg-white px-3.5 py-2.5 text-[14.5px] text-olive-900 focus:border-olive-700 focus:outline-none"
                  />
                )}
              </div>

              {/* Add to Bag CTA */}
              <button
                type="button"
                onClick={() =>
                  onAddToBag(activeEdition, bundleQty, includeGiftCard ? giftNote : '')
                }
                className="mt-7 inline-flex w-full items-center justify-center gap-3 rounded-full bg-olive-800 px-7 py-4 text-[16px] font-bold text-sand-50 shadow-plush transition-all hover:-translate-y-0.5 hover:bg-olive-900"
              >
                <ShoppingBag className="h-5 w-5 text-dome-300" />
                <span>
                  Add to Bag — {formatPrice(discountedTotalDkk, currency)} (Free Shipping)
                </span>
              </button>

              <p className="mt-3.5 flex items-center justify-center gap-2 text-center text-[13px] text-olive-700">
                <ShieldCheck className="h-4 w-4 text-olive-600" />
                <span>
                  Ships from Aarhus, Denmark · Apple Pay, MobilePay, Klarna & Shop Pay supported
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
