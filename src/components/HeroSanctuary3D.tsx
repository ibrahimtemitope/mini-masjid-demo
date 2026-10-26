import React from 'react';
import {
  ArrowRight,
  HeartHandshake,
  Maximize2,
  Rotate3d,
  ShieldCheck,
  Sparkles,
  Star,
} from 'lucide-react';
import { CurrencyCode, formatPrice } from '../data/storeData';
import { MasjidVariant } from './InteractiveMasjid3DAtelier';

interface Props {
  currency: CurrencyCode;
  onJumpTo3D: (variant: MasjidVariant) => void;
}

export const HeroSanctuary3D: React.FC<Props> = ({ currency, onJumpTo3D }) => {
  return (
    <section id="top" className="bg-sand-100 pb-16 pt-0 sm:pb-24 sm:pt-8 lg:pt-12">
      <div className="mx-auto max-w-[1280px] sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
          {/* FIRST THING ON THE PAGE (Mobile Top-First & Desktop Left Anchor): Clean, Uncluttered Real-Life Home Photo */}
          <div className="order-1 lg:col-span-6">
            <div className="overflow-hidden bg-white shadow-plush sm:rounded-[2rem] sm:border sm:border-sand-300 sm:p-3">
              <img
                src="/assets/aqsa-candlelight-home.jpg"
                alt="Real-life MiniMasjid Al-Aqsa XL playhouse glowing warmly in a family living room"
                fetchPriority="high"
                className="aspect-[4/3.85] w-full object-cover sm:aspect-[4/4.2] sm:rounded-[1.5rem]"
              />
            </div>
          </div>

          {/* Right / Below Column: Warm Brand Story, Standout Accent Badges & Clear Actions */}
          <div className="order-2 px-4 sm:px-0 lg:col-span-6">
            {/* Top Trust & Rating Strip (Uses Dome Gold & Al-Aqsa Blue standout accents) */}
            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href="#reviews"
                className="inline-flex items-center gap-1.5 rounded-full border border-dome-400/40 bg-dome-50 px-3.5 py-1 text-[12.5px] font-bold text-dome-600 transition-colors hover:bg-dome-100"
              >
                <span className="flex items-center text-dome-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-dome-500 text-dome-500" />
                  ))}
                </span>
                <span>4.9/5 Parent Reviews</span>
              </a>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-aqsa-500/20 bg-aqsa-50 px-3.5 py-1 text-[12.5px] font-semibold text-aqsa-600">
                <ShieldCheck className="h-3.5 w-3.5 text-aqsa-500" />
                <span>Patented Walk-In Design</span>
              </span>
            </div>

            <h1 className="mt-4 font-display text-[2.25rem] font-medium leading-[1.08] tracking-tight text-olive-800 sm:text-[3.35rem] lg:text-[3.7rem]">
              Where Faith Comes to Life Through Play.
            </h1>

            <p className="mt-4 max-w-xl text-[16.5px] leading-[1.7] text-olive-800/85 sm:text-[17.5px]">
              Big enough for children to step right inside (<strong>120 × 120 × 145 cm</strong>).
              Sit on a soft rug, read bedtime prophets’ stories, light a cozy LED lantern, and build
              lifelong love for the masjid — completely screen-free.
            </p>

            {/* Transparent Price & Shipping Pill */}
            <div className="mt-6 inline-flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border border-sand-300 bg-white px-5 py-3.5 shadow-sm">
              <div>
                <span className="text-[11.5px] font-bold uppercase tracking-wider text-olive-600">
                  Walk-In XL Editions
                </span>
                <p className="font-display text-2xl font-bold text-olive-800">
                  {formatPrice(595, currency)}
                </p>
              </div>
              <div className="h-8 w-px bg-sand-300" />
              <div>
                <span className="text-[11.5px] font-bold uppercase tracking-wider text-dome-600">
                  Mini Version
                </span>
                <p className="font-display text-2xl font-bold text-olive-800">
                  {formatPrice(299, currency)}
                </p>
              </div>
              <span className="rounded-full bg-clay-50 px-3 py-1 text-[12px] font-bold text-clay-600">
                Free Worldwide Shipping
              </span>
            </div>

            {/* Dual Action CTAs */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#bundle-builder"
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-olive-500 px-8 py-4 text-[15.5px] font-bold text-white shadow-plush transition-all hover:-translate-y-0.5 hover:bg-olive-600"
              >
                <span>Shop MiniMasjid Editions</span>
                <ArrowRight className="h-4 w-4 text-dome-100" />
              </a>

              <button
                type="button"
                onClick={() => onJumpTo3D('aqsa')}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-aqsa-500/30 bg-white px-7 py-4 text-[15px] font-bold text-aqsa-600 transition-all hover:bg-aqsa-50"
              >
                <Rotate3d className="h-4 w-4 text-aqsa-500" />
                <span>Spin &amp; Inspect in 3D</span>
              </button>
            </div>

            {/* 4 Tactile Benefit Micro-Cards */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                {
                  icon: Maximize2,
                  title: '145 cm Tall',
                  sub: 'Walk-in XL space',
                  iconColor: 'text-olive-500',
                },
                {
                  icon: Sparkles,
                  title: 'Under 5 Min',
                  sub: 'Tool-free slots',
                  iconColor: 'text-dome-500',
                },
                {
                  icon: ShieldCheck,
                  title: 'Eco-Safe',
                  sub: '100% recyclable',
                  iconColor: 'text-aqsa-500',
                },
                {
                  icon: HeartHandshake,
                  title: '7.5% Giveback',
                  sub: 'Supports ummah',
                  iconColor: 'text-clay-500',
                },
              ].map((b, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-sand-300 bg-white p-3.5 shadow-sm"
                >
                  <b.icon className={`h-4 w-4 ${b.iconColor}`} />
                  <p className="mt-1.5 text-[13.5px] font-bold text-olive-800">{b.title}</p>
                  <p className="text-[12px] text-olive-700/80">{b.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
