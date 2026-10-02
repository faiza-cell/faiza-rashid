import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronRight, Sparkles } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { heroModelImg, promoVelvetImg, productCreamLawnImg } from '../../data/mockData';
import heroCourtyardBg from '../../assets/hero_courtyard_bg.png';

export const HeroSection: React.FC = () => {
  const { navigateTo } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      eyebrow: 'TRADITION MEETS TREND',
      titleLine1: 'Your Style',
      titleLine2: 'Our Drip',
      description: 'Discover timeless Pakistani & casual wear designed for your everyday elegance.',
      buttonText: 'SHOP NOW',
      handwrittenText: 'Wear\nYour\nCulture ♡',
      image: heroModelImg,
      accentColor: '#C96852',
      category: 'womens-wear',
    },
    {
      eyebrow: 'HERITAGE EMBROIDERY',
      titleLine1: 'Artisan Crafted',
      titleLine2: 'Festive Pret',
      description: 'Handcrafted zardozi, tilla and pure silk silhouettes tailored for special celebrations.',
      buttonText: 'EXPLORE FESTIVE',
      handwrittenText: 'Pure\nPakistani\nGrace ♡',
      image: promoVelvetImg,
      accentColor: '#D9826D',
      category: 'traditional-wear',
    },
    {
      eyebrow: 'SUMMER & CASUAL PRET',
      titleLine1: 'Everyday Breathable',
      titleLine2: 'Lawn Luxury',
      description: 'Feather-light combed cotton lawn sets made for pure all-day comfort and effortless charm.',
      buttonText: 'SHOP LAWN',
      handwrittenText: 'Breeze\nIn\nStyle ♡',
      image: productCreamLawnImg,
      accentColor: '#C59A70',
      category: 'casual-wear',
    },
  ];

  // Auto slide cycle
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <section className="relative w-full bg-[#1B0E0A] text-[#F8EEE5] overflow-hidden min-h-[620px] lg:min-h-[700px] flex items-center">
      {/* 1. CINEMATIC LUXURY PAKISTANI HERITAGE COURTYARD BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={heroCourtyardBg}
          alt="Pakistani Heritage Courtyard"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center animate-hero-bg scale-100 filter brightness-95"
          onError={(e) => {
            const target = e.currentTarget;
            if (!target.src.includes('ChatGPT')) {
              target.src = '/ChatGPT Image Oct 1, 2026, 09_17_14 PM.png';
            }
          }}
        />

        {/* 2. LAYERED LUXURY SCRIM & OVERLAYS */}
        {/* Left side deep espresso gradient for pristine typography contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B0E0A]/95 via-[#1B0E0A]/75 to-[#1B0E0A]/35" />

        {/* Subtle vertical gradients: top navigation blend & bottom category transition */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1B0E0A]/60 via-transparent to-[#1B0E0A]/90" />

        {/* Warm golden light ambient glow from courtyard arches */}
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#C59A70]/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Text & Call to Action */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6 pt-4 lg:pt-0">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 animate-hero-1">
              <span className="w-6 h-[1.5px] bg-[#C96852]" />
              <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#C59A70] uppercase">
                {slide.eyebrow}
              </p>
            </div>

            {/* Main Headline reproducing reference image */}
            <div className="space-y-1 animate-hero-2">
              <h1 className="font-serif-display text-5xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-[#F8EEE5] leading-[1.05] drop-shadow-sm">
                {slide.titleLine1}
              </h1>
              <h2 className="font-serif-display italic text-5xl sm:text-6xl xl:text-7xl font-normal text-[#D9826D] tracking-tight leading-[1.05] drop-shadow-sm">
                {slide.titleLine2}
              </h2>
            </div>

            {/* Subtitle Description */}
            <p className="text-base sm:text-lg text-[#E8D8C8]/95 max-w-lg leading-relaxed font-light animate-hero-3 drop-shadow-xs">
              {slide.description}
            </p>

            {/* Primary Action Button */}
            <div className="pt-2 animate-hero-4">
              <button
                onClick={() => navigateTo('shop', { category: slide.category })}
                className="group inline-flex items-center gap-3 bg-[#C96852] hover:bg-[#b85b46] text-[#F8EEE5] font-medium text-sm sm:text-base px-8 py-3.5 rounded-md shadow-xl shadow-[#1B0E0A]/60 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer border border-[#E0836D]/30"
              >
                <span>{slide.buttonText}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            {/* Carousel Slide Indicators: 01 —— 02 03 */}
            <div className="flex items-center gap-4 pt-6 text-xs font-mono text-[#E8D8C8]/70 select-none">
              {slides.map((_, idx) => {
                const isActive = currentSlide === idx;
                const formattedNum = `0${idx + 1}`;
                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
                    aria-label={`Slide ${idx + 1}`}
                  >
                    <span className={isActive ? 'text-white font-semibold' : ''}>
                      {formattedNum}
                    </span>
                    {isActive && (
                      <span className="w-8 sm:w-10 h-[2px] bg-[#C96852] rounded-full inline-block" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Fashion Model Image Composition in Middleground */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            
            {/* Visual Frame for Fashion Model */}
            <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-none aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-[#3A1C16]/70 bg-[#2A120D] ring-1 ring-white/10">
              <img
                src={slide.image}
                alt="DESI DRIP Pakistani Luxury Fashion"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
              />

              {/* Gradient scrim for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B0E0A]/85 via-transparent to-black/20 pointer-events-none" />

              {/* Decorative Handwritten Script text in white on upper right */}
              <div className="absolute top-6 right-6 sm:top-10 sm:right-10 pointer-events-none text-right select-none z-20">
                <p className="font-script-hand text-3xl sm:text-4xl lg:text-5xl text-white font-medium leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] whitespace-pre-line rotate-2">
                  {slide.handwrittenText}
                </p>
              </div>

              {/* Bottom Subtle Tag */}
              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs text-[#E8D8C8]/90 pointer-events-none">
                <span className="bg-[#1B0E0A]/80 backdrop-blur-md px-3 py-1 rounded text-[11px] uppercase tracking-wider text-[#C59A70] border border-[#3A1C16]">
                  Pret Collection
                </span>
                <span className="text-[11px] text-white/80 font-medium drop-shadow">
                  Crafted in Pakistan
                </span>
              </div>
            </div>

            {/* Mobile Slide Navigation Dots */}
            <div className="absolute -bottom-4 lg:hidden flex gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    currentSlide === idx ? 'bg-[#C96852] w-6' : 'bg-white/40'
                  }`}
                  aria-label={`Jump to slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

