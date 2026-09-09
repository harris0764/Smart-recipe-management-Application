import React, { useState } from 'react';
import { ScreenTab, PantryItem, ActiveChip, Recipe, ShoppingItem } from './types';
import {
  INITIAL_ACTIVE_CHIPS,
  INITIAL_PANTRY_ITEMS,
  RECIPES_DATA,
  INITIAL_SHOPPING_ITEMS,
} from './data/mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PantryInputScreen } from './components/PantryInputScreen';
import { RecipeMatchesScreen } from './components/RecipeMatchesScreen';
import { CookModeScreen } from './components/CookModeScreen';
import { SmartShoppingScreen } from './components/SmartShoppingScreen';
import { SubstitutionModal, ScanReceiptModal, MacroFilterModal } from './components/Modals';

export default function App() {
  const [activeTab, setActiveTab] = useState<ScreenTab>('pantry');
  const [pantryItems, setPantryItems] = useState<PantryItem[]>(INITIAL_PANTRY_ITEMS);
  const [activeChips, setActiveChips] = useState<ActiveChip[]>(INITIAL_ACTIVE_CHIPS);
  const [recipes, setRecipes] = useState<Recipe[]>(RECIPES_DATA);
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>(INITIAL_SHOPPING_ITEMS);

  // Modals state
  const [substitutionModal, setSubstitutionModal] = useState<{
    isOpen: boolean;
    title: string;
    substitutes: { name: string; ratio: string; flavorNote: string }[];
  }>({
    isOpen: false,
    title: '',
    substitutes: [],
  });
  const [scanModalOpen, setScanModalOpen] = useState(false);
  const [macroModalOpen, setMacroModalOpen] = useState(false);

  // Toggle basket item from Pantry screen
  const handleToggleBasket = (id: string) => {
    setPantryItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newInBasket = !item.inBasket;
          // Sync with activeChips
          if (newInBasket) {
            setActiveChips((chips) => [
              ...chips,
              {
                id: item.id,
                name: item.name,
                qty: `${item.quantity} ${item.unit}`,
                colorType: 'primary',
              },
            ]);
          } else {
            setActiveChips((chips) => chips.filter((c) => c.id !== item.id));
          }
          return { ...item, inBasket: newInBasket };
        }
        return item;
      })
    );
  };

  // Update item quantity
  const handleUpdateQty = (id: string, delta: number) => {
    setPantryItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  // Remove chip from matrix
  const handleRemoveChip = (chipId: string) => {
    setActiveChips((prev) => prev.filter((c) => c.id !== chipId));
    setPantryItems((prev) =>
      prev.map((item) => (item.id === chipId ? { ...item, inBasket: false } : item))
    );
  };

  // Add custom chip from input
  const handleAddCustomChip = (name: string) => {
    const newChip: ActiveChip = {
      id: Date.now().toString(),
      name: name,
      qty: '1 portion',
      colorType: 'primary',
    };
    setActiveChips((prev) => [newChip, ...prev]);
  };

  // Clear all active chips
  const handleClearAllChips = () => {
    setActiveChips([]);
    setPantryItems((prev) => prev.map((item) => ({ ...item, inBasket: false })));
  };

  // Add missing items to shopping list
  const handleAddMissingToShopping = (recipeTitle: string, itemNames: string[]) => {
    const newItems: ShoppingItem[] = itemNames.map((name, idx) => ({
      id: `add-${Date.now()}-${idx}`,
      name,
      aisle: 'aisle3',
      aisleName: 'Aisle 3: Spices, Condiments & Oils',
      aisleLocation: 'Center Aisle B',
      aisleEmoji: '🥫',
      forRecipe: recipeTitle,
      price: 3.25,
      checked: false,
    }));

    setShoppingItems((prev) => [...prev, ...newItems]);
  };

  // Add single item (e.g. from Cook Mode)
  const handleAddSingleShoppingItem = (name: string, price: number, recipeName: string) => {
    const newItem: ShoppingItem = {
      id: `single-${Date.now()}`,
      name,
      aisle: 'aisle1',
      aisleName: 'Aisle 1: Produce Department',
      aisleLocation: 'Front West',
      aisleEmoji: '🥦',
      forRecipe: recipeName,
      price,
      checked: false,
    };
    setShoppingItems((prev) => [newItem, ...prev]);
  };

  // Toggle shopping checkmark
  const handleToggleShoppingItem = (id: string) => {
    setShoppingItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextChecked = !item.checked;
          return {
            ...item,
            checked: nextChecked,
            checkedNote: nextChecked ? 'Picked up in cart' : undefined,
          };
        }
        return item;
      })
    );
  };

  // Delete shopping item
  const handleDeleteShoppingItem = (id: string) => {
    setShoppingItems((prev) => prev.filter((i) => i.id !== id));
  };

  // Add new shopping item
  const handleAddNewShoppingItem = (item: Partial<ShoppingItem>) => {
    const newItem: ShoppingItem = {
      id: `custom-${Date.now()}`,
      name: item.name || 'Custom Item',
      aisle: item.aisle || 'aisle1',
      aisleName: item.aisleName || 'Aisle 1: Produce Department',
      aisleLocation: item.aisleLocation || 'Front West',
      aisleEmoji: item.aisleEmoji || '🥦',
      forRecipe: item.forRecipe || 'Pantry Restock',
      price: item.price || 2.5,
      checked: false,
    };
    setShoppingItems((prev) => [newItem, ...prev]);
  };

  // Transfer checked items to permanent pantry
  const handleTransferCheckedToPantry = () => {
    const checked = shoppingItems.filter((i) => i.checked);
    if (checked.length === 0) return;

    // Add them to active chips and notify
    const newChips: ActiveChip[] = checked.map((item) => ({
      id: `pantry-transferred-${item.id}`,
      name: `🛒 ${item.name}`,
      qty: 'Restocked',
      colorType: 'container',
    }));

    setActiveChips((prev) => [...newChips, ...prev]);
    // Remove the transferred items from shopping list
    setShoppingItems((prev) => prev.filter((i) => !i.checked));

    alert(
      `✅ Success! Transferred ${checked.length} item(s) to your permanent pantry inventory.`
    );
  };

  // Handle receipt scanned
  const handleReceiptScanned = (items: string[]) => {
    const newChips: ActiveChip[] = items.map((item, idx) => ({
      id: `receipt-${Date.now()}-${idx}`,
      name: `🧾 ${item}`,
      qty: 'Scanned',
      colorType: 'primary',
    }));
    setActiveChips((prev) => [...newChips, ...prev]);
  };

  // Open Substitution Modal with realistic context
  const handleOpenSubstitutionModal = (recipeTitle: string, missingItem: string) => {
    if (missingItem.toLowerCase().includes('coconut') || missingItem.toLowerCase().includes('thengai')) {
      setSubstitutionModal({
        isOpen: true,
        title: `Pantry Substitutions for ${missingItem}`,
        substitutes: [
          {
            name: 'Desiccated Dried Coconut Flakes (Steamed)',
            ratio: '1:1 replacement',
            flavorNote: 'Soak in 2 tbsp hot water for 3 minutes to restore natural sweetness and crunch.',
          },
          {
            name: 'Ground Cashew Nut & Poppy Seed Paste',
            ratio: '1 tbsp paste',
            flavorNote: 'Provides luxurious silkiness and nutty aroma for Chettinad gravies.',
          },
          {
            name: 'Roasted Chana Dal (Pottukadalai) Powder',
            ratio: '1 tbsp powder',
            flavorNote: 'Thickens the curry with traditional South Indian roasted aroma.',
          },
        ],
      });
    } else if (missingItem.toLowerCase().includes('vathal') || missingItem.toLowerCase().includes('sundakkai')) {
      setSubstitutionModal({
        isOpen: true,
        title: `Pantry Substitutions for ${missingItem}`,
        substitutes: [
          {
            name: 'Manathakkali (Black Nightshade) Vathal',
            ratio: '1:1 replacement',
            flavorNote: 'Classic herbal vathal; offers soothing stomach-healing bitter-tangy depth.',
          },
          {
            name: 'Extra Whole Country Garlic Cloves (Deep Fried)',
            ratio: '10 extra cloves',
            flavorNote: 'Browned slowly in gingelly oil to impart deep caramelized richness to Vatha Kuzhambu.',
          },
          {
            name: 'Mithukku Vathal (Curd Chilli / Mor Milagai)',
            ratio: '2 pcs fried crisp',
            flavorNote: 'Adds salty, tangy crunch that pairs delightfully with tamarind gravy.',
          },
        ],
      });
    } else if (missingItem.toLowerCase().includes('sesame') || missingItem.toLowerCase().includes('ellu')) {
      setSubstitutionModal({
        isOpen: true,
        title: `Pantry Substitutions for ${missingItem}`,
        substitutes: [
          {
            name: 'Roasted Peanuts (Verkadalai) Ground Coarse',
            ratio: '1:1 replacement',
            flavorNote: 'Adds rich nuttiness and thickens Ennai Kathirikai gravy wonderfully.',
          },
          {
            name: 'White Melon Seeds (Magaz) or Cashews',
            ratio: '1 tbsp ground',
            flavorNote: 'Delivers a velvet royal consistency without changing spice balance.',
          },
        ],
      });
    } else {
      setSubstitutionModal({
        isOpen: true,
        title: `Pantry Substitutions for ${missingItem}`,
        substitutes: [
          {
            name: 'Kokum Extract or Country Lemon (Nattu Elumichai)',
            ratio: '1:1 replacement',
            flavorNote: 'Delivers sharp, clean South Indian acidity to balance robust roasted spices.',
          },
          {
            name: 'Crushed Country Heirloom Tomatoes (Nattu Thakkali)',
            ratio: '2 small tomatoes mashed',
            flavorNote: 'Provides natural fruity sourness and rich red body.',
          },
        ],
      });
    }
  };

  return (
    <div className="min-h-screen ambient-mesh-bg bg-main text-[#151e16] flex flex-col justify-between selection:bg-[#a3f69c] selection:text-[#002204] relative overflow-x-hidden">
      {/* Decorative ambient culinary background lighting */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-[#2e7d32]/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-subtle"></div>
      <div className="fixed top-1/3 right-10 w-[28rem] h-[28rem] bg-[#fc820c]/8 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="fixed bottom-10 left-10 w-80 h-80 bg-[#165a24]/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      {/* Persistent Navigation Header */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        shoppingCount={shoppingItems.filter((i) => !i.checked).length}
        inStockCount={activeChips.length}
        readyRecipeCount={recipes.filter((r) => r.isPerfectMatch).length}
        onSearchClick={() => setActiveTab('pantry')}
      />

      {/* Main Screen Views */}
      <main className="flex-grow">
        {activeTab === 'pantry' && (
          <PantryInputScreen
            pantryItems={pantryItems}
            activeChips={activeChips}
            onToggleBasket={handleToggleBasket}
            onUpdateQty={handleUpdateQty}
            onRemoveChip={handleRemoveChip}
            onAddCustomChip={handleAddCustomChip}
            onClearAllChips={handleClearAllChips}
            onNavigateToRecipes={() => setActiveTab('recipes')}
            onOpenScanModal={() => setScanModalOpen(true)}
          />
        )}

        {activeTab === 'recipes' && (
          <RecipeMatchesScreen
            recipes={recipes}
            onSelectRecipeForCooking={() => setActiveTab('cook')}
            onNavigateToPantry={() => setActiveTab('pantry')}
            onNavigateToShopping={() => setActiveTab('shopping')}
            onAddMissingToShopping={handleAddMissingToShopping}
            onOpenSubstitutionModal={handleOpenSubstitutionModal}
            onOpenMacroModal={() => setMacroModalOpen(true)}
            shoppingCount={shoppingItems.filter((i) => !i.checked).length}
          />
        )}

        {activeTab === 'cook' && (
          <CookModeScreen
            onBackToRecipes={() => setActiveTab('recipes')}
            onAddShoppingItem={handleAddSingleShoppingItem}
          />
        )}

        {activeTab === 'shopping' && (
          <SmartShoppingScreen
            shoppingItems={shoppingItems}
            onToggleItem={handleToggleShoppingItem}
            onDeleteItem={handleDeleteShoppingItem}
            onAddNewItem={handleAddNewShoppingItem}
            onTransferCheckedToPantry={handleTransferCheckedToPantry}
            onNavigateToCook={() => setActiveTab('cook')}
          />
        )}
      </main>

      {/* Persistent Footer */}
      <Footer />

      {/* Popups and Modals */}
      <SubstitutionModal
        isOpen={substitutionModal.isOpen}
        onClose={() => setSubstitutionModal((prev) => ({ ...prev, isOpen: false }))}
        title={substitutionModal.title}
        substitutes={substitutionModal.substitutes}
        onApply={(subName) => {
          handleAddCustomChip(`Sub: ${subName}`);
        }}
      />

      <ScanReceiptModal
        isOpen={scanModalOpen}
        onClose={() => setScanModalOpen(false)}
        onReceiptScanned={handleReceiptScanned}
      />

      <MacroFilterModal
        isOpen={macroModalOpen}
        onClose={() => setMacroModalOpen(false)}
      />
    </div>
  );
}
