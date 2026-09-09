import React, { useState } from 'react';
import { Recipe } from '../types';

interface RecipeMatchesScreenProps {
  recipes: Recipe[];
  onSelectRecipeForCooking: (recipeId: string) => void;
  onNavigateToPantry: () => void;
  onNavigateToShopping: () => void;
  onAddMissingToShopping: (recipeTitle: string, itemNames: string[]) => void;
  onOpenSubstitutionModal: (recipeTitle: string, missingItem: string) => void;
  onOpenMacroModal: () => void;
  shoppingCount: number;
}

export const RecipeMatchesScreen: React.FC<RecipeMatchesScreenProps> = ({
  recipes,
  onSelectRecipeForCooking,
  onNavigateToPantry,
  onNavigateToShopping,
  onAddMissingToShopping,
  onOpenSubstitutionModal,
  onOpenMacroModal,
  shoppingCount,
}) => {
  const [activeSort, setActiveSort] = useState<'best' | 'fastest' | 'calories' | 'fewest'>('best');
  const [matchFilter, setMatchFilter] = useState<'all' | 'perfect' | 'missing'>('all');
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({ r1: true });
  const [addedItemsNotice, setAddedItemsNotice] = useState<string | null>(null);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleAddItems = (recipeTitle: string, items: string[]) => {
    onAddMissingToShopping(recipeTitle, items);
    setAddedItemsNotice(`Added ${items.join(', ')} to Smart Shopping List`);
    setTimeout(() => setAddedItemsNotice(null), 3000);
  };

  const filteredRecipes = recipes.filter((r) => {
    if (matchFilter === 'perfect') return r.isPerfectMatch;
    if (matchFilter === 'missing') return !r.isPerfectMatch;
    return true;
  }).sort((a, b) => {
    if (activeSort === 'fastest') return a.timeMinutes - b.timeMinutes;
    if (activeSort === 'calories') return a.calories - b.calories;
    if (activeSort === 'fewest') return a.missingItemsCount - b.missingItemsCount;
    return b.matchPercentage - a.matchPercentage;
  });

  return (
    <div className="pt-24 pb-32 max-w-7xl mx-auto px-gutter-desktop">
      {/* Live Sync Top Banner */}
      <div className="bg-[#ecf7ea] border border-[#a3f69c] rounded-3xl p-4 md:p-5 mb-space-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#0d631b] text-white flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-2xl">sync</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#0d631b] inline-block animate-ping"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0d631b]">
                Pantry Scan Activated • Live Synced
              </span>
            </div>
            <h1 className="font-headline-md text-lg md:text-xl font-bold text-[#151e16] mt-0.5">
              14 Chef-Tested Recipes Matched to Your 12 On-Hand Items
            </h1>
          </div>
        </div>

        <button
          onClick={onNavigateToPantry}
          className="px-4 py-2 rounded-xl bg-white hover:bg-[#dbe5d9] text-[#0d631b] font-label-md text-xs md:text-sm font-bold border border-[#bfcaba] transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <span className="material-symbols-outlined text-[16px]">edit_note</span>
          <span>Edit Pantry (12 Items)</span>
        </button>
      </div>

      {/* Filter & Sort Bar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-space-lg">
        {/* Match Ratio Segmented Control */}
        <div className="flex items-center bg-[#e6f1e4] p-1 rounded-2xl text-xs md:text-sm font-semibold">
          <button
            onClick={() => setMatchFilter('all')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              matchFilter === 'all' ? 'bg-white text-[#151e16] shadow-xs' : 'text-[#40493d]'
            }`}
          >
            All Ready (14)
          </button>
          <button
            onClick={() => setMatchFilter('perfect')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              matchFilter === 'perfect' ? 'bg-[#2e7d32] text-white shadow-xs' : 'text-[#40493d]'
            }`}
          >
            100% Match Only (8)
          </button>
          <button
            onClick={() => setMatchFilter('missing')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              matchFilter === 'missing' ? 'bg-white text-[#151e16] shadow-xs' : 'text-[#40493d]'
            }`}
          >
            1-2 Missing Items (6)
          </button>
        </div>

        {/* Sort Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span className="text-[#40493d] mr-1">Sort By:</span>
          {[
            { id: 'best', label: 'Best Match' },
            { id: 'fastest', label: 'Fastest (<20m)' },
            { id: 'calories', label: 'Lowest Calories' },
            { id: 'fewest', label: 'Fewest Missing' },
          ].map((sort) => (
            <button
              key={sort.id}
              onClick={() => setActiveSort(sort.id as any)}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                activeSort === sort.id
                  ? 'bg-[#0d631b] text-white'
                  : 'bg-white border border-[#e1ebde] text-[#40493d] hover:border-[#0d631b]'
              }`}
            >
              {sort.label}
            </button>
          ))}
        </div>
      </div>

      {/* Floating Notice Toast */}
      {addedItemsNotice && (
        <div className="mb-4 p-3 rounded-2xl bg-[#ffdcc6] border border-[#ffb786] text-[#311300] font-label-md text-xs md:text-sm flex items-center justify-between animate-fadeIn">
          <span className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#964900]">shopping_bag</span>
            {addedItemsNotice}
          </span>
          <button
            onClick={onNavigateToShopping}
            className="font-bold underline text-[#964900] hover:text-[#5e2c00]"
          >
            Open Shopping List
          </button>
        </div>
      )}

      {/* Recipe Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-space-2xl">
        {filteredRecipes.map((recipe) => {
          const isFav = bookmarkedIds[recipe.id];

          return (
            <div
              key={recipe.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#e1ebde] hover:border-[#0d631b]/60 transition-all hover:shadow-lg flex flex-col justify-between group"
            >
              {/* Card Image and Overlays */}
              <div>
                <div className="relative h-52 w-full overflow-hidden bg-[#e6f1e4]">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full shadow-sm backdrop-blur-md ${
                        recipe.isPerfectMatch
                          ? 'bg-[#2e7d32] text-white'
                          : 'bg-[#fc820c] text-white'
                      }`}
                    >
                      {recipe.matchBadgeText}
                    </span>
                    {recipe.badgeOverlayRight && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#151e16]/80 text-white backdrop-blur-sm self-start">
                        {recipe.badgeOverlayRight}
                      </span>
                    )}
                  </div>

                  {/* Bookmark Button */}
                  <button
                    onClick={() => toggleBookmark(recipe.id)}
                    aria-label="Save recipe"
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#151e16] flex items-center justify-center shadow-md transition-transform active:scale-90 cursor-pointer"
                  >
                    <span className={`material-symbols-outlined text-[20px] ${isFav ? 'text-[#ba1a1a]' : 'text-[#707a6c]'}`}>
                      {isFav ? 'favorite' : 'favorite_border'}
                    </span>
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <h3 className="font-headline-sm text-lg font-bold text-[#151e16] line-clamp-2 leading-snug">
                    {recipe.title}
                  </h3>

                  {/* Dietary & Time Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {recipe.dietaryTags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-[#f2fcef] text-[#0d631b] font-label-sm text-[11px] font-semibold border border-[#dbe5d9]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Ingredient status */}
                  <div className="mt-4 pt-3 border-t border-[#e1ebde] text-xs">
                    {recipe.isPerfectMatch ? (
                      <div className="flex items-start gap-1.5 text-[#0d631b]">
                        <span className="material-symbols-outlined text-[16px] shrink-0 mt-0.5">check_circle</span>
                        <div>
                          <p className="font-bold">{recipe.hasInPantryText}</p>
                          <p className="text-[11px] text-[#40493d] mt-0.5">{recipe.pantryItemsText}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        <div className="flex items-start gap-1.5 text-[#964900]">
                          <span className="material-symbols-outlined text-[16px] shrink-0 mt-0.5">warning</span>
                          <span className="font-bold">{recipe.missingItemsText}</span>
                        </div>
                        <p className="text-[11px] text-[#40493d] pl-5">{recipe.hasInPantryText}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0">
                {recipe.isPerfectMatch ? (
                  <button
                    onClick={() => onSelectRecipeForCooking(recipe.id)}
                    className="w-full py-3 rounded-2xl bg-[#2e7d32] hover:bg-[#0d631b] text-white font-label-lg font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <span>Start Cooking Now</span>
                    <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                  </button>
                ) : (
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() =>
                        handleAddItems(
                          recipe.title,
                          recipe.id === 'r3'
                            ? ['Tahini (Sesame Paste)']
                            : recipe.id === 'r4'
                            ? ['Organic Heavy Cream', 'Fresh Oregano']
                            : ['Red Wine Vinegar', 'Flat-Leaf Parsley']
                        )
                      }
                      className="w-full py-2.5 rounded-2xl bg-[#ffdcc6] hover:bg-[#ffb786] text-[#311300] font-label-md font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                      <span>
                        + Add {recipe.missingItemsCount} Missing to Shopping List
                      </span>
                    </button>

                    <button
                      onClick={() =>
                        onOpenSubstitutionModal(
                          recipe.title,
                          recipe.id === 'r3'
                            ? 'Tahini'
                            : recipe.id === 'r4'
                            ? 'Heavy Cream'
                            : 'Red Wine Vinegar'
                        )
                      }
                      className="w-full py-2 rounded-2xl bg-[#ecf7ea] hover:bg-[#dbe5d9] text-[#0d631b] font-label-md font-semibold text-xs flex items-center justify-center gap-1 transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[15px]">published_with_changes</span>
                      <span>View Pantry Substitution Guide</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pantry Utilization Score Bento Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#e1ebde] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          {/* Circular Donut Gauge */}
          <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-[#e6f1e4]"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-[#0d631b]"
                strokeDasharray="88, 100"
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="font-headline-md text-xl font-bold text-[#0d631b]">88%</span>
              <span className="text-[9px] text-[#40493d] uppercase font-bold">Efficiency</span>
            </div>
          </div>

          <div>
            <h3 className="font-headline-sm text-lg font-bold text-[#151e16]">
              Pantry Utilization Score
            </h3>
            <p className="font-body-md text-sm text-[#40493d] max-w-xl mt-1">
              Selecting one of these 14 meals saves an estimated <strong>$14.20</strong> and consumes 4 ingredients that would expire within 48 hours.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenMacroModal}
          className="px-5 py-3 rounded-2xl bg-[#ecf7ea] hover:bg-[#dbe5d9] text-[#151e16] font-label-md font-bold text-sm flex items-center gap-2 border border-[#bfcaba] transition-all cursor-pointer shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">tune</span>
          <span>Adjust Macro Filters</span>
        </button>
      </div>

      {/* Sticky Bottom Shopping Dock if items in list */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 w-11/12 max-w-4xl">
        <div className="bg-[#151e16] text-white rounded-3xl p-4 md:p-5 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#ffdcc6] text-[#311300] flex items-center justify-center font-bold">
              <span className="material-symbols-outlined">local_mall</span>
            </div>
            <div>
              <h4 className="font-headline-sm text-sm md:text-base font-bold text-white">
                {shoppingCount} items on your Smart Shopping List
              </h4>
              <p className="text-xs text-[#dbe5d9]">
                Organized by organic grocer aisle layout with instant substitution notes
              </p>
            </div>
          </div>

          <button
            onClick={onNavigateToShopping}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#2e7d32] hover:bg-[#0d631b] text-white font-label-lg font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
          >
            <span>View Shopping List</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
