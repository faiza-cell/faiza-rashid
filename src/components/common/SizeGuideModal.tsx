import React, { useState } from 'react';
import { X, Ruler, Check } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useStore();
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');
  const [genderTab, setGenderTab] = useState<'women' | 'men'>('women');

  if (!isSizeGuideOpen) return null;

  const multiplier = unit === 'cm' ? 2.54 : 1;
  const formatVal = (valInches: number) => {
    return unit === 'cm' ? Math.round(valInches * multiplier) : valInches;
  };

  const womensSizeData = [
    { size: 'XS', shoulder: 14, chest: 36, waist: 34, hip: 38, length: 39, sleeve: 21 },
    { size: 'S', shoulder: 14.5, chest: 38, waist: 36, hip: 40, length: 40, sleeve: 21.5 },
    { size: 'M', shoulder: 15, chest: 41, waist: 39, hip: 43, length: 41, sleeve: 22 },
    { size: 'L', shoulder: 15.5, chest: 44, waist: 42, hip: 46, length: 42, sleeve: 22.5 },
    { size: 'XL', shoulder: 16.5, chest: 47, waist: 45, hip: 49, length: 42.5, sleeve: 23 },
    { size: 'XXL', shoulder: 17.5, chest: 50, waist: 48, hip: 52, length: 43, sleeve: 23 },
  ];

  const mensSizeData = [
    { size: 'S', collar: 14.5, chest: 40, length: 40, sleeve: 24, shoulder: 17.5 },
    { size: 'M', collar: 15.5, chest: 43, length: 42, sleeve: 25, shoulder: 18.5 },
    { size: 'L', collar: 16.5, chest: 46, length: 43, sleeve: 25.5, shoulder: 19.5 },
    { size: 'XL', collar: 17.5, chest: 49, length: 44, sleeve: 26, shoulder: 20.5 },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto select-none">
      {/* Backdrop */}
      <div
        onClick={() => setIsSizeGuideOpen(false)}
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-3xl bg-[#FBF6EE] rounded-2xl shadow-2xl border border-[#E8D8C8] overflow-hidden animate-in zoom-in-95 duration-200 p-6 sm:p-8">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E8D8C8]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#EFE4D6] flex items-center justify-center text-[#651B17]">
                <Ruler className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif-display text-2xl font-bold text-[#1B0E0A]">
                  DESI DRIP Size Guide
                </h3>
                <p className="text-xs text-[#21130F]/60">
                  Standard Pakistani Stitched Pret & Tailored Measurements
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="p-1.5 rounded-full text-[#21130F]/50 hover:text-[#1B0E0A] hover:bg-[#E8D8C8] transition-colors cursor-pointer"
              aria-label="Close size guide"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Unit Toggle and Category Selector */}
          <div className="flex flex-wrap items-center justify-between gap-4 my-5">
            <div className="flex p-1 bg-[#EFE4D6] rounded-lg">
              <button
                onClick={() => setGenderTab('women')}
                className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  genderTab === 'women'
                    ? 'bg-[#651B17] text-white shadow-xs'
                    : 'text-[#21130F]/70 hover:text-[#21130F]'
                }`}
              >
                Women&rsquo;s Pret & Suits
              </button>
              <button
                onClick={() => setGenderTab('men')}
                className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  genderTab === 'men'
                    ? 'bg-[#651B17] text-white shadow-xs'
                    : 'text-[#21130F]/70 hover:text-[#21130F]'
                }`}
              >
                Men&rsquo;s Kurtas
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#21130F]/60 font-medium">Measurement Unit:</span>
              <div className="flex p-1 bg-[#EFE4D6] rounded-lg">
                <button
                  onClick={() => setUnit('inches')}
                  className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                    unit === 'inches'
                      ? 'bg-white text-[#1B0E0A] shadow-xs'
                      : 'text-[#21130F]/60'
                  }`}
                >
                  Inches (&ldquo;)
                </button>
                <button
                  onClick={() => setUnit('cm')}
                  className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                    unit === 'cm'
                      ? 'bg-white text-[#1B0E0A] shadow-xs'
                      : 'text-[#21130F]/60'
                  }`}
                >
                  Centimeters (cm)
                </button>
              </div>
            </div>
          </div>

          {/* Measurement Table */}
          <div className="overflow-x-auto rounded-xl border border-[#E8D8C8] bg-white shadow-xs">
            {genderTab === 'women' ? (
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F7EFE5] text-[#1B0E0A] uppercase tracking-wider font-semibold border-b border-[#E8D8C8]">
                  <tr>
                    <th className="py-3 px-4">Size</th>
                    <th className="py-3 px-4">Shoulder</th>
                    <th className="py-3 px-4">Chest</th>
                    <th className="py-3 px-4">Waist</th>
                    <th className="py-3 px-4">Hip</th>
                    <th className="py-3 px-4">Shirt Length</th>
                    <th className="py-3 px-4">Sleeve</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8D8C8]/60 font-medium text-[#21130F]">
                  {womensSizeData.map((row) => (
                    <tr key={row.size} className="hover:bg-[#FBF6EE] transition-colors">
                      <td className="py-2.5 px-4 font-bold text-[#651B17]">{row.size}</td>
                      <td className="py-2.5 px-4 tabular-nums">{formatVal(row.shoulder)}</td>
                      <td className="py-2.5 px-4 tabular-nums">{formatVal(row.chest)}</td>
                      <td className="py-2.5 px-4 tabular-nums">{formatVal(row.waist)}</td>
                      <td className="py-2.5 px-4 tabular-nums">{formatVal(row.hip)}</td>
                      <td className="py-2.5 px-4 tabular-nums">{formatVal(row.length)}</td>
                      <td className="py-2.5 px-4 tabular-nums">{formatVal(row.sleeve)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F7EFE5] text-[#1B0E0A] uppercase tracking-wider font-semibold border-b border-[#E8D8C8]">
                  <tr>
                    <th className="py-3 px-4">Size</th>
                    <th className="py-3 px-4">Collar</th>
                    <th className="py-3 px-4">Chest</th>
                    <th className="py-3 px-4">Shoulder</th>
                    <th className="py-3 px-4">Kurta Length</th>
                    <th className="py-3 px-4">Sleeve Length</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8D8C8]/60 font-medium text-[#21130F]">
                  {mensSizeData.map((row) => (
                    <tr key={row.size} className="hover:bg-[#FBF6EE] transition-colors">
                      <td className="py-2.5 px-4 font-bold text-[#651B17]">{row.size}</td>
                      <td className="py-2.5 px-4 tabular-nums">{formatVal(row.collar)}</td>
                      <td className="py-2.5 px-4 tabular-nums">{formatVal(row.chest)}</td>
                      <td className="py-2.5 px-4 tabular-nums">{formatVal(row.shoulder)}</td>
                      <td className="py-2.5 px-4 tabular-nums">{formatVal(row.length)}</td>
                      <td className="py-2.5 px-4 tabular-nums">{formatVal(row.sleeve)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* How to Measure note */}
          <div className="mt-5 p-4 bg-[#EFE4D6]/70 rounded-xl border border-[#E0CFBD] text-xs text-[#21130F]/80 space-y-1.5">
            <h4 className="font-semibold text-[#1B0E0A] flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#C96852]" />
              How to Measure for Stitched Pret
            </h4>
            <p>
              • <strong>Chest:</strong> Measure around the fullest part of the bust/chest keeping the tape comfortably level.
            </p>
            <p>
              • <strong>Shoulder:</strong> Measure from the edge of one shoulder socket across the back to the edge of the other shoulder socket.
            </p>
            <p>
              • <strong>Kurta Length:</strong> Measure from highest shoulder seam point straight down to the hem.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
