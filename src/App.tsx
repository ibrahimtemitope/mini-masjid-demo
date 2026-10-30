import React, { useEffect, useState } from 'react';
import { getShopifyBridge } from './data/shopifyBridge';
import {
  BUNDLE_TIERS,
  CURRENCIES,
  CurrencyCode,
  ProductEdition,
} from './data/storeData';
import { NavbarAndMarquee } from './components/NavbarAndMarquee';
import { HeroSanctuary3D } from './components/HeroSanctuary3D';
import {
  InteractiveMasjid3DAtelier,
  MasjidVariant,
} from './components/InteractiveMasjid3DAtelier';
// import { ReviewsSection } from './components/ReviewsSection'; // Commented out until real reviews are added
import { ScaleAndChildComparator } from './components/ScaleAndChildComparator';
import { EditionsAndBundleSection } from './components/EditionsAndBundleSection';
import { StoryFaqFooterSection } from './components/StoryFaqFooterSection';
import { CartDrawer, CartItem } from './components/CartDrawer';

function getInitialCurrency(): CurrencyCode {
  const shopCurr = getShopifyBridge()?.activeCurrency?.toUpperCase();
  if (shopCurr && shopCurr in CURRENCIES) {
    return shopCurr as CurrencyCode;
  }
  return 'DKK';
}

async function syncItemsToShopifyCart(items: CartItem[]): Promise<void> {
  const bridge = getShopifyBridge();
  if (!bridge?.isShopify) return;

  try {
    await fetch(bridge.routes?.cartClear || '/cart/clear.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (items.length === 0) return;

    const qtyByVariant = new Map<number, number>();
    for (const item of items) {
      qtyByVariant.set(
        item.edition.variantId,
        (qtyByVariant.get(item.edition.variantId) || 0) + item.bundleQty
      );
    }

    await fetch(bridge.routes?.cartAdd || '/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: Array.from(qtyByVariant.entries()).map(([id, quantity]) => ({
          id,
          quantity,
        })),
      }),
    });
  } catch {
    // Non-blocking cart sync
  }
}

export const App: React.FC = () => {
  const [currency, setCurrency] = useState<CurrencyCode>(getInitialCurrency);
  const [active3DVariant, setActive3DVariant] = useState<MasjidVariant>('aqsa');
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartSyncing, setCartSyncing] = useState<boolean>(false);

  // Keep native Shopify /cart.js synchronized whenever bag items change
  useEffect(() => {
    if (!getShopifyBridge()?.isShopify) return;
    let cancelled = false;
    setCartSyncing(true);
    syncItemsToShopifyCart(cartItems).finally(() => {
      if (!cancelled) setCartSyncing(false);
    });
    return () => {
      cancelled = true;
    };
  }, [cartItems]);

  const jumpTo3D = (variant: MasjidVariant) => {
    setActive3DVariant(variant);
    const el = document.getElementById('atelier-3d');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const selectFrom3DForPurchase = () => {
    const el = document.getElementById('editions');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleAddToBag = (edition: ProductEdition, qty: 1 | 2 | 3) => {
    const tier = BUNDLE_TIERS.find((b) => b.qty === qty) || BUNDLE_TIERS[0];
    setCartItems((prev) => [
      ...prev,
      {
        id: `${edition.id}-${Date.now()}`,
        edition,
        bundleQty: qty,
        discountPct: tier.discountPct,
        giftNote: '',
      },
    ]);
    setCartOpen(true);
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalBagCount = cartItems.reduce((sum, i) => sum + i.bundleQty, 0);

  return (
    <div className="min-h-screen bg-sand-100 text-olive-800">
      <NavbarAndMarquee
        currency={currency}
        onCurrencyChange={setCurrency}
        cartCount={totalBagCount}
        onOpenCart={() => setCartOpen(true)}
      />

      <main className="bg-sand-100">
        <HeroSanctuary3D currency={currency} onJumpTo3D={jumpTo3D} />

        <EditionsAndBundleSection
          currency={currency}
          onInspectIn3D={jumpTo3D}
          onAddToBag={handleAddToBag}
        />

        <ScaleAndChildComparator />

        <InteractiveMasjid3DAtelier
          activeVariant={active3DVariant}
          onVariantChange={setActive3DVariant}
          onSelectForPurchase={selectFrom3DForPurchase}
        />

        {/* <ReviewsSection /> — Commented out until real verified customer reviews are ready */}

        <StoryFaqFooterSection />
      </main>

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveItem}
        currency={currency}
        cartSyncing={cartSyncing}
      />
    </div>
  );
};

export default App;
