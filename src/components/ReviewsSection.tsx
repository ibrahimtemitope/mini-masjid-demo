import React from 'react';
import { CheckCircle2, MapPin, Star } from 'lucide-react';
import { PLACEHOLDER_REVIEWS } from '../data/storeData';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="bg-sand-100 py-16 sm:py-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Section Header + Standout Rating Summary Pill */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-dome-400/45 bg-dome-50 px-4 py-1.5 text-[12.5px] font-bold text-dome-600">
            <span className="flex items-center gap-0.5 text-dome-500">
              {[...Array(5)].map((_, idx) => (
                <Star key={idx} className="h-3.5 w-3.5 fill-dome-500 text-dome-500" />
              ))}
            </span>
            <span>Rated 4.9 / 5 by Muslim Parents</span>
          </div>

          <h2 className="mt-4 font-display text-3xl font-medium text-olive-800 sm:text-5xl">
            Loved in Living Rooms Across Europe
          </h2>
          <p className="mt-3.5 text-[16.5px] leading-relaxed text-olive-800/80">
            Real feedback from parents who replaced screen time with joyful salah, bedtime stories,
            and Ramadan memories inside MiniMasjid®.
          </p>
        </div>

        {/* 6 Clean White Review Cards on Unified Cream Canvas */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PLACEHOLDER_REVIEWS.map((rev, index) => {
            const pillStyles =
              index % 3 === 0
                ? 'bg-aqsa-50 text-aqsa-600 border-aqsa-500/20'
                : index % 3 === 1
                  ? 'bg-olive-50 text-olive-700 border-olive-500/20'
                  : 'bg-clay-50 text-clay-600 border-clay-500/20';

            return (
              <article
                key={rev.id}
                className="flex flex-col justify-between rounded-[1.75rem] border border-sand-300 bg-white p-6 shadow-plush"
              >
                <div>
                  {/* Stars + Edition Tag */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-0.5 text-dome-500">
                      {[...Array(rev.rating)].map((_, s) => (
                        <Star key={s} className="h-4 w-4 fill-dome-500 text-dome-500" />
                      ))}
                    </div>

                    <span
                      className={`rounded-full border px-3 py-0.5 text-[11.5px] font-bold ${pillStyles}`}
                    >
                      {rev.editionPurchased}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-[1.15rem] font-semibold leading-snug text-olive-800">
                    “{rev.headline}”
                  </h3>

                  <p className="mt-2.5 text-[14.5px] leading-relaxed text-olive-800/80">
                    {rev.quote}
                  </p>
                </div>

                {/* Reviewer Footer */}
                <div className="mt-6 flex items-center justify-between border-t border-sand-200 pt-4">
                  <div>
                    <p className="text-[14px] font-bold text-olive-800">{rev.parentName}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-[12px] text-olive-700/75">
                      <MapPin className="h-3 w-3 text-olive-500" />
                      <span>{rev.location}</span>
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-1 rounded-full bg-olive-50 px-2.5 py-1 text-[11.5px] font-semibold text-olive-700">
                    <CheckCircle2 className="h-3.5 w-3.5 text-olive-500" />
                    <span>{rev.dateLabel}</span>
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
