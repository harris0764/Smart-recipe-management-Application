import React, { useState } from 'react';
import { PantryItem, ActiveChip, ScreenTab } from '../types';

interface PantryInputScreenProps {
  pantryItems: PantryItem[];
  activeChips: ActiveChip[];
  onToggleBasket: (id: string) => void;
  onUpdateQty: (id: string, delta: number) => void;
  onRemoveChip: (id: string) => void;
  onAddCustomChip: (name: string) => void;
  onClearAllChips: () => void;
  onNavigateToRecipes: () => void;
  onOpenScanModal: () => void;
}

export const PantryInputScreen: React.FC<PantryInputScreenProps> = ({
  pantryItems,
  activeChips,
  onToggleBasket,
  onUpdateQty,
  onRemoveChip,
  onAddCustomChip,
  onClearAllChips,
  onNavigateToRecipes,
  onOpenScanModal,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [prepTime, setPrepTime] = useState<string>('30m');
  const [dietaryGoal, setDietaryGoal] = useState<string>('zero-waste');
  const [mealType, setMealType] = useState<string>('dinner');
  const [skillLevel, setSkillLevel] = useState<string>('any');
  const [isListening, setIsListening] = useState(false);

  const handleAddFromInput = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onAddCustomChip(searchInput.trim());
      setSearchInput('');
    }
  };

  const handleVoiceSearch = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      onAddCustomChip('🍋 Meyer Lemon');
    }, 1500);
  };

  const filteredPantry = pantryItems.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      item.category === selectedCategory ||
      (selectedCategory === 'staples' && item.category === 'staples');
    const matchesSearch = item.name.toLowerCase().includes(searchInput.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-24 pb-32 max-w-7xl mx-auto px-gutter-desktop">
      {/* Top Banner & Title */}
      <div className="max-w-3xl mb-space-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ecf7ea] text-[#0d631b] font-label-md text-xs font-bold mb-3 border border-[#a3f69c]/50">
          <span className="material-symbols-outlined text-[16px]">eco</span>
          Zero-Waste Culinary Engine
        </div>
        <h1 className="font-display-lg-mobile md:font-display-lg text-[#151e16] tracking-tight">
          What's in your pantry today?
        </h1>
        <p className="font-body-lg text-[#40493d] mt-2">
          Select on-hand ingredients below or scan a receipt to discover chef-tested recipes requiring zero extra grocery trips.
        </p>
      </div>

      {/* Smart Search Bar */}
      <div className="bg-white rounded-3xl p-3 md:p-4 shadow-sm border border-[#e1ebde] mb-space-lg">
        <form onSubmit={handleAddFromInput} className="flex items-center gap-2">
          <div className="flex items-center pl-3 text-[#40493d]">
            <span className="material-symbols-outlined text-2xl">search</span>
          </div>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Type ingredient (e.g. Avocado, Garlic, Chicken, Jasmine rice...)"
            className="w-full py-2.5 px-2 bg-transparent text-[#151e16] placeholder-[#707a6c] font-body-md focus:outline-none"
          />

          <button
            type="button"
            onClick={handleVoiceSearch}
            aria-label="Voice input"
            className={`p-2.5 rounded-full transition-colors ${
              isListening
                ? 'bg-[#ba1a1a] text-white animate-pulse'
                : 'text-[#40493d] hover:bg-[#ecf7ea] hover:text-[#0d631b]'
            }`}
            title="Voice Add"
          >
            <span className="material-symbols-outlined text-xl">mic</span>
          </button>

          <button
            type="submit"
            className="px-5 py-2.5 bg-[#2e7d32] hover:bg-[#0d631b] text-white rounded-2xl font-label-lg text-sm font-bold flex items-center gap-1.5 shadow-sm transition-all shrink-0 cursor-pointer"
          >
            <span>Add</span>
            <span className="material-symbols-outlined text-[18px]">add</span>
          </button>
        </form>

        {/* Quick Utility Shortcuts */}
        <div className="mt-3 pt-3 border-t border-[#e1ebde]/70 flex flex-wrap items-center justify-between gap-2 text-xs text-[#40493d]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-[#151e16]">Quick Tools:</span>
            <button
              onClick={() => {
                onAddCustomChip('🥑 Hass Avocados');
                onAddCustomChip('🧄 Garlic Cloves');
                onAddCustomChip('🍋 Meyer Lemon');
                onAddCustomChip('🍗 Chicken Breast');
              }}
              className="px-3 py-1 rounded-full bg-[#ecf7ea] hover:bg-[#dbe5d9] text-[#0d631b] font-medium transition-all flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">inventory_2</span>
              Load Full Pantry Profile (18 Items)
            </button>
            <button
              onClick={onOpenScanModal}
              className="px-3 py-1 rounded-full bg-[#ecf7ea] hover:bg-[#dbe5d9] text-[#964900] font-medium transition-all flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">document_scanner</span>
              Scan Grocery Receipt
            </button>
          </div>
          <div className="text-[#707a6c]">
            Press <kbd className="px-1.5 py-0.5 rounded bg-[#f2fcef] border border-[#dbe5d9] font-mono">Enter</kbd> to quick-add
          </div>
        </div>
      </div>

      {/* Active Selected Chips Matrix */}
      <div className="bg-[#e6f1e4]/60 rounded-3xl p-space-md md:p-space-lg mb-space-xl border border-[#dbe5d9]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#0d631b] inline-block animate-pulse"></span>
            <h2 className="font-headline-sm text-base md:text-lg font-bold text-[#151e16]">
              Active Pan Ingredients ({activeChips.length} Selected)
            </h2>
          </div>
          {activeChips.length > 0 && (
            <button
              onClick={onClearAllChips}
              className="text-xs text-[#ba1a1a] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">delete_sweep</span>
              Clear All
            </button>
          )}
        </div>

        {activeChips.length === 0 ? (
          <p className="text-sm text-[#707a6c] py-4 text-center">
            No ingredients currently selected. Tap any pantry item below or type in the search bar above to add to your pan.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {activeChips.map((chip) => {
              let chipBg = 'bg-white border-[#dbe5d9] text-[#151e16]';
              if (chip.colorType === 'primary') {
                chipBg = 'bg-[#ffffff] border-[#a3f69c] text-[#002204]';
              } else if (chip.colorType === 'secondary') {
                chipBg = 'bg-[#ffffff] border-[#ffdcc6] text-[#311300]';
              }

              return (
                <span
                  key={chip.id}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border shadow-xs text-sm font-medium ${chipBg} hover:shadow-sm transition-all group`}
                >
                  <span>{chip.name}</span>
                  {chip.qty && (
                    <span className="text-xs font-semibold px-1.5 py-0.5 rounded-full bg-[#ecf7ea] text-[#0d631b]">
                      {chip.qty}
                    </span>
                  )}
                  <button
                    onClick={() => onRemoveChip(chip.id)}
                    aria-label={`Remove ${chip.name}`}
                    className="text-[#707a6c] hover:text-[#ba1a1a] transition-colors flex items-center cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Cooking Customization Parameters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 mb-space-xl">
        {/* Prep Time */}
        <div className="bg-white rounded-2xl p-4 border border-[#e1ebde]">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#40493d] uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-[16px] text-[#0d631b]">schedule</span>
            Max Prep Time
          </div>
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: '15m', label: '<15m' },
              { id: '30m', label: '<30m' },
              { id: '45m', label: '<45m' },
              { id: 'any', label: 'Any' },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setPrepTime(opt.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  prepTime === opt.id
                    ? 'bg-[#2e7d32] text-white'
                    : 'bg-[#ecf7ea] text-[#40493d] hover:bg-[#dbe5d9]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dietary Goal */}
        <div className="bg-white rounded-2xl p-4 border border-[#e1ebde]">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#40493d] uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-[16px] text-[#0d631b]">spa</span>
            Dietary Goal
          </div>
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'zero-waste', label: 'Zero Waste' },
              { id: 'high-protein', label: 'High Protein' },
              { id: 'keto', label: 'Keto' },
              { id: 'vegan', label: 'Vegan' },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setDietaryGoal(opt.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  dietaryGoal === opt.id
                    ? 'bg-[#2e7d32] text-white'
                    : 'bg-[#ecf7ea] text-[#40493d] hover:bg-[#dbe5d9]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Meal Type */}
        <div className="bg-white rounded-2xl p-4 border border-[#e1ebde]">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#40493d] uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-[16px] text-[#0d631b]">dinner_dining</span>
            Meal Type
          </div>
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'dinner', label: 'Dinner' },
              { id: 'lunch', label: 'Lunch' },
              { id: 'breakfast', label: 'Breakfast' },
              { id: 'snack', label: 'Snack' },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setMealType(opt.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  mealType === opt.id
                    ? 'bg-[#2e7d32] text-white'
                    : 'bg-[#ecf7ea] text-[#40493d] hover:bg-[#dbe5d9]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skill Level */}
        <div className="bg-white rounded-2xl p-4 border border-[#e1ebde]">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#40493d] uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-[16px] text-[#0d631b]">skillet</span>
            Skill Level
          </div>
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'any', label: 'Any' },
              { id: 'beginner', label: 'Easy' },
              { id: 'intermediate', label: 'Intermediate' },
              { id: 'pro', label: 'Chef' },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSkillLevel(opt.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  skillLevel === opt.id
                    ? 'bg-[#2e7d32] text-white'
                    : 'bg-[#ecf7ea] text-[#40493d] hover:bg-[#dbe5d9]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-headline-sm text-xl font-bold text-[#151e16]">
          Your Pantry Inventory
        </h2>
        <span className="text-xs text-[#40493d] font-semibold">
          Showing {filteredPantry.length} items
        </span>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        {[
          { id: 'all', label: 'All Items', icon: 'apps' },
          { id: 'produce', label: 'Produce', icon: 'nutrition' },
          { id: 'protein', label: 'Protein', icon: 'set_meal' },
          { id: 'dairy', label: 'Dairy & Eggs', icon: 'egg' },
          { id: 'staples', label: 'Staples & Oils', icon: 'oil_barrel' },
          { id: 'grains', label: 'Grains & Pasta', icon: 'grain' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-[#0d631b] text-white shadow-sm'
                : 'bg-white border border-[#e1ebde] text-[#40493d] hover:border-[#0d631b]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Pantry Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredPantry.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-3xl p-4 border transition-all hover:shadow-md flex flex-col justify-between ${
              item.inBasket ? 'border-[#0d631b] ring-1 ring-[#0d631b]' : 'border-[#e1ebde]'
            }`}
          >
            <div>
              <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-[#f2fcef] mb-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
                <span
                  className={`absolute top-2.5 left-2.5 text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md shadow-xs ${
                    item.expiringSoon
                      ? 'bg-[#fc820c] text-white'
                      : 'bg-white/90 text-[#0d631b]'
                  }`}
                >
                  {item.location}
                </span>

                {item.inBasket && (
                  <span className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-[#0d631b] text-white flex items-center justify-center shadow-md">
                    <span className="material-symbols-outlined text-[18px]">check</span>
                  </span>
                )}
              </div>

              <h3 className="font-headline-sm text-[17px] font-bold text-[#151e16] tracking-tight">
                {item.name}
              </h3>
              <p className="text-xs text-[#40493d] mt-0.5">{item.description}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#e1ebde]/70 flex items-center justify-between gap-2">
              {/* Stepper */}
              <div className="flex items-center gap-1.5 bg-[#ecf7ea] rounded-xl px-2 py-1">
                <button
                  onClick={() => onUpdateQty(item.id, -1)}
                  aria-label={`Decrease ${item.name} quantity`}
                  className="w-6 h-6 rounded-lg bg-white text-[#151e16] flex items-center justify-center font-bold text-sm shadow-xs hover:bg-[#dbe5d9] cursor-pointer"
                >
                  -
                </button>
                <span className="text-xs font-bold text-[#151e16] min-w-[3rem] text-center">
                  {item.quantity} {item.unit}
                </span>
                <button
                  onClick={() => onUpdateQty(item.id, 1)}
                  aria-label={`Increase ${item.name} quantity`}
                  className="w-6 h-6 rounded-lg bg-white text-[#151e16] flex items-center justify-center font-bold text-sm shadow-xs hover:bg-[#dbe5d9] cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Basket Toggle Button */}
              <button
                onClick={() => onToggleBasket(item.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  item.inBasket
                    ? 'bg-[#ecf7ea] text-[#0d631b] hover:bg-[#dbe5d9]'
                    : 'bg-[#2e7d32] text-white hover:bg-[#0d631b]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">
                  {item.inBasket ? 'done' : 'add'}
                </span>
                <span>{item.inBasket ? 'In Pan' : 'Add to Pan'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Sticky Bottom Action Dock */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 w-11/12 max-w-4xl">
        <div className="bg-[#151e16] text-white rounded-3xl p-4 md:p-5 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#a3f69c] text-[#002204] flex items-center justify-center font-bold">
              <span className="material-symbols-outlined">restaurant</span>
            </div>
            <div>
              <h4 className="font-headline-sm text-sm md:text-base font-bold text-white">
                14 Delicious Recipes Matched!
              </h4>
              <p className="text-xs text-[#dbe5d9]">
                Zero trips needed · 8 recipes ready with 100% on-hand ingredients
              </p>
            </div>
          </div>

          <button
            onClick={onNavigateToRecipes}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#2e7d32] hover:bg-[#0d631b] text-white font-label-lg font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
          >
            <span>View 14 Matched Recipes</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
