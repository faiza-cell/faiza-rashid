import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const CategorySection: React.FC = () => {
  const { categories, navigateTo } = useStore();

  return (
    <section className="w-full bg-[#F7EFE5] py-14 sm:py-18 px-4 sm:px-6 lg:px-8 border-b border-[#E8D8C8]">
      <div className="max-w-7xl mx-auto">
        
        {/* Categories Grid matching reference (5 cards) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigateTo('shop', { category: cat.slug })}
              className="group flex flex-col items-center text-center p-3 sm:p-4 rounded-2xl bg-[#EFE4D6]/70 hover:bg-[#E8D8C8] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md cursor-pointer border border-[#E0CFBD]/60 focus:outline-none focus:ring-2 focus:ring-[#C96852]"
            >
              {/* Arched Image Container */}
              <div className="w-full aspect-[4/5] sm:aspect-square rounded-t-[40px] sm:rounded-t-[48px] rounded-b-xl overflow-hidden bg-white/60 mb-4 p-2.5 flex items-center justify-center transition-all duration-300 group-hover:bg-white shadow-inner">
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-108"
                />
              </div>

              {/* Title */}
              <h3 className="text-sm sm:text-base font-semibold text-[#21130F] group-hover:text-[#651B17] transition-colors tracking-tight">
                {cat.name}
              </h3>

              {/* Arrow Indicator */}
              <div className="mt-2 text-[#21130F] group-hover:text-[#C96852] transition-all duration-300">
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
