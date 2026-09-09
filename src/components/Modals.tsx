import React, { useState } from 'react';

interface SubstitutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  substitutes: { name: string; ratio: string; flavorNote: string }[];
  onApply?: (sub: string) => void;
}

export const SubstitutionModal: React.FC<SubstitutionModalProps> = ({
  isOpen,
  onClose,
  title,
  substitutes,
  onApply,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#e1ebde] text-left">
        <div className="flex items-center justify-between pb-4 border-b border-[#e1ebde]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0d631b] text-2xl">published_with_changes</span>
            <h3 className="font-headline-sm text-lg font-bold text-[#151e16]">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-[#ecf7ea] text-[#40493d] cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <p className="font-body-md text-sm text-[#40493d] mt-3">
          Zero-waste culinary intelligence found tested substitutions you likely have in your cupboard:
        </p>

        <div className="mt-4 space-y-3">
          {substitutes.map((sub, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-[#f2fcef] border border-[#dbe5d9] flex items-center justify-between gap-3 hover:border-[#0d631b] transition-all"
            >
              <div>
                <div className="font-label-lg font-bold text-[#151e16] flex items-center gap-2">
                  <span>{sub.name}</span>
                  <span className="text-xs bg-[#e1ebde] text-[#0d631b] px-2 py-0.5 rounded-full font-medium">
                    {sub.ratio}
                  </span>
                </div>
                <p className="text-xs text-[#40493d] mt-1">{sub.flavorNote}</p>
              </div>
              {onApply && (
                <button
                  onClick={() => {
                    onApply(sub.name);
                    onClose();
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#2e7d32] text-white font-label-sm text-xs hover:bg-[#0d631b] transition-all shrink-0 cursor-pointer"
                >
                  Use Swap
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#ecf7ea] text-[#151e16] font-label-md text-sm hover:bg-[#dbe5d9] transition-all cursor-pointer font-semibold"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};

interface ScanReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReceiptScanned: (items: string[]) => void;
}

export const ScanReceiptModal: React.FC<ScanReceiptModalProps> = ({
  isOpen,
  onClose,
  onReceiptScanned,
}) => {
  const [scanning, setScanning] = useState(false);
  const [scannedDone, setScannedDone] = useState(false);

  if (!isOpen) return null;

  const handleSimulateScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScannedDone(true);
      setTimeout(() => {
        onReceiptScanned(['Chinna Vengayam (Shallots)', 'Fresh Karuveppilai', 'Idhayam Nallennai', 'Country Tomatoes', 'Toor Dal']);
        onClose();
        setScannedDone(false);
      }, 1000);
    }, 1600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#e1ebde] text-left">
        <div className="flex items-center justify-between pb-3 border-b border-[#e1ebde]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0d631b] text-2xl">document_scanner</span>
            <h3 className="font-headline-sm text-lg font-bold text-[#151e16]">Scan Grocery Receipt</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-[#ecf7ea] text-[#40493d]">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="mt-4 text-center">
          <div className="border-2 border-dashed border-[#0d631b]/40 bg-[#f2fcef] rounded-2xl p-8 flex flex-col items-center justify-center gap-3">
            {scanning ? (
              <div className="flex flex-col items-center gap-2 py-4">
                <span className="material-symbols-outlined text-4xl text-[#0d631b] animate-spin">
                  sync
                </span>
                <p className="font-label-lg text-sm text-[#0d631b] font-bold">Parsing grocery lines...</p>
                <p className="text-xs text-[#40493d]">AI detecting pantry items & units</p>
              </div>
            ) : scannedDone ? (
              <div className="flex flex-col items-center gap-2 py-4 text-[#0d631b]">
                <span className="material-symbols-outlined text-4xl">check_circle</span>
                <p className="font-label-lg text-sm font-bold">5 Items Added to Pantry!</p>
              </div>
            ) : (
              <>
                <span className="material-symbols-outlined text-4xl text-[#0d631b]">receipt_long</span>
                <div>
                  <p className="font-label-lg text-sm text-[#151e16] font-bold">
                    Upload or drag receipt image
                  </p>
                  <p className="font-body-sm text-xs text-[#40493d] mt-1">
                    Whole Foods, Trader Joe's, Kroger, Safeway, Instacart supported
                  </p>
                </div>
                <button
                  onClick={handleSimulateScan}
                  className="mt-2 px-5 py-2.5 rounded-xl bg-[#2e7d32] text-white font-label-md text-sm font-bold shadow hover:bg-[#0d631b] transition-all cursor-pointer"
                >
                  Simulate Receipt Scan
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface MacroFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MacroFilterModal: React.FC<MacroFilterModalProps> = ({ isOpen, onClose }) => {
  const [maxCals, setMaxCals] = useState(550);
  const [minProtein, setMinProtein] = useState(30);
  const [maxCarbs, setMaxCarbs] = useState(45);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#e1ebde] text-left">
        <div className="flex items-center justify-between pb-3 border-b border-[#e1ebde]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0d631b] text-2xl">tune</span>
            <h3 className="font-headline-sm text-lg font-bold text-[#151e16]">Macro & Calorie Target</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-[#ecf7ea] text-[#40493d]">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="mt-4 space-y-4">
          <div>
            <div className="flex justify-between text-sm font-semibold text-[#151e16]">
              <span>Max Calories per Serving</span>
              <span className="text-[#0d631b]">{maxCals} kcal</span>
            </div>
            <input
              type="range"
              min="200"
              max="900"
              step="25"
              value={maxCals}
              onChange={(e) => setMaxCals(Number(e.target.value))}
              className="w-full mt-2 accent-[#0d631b]"
            />
          </div>

          <div>
            <div className="flex justify-between text-sm font-semibold text-[#151e16]">
              <span>Min Protein Target</span>
              <span className="text-[#0d631b]">{minProtein}g</span>
            </div>
            <input
              type="range"
              min="10"
              max="60"
              step="5"
              value={minProtein}
              onChange={(e) => setMinProtein(Number(e.target.value))}
              className="w-full mt-2 accent-[#0d631b]"
            />
          </div>

          <div>
            <div className="flex justify-between text-sm font-semibold text-[#151e16]">
              <span>Max Net Carbs</span>
              <span className="text-[#0d631b]">{maxCarbs}g</span>
            </div>
            <input
              type="range"
              min="10"
              max="80"
              step="5"
              value={maxCarbs}
              onChange={(e) => setMaxCarbs(Number(e.target.value))}
              className="w-full mt-2 accent-[#0d631b]"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#ecf7ea] text-[#151e16] font-semibold text-sm hover:bg-[#dbe5d9]"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#2e7d32] text-white font-bold text-sm hover:bg-[#0d631b]"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};
