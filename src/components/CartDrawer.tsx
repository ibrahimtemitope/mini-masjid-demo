import React from 'react';
import { ExternalLink, Heart, ShoppingBag, Trash2, Truck, X } from 'lucide-react';
import { CurrencyCode, ProductEdition, formatPrice } from '../data/storeData';

export interface CartItem {
  id: string;
  edition: ProductEdition;
  bundleQty: 1 | 2 | 3;
  discountPct: number;
  giftNote: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  currency: CurrencyCode;
}

export const CartDrawer: React.FC<Props> = ({
  open,
  onClose,
  items,
  onRemoveItem,
  currency,
}) => {
  if (!open) return null;

  const totalDkk = items.reduce((sum, item) => {
    const raw = item.edition.priceDkk * item.bundleQty;
    return sum + Math.round(raw * (1 - item.discountPct));
  }, 0);

  const charityDkk = Math.round(totalDkk * 0.075);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm">
      <div className="flex h-full w-full max-w-md flex-col justify-between bg-sand-50 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-sand-300 bg-white px-6 py-5">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-5 w-5 text-olive-800" />
            <h3 className="font-display text-xl font-semibold text-olive-900">Your MiniMasjid Bag</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close bag"
            className="rounded-full p-2 text-olive-700 hover:bg-sand-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Free Shipping Bar */}
        <div className="bg-olive-100 px-6 py-2.5 text-center text-[13px] font-semibold text-olive-900">
          <Truck className="mr-1.5 inline h-4 w-4 text-olive-700" />
          Unlocked: <strong>Free Worldwide Shipping</strong> on your order!
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-display text-xl text-olive-800">Your bag is currently empty</p>
              <p className="mt-2 text-[14.5px] text-olive-700/80">
                Explore our Al-Aqsa XL, Masjid an-Nabawi XL, or Mini editions to begin.
              </p>
            </div>
          ) : (
            items.map((item) => {
              const raw = item.edition.priceDkk * item.bundleQty;
              const finalDkk = Math.round(raw * (1 - item.discountPct));

              return (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-2xl border border-sand-300 bg-white p-4"
                >
                  <img
                    src={item.edition.primaryImage}
                    alt={item.edition.name}
                    className="h-20 w-20 shrink-0 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-[14.5px] font-bold text-olive-900">
                        {item.bundleQty}× {item.edition.shortName}
                      </p>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        className="text-olive-600 hover:text-red-600"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="mt-1 font-display text-lg font-bold text-olive-800">
                      {formatPrice(finalDkk, currency)}
                    </p>
                    {item.giftNote && (
                      <p className="mt-1 text-[12px] italic text-olive-700">
                        Gift note: “{item.giftNote}”
                      </p>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Checkout */}
        {items.length > 0 && (
          <div className="border-t border-sand-300 bg-white p-6 space-y-4">
            <div className="flex items-center gap-2 rounded-xl bg-olive-50 px-3.5 py-2.5 text-[12.5px] text-olive-900">
              <Heart className="h-4 w-4 shrink-0 text-olive-700" />
              <span>
                Includes <strong>{formatPrice(charityDkk, currency)}</strong> (7.5%) toward community
                giveback projects.
              </span>
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-[15px] font-semibold text-olive-800">Total (Free Shipping)</span>
              <span className="font-display text-2xl font-bold text-olive-900">
                {formatPrice(totalDkk, currency)}
              </span>
            </div>

            <a
              href={`https://minimasjidstore.com/products/${items[0].edition.shopifyHandle}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-olive-800 px-6 py-4 text-[15.5px] font-bold text-sand-50 hover:bg-olive-900"
            >
              <span>Proceed to Shopify Checkout</span>
              <ExternalLink className="h-4 w-4 text-dome-300" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
