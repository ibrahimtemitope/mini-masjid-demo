import React, { useState } from 'react';
import {
  BUNDLE_TIERS,
  CurrencyCode,
  EditionId,
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
  const [selectedEditionId, setSelectedEditionId] = useState<EditionId>('aqsa-xl');
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const jumpTo3D = (variant: MasjidVariant) => {
    setActive3DVariant(variant);
    const el = document.getElementById('atelier-3d');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const selectFrom3DForPurchase = (variant: MasjidVariant) => {
    setSelectedEditionId(variant === 'aqsa' ? 'aqsa-xl' : 'nabawi-xl');
    const el = document.getElementById('bundle-builder');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleAddToBag = (edition: ProductEdition, qty: 1 | 2 | 3, giftNote: string) => {
    const tier = BUNDLE_TIERS.find((b) => b.qty === qty) || BUNDLE_TIERS[0];
    setCartItems((prev) => [
      ...prev,
      {
        id: `${edition.id}-${Date.now()}`,
        edition,
        bundleQty: qty,
        discountPct: tier.discountPct,
        giftNote,
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
        {/* 1. First Screen: Clean Real-Life Home Photo First + Warm Brand Hook */}
        <HeroSanctuary3D currency={currency} onJumpTo3D={jumpTo3D} />

        {/* 2. All 3 Editions Pedestal Grid + Sibling/Madrasah Bundle Configurator */}
        <EditionsAndBundleSection
          currency={currency}
          selectedEditionId={selectedEditionId}
          onSelectEdition={setSelectedEditionId}
          onInspectIn3D={jumpTo3D}
          onAddToBag={handleAddToBag}
        />

        {/* 3. Unified Warm Studio 3D Interactive Masjid (360° Spin, Flip Underneath, Fold-From-Flat) */}
        <InteractiveMasjid3DAtelier
          activeVariant={active3DVariant}
          onVariantChange={setActive3DVariant}
          onSelectForPurchase={selectFrom3DForPurchase}
        />

        {/* 4. Parent Reviews Section (Placeholder names & reviews ready for Jacub's real ones) */}
        <ReviewsSection />

        {/* 5. Interactive 145 cm Kid-Height & 3-Step Fold-Flat Showcase */}
        <ScaleAndChildComparator />

        {/* 6. Brand Story, Real HD Video, FAQ & Signature Olive Footer */}
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
