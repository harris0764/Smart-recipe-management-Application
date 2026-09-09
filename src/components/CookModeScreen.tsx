import React, { useState, useEffect } from 'react';
import { COOK_MODE_STEPS } from '../data/mockData';

interface CookModeScreenProps {
  onBackToRecipes: () => void;
  onAddShoppingItem: (name: string, price: number, recipeName: string) => void;
}

export const CookModeScreen: React.FC<CookModeScreenProps> = ({
  onBackToRecipes,
  onAddShoppingItem,
}) => {
  const [servings, setServings] = useState<number>(4);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isKitchenModeActive, setIsKitchenModeActive] = useState<boolean>(true);
  const [isSaved, setIsSaved] = useState<boolean>(true);
  const [lemonAdded, setLemonAdded] = useState<boolean>(false);

  // Timer State for active step
  const [timerSeconds, setTimerSeconds] = useState<number>(360); // 6 mins default for step 2
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  const scale = servings / 4;

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      alert('⏰ Timer complete! Time to flip your chicken breasts and deglaze.');
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNextStep = () => {
    if (currentStepIndex < COOK_MODE_STEPS.length - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      if (COOK_MODE_STEPS[nextIdx].timerDurationSeconds) {
        setTimerSeconds(COOK_MODE_STEPS[nextIdx].timerDurationSeconds!);
        setIsTimerRunning(false);
      }
    } else {
      alert('🎉 Delicious work, Chef! Your Lemon Herb Chicken is ready to serve. Enjoy your zero-waste meal!');
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      const prevIdx = currentStepIndex - 1;
      setCurrentStepIndex(prevIdx);
      if (COOK_MODE_STEPS[prevIdx].timerDurationSeconds) {
        setTimerSeconds(COOK_MODE_STEPS[prevIdx].timerDurationSeconds!);
        setIsTimerRunning(false);
      }
    }
  };

  const currentStep = COOK_MODE_STEPS[currentStepIndex];

  return (
    <div className="pt-24 pb-32 max-w-7xl mx-auto px-gutter-desktop">
      {/* Breadcrumbs & Badges */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2 text-xs md:text-sm text-[#40493d]">
          <button
            onClick={onBackToRecipes}
            className="hover:text-[#0d631b] flex items-center gap-1 font-semibold cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Recipes
          </button>
          <span>/</span>
          <span>Dinner</span>
          <span>/</span>
          <span className="text-[#151e16] font-bold">Pan-Seared Lemon Herb Chicken</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-[#ecf7ea] text-[#0d631b] font-label-md text-xs font-bold border border-[#a3f69c]">
            100% Pantry Match
          </span>
          <span className="px-3 py-1 rounded-full bg-[#ffdcc6] text-[#311300] font-label-md text-xs font-bold">
            Chef Maya Tested
          </span>
        </div>
      </div>

      {/* Main Recipe Title & Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-space-lg">
        <div>
          <h1 className="font-headline-lg text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#151e16] tracking-tight">
            Pan-Seared Lemon Herb Chicken & Crispy Garlic Potatoes
          </h1>
          <div className="flex flex-wrap items-center gap-4 mt-2 text-xs md:text-sm text-[#40493d]">
            <span className="flex items-center gap-1 font-bold text-[#151e16]">
              <span className="material-symbols-outlined text-[18px] text-[#fc820c]">star</span>
              4.9 (342 reviews)
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px] text-[#0d631b]">schedule</span>
              25 mins Total (10m prep · 15m cook)
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px] text-[#0d631b]">group</span>
              {servings} Servings
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`p-3 rounded-2xl border transition-all cursor-pointer ${
              isSaved
                ? 'bg-[#ecf7ea] border-[#0d631b] text-[#ba1a1a]'
                : 'bg-white border-[#e1ebde] text-[#40493d]'
            }`}
            title="Save Recipe"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isSaved ? 'favorite' : 'favorite_border'}
            </span>
          </button>

          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                alert('Recipe link copied to clipboard!');
              }
            }}
            className="p-3 rounded-2xl bg-white border border-[#e1ebde] hover:bg-[#ecf7ea] text-[#40493d] transition-all cursor-pointer"
            title="Share Recipe"
          >
            <span className="material-symbols-outlined text-[20px]">share</span>
          </button>

          <button
            onClick={() => window.print()}
            className="p-3 rounded-2xl bg-white border border-[#e1ebde] hover:bg-[#ecf7ea] text-[#40493d] transition-all cursor-pointer"
            title="Print Recipe"
          >
            <span className="material-symbols-outlined text-[20px]">print</span>
          </button>

          <button
            onClick={() => setIsKitchenModeActive(!isKitchenModeActive)}
            className="px-5 py-3 rounded-2xl bg-[#2e7d32] hover:bg-[#0d631b] text-white font-label-md font-bold text-xs md:text-sm flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">skillet</span>
            <span>{isKitchenModeActive ? 'Kitchen View Active' : 'Enter Kitchen Mode'}</span>
          </button>
        </div>
      </div>

      {/* Hero Visual Section */}
      <div className="relative rounded-3xl overflow-hidden mb-space-xl border border-[#e1ebde] bg-[#151e16] shadow-md">
        <div className="h-72 md:h-96 w-full relative">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6Wwb2nnMurOnowSHLcW9Ym2UqMWIiPjJ8UaBmqLjMHsvIpiordc5I5y0y5qqF5m9fF8zys5LoZahH0vALKnnBXJSjNK3ackKsiPmzjmJAzeICPROFM-YtZui45YWrWRfK0hl8I6MC_qqfdUFFJuA7ndhBshqtT0loqXzAbE8kkdTDG8Iir60MJJNfjUK7FmsvOtBSZUrXYfvjAzW6aOiOIpIcBbMeTFmY4fa4RhrCNp0L7_PrHYpY"
            alt="Pan-Seared Lemon Herb Chicken"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-white/90 text-[#002204] text-xs font-bold backdrop-blur-md">
                  Chef's Signature
                </span>
                <span className="px-3 py-1 rounded-full bg-black/50 text-white text-xs font-medium backdrop-blur-md">
                  Naturally Low Sugar
                </span>
                <span className="px-3 py-1 rounded-full bg-black/50 text-white text-xs font-medium backdrop-blur-md">
                  High Protein · GF
                </span>
              </div>
              <p className="text-white/90 text-sm font-medium">
                Crispy golden sear with pan-dripping lemon herb deglaze sauce.
              </p>
            </div>

            <span className="px-3 py-1.5 rounded-xl bg-[#a3f69c] text-[#002204] font-label-md text-xs font-bold shrink-0">
              Carbon Neutral Pantry Recipe
            </span>
          </div>
        </div>
      </div>

      {/* Nutrition Micro-Profile Bento */}
      <div className="bg-white rounded-3xl p-6 border border-[#e1ebde] shadow-sm mb-space-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-headline-sm text-base font-bold text-[#151e16] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0d631b]">query_stats</span>
            Nutrition Profile (Per Serving)
          </h3>
          <span className="text-xs text-[#0d631b] font-semibold bg-[#ecf7ea] px-2.5 py-1 rounded-full">
            Zero Waste Formula
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="p-3.5 rounded-2xl bg-[#f2fcef] border border-[#dbe5d9]">
            <span className="text-xs text-[#40493d]">Calories</span>
            <div className="font-headline-md text-xl font-bold text-[#151e16] mt-0.5">480 kcal</div>
            <span className="text-[11px] text-[#0d631b] font-semibold">Balanced Energy</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#f2fcef] border border-[#dbe5d9]">
            <span className="text-xs text-[#40493d]">Lean Protein</span>
            <div className="font-headline-md text-xl font-bold text-[#0d631b] mt-0.5">42g</div>
            <span className="text-[11px] text-[#40493d]">84% Daily Target</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#f2fcef] border border-[#dbe5d9]">
            <span className="text-xs text-[#40493d]">Net Carbs</span>
            <div className="font-headline-md text-xl font-bold text-[#151e16] mt-0.5">24g</div>
            <span className="text-[11px] text-[#40493d]">From Whole Potatoes</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#f2fcef] border border-[#dbe5d9]">
            <span className="text-xs text-[#40493d]">Healthy Fats</span>
            <div className="font-headline-md text-xl font-bold text-[#151e16] mt-0.5">18g</div>
            <span className="text-[11px] text-[#40493d]">Extra Virgin Olive Oil</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#f2fcef] border border-[#dbe5d9] col-span-2 sm:col-span-1">
            <span className="text-xs text-[#40493d]">Sodium</span>
            <div className="font-headline-md text-xl font-bold text-[#151e16] mt-0.5">420mg</div>
            <span className="text-[11px] text-[#0d631b] font-semibold">Heart Healthy</span>
          </div>
        </div>
      </div>

      {/* Dynamic Serving Scaler & Ingredient Audit */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-space-xl">
        {/* Left: Scaler + On-Hand Ingredients (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-[#e1ebde]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e1ebde]">
            <div>
              <h3 className="font-headline-sm text-lg font-bold text-[#151e16]">
                Pantry Ingredients (Dynamic Scaler)
              </h3>
              <p className="text-xs text-[#40493d] mt-0.5">
                Quantities recalculate automatically to match exact pan servings.
              </p>
            </div>

            {/* Serving Pills */}
            <div className="flex items-center bg-[#e6f1e4] p-1 rounded-2xl self-start sm:self-auto">
              {[2, 4, 6, 8].map((s) => (
                <button
                  key={s}
                  onClick={() => setServings(s)}
                  className={`px-3 py-1.5 rounded-xl font-label-md text-xs font-bold transition-all cursor-pointer ${
                    servings === s ? 'bg-[#2e7d32] text-white shadow-xs' : 'text-[#40493d] hover:text-[#151e16]'
                  }`}
                >
                  {s} Servings
                </button>
              ))}
            </div>
          </div>

          {/* Scaled Ingredients List */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { name: 'Free-Range Chicken Breast', qty: `${Math.round(500 * scale)}g`, note: 'Crisper drawer (On-hand)' },
              { name: 'Garlic Cloves', qty: `${Math.round(4 * scale)} cloves`, note: 'Minced · Pantry shelf' },
              { name: 'Meyer Lemons', qty: `${(1 * scale).toFixed(1)} whole`, note: 'Juiced & zested' },
              { name: 'Baby Gold Potatoes', qty: `${Math.round(400 * scale)}g`, note: 'Halved · Pantry basket' },
              { name: 'Fresh Rosemary', qty: `${Math.max(1, Math.round(2 * scale))} sprigs`, note: 'Herb jar on counter' },
              { name: 'Extra Virgin Olive Oil', qty: `${Math.round(2 * scale)} tbsp`, note: 'Cold pressed in pantry' },
              { name: 'Grass-Fed Butter', qty: `${Math.round(1 * scale)} tbsp`, note: 'In refrigerator dairy bin' },
              { name: 'Coarse Sea Salt & Pepper', qty: 'To taste', note: 'Pantry spice rack' },
            ].map((ing, i) => (
              <div
                key={i}
                className="p-3 rounded-2xl bg-[#f2fcef] border border-[#dbe5d9] flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#0d631b] text-white flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[14px]">check</span>
                  </span>
                  <div>
                    <span className="text-xs font-bold text-[#151e16] block">{ing.name}</span>
                    <span className="text-[11px] text-[#40493d]">{ing.note}</span>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-[#0d631b] bg-white px-2 py-1 rounded-lg border border-[#a3f69c]">
                  {ing.qty}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Missing items check or Quick Add to Shopping List */}
        <div className="bg-[#fff7ee] rounded-3xl p-6 border border-[#ffb786]/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-[#964900] font-bold text-sm mb-2">
              <span className="material-symbols-outlined text-[20px]">grocery</span>
              Optional Flavor Boosters
            </div>
            <h4 className="font-headline-sm text-base font-bold text-[#311300]">
              Missing Fresh Garnish?
            </h4>
            <p className="text-xs text-[#5e2c00] mt-1">
              Add fresh Italian flat-leaf parsley or Meyer lemons to your smart aisle shopping list for tomorrow's run.
            </p>

            <div className="mt-4 p-3.5 rounded-2xl bg-white border border-[#ffdcc6]">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#151e16]">1 Fresh Meyer Lemon</span>
                  <span className="text-[11px] text-[#40493d] block">Aisle 1 · Produce Dept</span>
                </div>
                <span className="text-xs font-bold text-[#964900]">$0.89</span>
              </div>

              <button
                onClick={() => {
                  onAddShoppingItem('1 Fresh Meyer Lemon', 0.89, 'Lemon Herb Chicken');
                  setLemonAdded(true);
                }}
                disabled={lemonAdded}
                className={`mt-2.5 w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                  lemonAdded
                    ? 'bg-[#ecf7ea] text-[#0d631b]'
                    : 'bg-[#964900] hover:bg-[#5e2c00] text-white'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">
                  {lemonAdded ? 'check' : 'add_shopping_cart'}
                </span>
                <span>{lemonAdded ? 'Added to Smart List' : '+ Add Lemon ($0.89)'}</span>
              </button>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-[#ffdcc6] text-xs text-[#5e2c00] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#964900] text-[18px]">verified</span>
            <span>All core proteins and potatoes 100% matched in current inventory.</span>
          </div>
        </div>
      </div>

      {/* Hands-Free Kitchen Cook Mode Carousel & Step Engine */}
      <div className="bg-[#151e16] text-white rounded-3xl p-6 md:p-8 shadow-2xl border border-white/10">
        {/* Top Kitchen Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fc820c] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#fc820c]"></span>
            </span>
            <div>
              <h3 className="font-headline-sm text-lg font-bold text-white">
                Hands-Free Kitchen Cook Mode Active
              </h3>
              <p className="text-xs text-[#dbe5d9]">
                Step {currentStepIndex + 1} of {COOK_MODE_STEPS.length} · Tap Next Step or use timer
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {COOK_MODE_STEPS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentStepIndex(i)}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  currentStepIndex === i ? 'w-8 bg-[#a3f69c]' : 'w-2.5 bg-white/20 hover:bg-white/40'
                }`}
                title={`Jump to Step ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Active Step Content */}
        <div className="py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-[#a3f69c] text-[#002204] font-label-md text-xs font-bold">
                {currentStep.stageTag}
              </span>
              {currentStep.heatLevel && (
                <span className="px-3 py-1 rounded-full bg-[#fc820c] text-white font-label-md text-xs font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
                  {currentStep.heatLevel}
                </span>
              )}
            </div>

            <h2 className="font-headline-lg text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {currentStep.title}
            </h2>

            <p className="font-body-lg text-base md:text-lg text-[#dbe5d9] mt-4 leading-relaxed">
              {currentStep.instruction}
            </p>

            {currentStep.proTip && (
              <div className="mt-4 p-3.5 rounded-2xl bg-white/10 border border-white/15 flex items-start gap-2.5 text-xs md:text-sm text-[#a3f69c]">
                <span className="material-symbols-outlined text-[18px] shrink-0 mt-0.5">lightbulb</span>
                <div>
                  <strong>Chef Pro Tip:</strong> {currentStep.proTip}
                </div>
              </div>
            )}
          </div>

          {/* Step 2 or 3 Interactive Live Timer */}
          {currentStep.timerDurationSeconds ? (
            <div className="bg-white/10 rounded-3xl p-6 border border-white/20 flex flex-col items-center justify-center text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-[#a3f69c] mb-1">
                {currentStep.timerTitle || 'Active Timer'}
              </span>

              <div className="font-mono text-5xl md:text-6xl font-extrabold text-white tracking-wider my-3">
                {formatTime(timerSeconds)}
              </div>

              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`px-5 py-2.5 rounded-2xl font-bold text-xs md:text-sm flex items-center gap-1.5 transition-all shadow-md cursor-pointer ${
                    isTimerRunning
                      ? 'bg-[#fc820c] text-white hover:bg-[#964900]'
                      : 'bg-[#a3f69c] text-[#002204] hover:bg-[#88d982]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {isTimerRunning ? 'pause' : 'play_arrow'}
                  </span>
                  <span>{isTimerRunning ? 'Pause Timer' : 'Start Timer'}</span>
                </button>

                <button
                  onClick={() => setTimerSeconds((s) => s + 60)}
                  className="px-3 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition-all cursor-pointer"
                  title="Add 1 Minute"
                >
                  +1 Min
                </button>

                <button
                  onClick={() => {
                    setIsTimerRunning(false);
                    setTimerSeconds(currentStep.timerDurationSeconds || 360);
                  }}
                  className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                  title="Reset Timer"
                >
                  <span className="material-symbols-outlined text-[18px]">restart_alt</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white/5 rounded-3xl p-6 border border-white/10 flex flex-col items-center justify-center text-center">
              <span className="material-symbols-outlined text-5xl text-[#a3f69c] mb-2">
                restaurant
              </span>
              <h4 className="font-headline-sm text-white font-bold">Preparation Focus</h4>
              <p className="text-xs text-[#dbe5d9] mt-1">
                Take your time to dry and season evenly. Quality prep guarantees culinary success!
              </p>
            </div>
          )}
        </div>

        {/* Stepper Navigation Footer */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-1/3">
            <div className="flex justify-between text-xs text-[#dbe5d9] mb-1">
              <span>Progress</span>
              <span>{Math.round(((currentStepIndex + 1) / COOK_MODE_STEPS.length) * 100)}% Complete</span>
            </div>
            <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#a3f69c] transition-all duration-300 rounded-full"
                style={{ width: `${((currentStepIndex + 1) / COOK_MODE_STEPS.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={handlePrevStep}
              disabled={currentStepIndex === 0}
              className={`px-5 py-3 rounded-2xl font-label-md font-bold text-xs md:text-sm flex items-center gap-1.5 transition-all cursor-pointer ${
                currentStepIndex === 0
                  ? 'opacity-40 cursor-not-allowed bg-white/10 text-white/50'
                  : 'bg-white/15 hover:bg-white/25 text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>Previous Step</span>
            </button>

            <button
              onClick={handleNextStep}
              className="px-6 py-3 rounded-2xl bg-[#a3f69c] hover:bg-[#88d982] text-[#002204] font-label-lg font-extrabold text-xs md:text-sm flex items-center gap-2 shadow-lg transition-all cursor-pointer"
            >
              <span>
                {currentStepIndex === COOK_MODE_STEPS.length - 1
                  ? 'Finish Cooking & Plate'
                  : 'Next Step'}
              </span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
