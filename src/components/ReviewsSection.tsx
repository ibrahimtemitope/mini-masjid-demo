import React from 'react';
import { Star } from 'lucide-react';
import { PLACEHOLDER_REVIEWS } from '../data/storeData';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="bg-sand-100 py-12 sm:py-20">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-end">
          <h2 className="font-display text-3xl font-medium text-olive-800 sm:text-4xl">
            Loved by Parents
          </h2>
          <div className="inline-flex items-center gap-1.5 text-[14px] font-bold text-dome-600">
            <span className="flex text-dome-500">
              {[...Array(5)].map((_, idx) => (
                <Star key={idx} className="h-4 w-4 fill-dome-500 text-dome-500" />
              ))}
            </span>
            <span>4.9 / 5</span>
          </div>
        </div>

        <div className="mt-7 grid gap-6 md:grid-cols-3">
          {PLACEHOLDER_REVIEWS.map((rev) => (
            <article
              key={rev.id}
              className="flex flex-col justify-between rounded-[1.75rem] border border-sand-300 bg-white p-6 shadow-plush"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5 text-dome-500">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className="h-4 w-4 fill-dome-500 text-dome-500" />
                    ))}
                  </div>
                  <span className="text-[12px] font-bold text-olive-600">
                    {rev.editionPurchased}
                  </span>
                </div>

                <p className="mt-4 text-[15.5px] leading-[1.6] text-olive-800">
                  “{rev.quote}”
                </p>
              </div>

              <p className="mt-5 border-t border-sand-200 pt-3.5 text-[13.5px] font-bold text-olive-800">
                {rev.parentName}{' '}
                <span className="font-normal text-olive-700/70">· {rev.location}</span>
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
