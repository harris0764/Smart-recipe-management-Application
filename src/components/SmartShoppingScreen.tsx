import React, { useState } from 'react';
import { ShoppingItem } from '../types';

interface SmartShoppingScreenProps {
  shoppingItems: ShoppingItem[];
  onToggleItem: (id: string) => void;
  onDeleteItem: (id: string) => void;
  onAddNewItem: (item: Partial<ShoppingItem>) => void;
  onTransferCheckedToPantry: () => void;
  onNavigateToCook: () => void;
}

export const SmartShoppingScreen: React.FC<SmartShoppingScreenProps> = ({
  shoppingItems,
  onToggleItem,
  onDeleteItem,
  onAddNewItem,
  onTransferCheckedToPantry,
  onNavigateToCook,
}) => {
  const [newItemName, setNewItemName] = useState('');
  const [newItemAisle, setNewItemAisle] = useState('aisle1');
  const [activeAisleHighlight, setActiveAisleHighlight] = useState<string>('aisle1');

  const uncheckedItems = shoppingItems.filter((i) => !i.checked);
  const checkedItems = shoppingItems.filter((i) => i.checked);
  const totalBudget = shoppingItems.reduce((acc, curr) => acc + curr.price, 0);

  const handleCreateItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    let aisleName = 'Aisle 1: Produce Department';
    let aisleLocation = 'Front West';
    let aisleEmoji = '🥦';

    if (newItemAisle === 'aisle2') {
      aisleName = 'Aisle 2: Dairy & Refrigerated';
      aisleLocation = 'North Perimeter';
      aisleEmoji = '🧀';
    } else if (newItemAisle === 'aisle3') {
      aisleName = 'Aisle 3: Spices, Condiments & Oils';
      aisleLocation = 'Center Aisle B';
      aisleEmoji = '🥫';
    } else if (newItemAisle === 'aisle4') {
      aisleName = 'Aisle 4: Dry Goods & Grains';
      aisleLocation = 'Center Aisle D';
      aisleEmoji = '🌾';
    }

    onAddNewItem({
      name: newItemName.trim(),
      aisle: newItemAisle,
      aisleName,
      aisleLocation,
      aisleEmoji,
      forRecipe: 'Custom Added',
      price: 2.5,
      checked: false,
    });

    setNewItemName('');
  };

  const aisles = [
    {
      id: 'aisle1',
      title: 'Aisle 1: Produce Department',
      location: 'Front West',
      emoji: '🥦',
      items: shoppingItems.filter((i) => i.aisle === 'aisle1'),
    },
    {
      id: 'aisle2',
      title: 'Aisle 2: Dairy & Refrigerated',
      location: 'North Perimeter',
      emoji: '🧀',
      items: shoppingItems.filter((i) => i.aisle === 'aisle2'),
    },
    {
      id: 'aisle3',
      title: 'Aisle 3: Spices, Condiments & Oils',
      location: 'Center Aisle B',
      emoji: '🥫',
      items: shoppingItems.filter((i) => i.aisle === 'aisle3'),
    },
    {
      id: 'aisle4',
      title: 'Aisle 4: Dry Goods & Grains',
      location: 'Center Aisle D',
      emoji: '🌾',
      items: shoppingItems.filter((i) => i.aisle === 'aisle4'),
    },
  ];

  return (
    <div className="pt-24 pb-32 max-w-7xl mx-auto px-gutter-desktop">
      {/* Top Banner & Heading */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-space-lg">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ecf7ea] text-[#0d631b] font-label-md text-xs font-bold mb-2 border border-[#a3f69c]">
            <span className="material-symbols-outlined text-[16px]">navigation</span>
            Optimized Route • Organic Grocer Layout v4.2
          </div>
          <h1 className="font-headline-lg text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#151e16] tracking-tight">
            Smart Shopping List
          </h1>
          <p className="font-body-md text-sm text-[#40493d] mt-1">
            Ingredients auto-sorted by supermarket layout to prevent backtracking and preserve cold chain.
          </p>
        </div>

        {/* Global Shopping Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              const text = shoppingItems
                .map((i) => `${i.checked ? '✓' : '☐'} ${i.name} ($${i.price.toFixed(2)}) - ${i.aisleName}`)
                .join('\n');
              if (navigator.clipboard) {
                navigator.clipboard.writeText(text);
                alert('Shopping list copied to clipboard! Ready to paste into Instacart or Notes.');
              }
            }}
            className="px-4 py-2.5 rounded-2xl bg-[#2e7d32] hover:bg-[#0d631b] text-white font-label-md font-bold text-xs md:text-sm flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">shopping_cart_checkout</span>
            <span>Export to Instacart</span>
          </button>

          <button
            onClick={() => window.print()}
            className="p-2.5 rounded-2xl bg-white border border-[#e1ebde] hover:bg-[#ecf7ea] text-[#40493d] transition-all cursor-pointer"
            title="Print Shopping List"
          >
            <span className="material-symbols-outlined text-[20px]">print</span>
          </button>

          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                alert('Shared link copied to clipboard!');
              }
            }}
            className="p-2.5 rounded-2xl bg-white border border-[#e1ebde] hover:bg-[#ecf7ea] text-[#40493d] transition-all cursor-pointer"
            title="Share with Partner"
          >
            <span className="material-symbols-outlined text-[20px]">share</span>
          </button>
        </div>
      </div>

      {/* Bento Metric Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-space-lg">
        {/* Remaining Items */}
        <div className="bg-white rounded-3xl p-4 md:p-5 border border-[#e1ebde] shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-[#40493d] uppercase tracking-wider mb-1">
            <span className="material-symbols-outlined text-[#0d631b] text-[18px]">checklist</span>
            Items Needed
          </div>
          <div className="font-headline-md text-2xl font-bold text-[#151e16]">
            {uncheckedItems.length} Remaining
          </div>
          <span className="text-[11px] text-[#0d631b] font-semibold">
            {checkedItems.length} already in cart
          </span>
        </div>

        {/* Est Budget */}
        <div className="bg-white rounded-3xl p-4 md:p-5 border border-[#e1ebde] shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-[#40493d] uppercase tracking-wider mb-1">
            <span className="material-symbols-outlined text-[#964900] text-[18px]">payments</span>
            Estimated Total
          </div>
          <div className="font-headline-md text-2xl font-bold text-[#151e16]">
            ${totalBudget.toFixed(2)}
          </div>
          <span className="text-[11px] text-[#707a6c]">Average organic store pricing</span>
        </div>

        {/* Linked Recipes */}
        <div className="bg-white rounded-3xl p-4 md:p-5 border border-[#e1ebde] shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-[#40493d] uppercase tracking-wider mb-1">
            <span className="material-symbols-outlined text-[#0d631b] text-[18px]">restaurant_menu</span>
            Linked Recipes
          </div>
          <div className="font-headline-md text-2xl font-bold text-[#0d631b]">
            2 Meals
          </div>
          <span className="text-[11px] text-[#40493d]">Lemon Chicken & Tuscan Skillet</span>
        </div>

        {/* Path Gauge */}
        <div className="bg-white rounded-3xl p-4 md:p-5 border border-[#e1ebde] shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-[#40493d] uppercase tracking-wider mb-1">
            <span className="material-symbols-outlined text-[#0d631b] text-[18px]">route</span>
            Store Walk Progress
          </div>
          <div className="font-headline-md text-2xl font-bold text-[#151e16]">
            {Math.round((checkedItems.length / Math.max(1, shoppingItems.length)) * 100)}%
          </div>
          <span className="text-[11px] text-[#0d631b] font-semibold">Aisle 1 of 4 currently active</span>
        </div>
      </div>

      {/* Quick Add Custom Item Form */}
      <div className="bg-white rounded-3xl p-3 md:p-4 border border-[#e1ebde] shadow-sm mb-space-lg">
        <form onSubmit={handleCreateItem} className="flex flex-col sm:flex-row items-center gap-2">
          <div className="flex items-center pl-2 text-[#40493d] w-full sm:w-auto">
            <span className="material-symbols-outlined text-xl">add_task</span>
          </div>
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="Add custom item (e.g. Sourdough bread, Oat milk, Sea salt...)"
            className="w-full py-2 px-2 bg-transparent text-[#151e16] placeholder-[#707a6c] font-body-md focus:outline-none text-sm"
          />

          <select
            value={newItemAisle}
            onChange={(e) => setNewItemAisle(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#ecf7ea] text-xs font-bold text-[#0d631b] border border-[#a3f69c] focus:outline-none cursor-pointer w-full sm:w-auto shrink-0"
          >
            <option value="aisle1">🥦 Aisle 1 (Produce)</option>
            <option value="aisle2">🧀 Aisle 2 (Dairy/Cold)</option>
            <option value="aisle3">🥫 Aisle 3 (Spices/Oils)</option>
            <option value="aisle4">🌾 Aisle 4 (Grains/Dry)</option>
          </select>

          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-2.5 bg-[#2e7d32] hover:bg-[#0d631b] text-white rounded-2xl font-label-md font-bold text-xs flex items-center justify-center gap-1 shadow-sm transition-all shrink-0 cursor-pointer"
          >
            <span>Add to Aisle</span>
            <span className="material-symbols-outlined text-[16px]">add</span>
          </button>
        </form>
      </div>

      {/* Instant Sync Banner if items are checked */}
      {checkedItems.length > 0 && (
        <div className="bg-[#ecf7ea] border border-[#0d631b]/30 rounded-3xl p-4 mb-space-lg flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-2xl text-[#0d631b]">inventory</span>
            <div>
              <h4 className="font-headline-sm text-sm font-bold text-[#151e16]">
                Smart Inventory Auto-Sync
              </h4>
              <p className="text-xs text-[#40493d]">
                Transfer {checkedItems.length} purchased item(s) directly to your Permanent Pantry database.
              </p>
            </div>
          </div>

          <button
            onClick={onTransferCheckedToPantry}
            className="px-4 py-2 rounded-xl bg-[#0d631b] hover:bg-[#2e7d32] text-white font-label-md font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-[16px]">move_to_inbox</span>
            <span>Transfer to Pantry</span>
          </button>
        </div>
      )}

      {/* Main Grid: Aisles (Left 2 cols) + Interactive Floor Map & Freshness Tips (Right 1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Grouped Aisles */}
        <div className="lg:col-span-2 space-y-6">
          {aisles.map((aisle) => (
            <div
              key={aisle.id}
              onClick={() => setActiveAisleHighlight(aisle.id)}
              className={`bg-white rounded-3xl p-5 md:p-6 border transition-all ${
                activeAisleHighlight === aisle.id
                  ? 'border-[#0d631b] ring-1 ring-[#0d631b]/40 shadow-md'
                  : 'border-[#e1ebde]'
              }`}
            >
              {/* Aisle Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#e1ebde]">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">{aisle.emoji}</span>
                  <div>
                    <h3 className="font-headline-sm text-base font-bold text-[#151e16]">
                      {aisle.title}
                    </h3>
                    <span className="text-xs text-[#707a6c]">{aisle.location}</span>
                  </div>
                </div>

                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#ecf7ea] text-[#0d631b]">
                  {aisle.items.filter((i) => !i.checked).length} items remaining
                </span>
              </div>

              {/* Items in Aisle */}
              <div className="mt-4 space-y-3">
                {aisle.items.length === 0 ? (
                  <p className="text-xs text-[#707a6c] py-2 italic">
                    No items currently in this department.
                  </p>
                ) : (
                  aisle.items.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        item.checked
                          ? 'bg-[#f2fcef]/60 border-[#dbe5d9] opacity-75'
                          : 'bg-[#ffffff] border-[#e1ebde] hover:border-[#0d631b]'
                      }`}
                    >
                      <div className="flex items-start sm:items-center gap-3">
                        {/* Custom Styled Checkbox */}
                        <button
                          onClick={() => onToggleItem(item.id)}
                          aria-label={`Mark ${item.name}`}
                          className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all shrink-0 mt-0.5 sm:mt-0 cursor-pointer ${
                            item.checked
                              ? 'bg-[#0d631b] text-white'
                              : 'border-2 border-[#707a6c] hover:border-[#0d631b]'
                          }`}
                        >
                          {item.checked && (
                            <span className="material-symbols-outlined text-[16px]">check</span>
                          )}
                        </button>

                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-sm font-bold ${
                                item.checked ? 'line-through text-[#707a6c]' : 'text-[#151e16]'
                              }`}
                            >
                              {item.name}
                            </span>
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[#ecf7ea] text-[#0d631b]">
                              ${item.price.toFixed(2)}
                            </span>
                          </div>

                          {item.substituteHint && !item.checked && (
                            <p className="text-[11px] text-[#964900] mt-1 flex items-center gap-1">
                              <span className="material-symbols-outlined text-[13px]">swap_horiz</span>
                              {item.substituteHint}
                            </p>
                          )}

                          {item.checkedNote && (
                            <p className="text-[11px] text-[#0d631b] mt-0.5">
                              {item.checkedNote}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <span className="text-[11px] text-[#707a6c] bg-[#ecf7ea] px-2 py-0.5 rounded-full">
                          For: {item.forRecipe}
                        </span>
                        <button
                          onClick={() => onDeleteItem(item.id)}
                          aria-label="Delete item"
                          className="text-[#707a6c] hover:text-[#ba1a1a] p-1 transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Interactive Store Floor Plan & Freshness Advice */}
        <div className="space-y-6">
          {/* Interactive Supermarket Floor Map SVG */}
          <div className="bg-white rounded-3xl p-6 border border-[#e1ebde] shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#e1ebde] mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0d631b] text-xl">map</span>
                <h3 className="font-headline-sm text-base font-bold text-[#151e16]">
                  Store Route Map
                </h3>
              </div>
              <span className="text-[11px] font-bold text-[#0d631b] bg-[#ecf7ea] px-2 py-0.5 rounded-full">
                Single Pass Route
              </span>
            </div>

            {/* SVG Store Map */}
            <div className="relative w-full h-56 rounded-2xl bg-[#f2fcef] border border-[#dbe5d9] p-3 flex items-center justify-center overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 320 200">
                {/* Store perimeter */}
                <rect x="10" y="10" width="300" height="180" rx="14" fill="#ffffff" stroke="#bfcaba" strokeWidth="2" />

                {/* Entrance */}
                <rect x="20" y="165" width="50" height="20" rx="4" fill="#ecf7ea" stroke="#0d631b" strokeWidth="1.5" />
                <text x="45" y="179" fontSize="9" fontWeight="bold" fill="#0d631b" textAnchor="middle">ENTRANCE</text>

                {/* Checkout */}
                <rect x="190" y="165" width="60" height="20" rx="4" fill="#ffdcc6" stroke="#964900" strokeWidth="1.5" />
                <text x="220" y="179" fontSize="9" fontWeight="bold" fill="#964900" textAnchor="middle">CHECKOUT</text>

                {/* Aisle 1 (Produce West) */}
                <rect
                  x="25"
                  y="30"
                  width="50"
                  height="115"
                  rx="6"
                  fill={activeAisleHighlight === 'aisle1' ? '#a3f69c' : '#e6f1e4'}
                  stroke="#0d631b"
                  strokeWidth={activeAisleHighlight === 'aisle1' ? '2' : '1'}
                  className="cursor-pointer transition-all"
                  onClick={() => setActiveAisleHighlight('aisle1')}
                />
                <text x="50" y="85" fontSize="10" fontWeight="bold" fill="#002204" textAnchor="middle">Aisle 1</text>
                <text x="50" y="100" fontSize="8" fill="#40493d" textAnchor="middle">Produce</text>

                {/* Aisle 2 (Dairy North Perimeter) */}
                <rect
                  x="90"
                  y="25"
                  width="145"
                  height="35"
                  rx="6"
                  fill={activeAisleHighlight === 'aisle2' ? '#a3f69c' : '#e6f1e4'}
                  stroke="#0d631b"
                  strokeWidth={activeAisleHighlight === 'aisle2' ? '2' : '1'}
                  className="cursor-pointer transition-all"
                  onClick={() => setActiveAisleHighlight('aisle2')}
                />
                <text x="162" y="47" fontSize="10" fontWeight="bold" fill="#002204" textAnchor="middle">Aisle 2: Dairy & Cold</text>

                {/* Aisle 3 (Center B) */}
                <rect
                  x="95"
                  y="75"
                  width="60"
                  height="70"
                  rx="6"
                  fill={activeAisleHighlight === 'aisle3' ? '#a3f69c' : '#e6f1e4'}
                  stroke="#0d631b"
                  strokeWidth={activeAisleHighlight === 'aisle3' ? '2' : '1'}
                  className="cursor-pointer transition-all"
                  onClick={() => setActiveAisleHighlight('aisle3')}
                />
                <text x="125" y="110" fontSize="9" fontWeight="bold" fill="#002204" textAnchor="middle">Aisle 3</text>
                <text x="125" y="122" fontSize="7" fill="#40493d" textAnchor="middle">Oils/Spices</text>

                {/* Aisle 4 (Center D) */}
                <rect
                  x="175"
                  y="75"
                  width="60"
                  height="70"
                  rx="6"
                  fill={activeAisleHighlight === 'aisle4' ? '#a3f69c' : '#e6f1e4'}
                  stroke="#0d631b"
                  strokeWidth={activeAisleHighlight === 'aisle4' ? '2' : '1'}
                  className="cursor-pointer transition-all"
                  onClick={() => setActiveAisleHighlight('aisle4')}
                />
                <text x="205" y="110" fontSize="9" fontWeight="bold" fill="#002204" textAnchor="middle">Aisle 4</text>
                <text x="205" y="122" fontSize="7" fill="#40493d" textAnchor="middle">Dry Goods</text>

                {/* Walking Route Dashed Polyline */}
                <path
                  d="M 45 165 L 45 140 L 85 80 L 120 45 L 165 45 L 165 75 L 125 100 L 205 100 L 220 165"
                  fill="none"
                  stroke="#fc820c"
                  strokeWidth="2.5"
                  strokeDasharray="4,4"
                />

                {/* User Current Location Pulse Dot */}
                <circle cx="50" cy="140" r="5" fill="#0d631b" className="animate-ping opacity-75" />
                <circle cx="50" cy="140" r="4" fill="#0d631b" stroke="#ffffff" strokeWidth="1.5" />
              </svg>
            </div>

            <p className="text-xs text-[#40493d] mt-3 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#0d631b]">check_circle</span>
              <span>This optimal route prevents 12 minutes of backtracking!</span>
            </p>
          </div>

          {/* Unlocked Recipes Card */}
          <div className="bg-[#ecf7ea] rounded-3xl p-6 border border-[#a3f69c]">
            <div className="flex items-center gap-2 mb-2 text-[#0d631b] font-bold text-xs uppercase tracking-wider">
              <span className="material-symbols-outlined text-[18px]">lock_open</span>
              Unlocked After Shopping
            </div>
            <h4 className="font-headline-sm text-base font-bold text-[#151e16]">
              2 Additional 100% Ready Meals
            </h4>
            <p className="text-xs text-[#40493d] mt-1">
              Once you check off these 5 items, you'll be able to cook:
            </p>

            <div className="mt-3 space-y-2">
              <div className="p-2.5 rounded-xl bg-white border border-[#dbe5d9] flex items-center justify-between">
                <span className="text-xs font-bold text-[#151e16]">
                  🍋 Lemon Herb Chicken & Potatoes
                </span>
                <button
                  onClick={onNavigateToCook}
                  className="text-xs text-[#0d631b] font-bold underline hover:text-[#2e7d32]"
                >
                  Cook Mode
                </button>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-[#dbe5d9] flex items-center justify-between">
                <span className="text-xs font-bold text-[#151e16]">
                  🍅 Tuscan White Bean Skillet
                </span>
                <span className="text-[11px] text-[#707a6c]">18 mins</span>
              </div>
            </div>
          </div>

          {/* Chef's Freshness Tip */}
          <div className="bg-white rounded-3xl p-6 border border-[#e1ebde]">
            <div className="flex items-center gap-2 mb-2 text-[#964900] font-bold text-xs">
              <span className="material-symbols-outlined text-[18px]">tips_and_updates</span>
              Chef Maya's Freshness Tip
            </div>
            <h4 className="font-headline-sm text-sm font-bold text-[#151e16]">
              Selecting Meyer Lemons
            </h4>
            <p className="text-xs text-[#40493d] mt-1 leading-relaxed">
              Look for Meyer lemons with smooth, thin, fragrant rinds and deep golden hues. They yield 40% more sweet-tart juice than standard thick-rind Eureka lemons.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
