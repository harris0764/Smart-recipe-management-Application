import React, { useState } from 'react';
import { ChefHat, Search } from 'lucide-react';
import { ScreenTab } from '../types';

interface HeaderProps {
  activeTab: ScreenTab;
  onTabChange: (tab: ScreenTab) => void;
  shoppingCount: number;
  inStockCount: number;
  readyRecipeCount: number;
  onSearchClick?: () => void;
  onNavigateToShopping?: () => void;
  onNavigateToPantry?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  shoppingCount,
  inStockCount,
  readyRecipeCount,
  onSearchClick,
  onNavigateToShopping,
  onNavigateToPantry,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="fixed top-3 left-1/2 -translate-x-1/2 w-[calc(100%-1.5rem)] max-w-7xl z-50 glass-navbar rounded-[28px] transition-all duration-300">
      <div className="h-20 px-4 sm:px-6 md:px-8 flex items-center justify-between gap-4">
        {/* Brand & Desktop Navigation */}
        <div className="flex items-center gap-6 lg:gap-8 shrink-0">
          <button
            onClick={() => onTabChange('pantry')}
            className="flex items-center gap-3.5 group text-left cursor-pointer focus:outline-none"
            aria-label="Recipe Finder Home"
          >
            {/* High-visibility Brand Logo Badge */}
            <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-[#165a24] via-[#2e7d32] to-[#43a047] text-white shadow-lg shadow-emerald-950/20 ring-2 ring-[#a3f69c]/60 group-hover:scale-108 group-hover:shadow-emerald-900/40 transition-all duration-300 shrink-0">
              <ChefHat className="w-7 h-7 text-white drop-shadow-sm transition-transform group-hover:rotate-12 duration-300" />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#fc820c] rounded-full flex items-center justify-center border-2 border-white shadow-md">
                <Search className="w-2.5 h-2.5 text-white stroke-[3]" />
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-2xl sm:text-[28px] font-black text-[#0d631b] tracking-tight leading-none group-hover:text-[#1b8032] transition-colors">
                Recipe <span className="text-[#2e7d32]">Finder</span>
              </span>
              <span className="text-[11px] sm:text-[12px] text-[#40493d] font-bold tracking-widest uppercase mt-1">
                Smart Recipe Studio
              </span>
            </div>
          </button>

          {/* Center Tabs */}
          <nav className="hidden xl:flex items-center gap-1.5 bg-[#ecf7ea]/90 p-1.5 rounded-full border border-[#dbe5d9]">
            <button
              onClick={onNavigateToShopping}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer ${activeTab === 'pantry'
                  ? 'bg-[#2e7d32] text-white shadow-md glow-primary'
                  : 'text-[#40493d] hover:bg-white/80 hover:text-[#151e16]'
                }`}
            >
              Pantry & Input
            </button>

            <button
              onClick={() => onTabChange('recipes')}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${activeTab === 'recipes'
                  ? 'bg-[#2e7d32] text-white shadow-md glow-primary'
                  : 'text-[#40493d] hover:bg-white/80 hover:text-[#151e16]'
                }`}
            >
              <span>Recipe Matches</span>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-extrabold ${activeTab === 'recipes'
                    ? 'bg-[#a3f69c] text-[#002204]'
                    : 'bg-[#a3f69c] text-[#002204]'
                  }`}
              >
                {readyRecipeCount} Ready
              </span>
            </button>

            <button
              onClick={onNavigateToPantry}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${activeTab === 'cook'
                  ? 'bg-[#2e7d32] text-white shadow-md glow-primary'
                  : 'text-[#40493d] hover:bg-white/80 hover:text-[#151e16]'
                }`}
            >
              <span>Cook Mode</span>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fc820c] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#fc820c]"></span>
              </span>
            </button>

            <button
              onClick={() => onTabChange('shopping')}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${activeTab === 'shopping'
                  ? 'bg-[#2e7d32] text-white shadow-md glow-primary'
                  : 'text-[#40493d] hover:bg-white/80 hover:text-[#151e16]'
                }`}
            >
              <span>Smart Shopping</span>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-extrabold ${activeTab === 'shopping'
                    ? 'bg-[#ffdcc6] text-[#311300]'
                    : 'bg-[#ffdcc6] text-[#311300]'
                  }`}
              >
                {shoppingCount} items
              </span>
            </button>
          </nav>
        </div>

        {/* Right Action Icons & Chef Profile */}
        <div className="flex items-center gap-3 flex-center">
          <div className="hidden md:flex items-center gap-2 bg-[#ecf7ea]/90 border border-[#dbe5d9] px-4 py-2 rounded-full text-[#151e16]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#0d631b] inline-block animate-pulse"></span>
            <span className="text-sm font-extrabold">{inStockCount} Items</span>
            <span className="text-sm text-[#40493d] font-medium">In Stock</span>
          </div>

          <button
            onClick={onSearchClick}
            aria-label="Search ingredients or recipes"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#ecf7ea] text-[#40493d] hover:bg-[#e1ebde] hover:text-[#151e16] transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>

          <button
            onClick={() => alert('Recipe Finder Alerts:\n• 1 item expiring soon (Fresh Karuveppilai / Curry Leaves: 2 days)\n• 8 authentic Tamil Nadu chef recipes matched!')}
            aria-label="Notifications"
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#ecf7ea] text-[#40493d] hover:bg-[#e1ebde] hover:text-[#151e16] transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#fc820c] ring-2 ring-white"></span>
          </button>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-space-xs cursor-pointer p-space-2xs pr-space-xs rounded-full hover:bg-[#ecf7ea] transition-all"
              type="button"
            >
              <img
                alt="Chef Hrithick"
                className="w-9 h-9 rounded-full object-cover object-top ring-2 ring-[#0d631b]/30 shadow-sm"
                src="/chef-hrithick.jpg"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=120&auto=format&fit=crop&q=80';
                }}
              />
              <span className="hidden lg:inline font-label-lg text-label-lg text-[#151e16] font-bold">Chef Hrithick</span>
              <span className="material-symbols-outlined text-[18px] text-[#40493d]">expand_more</span>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-3xl shadow-2xl border border-[#e1ebde] p-4 z-50 text-left">
                <div className="flex items-center gap-3 pb-3 border-b border-[#e1ebde]">
                  <img
                    alt="Chef Hrithick"
                    className="w-12 h-12 rounded-full object-cover object-top ring-2 ring-[#0d631b]"
                    src="/chef-hrithick.jpg"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=120&auto=format&fit=crop&q=80';
                    }}
                  />
                  <div>
                    <h4 className="font-headline-sm text-[16px] font-extrabold text-[#151e16]">Chef Hrithick</h4>
                    <p className="font-body-sm text-[12px] text-[#0d631b] font-semibold">Master Tamil Chef · Pro Tier</p>
                  </div>
                </div>
                <div className="py-2 flex flex-col gap-1 text-sm text-[#40493d]">
                  <div className="flex justify-between items-center px-2 py-1.5 rounded-lg hover:bg-[#ecf7ea]">
                    <span>Dietary Shield</span>
                    <span className="text-[#0d631b] font-bold text-xs">Active</span>
                  </div>
                  <div className="flex justify-between items-center px-2 py-1.5 rounded-lg hover:bg-[#ecf7ea]">
                    <span>Pantry Utilization</span>
                    <span className="text-[#0d631b] font-bold text-xs">88%</span>
                  </div>
                  <div className="flex justify-between items-center px-2 py-1.5 rounded-lg hover:bg-[#ecf7ea]">
                    <span>Food Waste Prevented</span>
                    <span className="text-[#964900] font-bold text-xs">$14.20/wk</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden flex items-center justify-center w-10 h-10 rounded-full bg-[#ecf7ea] text-[#151e16]"
            aria-label="Toggle Navigation"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-[#e1ebde] px-4 py-3 shadow-lg">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                onTabChange('pantry');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-xl font-medium text-sm flex items-center justify-between ${activeTab === 'pantry' ? 'bg-[#2e7d32] text-white font-bold' : 'text-[#40493d] hover:bg-[#ecf7ea]'
                }`}
            >
              <span>Pantry & Input</span>
              <span className="text-xs">{inStockCount} items</span>
            </button>

            <button
              onClick={() => {
                onTabChange('recipes');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-xl font-medium text-sm flex items-center justify-between ${activeTab === 'recipes' ? 'bg-[#2e7d32] text-white font-bold' : 'text-[#40493d] hover:bg-[#ecf7ea]'
                }`}
            >
              <span>Recipe Matches</span>
              <span className="bg-[#a3f69c] text-[#002204] text-xs px-2 py-0.5 rounded-full font-bold">
                {readyRecipeCount} Ready
              </span>
            </button>

            <button
              onClick={() => {
                onTabChange('cook');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-xl font-medium text-sm flex items-center justify-between ${activeTab === 'cook' ? 'bg-[#2e7d32] text-white font-bold' : 'text-[#40493d] hover:bg-[#ecf7ea]'
                }`}
            >
              <span>Cook Mode</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fc820c] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#fc820c]"></span>
              </span>
            </button>

            <button
              onClick={() => {
                onTabChange('shopping');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-xl font-medium text-sm flex items-center justify-between ${activeTab === 'shopping' ? 'bg-[#2e7d32] text-white font-bold' : 'text-[#40493d] hover:bg-[#ecf7ea]'
                }`}
            >
              <span>Smart Shopping</span>
              <span className="bg-[#ffdcc6] text-[#311300] text-xs px-2 py-0.5 rounded-full font-bold">
                {shoppingCount} items
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
