import React, { useState } from 'react';
import { ScreenTab } from '../types';

interface HeaderProps {
  activeTab: ScreenTab;
  onTabChange: (tab: ScreenTab) => void;
  shoppingCount: number;
  inStockCount: number;
  readyRecipeCount: number;
  onSearchClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  shoppingCount,
  inStockCount,
  readyRecipeCount,
  onSearchClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#ffffff]/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#e1ebde]/60">
      <div className="h-20 max-w-7xl mx-auto px-gutter-desktop flex items-center justify-between gap-space-md">
        {/* Brand & Desktop Navigation */}
        <div className="flex items-center gap-space-lg shrink-0">
          <button
            onClick={() => onTabChange('pantry')}
            className="flex items-center gap-space-sm group text-left cursor-pointer focus:outline-none"
          >
            <img
              alt="PantryCraft Logo"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida/AEtjO1WdsHmnBJQNOjvoAJOrJ4ZCXzzrSWahOV-pokw8WANZlH76A363Fsfxeu2vjPquInAvF_gGQpCfNj0jevoi3RQG2QaywdjPQdDxZueWaCCx3261n6jW73J9yoqL_X_AhZ1LhoRNfCVlkS7EYMTG5X-5Kh3sIkMT1eOzzElq9vnfIbHe01xysUgyuaiHQKZueATw0T41neqd09YyV4m7lHsJR5hdZNkpGU8H-wW3u6gUyONwchQwdBwAUA"
            />
            <div className="flex flex-col">
              <span className="font-headline-sm text-[19px] font-bold text-[#0d631b] tracking-tight">PantryCraft</span>
              <span className="font-label-sm text-[11px] text-[#40493d] font-normal tracking-wide">Smart Recipe Studio</span>
            </div>
          </button>

          {/* Center Tabs */}
          <nav className="hidden xl:flex items-center gap-space-xs bg-[#ecf7ea] px-space-xs py-space-2xs rounded-full">
            <button
              onClick={() => onTabChange('pantry')}
              className={`px-space-md py-space-xs rounded-full font-label-md text-label-md transition-all cursor-pointer ${
                activeTab === 'pantry'
                  ? 'bg-[#2e7d32] text-white font-bold shadow-sm'
                  : 'text-[#40493d] hover:bg-[#e1ebde] hover:text-[#151e16]'
              }`}
            >
              Pantry & Input
            </button>

            <button
              onClick={() => onTabChange('recipes')}
              className={`px-space-md py-space-xs rounded-full font-label-md text-label-md transition-all flex items-center gap-space-xs cursor-pointer ${
                activeTab === 'recipes'
                  ? 'bg-[#2e7d32] text-white font-bold shadow-sm'
                  : 'text-[#40493d] hover:bg-[#e1ebde] hover:text-[#151e16]'
              }`}
            >
              <span>Recipe Matches</span>
              <span
                className={`font-label-sm text-[11px] px-2 py-0.5 rounded-full ${
                  activeTab === 'recipes'
                    ? 'bg-[#a3f69c] text-[#002204] font-bold'
                    : 'bg-[#a3f69c] text-[#002204]'
                }`}
              >
                {readyRecipeCount} Ready
              </span>
            </button>

            <button
              onClick={() => onTabChange('cook')}
              className={`px-space-md py-space-xs rounded-full font-label-md text-label-md transition-all flex items-center gap-space-xs cursor-pointer ${
                activeTab === 'cook'
                  ? 'bg-[#2e7d32] text-white font-bold shadow-sm'
                  : 'text-[#40493d] hover:bg-[#e1ebde] hover:text-[#151e16]'
              }`}
            >
              <span>Cook Mode</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#964900] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#fc820c]"></span>
              </span>
            </button>

            <button
              onClick={() => onTabChange('shopping')}
              className={`px-space-md py-space-xs rounded-full font-label-md text-label-md transition-all flex items-center gap-space-xs cursor-pointer ${
                activeTab === 'shopping'
                  ? 'bg-[#2e7d32] text-white font-bold shadow-sm'
                  : 'text-[#40493d] hover:bg-[#e1ebde] hover:text-[#151e16]'
              }`}
            >
              <span>Smart Shopping</span>
              <span
                className={`font-label-sm text-[11px] px-2 py-0.5 rounded-full ${
                  activeTab === 'shopping'
                    ? 'bg-[#ffdcc6] text-[#311300] font-bold'
                    : 'bg-[#ffdcc6] text-[#311300]'
                }`}
              >
                {shoppingCount} items
              </span>
            </button>
          </nav>
        </div>

