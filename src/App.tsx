import React, { useState } from 'react';
import {
  BUNDLE_TIERS,
  CurrencyCode,
  ProductEdition,
} from './data/storeData';
import { NavbarAndMarquee } from './components/NavbarAndMarquee';
import { HeroSanctuary3D } from './components/HeroSanctuary3D';
import {
  InteractiveMasjid3DAtelier,
  MasjidVariant,
} from './components/InteractiveMasjid3DAtelier';
import { ReviewsSection } from './components/ReviewsSection';
import { ScaleAndChildComparator } from './components/ScaleAndChildComparator';
import { EditionsAndBundleSection } from './components/EditionsAndBundleSection';
import { StoryFaqFooterSection } from './components/StoryFaqFooterSection';
import { CartDrawer, CartItem } from './components/CartDrawer';

export const App: React.FC = () => {
  const [currency, setCurrency] = useState<CurrencyCode>('DKK');
  const [active3DVariant, setActive3DVariant] = useState<MasjidVariant>('aqsa');
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

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
        {/* 1. Giant Real-Life Home Photo First + Minimal 2-Line Hook */}
        <HeroSanctuary3D currency={currency} onJumpTo3D={jumpTo3D} />

        {/* 2. Huge Image-First Product Cards + Instant 1-Click Add to Bag */}
        <EditionsAndBundleSection
          currency={currency}
          onInspectIn3D={jumpTo3D}
          onAddToBag={handleAddToBag}
        />

        {/* 3. Big Real Living-Room Photo + Real HD Video + Simple 3-Step Strip */}
        <ScaleAndChildComparator />

        {/* 4. Clean, Clutter-Free 360° 3D View */}
        <InteractiveMasjid3DAtelier
          activeVariant={active3DVariant}
          onVariantChange={setActive3DVariant}
          onSelectForPurchase={selectFrom3DForPurchase}
        />

        {/* 5. 3 Crisp Parent Reviews */}
        <ReviewsSection />

        {/* 6. 4 Short Questions + Clean Olive Footer */}
        <StoryFaqFooterSection />
      </main>

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveItem}
        currency={currency}
      />
    </div>
  );
};

export default App;
