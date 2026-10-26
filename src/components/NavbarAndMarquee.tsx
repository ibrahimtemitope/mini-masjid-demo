import React, { useState } from 'react';
import { Globe, Menu, Rotate3d, ShoppingBag, X } from 'lucide-react';
import { CURRENCIES, CurrencyCode } from '../data/storeData';

interface Props {
  currency: CurrencyCode;
  onCurrencyChange: (c: CurrencyCode) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const NavbarAndMarquee: React.FC<Props> = ({
  currency,
  onCurrencyChange,
  cartCount,
  onOpenCart,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const marqueeItems = [
    '✦ Building Faith Through Meaningful Screen-Free Play',
    '✦ Patented Walk-In Architecture (120 × 120 × 145 cm)',
    '✦ Free Worldwide Shipping Included on Every Order',
    '♻ Safe, Heavy-Duty 100% Recyclable Board',
    '♡ 7.5% of Profits Support Meaningful Community Projects',
  ];

  const navLinks = [
    { href: '#atelier-3d', label: '3D Interactive View', highlight: true },
    { href: '#editions', label: 'All 3 Editions' },
    { href: '#reviews', label: 'Reviews' },
    { href: '#scale-visualizer', label: '145 cm Size Check' },
    { href: '#bundle-builder', label: 'Sibling Bundles' },
    { href: '#faq', label: 'FAQ' },
  ];

  return (
    <>
      {/* Signature Olive Announcement Bar */}
      <div className="overflow-hidden bg-olive-500 py-2 text-[12px] font-semibold tracking-wide text-white">
        <div className="animate-marquee gap-12">
          {[...marqueeItems, ...marqueeItems].map((text, idx) => (
            <span key={idx} className="mx-7 whitespace-nowrap">
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* Unified Warm Cream Header (#F7F3E9) */}
      <header className="sticky top-0 z-40 border-b border-sand-300/90 bg-sand-100/95 backdrop-blur-md">
        <div className="mx-auto flex h-[68px] max-w-[1280px] items-center justify-between gap-4 px-4 sm:h-[74px] sm:px-6 lg:px-8">
          {/* Official MiniMasjid Logo */}
          <a href="#top" className="flex shrink-0 items-center gap-2.5">
            <img
              src="/assets/logo.png"
              alt="MiniMasjid"
              className="h-12 w-auto object-contain sm:h-14"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-5 lg:flex xl:gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap text-[14px] font-semibold transition-colors ${
                  link.highlight
                    ? 'inline-flex items-center gap-1.5 rounded-full border border-aqsa-500/25 bg-aqsa-50 px-3.5 py-1.5 text-aqsa-600 hover:bg-aqsa-100'
                    : 'text-olive-800/85 hover:text-olive-900'
                }`}
              >
                {link.highlight && <Rotate3d className="h-3.5 w-3.5 text-aqsa-500" />}
                <span>{link.label}</span>
              </a>
            ))}
          </nav>

          {/* Right Controls: Multi-Currency + Interactive Bag */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative flex items-center rounded-full border border-sand-300 bg-white px-3 py-1.5 text-[12.5px] font-semibold text-olive-800">
              <Globe className="mr-1.5 h-3.5 w-3.5 text-olive-500" />
              <select
                value={currency}
                onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
                aria-label="Select currency"
                className="cursor-pointer bg-transparent pr-1 font-semibold text-olive-800 focus:outline-none"
              >
                {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={onOpenCart}
              className="inline-flex items-center gap-2 rounded-full bg-olive-500 px-4 py-2 text-[13.5px] font-semibold text-white transition-all hover:bg-olive-600"
            >
              <ShoppingBag className="h-4 w-4 text-dome-100" />
              <span className="hidden sm:inline">Bag</span>
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-dome-500 px-1.5 text-[11.5px] font-bold text-white">
                {cartCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((p) => !p)}
              aria-label="Toggle Menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sand-300 bg-white text-olive-800 lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="border-t border-sand-300 bg-sand-100 px-5 py-4 lg:hidden">
            <div className="flex flex-col space-y-1.5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3.5 py-2.5 text-[16px] font-semibold text-olive-800 hover:bg-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
