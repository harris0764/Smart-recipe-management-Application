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
      onAddCustomChip('🍋 Nattu Elumichai (Country Lemon)');
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
    <div className="pt-32 pb-36 max-w-7xl mx-auto px-gutter-desktop">
      {/* Top Banner & Inspiring Title */}
      <div className="max-w-4xl mb-10">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#ecf7ea] text-[#0d631b] text-xs md:text-sm font-extrabold mb-4 border border-[#a3f69c] shadow-xs">
          <span className="material-symbols-outlined text-[18px]">restaurant_menu</span>
          Chef Hrithick's Smart Tamil Culinary Engine
        </div>
        <h1 className="font-display-hero text-[#0e3b14] tracking-tight">
          What's in your kitchen today?
        </h1>
        <p className="font-body-lg text-lg md:text-xl text-[#3d503f] mt-3 leading-relaxed max-w-3xl">
          Select on-hand ingredients below or scan a grocery receipt to instantly match authentic Tamil Nadu recipes requiring zero extra trips to the store.
        </p>
      </div>

      {/* Smart Search Bar (Enlarged & Modern) */}
      <div className="glass-card rounded-[32px] p-4 md:p-6 shadow-xl mb-10 border border-[#dbe5d9]">
        <form onSubmit={handleAddFromInput} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex items-center flex-1 bg-[#f4faf2]/80 rounded-2xl px-4 py-3 border border-[#dbe5d9] focus-within:border-[#0d631b] focus-within:ring-2 focus-within:ring-[#0d631b]/20 transition-all">
            <span className="material-symbols-outlined text-2xl text-[#2e7d32] mr-3">search</span>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Type ingredient (e.g. Chinna Vengayam, Karuveppilai, Kozhi, Dosa batter...)"
              className="w-full bg-transparent text-[#151e16] placeholder-[#6e7e6d] text-base md:text-lg font-medium focus:outline-none"
            />
            <button
              type="button"
              onClick={handleVoiceSearch}
              aria-label="Voice input"
              className={`p-2 rounded-xl transition-all ${isListening
                  ? 'bg-[#ba1a1a] text-white animate-pulse'
                  : 'text-[#40493d] hover:bg-white hover:text-[#0d631b]'
                }`}
              title="Voice Add"
            >
              <span className="material-symbols-outlined text-2xl">mic</span>
            </button>
          </div>

          <button
            type="submit"
            className="px-8 py-4 bg-gradient-to-r from-[#1b6d24] to-[#2e7d32] hover:from-[#14531b] hover:to-[#226326] text-white rounded-2xl text-base font-extrabold flex items-center justify-center gap-2 shadow-lg glow-primary transition-all shrink-0 cursor-pointer active:scale-95"
          >
            <span>Add to Pan</span>
            <span className="material-symbols-outlined text-[20px]">add</span>
          </button>
        </form>

        {/* Quick Tools & Shortcuts */}
        <div className="mt-4 pt-4 border-t border-[#e1ebde] flex flex-wrap items-center justify-between gap-3 text-xs md:text-sm text-[#40493d]">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-bold text-[#151e16]">Quick Shortcuts:</span>
            <button
              onClick={() => {
                onAddCustomChip('🧅 Chinna Vengayam');
                onAddCustomChip('🌿 Karuveppilai');
                onAddCustomChip('🧄 Nattu Poondu');
                onAddCustomChip('🍗 Tender Chicken');
                onAddCustomChip('🥞 Dosa Batter');
              }}
              className="px-3.5 py-1.5 rounded-full bg-[#ecf7ea] hover:bg-[#dbe5d9] text-[#0d631b] font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px]">inventory_2</span>
              Load All Kitchen Staples
            </button>
            <button
              onClick={onOpenScanModal}
              className="px-3.5 py-1.5 rounded-full bg-[#fff4eb] hover:bg-[#ffe6d4] text-[#964900] font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs border border-[#ffcca8]"
            >
              <span className="material-symbols-outlined text-[16px]">document_scanner</span>
              Scan Grocery Receipt
            </button>
          </div>
          <div className="text-[#657764] font-medium hidden md:block">
            Press <kbd className="px-2 py-0.5 rounded-lg bg-white border border-[#dbe5d9] font-mono text-xs shadow-2xs">Enter</kbd> to add
          </div>
        </div>
      </div>

      {/* Active Selected Chips Matrix (Enlarged) */}
      <div className="glass-card rounded-[32px] p-6 md:p-8 mb-10 border border-[#dbe5d9]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <span className="h-3 w-3 rounded-full bg-[#0d631b] inline-block animate-pulse"></span>
            <h2 className="font-headline-md text-lg md:text-xl font-extrabold text-[#151e16]">
              Active Pan Ingredients ({activeChips.length} Selected)
            </h2>
          </div>
          {activeChips.length > 0 && (
            <button
              onClick={onClearAllChips}
              className="text-xs md:text-sm text-[#ba1a1a] hover:underline font-bold flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">delete_sweep</span>
              Clear All
            </button>
          )}
        </div>

        {activeChips.length === 0 ? (
          <div className="py-8 text-center bg-[#f4faf2]/60 rounded-2xl border border-dashed border-[#bfcaba]">
            <span className="material-symbols-outlined text-4xl text-[#707a6c] mb-2 block">soup_kitchen</span>
            <p className="text-base text-[#526353] font-medium">
              Your cooking pan is empty. Tap any ingredient card below or use the search bar above to start matching!
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2.5">
            {activeChips.map((chip) => {
              let chipBg = 'bg-white border-[#dbe5d9] text-[#151e16]';
              if (chip.colorType === 'primary') {
                chipBg = 'bg-[#ffffff] border-[#81c784] text-[#0d631b] shadow-xs';
              } else if (chip.colorType === 'secondary') {
                chipBg = 'bg-[#ffffff] border-[#ffb786] text-[#964900] shadow-xs';
              }

              return (
                <span
                  key={chip.id}
                  className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl border shadow-xs text-sm md:text-base font-bold ${chipBg} hover:shadow-md transition-all group`}
                >
                  <span>{chip.name}</span>
                  {chip.qty && (
                    <span className="text-xs font-extrabold px-2 py-0.5 rounded-xl bg-[#ecf7ea] text-[#0d631b]">
                      {chip.qty}
                    </span>
                  )}
                  <button
                    onClick={() => onRemoveChip(chip.id)}
                    aria-label={`Remove ${chip.name}`}
                    className="text-[#707a6c] hover:text-[#ba1a1a] transition-colors flex items-center cursor-pointer ml-1"
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Cooking Customization Bento Parameters (Sleek Glass Tiles) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {/* Prep Time */}
        <div className="glass-card rounded-2xl p-5 border border-[#dbe5d9] hover:border-[#2e7d32]/50 transition-all">
          <div className="flex items-center gap-2 text-xs font-extrabold text-[#0d631b] uppercase tracking-wider mb-3">
            <span className="material-symbols-outlined text-[18px]">schedule</span>
            Max Cooking Time
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { id: '15m', label: '<15m' },
              { id: '30m', label: '<30m' },
              { id: '45m', label: '<45m' },
              { id: 'any', label: 'Any' },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setPrepTime(opt.id)}
                className={`px-3 py-1.5 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${prepTime === opt.id
                    ? 'bg-[#2e7d32] text-white shadow-xs'
                    : 'bg-[#ecf7ea] text-[#40493d] hover:bg-[#dbe5d9]'
                  }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dietary Goal */}
        <div className="glass-card rounded-2xl p-5 border border-[#dbe5d9] hover:border-[#2e7d32]/50 transition-all">
          <div className="flex items-center gap-2 text-xs font-extrabold text-[#0d631b] uppercase tracking-wider mb-3">
            <span className="material-symbols-outlined text-[18px]">spa</span>
            Dietary Style
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'zero-waste', label: 'Zero Waste' },
              { id: 'pure-veg', label: 'Pure Veg' },
              { id: 'high-protein', label: 'High Protein' },
              { id: 'chettinad', label: 'Chettinad Spicy' },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setDietaryGoal(opt.id)}
                className={`px-3 py-1.5 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${dietaryGoal === opt.id
                    ? 'bg-[#2e7d32] text-white shadow-xs'
                    : 'bg-[#ecf7ea] text-[#40493d] hover:bg-[#dbe5d9]'
                  }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Meal Occasion */}
        <div className="glass-card rounded-2xl p-5 border border-[#dbe5d9] hover:border-[#2e7d32]/50 transition-all">
          <div className="flex items-center gap-2 text-xs font-extrabold text-[#0d631b] uppercase tracking-wider mb-3">
            <span className="material-symbols-outlined text-[18px]">local_dining</span>
            Tamil Meal Type
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'breakfast', label: 'Tiffin' },
              { id: 'lunch', label: 'Full Meals' },
              { id: 'dinner', label: 'Dinner Feast' },
              { id: 'snack', label: 'Evening Snack' },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setMealType(opt.id)}
                className={`px-3 py-1.5 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${mealType === opt.id
                    ? 'bg-[#2e7d32] text-white shadow-xs'
                    : 'bg-[#ecf7ea] text-[#40493d] hover:bg-[#dbe5d9]'
                  }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skill Level */}
        <div className="glass-card rounded-2xl p-5 border border-[#dbe5d9] hover:border-[#2e7d32]/50 transition-all">
          <div className="flex items-center gap-2 text-xs font-extrabold text-[#0d631b] uppercase tracking-wider mb-3">
            <span className="material-symbols-outlined text-[18px]">military_tech</span>
            Chef Level
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'any', label: 'Any' },
              { id: 'beginner', label: 'Easy Home Cook' },
              { id: 'intermediate', label: 'Restaurant Style' },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSkillLevel(opt.id)}
                className={`px-3 py-1.5 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${skillLevel === opt.id
                    ? 'bg-[#2e7d32] text-white shadow-xs'
                    : 'bg-[#ecf7ea] text-[#40493d] hover:bg-[#dbe5d9]'
                  }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category Tabs & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-headline-lg text-2xl md:text-3xl font-extrabold text-[#151e16]">
            Your Pantry Inventory
          </h2>
          <p className="text-sm text-[#40493d] mt-1 font-medium">
            Showing {filteredPantry.length} fresh ingredients and staples ready for cooking
          </p>
        </div>

        <button
          onClick={onNavigateToRecipes}
          className="px-6 py-3 rounded-2xl bg-[#0d631b] hover:bg-[#084211] text-white font-bold text-sm md:text-base flex items-center gap-2 shadow-lg glow-primary transition-all cursor-pointer self-start sm:self-auto"
        >
          <span>View Matched Recipes</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {[
          { id: 'all', label: 'All Items', icon: 'apps' },
          { id: 'produce', label: 'Fresh Sandhai (Produce)', icon: 'nutrition' },
          { id: 'protein', label: 'Poultry & Meats', icon: 'set_meal' },
          { id: 'dairy', label: 'Dairy & Ghee', icon: 'egg' },
          { id: 'staples', label: 'Anjarai Petti Spices & Oils', icon: 'oil_barrel' },
          { id: 'grains', label: 'Traditional Grains & Batters', icon: 'grain' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs md:text-sm font-bold whitespace-nowrap transition-all cursor-pointer shadow-xs ${selectedCategory === cat.id
                ? 'bg-[#0d631b] text-white shadow-md glow-primary'
                : 'glass-card text-[#40493d] hover:border-[#0d631b] hover:text-[#0d631b]'
              }`}
          >
            <span className="material-symbols-outlined text-[18px]">{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Pantry Grid Cards (Big, Modern, Cinematic) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filteredPantry.map((item) => (
          <div
            key={item.id}
            className={`glass-card glass-card-hover rounded-[32px] p-5 flex flex-col justify-between transition-all ${item.inBasket ? 'border-[#0d631b] ring-2 ring-[#0d631b]/30 shadow-md' : 'border-[#dbe5d9]'
              }`}
          >
            <div>
              <div className="relative h-52 w-full rounded-2xl overflow-hidden bg-[#e6f1e4] mb-4 group/img">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-108"
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500&auto=format&fit=crop&q=80';
                  }}
                />
                <span
                  className={`absolute top-3 left-3 text-xs font-extrabold px-3 py-1 rounded-full backdrop-blur-md shadow-sm ${item.expiringSoon
                      ? 'bg-[#fc820c] text-white'
                      : 'bg-white/95 text-[#0d631b]'
                    }`}
                >
                  {item.location}
                </span>

                {item.inBasket && (
                  <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#0d631b] text-white flex items-center justify-center shadow-lg ring-2 ring-white">
                    <span className="material-symbols-outlined text-[20px]">check</span>
                  </span>
                )}
              </div>

              <h3 className="font-headline-sm text-xl font-extrabold text-[#151e16] tracking-tight">
                {item.name}
              </h3>
              <p className="text-sm text-[#40493d] mt-1 font-medium leading-snug">
                {item.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#e1ebde] flex items-center justify-between gap-3">
              {/* Stepper with Tactile Size */}
              <div className="flex items-center gap-2 bg-[#ecf7ea] border border-[#dbe5d9] rounded-2xl px-3 py-1.5">
                <button
                  onClick={() => onUpdateQty(item.id, -1)}
                  aria-label={`Decrease ${item.name} quantity`}
                  className="w-8 h-8 rounded-xl bg-white text-[#151e16] flex items-center justify-center font-bold text-base shadow-xs hover:bg-[#dbe5d9] transition-all cursor-pointer"
                >
                  -
                </button>
                <span className="text-sm font-extrabold text-[#151e16] min-w-[3.5rem] text-center">
                  {item.quantity} {item.unit}
                </span>
                <button
                  onClick={() => onUpdateQty(item.id, 1)}
                  aria-label={`Increase ${item.name} quantity`}
                  className="w-8 h-8 rounded-xl bg-white text-[#151e16] flex items-center justify-center font-bold text-base shadow-xs hover:bg-[#dbe5d9] transition-all cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Basket Toggle Button */}
              <button
                onClick={() => onToggleBasket(item.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ${item.inBasket
                    ? 'bg-[#0d631b] text-white shadow-sm'
                    : 'bg-white border border-[#bfcaba] text-[#40493d] hover:bg-[#ecf7ea] hover:text-[#0d631b]'
                  }`}
              >
                <span className="material-symbols-outlined text-[16px]">
                  {item.inBasket ? 'check' : 'add'}
                </span>
                <span>{item.inBasket ? 'In Pan' : 'Add'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
