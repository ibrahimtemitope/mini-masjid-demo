import React, { useState } from 'react';
import { Rotate3d, ShoppingBag } from 'lucide-react';
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
  onInspectIn3D: (variant: MasjidVariant) => void;
  onAddToBag: (edition: ProductEdition, qty: 1 | 2 | 3) => void;
}

export const EditionsAndBundleSection: React.FC<Props> = ({
  currency,
  onInspectIn3D,
  onAddToBag,
}) => {
  const [qtyByEdition, setQtyByEdition] = useState<Record<EditionId, 1 | 2 | 3>>({
    'aqsa-xl': 1,
    'nabawi-xl': 1,
    'aqsa-mini': 1,
  });

  const [altPhotoOpen, setAltPhotoOpen] = useState<Record<EditionId, boolean>>({
    'aqsa-xl': false,
    'nabawi-xl': false,
    'aqsa-mini': false,
  });

  return (
    <section id="editions" className="bg-sand-100 py-12 sm:py-20">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-end">
          <h2 className="font-display text-3xl font-medium text-olive-800 sm:text-4xl">
            Choose Your MiniMasjid
          </h2>
          <p className="text-[14.5px] font-semibold text-olive-700/85">
            Free shipping included · Save up to 17% on 2–3 packs
          </p>
        </div>

        {/* 3 Giant Image-First Product Cards */}
        <div className="mt-8 grid gap-7 lg:grid-cols-3">
          {PRODUCT_EDITIONS.map((edition) => {
            const qty = qtyByEdition[edition.id];
            const tier = BUNDLE_TIERS.find((b) => b.qty === qty) || BUNDLE_TIERS[0];
            const rawPrice = edition.priceDkk * qty;
            const finalPrice = Math.round(rawPrice * (1 - tier.discountPct));
            const showAlt = altPhotoOpen[edition.id];

            return (
              <article
                key={edition.id}
                className="flex flex-col justify-between overflow-hidden rounded-[2rem] border border-sand-300 bg-white p-3.5 shadow-plush sm:p-4"
              >
                <div>
                  {/* HUGE Product Image Frame */}
                  <div className="relative overflow-hidden rounded-[1.5rem] bg-sand-100">
                    <img
                      src={showAlt ? edition.secondaryImage : edition.primaryImage}
                      alt={edition.name}
                      onClick={() =>
                        setAltPhotoOpen((prev) => ({
                          ...prev,
                          [edition.id]: !prev[edition.id],
                        }))
                      }
                      className="aspect-[4/4.4] w-full cursor-pointer object-cover transition-transform duration-500 hover:scale-[1.03]"
                    />

                    {/* Top Tag */}
                    <span className="absolute left-3.5 top-3.5 rounded-full bg-white/95 px-3 py-1 text-[12px] font-bold text-olive-800 shadow-sm backdrop-blur-md">
                      {edition.tag}
                    </span>

                    {/* Quick 2-Photo Toggle Dots + 3D Button */}
                    <div className="absolute inset-x-3.5 bottom-3.5 flex items-center justify-between">
                      <div className="inline-flex gap-1.5 rounded-full bg-white/90 px-2.5 py-1.5 shadow-sm backdrop-blur-md">
                        <button
                          type="button"
                          aria-label="Photo 1"
                          onClick={() =>
                            setAltPhotoOpen((prev) => ({ ...prev, [edition.id]: false }))
                          }
                          className={`h-2.5 w-2.5 rounded-full transition-all ${
                            !showAlt ? 'w-5 bg-olive-600' : 'bg-olive-800/30'
                          }`}
                        />
                        <button
                          type="button"
                          aria-label="Photo 2"
                          onClick={() =>
                            setAltPhotoOpen((prev) => ({ ...prev, [edition.id]: true }))
                          }
                          className={`h-2.5 w-2.5 rounded-full transition-all ${
                            showAlt ? 'w-5 bg-olive-600' : 'bg-olive-800/30'
                          }`}
                        />
                      </div>

                      {edition.isWalkIn && (
                        <button
                          type="button"
                          onClick={() => onInspectIn3D(edition.threeModelVariant)}
                          className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[12px] font-bold text-aqsa-600 shadow-sm backdrop-blur-md hover:bg-aqsa-50"
                        >
                          <Rotate3d className="h-3.5 w-3.5 text-aqsa-500" />
                          <span>3D</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Minimal Title + Price + 1-Line Spec */}
                  <div className="mt-4 px-1.5">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-display text-[1.35rem] font-semibold text-olive-800">
                        {edition.name}
                      </h3>
                      <div className="text-right">
                        <span className="font-display text-[1.4rem] font-bold text-olive-800">
                          {formatPrice(finalPrice, currency)}
                        </span>
                        {tier.discountPct > 0 && (
                          <span className="ml-1.5 text-[12.5px] text-olive-600/70 line-through">
                            {formatPrice(rawPrice, currency)}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="mt-1 text-[14px] text-olive-700/80">{edition.oneLiner}</p>
                  </div>
                </div>

                {/* Simple 1x / 2x / 3x Selector + Direct Add to Bag */}
                <div className="mt-4 px-1.5 pb-1">
                  <div className="grid grid-cols-3 gap-1.5 rounded-2xl bg-sand-100 p-1">
                    {BUNDLE_TIERS.map((b) => {
                      const active = qty === b.qty;
                      return (
                        <button
                          key={b.qty}
                          type="button"
                          onClick={() =>
                            setQtyByEdition((prev) => ({ ...prev, [edition.id]: b.qty }))
                          }
                          className={`rounded-xl py-2 text-[12.5px] font-bold transition-all ${
                            active
                              ? 'bg-white text-olive-900 shadow-sm'
                              : 'text-olive-700 hover:text-olive-900'
                          }`}
                        >
                          <span>{b.label}</span>
                          {b.badge && (
                            <span className="ml-1 text-[11px] text-clay-600">{b.badge}</span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => onAddToBag(edition, qty)}
                    className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-olive-500 px-5 py-3.5 text-[14.5px] font-bold text-white transition-colors hover:bg-olive-600"
                  >
                    <ShoppingBag className="h-4 w-4 text-dome-100" />
                    <span>Add to Bag — {formatPrice(finalPrice, currency)}</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
