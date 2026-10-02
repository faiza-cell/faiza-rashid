import React from 'react';
import { Sparkles, Heart, Award, Users } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import { heroModelImg, promoVelvetImg } from '../../data/mockData';

export const AboutUsPage: React.FC = () => {
  return (
    <div className="w-full bg-[#F7EFE5] min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-[#21130F]">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Hero Banner */}
        <div className="text-center space-y-4">
          <BrandLogo size="lg" light={false} />
          <p className="text-xs font-semibold tracking-[0.25em] text-[#C96852] uppercase mt-4">
            OUR STORY & CRAFTSMANSHIP
          </p>
          <h1 className="font-serif-display text-4xl sm:text-6xl font-bold text-[#1B0E0A] tracking-tight">
            Tradition Meets Trend
          </h1>
          <p className="text-base sm:text-lg text-[#21130F]/80 max-w-2xl mx-auto font-light leading-relaxed">
            Born in Lahore with a vision to redefine Pakistani pret and luxury evening wear, DESI DRIP bridges centuries of South Asian needlecraft with contemporary tailoring.
          </p>
        </div>

        {/* Visual Story Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#FBF6EE] rounded-3xl p-6 sm:p-10 border border-[#E8D8C8] shadow-sm">
          <div className="space-y-4">
            <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1B0E0A]">
              Rooted in Pakistani Heritage
            </h2>
            <p className="text-xs sm:text-sm text-[#21130F]/80 leading-relaxed font-light">
              Every DESI DRIP garment begins with authentic textile artistry. From the vibrant loom traditions of Multan and Faisalabad to the intricate zardozi, tilla, and marori embroidery ateliers of Old Lahore, we celebrate the hands that bring our heritage to life.
            </p>
            <p className="text-xs sm:text-sm text-[#21130F]/80 leading-relaxed font-light">
              We reject transient fast fashion in favor of heirloom-quality fabrics: pure raw silks, featherweight combed lawn cotton, and rich micro-velvets tailored to flatter the modern silhouette.
            </p>
          </div>
          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#2A120D] border border-[#E8D8C8]">
            <img
              src={promoVelvetImg}
              alt="DESI DRIP artisanal zardozi embroidery"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-[#FBF6EE] p-6 rounded-2xl border border-[#E8D8C8] space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#EFE4D6] flex items-center justify-center text-[#651B17]">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-serif-display text-lg font-bold text-[#1B0E0A]">
              Master Karigars
            </h3>
            <p className="text-xs text-[#21130F]/70 leading-relaxed font-light">
              Fair-wage employment for over 80 master artisans, preserving generational embroidery techniques in Pakistan.
            </p>
          </div>

          <div className="bg-[#FBF6EE] p-6 rounded-2xl border border-[#E8D8C8] space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#EFE4D6] flex items-center justify-center text-[#651B17]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif-display text-lg font-bold text-[#1B0E0A]">
              Perfect Stitched Fit
            </h3>
            <p className="text-xs text-[#21130F]/70 leading-relaxed font-light">
              Precision standardized sizing designed specifically for South Asian postures, ensuring effortless ready-to-wear grace.
            </p>
          </div>

          <div className="bg-[#FBF6EE] p-6 rounded-2xl border border-[#E8D8C8] space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#EFE4D6] flex items-center justify-center text-[#651B17]">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-serif-display text-lg font-bold text-[#1B0E0A]">
              Everyday Confidence
            </h3>
            <p className="text-xs text-[#21130F]/70 leading-relaxed font-light">
              Whether at an intimate Eid dholki or casual Sunday brunch, wear your culture with pride and unmistakable elegance.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
