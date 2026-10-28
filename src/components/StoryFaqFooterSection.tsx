import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { STORE_FAQS } from '../data/storeData';

export const StoryFaqFooterSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number>(0);

  return (
    <>
      {/* Short, Clean 4-Question FAQ */}
      <section id="faq" className="bg-sand-100 pb-20 pt-10 sm:pb-24 sm:pt-14">
        <div className="mx-auto max-w-[820px] px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-3xl font-medium text-olive-800 sm:text-4xl">
            Questions
          </h2>

          <div className="mt-8 space-y-3">
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
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="text-[16px] font-bold text-olive-800">{item.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-olive-500 transition-transform ${
                        open ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {open && (
                    <div className="border-t border-sand-200 px-5 pb-4 pt-3 text-[15px] leading-relaxed text-olive-800/85">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Clean Minimal Olive Footer */}
      <footer className="border-t border-sand-300 bg-olive-600 py-12 text-white">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <div className="inline-block rounded-2xl bg-sand-100 px-3.5 py-1.5">
                <img src="/assets/logo.png" alt="MiniMasjid" className="h-10 w-auto" />
              </div>
              <p className="mt-3 text-[14.5px] text-white/90">
                MiniMasjid® · Aarhus, Denmark · CVR 46688236
              </p>
            </div>

            <div className="flex flex-wrap gap-x-7 gap-y-2 text-[14.5px] text-white/90">
              <a href="mailto:support@minimasjidstore.com" className="hover:text-white">
                support@minimasjidstore.com
              </a>
              <a href="mailto:salam@minimasjidstore.com" className="hover:text-white">
                B2B: salam@minimasjidstore.com
              </a>
              <span>WhatsApp: +45 60 52 48 30</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col justify-between gap-3 border-t border-white/20 pt-6 text-[12.5px] text-white/80 sm:flex-row sm:items-center">
            <p>© 2026 MiniMasjid®. Patented designs · 7.5% community giveback.</p>
            <p>Apple Pay · MobilePay · Klarna · Shop Pay · Visa · Mastercard</p>
          </div>
        </div>
      </footer>
    </>
  );
};
