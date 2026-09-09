import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-[#e1ebde] bg-[#ffffff]/60 py-space-lg text-[#40493d] font-body-sm text-[13px]">
      <div className="max-w-7xl mx-auto px-gutter-desktop flex flex-col md:flex-row items-center justify-between gap-space-md">
        <div className="flex flex-wrap items-center gap-space-md">
          <span className="flex items-center gap-1.5 font-medium text-[#151e16]">
            <span className="material-symbols-outlined text-[16px] text-[#0d631b]">scale</span>
            Quick Converters:
          </span>
          <span className="px-2 py-0.5 rounded bg-[#ecf7ea] text-[#0d631b] font-medium">1 Cup = 240ml</span>
          <span className="px-2 py-0.5 rounded bg-[#ecf7ea] text-[#0d631b] font-medium">1 Tbsp = 15ml</span>
          <span className="px-2 py-0.5 rounded bg-[#ecf7ea] text-[#0d631b] font-medium">1 oz = 28.3g</span>
        </div>

        <div className="flex items-center gap-space-sm text-center">
          <span className="material-symbols-outlined text-[16px] text-[#2e7d32]">verified_user</span>
          <span>Dietary Filter: <strong className="text-[#151e16]">Smart Allergen Shield Active</strong></span>
        </div>

        <div className="flex items-center gap-space-xs text-[#0d631b] font-semibold">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0d631b] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0d631b]"></span>
          </span>
          <span>Pantry Synced 2m ago</span>
        </div>
      </div>
    </footer>
  );
};
