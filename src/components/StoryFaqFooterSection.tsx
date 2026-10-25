import React, { useState } from 'react';
import {
  ChevronDown,
  Compass,
  HeartHandshake,
  Mail,
  MapPin,
  MessageCircle,
  Sparkles,
  TvMinimal,
} from 'lucide-react';
import { BRAND_STORY_VIDEO_URL, STORE_FAQS } from '../data/storeData';

export const StoryFaqFooterSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number>(0);

  const pillars = [
    {
      icon: Compass,
      title: 'Build Joyful Islamic Identity',
      body: 'Gives children their own beloved mini-sanctuary at home so salah, Qur’an stories, and love for Al-Aqsa & Madinah feel joyful and natural.',
    },
    {
      icon: TvMinimal,
      title: 'Replace Screens With Real Play',
      body: 'Designed specifically to pull young hearts away from tablets and into hours of imaginative, hands-on storytelling with siblings.',
    },
    {
      icon: Sparkles,
      title: 'Patented Heirloom Engineering',
      body: 'Precision-cut recyclable board slots together in under 5 minutes without a single screw or drop of glue — then folds flat behind a sofa.',
    },
    {
      icon: HeartHandshake,
      title: '7.5% Community Giveback',
      body: 'Every MiniMasjid® order contributes 7.5% of profits toward meaningful community projects and gifting playhouses to children in need.',
    },
  ];

  return (
    <>
      {/* 1. Why MiniMasjid + Real Founder Story Video */}
      <section id="our-story" className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
            {/* Left Copy + 4 Pillars */}
            <div className="lg:col-span-7">
              <p className="text-[12.5px] font-bold uppercase tracking-[0.16em] text-olive-600">
                Why Families Love MiniMasjid®
              </p>
              <h2 className="mt-3 font-display text-3xl font-medium text-olive-900 sm:text-5xl">
                More than a toy.{' '}
                <span className="italic text-olive-600">
                  A sanctuary for faith, connection & imagination.
                </span>
              </h2>
              <p className="mt-4 text-[16.5px] leading-relaxed text-olive-800/85">
                We saw children spending more time on screens than in real play — and we knew Muslim
                families deserved something extraordinary. MiniMasjid® brings the beauty of Masjid
                Al-Aqsa and Masjid an-Nabawi right into your living room.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {pillars.map((p, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-sand-300 bg-sand-50/80 p-5"
                  >
                    <p.icon className="h-5 w-5 text-olive-700" />
                    <h3 className="mt-3 text-[16px] font-bold text-olive-900">{p.title}</h3>
                    <p className="mt-1.5 text-[14.5px] leading-relaxed text-olive-800/80">
                      {p.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Real MiniMasjid HD Video Showcase */}
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-[2rem] border border-sand-300 bg-sand-100 p-3 shadow-plush-lg">
                <video
                  src={BRAND_STORY_VIDEO_URL}
                  poster="/assets/aqsa-candlelight-home.jpg"
                  controls
                  playsInline
                  muted
                  loop
                  className="aspect-[9/12] w-full rounded-[1.5rem] bg-night-950 object-cover"
                />
                <p className="mt-3 px-2 text-center text-[13px] font-medium text-olive-700">
                  Watch MiniMasjid® come to life inside a real family home
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Frequently Asked Questions */}
      <section id="faq" className="border-t border-sand-300/80 bg-sand-50 py-20 sm:py-26">
        <div className="mx-auto max-w-[880px] px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-[12.5px] font-bold uppercase tracking-[0.16em] text-olive-600">
              Questions Answered
            </p>
            <h2 className="mt-3 font-display text-3xl font-medium text-olive-900 sm:text-4xl">
              Everything Parents Ask Before Ordering
            </h2>
          </div>

          <div className="mt-10 space-y-3.5">
            {STORE_FAQS.map((item, idx) => {
              const open = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="overflow-hidden rounded-2xl border border-sand-300 bg-white"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? -1 : idx)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="text-[16px] font-bold text-olive-900 sm:text-[17px]">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-olive-700 transition-transform ${
                        open ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {open && (
                    <div className="border-t border-sand-200 px-6 pb-5 pt-4 text-[15.5px] leading-relaxed text-olive-800/85">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Heirloom Brand Footer (Real Aarhus Denmark Details & Wholesale) */}
      <footer className="border-t border-sand-300 bg-olive-900 py-16 text-sand-100">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="inline-block rounded-2xl bg-sand-50 px-4 py-2">
                <img src="/assets/logo.png" alt="MiniMasjid" className="h-12 w-auto" />
              </div>
              <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-sand-200/85">
                Patented walk-in mosque playhouses crafted to nurture Islamic identity, joyful
                family memories, and screen-free imagination.
              </p>
              <p className="mt-3 font-mono text-[12.5px] text-dome-300">
                MiniMasjid® · CVR / Company No. 46688236 · Patented Designs
              </p>
            </div>

            <div className="md:col-span-3">
              <h3 className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-dome-300">
                Explore
              </h3>
              <ul className="mt-4 space-y-2.5 text-[14.5px] text-sand-200">
                <li>
                  <a href="#atelier-3d" className="hover:text-white">
                    3D Hologram Studio
                  </a>
                </li>
                <li>
                  <a href="#editions" className="hover:text-white">
                    All 3 Editions
                  </a>
                </li>
                <li>
                  <a href="#scale-visualizer" className="hover:text-white">
                    145 cm Size Visualizer
                  </a>
                </li>
                <li>
                  <a href="#bundle-builder" className="hover:text-white">
                    Sibling & Madrasah Bundles
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-white">
                    FAQs & Shipping
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4">
              <h3 className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-dome-300">
                Support, B2B & Wholesale
              </h3>
              <ul className="mt-4 space-y-3 text-[14.5px] text-sand-200">
                <li className="flex items-center gap-2.5">
                  <MessageCircle className="h-4 w-4 text-dome-300" />
                  <span>WhatsApp: +45 60 52 48 30</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 text-dome-300" />
                  <span>Orders: support@minimasjidstore.com</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 text-dome-300" />
                  <span>B2B & Masjids: salam@minimasjidstore.com</span>
                </li>
                <li className="flex items-center gap-2.5 text-sand-300">
                  <MapPin className="h-4 w-4 text-dome-300" />
                  <span>Glænøvænget 10, Aarhus, Denmark</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Payment Methods & Legal */}
          <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-7 text-[12.5px] text-sand-300 sm:flex-row sm:items-center">
            <p>© 2026 MiniMasjid®. All designs, patents, and brand assets protected.</p>
            <div className="flex flex-wrap gap-2 font-mono text-[11px]">
              {['Apple Pay', 'MobilePay', 'Klarna', 'Shop Pay', 'Visa', 'Mastercard', 'PayPal'].map(
                (p) => (
                  <span
                    key={p}
                    className="rounded-md border border-white/15 bg-white/5 px-2.5 py-1 text-sand-100"
                  >
                    {p}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
