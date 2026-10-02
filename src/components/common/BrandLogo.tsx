import React from 'react';
import logoImg from '../../assets/logo.png';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  light?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  light = true,
}) => {
  const sizeClasses = {
    sm: 'h-9 sm:h-10 max-w-[150px]',
    md: 'h-13 sm:h-15 lg:h-16 max-w-[200px] sm:max-w-[225px] lg:max-w-[245px]',
    lg: 'h-18 sm:h-22 max-w-[280px]',
    xl: 'h-24 sm:h-28 max-w-[340px]',
  };

  return (
    <div className={`flex flex-col items-start justify-center select-none text-left bg-transparent ${className}`}>
      <img
        src={logoImg}
        alt="DESI DRIP - Clothing Brand"
        referrerPolicy="no-referrer"
        className={`${sizeClasses[size]} w-auto object-contain object-left transition-transform duration-300 group-hover:scale-105 filter drop-shadow-md bg-transparent`}
        style={{ backgroundColor: 'transparent' }}
        onError={(e) => {
          // Fallback to direct path if needed
          const target = e.currentTarget;
          if (!target.src.includes('ChatGPT')) {
            target.src = '/ChatGPT Image Oct 1, 2026, 09_27_15 PM.png';
          }
        }}
      />
    </div>
  );
};

