import React, { useState } from 'react';
import { ArrowRight, Rotate3d, Star } from 'lucide-react';
import { CurrencyCode, formatPrice } from '../data/storeData';
import { MasjidVariant } from './InteractiveMasjid3DAtelier';

interface Props {
  currency: CurrencyCode;
  onJumpTo3D: (variant: MasjidVariant) => void;
}

const HERO_PHOTOS = [
  {
    src: '/assets/aqsa-candlelight-home.jpg',
    label: 'Living Room Glow',
    alt: 'MiniMasjid Al-Aqsa glowing warmly in a family home',
  },
  {
    src: '/assets/aqsa-kid-inside-home.jpg',
    label: '145 cm Walk-In Size',
    alt: 'Child playing inside the 145 cm MiniMasjid XL',
  },
  {
    src: '/assets/nabawi-studio.png',
    label: 'Nabawi XL',
    alt: 'MiniMasjid Masjid an-Nabawi XL Edition',
  },
];

export const HeroSanctuary3D: React.FC<Props> = ({ currency, onJumpTo3D }) => {
  const [activePhoto, setActivePhoto] = useState(0);

  return (
    <section id="top" className="bg-sand-100 pb-14 pt-0 sm:pb-20 sm:pt-6 lg:pt-8">
      <div className="mx-auto max-w-[1320px] sm:px-6 lg:px-8">
        <div className="grid items-center gap-7 lg:grid-cols-12 lg:gap-12">
          {/* HUGE IMAGE FIRST (7 of 12 columns on desktop, full bleed on mobile) */}
          <div className="order-1 lg:col-span-7">
            <div className="overflow-hidden bg-white shadow-plush sm:rounded-[2rem] sm:border sm:border-sand-300 sm:p-2.5">
              <img
                src={HERO_PHOTOS[activePhoto].src}
                alt={HERO_PHOTOS[activePhoto].alt}
                fetchPriority="high"
                className="aspect-[4/4.15] w-full object-cover sm:aspect-[4/3.85] sm:rounded-[1.5rem]"
              />
            </div>

            {/* Clean 3-Photo Thumbnails */}
            <div className="mt-3 flex gap-2.5 px-4 sm:px-0">
              {HERO_PHOTOS.map((photo, idx) => (
                <button
                  key={photo.src}
                  type="button"
                  onClick={() => setActivePhoto(idx)}
                  className={`group flex flex-1 items-center gap-2.5 rounded-2xl border bg-white p-1.5 text-left transition-all ${
                    activePhoto === idx
                      ? 'border-olive-500 ring-2 ring-olive-500/20'
                      : 'border-sand-300 opacity-75 hover:opacity-100'
                  }`}
                >
                  <img
                    src={photo.src}
                    alt={photo.label}
                    className="h-12 w-12 shrink-0 rounded-xl object-cover sm:h-14 sm:w-14"
                  />
                  <span className="pr-2 text-[12px] font-bold leading-tight text-olive-800 sm:text-[13px]">
                    {photo.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* MINIMAL, WARM COPY (5 of 12 columns) */}
          <div className="order-2 px-5 sm:px-0 lg:col-span-5">
            <a
              href="#reviews"
              className="inline-flex items-center gap-1.5 rounded-full border border-dome-400/40 bg-dome-50 px-3.5 py-1 text-[12.5px] font-bold text-dome-600"
            >
              <span className="flex items-center text-dome-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-dome-500 text-dome-500" />
                ))}
              </span>
              <span>4.9 / 5</span>
            </a>

            <h1 className="mt-4 font-display text-[2.4rem] font-medium leading-[1.06] tracking-tight text-olive-800 sm:text-[3.4rem]">
              Faith Through Play.
            </h1>

            <p className="mt-3.5 max-w-md text-[17px] leading-[1.6] text-olive-800/85">
              Walk-in mosque playhouses (<strong>120 × 120 × 145 cm</strong>). Builds in 5 minutes
              with zero tools — folds flat behind your sofa.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#editions"
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-olive-500 px-8 py-4 text-[15.5px] font-bold text-white shadow-plush transition-all hover:bg-olive-600"
              >
                <span>Shop — From {formatPrice(299, currency)}</span>
                <ArrowRight className="h-4 w-4 text-dome-100" />
              </a>

              <button
                type="button"
                onClick={() => onJumpTo3D('aqsa')}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-sand-300 bg-white px-6 py-4 text-[14.5px] font-bold text-olive-800 transition-colors hover:bg-sand-50"
              >
                <Rotate3d className="h-4 w-4 text-aqsa-500" />
                <span>3D View</span>
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[13.5px] font-semibold text-olive-800/80">
              <span>✓ Ages 1–8</span>
              <span>✓ 100% Recyclable</span>
              <span>✓ Free Shipping</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
