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
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({ r1: true, r2: true });
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
    setTimeout(() => setAddedItemsNotice(null), 3500);
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
    <div className="pt-32 pb-36 max-w-7xl mx-auto px-gutter-desktop">
      {/* Live Sync Top Hero Banner (Glassmorphism & Ambient Lighting) */}
      <div className="glass-card rounded-[32px] p-6 md:p-8 mb-10 border border-[#a3f69c]/70 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#a3f69c]/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex items-center gap-4 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#165a24] to-[#2e7d32] text-white flex items-center justify-center shadow-lg glow-primary shrink-0">
            <span className="material-symbols-outlined text-3xl">sync</span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="h-2.5 w-2.5 rounded-full bg-[#0d631b] inline-block animate-ping"></span>
              <span className="text-xs md:text-sm font-extrabold uppercase tracking-wider text-[#0d631b]">
                Tamil Nadu Kitchen Engine • Live Inventory Synced
              </span>
            </div>
            <h1 className="font-headline-lg text-xl md:text-3xl font-black text-[#0f3414] tracking-tight">
              {recipes.length} Authentic Tamil Dishes Matched to Your Pantry
            </h1>
            <p className="text-xs md:text-sm text-[#40493d] mt-1 font-medium">
              Curated by Chef Hrithick using traditional Chettinad, Madurai, Kongunadu & Dindigul recipes
            </p>
          </div>
        </div>

        <button
          onClick={onNavigateToPantry}
          className="ml-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-[#ecf7ea] text-[#0d631b] text-sm md:text-base font-extrabold border border-[#a3f69c] shadow-sm transition-all flex items-center gap-2 cursor-pointer shrink-0 relative z-10"
        >
          <span className="material-symbols-outlined text-[20px]">edit_note</span>
          <span>Edit Pantry Items</span>
        </button>
      </div>

      {/* Filter & Sort Bar (Modern Glass Pills) */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 mb-10">
        {/* Match Ratio Segmented Control */}
        <div className="flex items-center glass-card p-1.5 rounded-2xl text-xs md:text-sm font-bold border border-[#dbe5d9] shadow-xs">
          <button
            onClick={() => setMatchFilter('all')}
            className={`px-5 py-2.5 rounded-xl transition-all cursor-pointer ${matchFilter === 'all'
                ? 'bg-[#2e7d32] text-white shadow-md glow-primary'
                : 'text-[#40493d] hover:text-[#151e16]'
              }`}
          >
            All Recipes ({recipes.length})
          </button>
          <button
            onClick={() => setMatchFilter('perfect')}
            className={`px-5 py-2.5 rounded-xl transition-all cursor-pointer ${matchFilter === 'perfect'
                ? 'bg-[#2e7d32] text-white shadow-md glow-primary'
                : 'text-[#40493d] hover:text-[#151e16]'
              }`}
          >
            100% Match ({recipes.filter((r) => r.isPerfectMatch).length})
          </button>
          <button
            onClick={() => setMatchFilter('missing')}
            className={`px-5 py-2.5 rounded-xl transition-all cursor-pointer ${matchFilter === 'missing'
                ? 'bg-[#2e7d32] text-white shadow-md glow-primary'
                : 'text-[#40493d] hover:text-[#151e16]'
              }`}
          >
            1-2 Missing Items ({recipes.filter((r) => !r.isPerfectMatch).length})
          </button>
        </div>

        {/* Sort Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm font-bold">
          <span className="text-[#40493d] mr-1">Sort:</span>
          {[
            { id: 'best', label: 'Best Match' },
            { id: 'fastest', label: 'Fastest (<25m)' },
            { id: 'calories', label: 'Lowest Calories' },
            { id: 'fewest', label: 'Fewest Missing' },
          ].map((sort) => (
            <button
              key={sort.id}
              onClick={() => setActiveSort(sort.id as any)}
              className={`px-4 py-2 rounded-full transition-all cursor-pointer shadow-2xs ${activeSort === sort.id
                  ? 'bg-[#0d631b] text-white shadow-sm'
                  : 'glass-card border border-[#dbe5d9] text-[#40493d] hover:border-[#0d631b] hover:text-[#0d631b]'
                }`}
            >
              {sort.label}
            </button>
          ))}
        </div>
      </div>

      {/* Floating Notice Toast */}
      {addedItemsNotice && (
        <div className="mb-6 p-4 rounded-2xl bg-[#ffdcc6] border border-[#ffb786] text-[#311300] text-sm md:text-base font-bold flex items-center justify-between shadow-md animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-2xl text-[#964900]">shopping_bag</span>
            <span>{addedItemsNotice}</span>
          </div>
          <button
            onClick={onNavigateToShopping}
            className="px-4 py-1.5 rounded-xl bg-[#964900] text-white text-xs font-bold hover:bg-[#723600] transition-all cursor-pointer"
          >
            View Cart ({shoppingCount})
          </button>
        </div>
      )}

      {/* Recipe Cards Grid (Cinematic & Large) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {filteredRecipes.map((recipe) => {
          const isFav = bookmarkedIds[recipe.id];

          return (
            <div
              key={recipe.id}
              className="glass-card glass-card-hover rounded-[32px] overflow-hidden flex flex-col justify-between group border border-[#dbe5d9]"
            >
              {/* Card Image and Overlays */}
              <div>
                <div className="relative h-64 md:h-72 w-full overflow-hidden bg-[#e6f1e4]">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/chef-hrithick.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/25"></div>

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span
                      className={`text-xs font-extrabold px-3.5 py-1.5 rounded-full shadow-md backdrop-blur-md ${recipe.isPerfectMatch
                          ? 'bg-gradient-to-r from-[#1b6d24] to-[#2e7d32] text-white'
                          : 'bg-gradient-to-r from-[#d97706] to-[#ea580c] text-white'
                        }`}
                    >
                      {recipe.matchBadgeText}
                    </span>
                    {recipe.badgeOverlayRight && (
                      <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-black/75 text-[#acf4a4] backdrop-blur-md self-start border border-white/20">
                        {recipe.badgeOverlayRight}
                      </span>
                    )}
                  </div>

                  {/* Bookmark Button */}
                  <button
                    onClick={() => toggleBookmark(recipe.id)}
                    aria-label="Save recipe"
                    className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-[#151e16] flex items-center justify-center shadow-lg transition-transform active:scale-90 cursor-pointer"
                  >
                    <span className={`material-symbols-outlined text-[24px] ${isFav ? 'text-[#ba1a1a]' : 'text-[#707a6c]'}`}>
                      {isFav ? 'favorite' : 'favorite_border'}
                    </span>
                  </button>

                  {/* Quick Bottom Meta Overlay */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white/90 text-xs font-bold">
                    <span className="flex items-center gap-1 backdrop-blur-md bg-black/40 px-2.5 py-1 rounded-lg">
                      <span className="material-symbols-outlined text-[15px]">timer</span>
                      {recipe.timeMinutes} mins
                    </span>
                    <span className="flex items-center gap-1 backdrop-blur-md bg-black/40 px-2.5 py-1 rounded-lg">
                      <span className="material-symbols-outlined text-[15px]">local_fire_department</span>
                      {recipe.calories} kcal
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="font-headline-sm text-xl md:text-2xl font-black text-[#151e16] line-clamp-2 leading-tight tracking-tight">
                    {recipe.title}
                  </h3>

                  {/* Dietary & Time Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {recipe.dietaryTags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-xl bg-[#ecf7ea] text-[#0d631b] text-xs font-extrabold border border-[#dbe5d9]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Ingredient status */}
                  <div className="mt-5 pt-4 border-t border-[#e1ebde] text-xs md:text-sm">
                    {recipe.isPerfectMatch ? (
                      <div className="flex items-start gap-2.5 text-[#0d631b]">
                        <span className="material-symbols-outlined text-[20px] shrink-0 mt-0.5">check_circle</span>
                        <div>
                          <p className="font-extrabold text-sm">{recipe.hasInPantryText}</p>
                          <p className="text-xs text-[#526353] mt-1 font-medium leading-relaxed">{recipe.pantryItemsText}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-start gap-2 text-[#964900]">
                          <span className="material-symbols-outlined text-[20px] shrink-0 mt-0.5">warning</span>
                          <span className="font-extrabold text-sm">{recipe.missingItemsText}</span>
                        </div>
                        <p className="text-xs text-[#526353] pl-6 font-medium">{recipe.hasInPantryText}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0">
                {recipe.isPerfectMatch ? (
                  <button
                    onClick={() => onSelectRecipeForCooking(recipe.id)}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#1b6d24] to-[#2e7d32] hover:from-[#14531b] hover:to-[#226326] text-white font-extrabold text-sm md:text-base flex items-center justify-center gap-2 shadow-lg glow-primary transition-all cursor-pointer active:scale-95"
                  >
                    <span>Cook with Chef Hrithick</span>
                    <span className="material-symbols-outlined text-[20px]">skillet</span>
                  </button>
                ) : (
                  <div className="flex flex-col gap-2.5">
                    <button
                      onClick={() =>
                        handleAddItems(
                          recipe.title,
                          recipe.missingItemsText
                            ? recipe.missingItemsText.replace('Missing: ', '').split(', ')
                            : ['Fresh Ingredients']
                        )
                      }
                      className="w-full py-3 rounded-2xl bg-[#ffdcc6] hover:bg-[#ffb786] text-[#311300] font-extrabold text-xs md:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-95"
                    >
                      <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                      <span>+ Add {recipe.missingItemsCount} Missing to Shopping List</span>
                    </button>

                    <button
                      onClick={() =>
                        onOpenSubstitutionModal(
                          recipe.title,
                          recipe.missingItemsText || 'Missing ingredient'
                        )
                      }
                      className="w-full py-2.5 rounded-2xl bg-white border border-[#dbe5d9] hover:bg-[#ecf7ea] text-[#0d631b] font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">published_with_changes</span>
                      <span>View Tamil Pantry Substitutions</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pantry Utilization Score Bento Card (Enlarged) */}
      <div className="glass-card rounded-[32px] p-6 md:p-10 border border-[#dbe5d9] shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          {/* Circular Donut Gauge */}
          <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
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
                strokeDasharray="92, 100"
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-headline-lg text-2xl font-black text-[#0d631b]">92%</span>
              <span className="text-[10px] text-[#40493d] font-bold uppercase">Efficiency</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#0d631b] inline-block"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0d631b]">
                Zero Waste Kitchen AI
              </span>
            </div>
            <h3 className="font-headline-lg text-xl md:text-2xl font-black text-[#151e16] mt-1">
              Top 92% Tamil Pantry Utilization Achieved
            </h3>
            <p className="text-sm md:text-base text-[#40493d] mt-1.5 font-medium max-w-xl">
              Chef Hrithick's algorithm has matched 12 recipes using existing ingredients—saving ₹1,240 on grocery bills this week!
            </p>
          </div>
        </div>

        <button
          onClick={onOpenMacroModal}
          className="px-7 py-3.5 rounded-2xl bg-white border border-[#bfcaba] hover:border-[#0d631b] hover:bg-[#ecf7ea] text-[#151e16] font-extrabold text-sm md:text-base transition-all flex items-center gap-2 shrink-0 shadow-xs cursor-pointer active:scale-95"
        >
          <span className="material-symbols-outlined text-[20px] text-[#0d631b]">tune</span>
          <span>Adjust Nutrition & Taste</span>
        </button>
      </div>
    </div>
  );
};