        {/* Right Action Icons & Chef Profile */}
        <div className="flex items-center gap-space-sm">
          <div className="hidden md:flex items-center gap-space-xs bg-[#ecf7ea] px-space-sm py-space-xs rounded-full text-[#151e16]">
            <span className="h-2 w-2 rounded-full bg-[#0d631b] inline-block"></span>
            <span className="font-label-md text-label-md font-bold">{inStockCount} Items</span>
            <span className="font-label-md text-label-md text-[#40493d]">In Stock</span>
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
            onClick={() => alert('PantryCraft Alerts:\n• 1 item expiring soon (Fresh Basil: 2 days)\n• 14 chef-matched recipes available')}
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
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover ring-1 ring-[#0d631b]/20"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDX1Sg2LdLX6QjJjuqlGYIgOqxCGU5bhgVDU9ORhCz6wI7ZcxczhOV3PolrQQS8JLgYX_ZXwNa12_mHBVjBnQYuNQBOeif7GmBmuuRIwIT3K7tW8m0LqARnYK9UhQyveV8B7U85VcLro7FZO3BExC37PLfc_HM35MLl9IFLHcHPXhi69FHlAbvzw1nCmzVTyI_ncagagLaAzrQ371pgi8ScysQBcg2hXJKA91VmRe6iGquEIf2Hl_M0"
              />
              <span className="hidden lg:inline font-label-lg text-label-lg text-[#151e16] font-semibold">Chef Maya</span>
              <span className="material-symbols-outlined text-[18px] text-[#40493d]">expand_more</span>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-[#e1ebde] p-space-sm z-50 text-left">
                <div className="flex items-center gap-space-sm pb-space-xs border-b border-[#e1ebde]">
                  <img
                    alt="Chef Maya"
                    className="w-10 h-10 rounded-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDX1Sg2LdLX6QjJjuqlGYIgOqxCGU5bhgVDU9ORhCz6wI7ZcxczhOV3PolrQQS8JLgYX_ZXwNa12_mHBVjBnQYuNQBOeif7GmBmuuRIwIT3K7tW8m0LqARnYK9UhQyveV8B7U85VcLro7FZO3BExC37PLfc_HM35MLl9IFLHcHPXhi69FHlAbvzw1nCmzVTyI_ncagagLaAzrQ371pgi8ScysQBcg2hXJKA91VmRe6iGquEIf2Hl_M0"
                  />
                  <div>
                    <h4 className="font-headline-sm text-[15px] font-bold text-[#151e16]">Chef Maya</h4>
                    <p className="font-body-sm text-[12px] text-[#40493d]">Culinary Pro Tier</p>
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
              className={`w-full text-left px-4 py-2.5 rounded-xl font-medium text-sm flex items-center justify-between ${
                activeTab === 'pantry' ? 'bg-[#2e7d32] text-white font-bold' : 'text-[#40493d] hover:bg-[#ecf7ea]'
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
              className={`w-full text-left px-4 py-2.5 rounded-xl font-medium text-sm flex items-center justify-between ${
                activeTab === 'recipes' ? 'bg-[#2e7d32] text-white font-bold' : 'text-[#40493d] hover:bg-[#ecf7ea]'
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
              className={`w-full text-left px-4 py-2.5 rounded-xl font-medium text-sm flex items-center justify-between ${
                activeTab === 'cook' ? 'bg-[#2e7d32] text-white font-bold' : 'text-[#40493d] hover:bg-[#ecf7ea]'
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
              className={`w-full text-left px-4 py-2.5 rounded-xl font-medium text-sm flex items-center justify-between ${
                activeTab === 'shopping' ? 'bg-[#2e7d32] text-white font-bold' : 'text-[#40493d] hover:bg-[#ecf7ea]'
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
