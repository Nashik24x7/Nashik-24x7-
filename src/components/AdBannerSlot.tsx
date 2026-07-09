/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ExternalLink } from 'lucide-react';

interface AdBannerSlotProps {
  bannerUrl?: string | null;
  onBannerUpload?: (url: string | null) => void;
  isDarkMode: boolean;
  language?: 'en' | 'mr';
}

export const AdBannerSlot: React.FC<AdBannerSlotProps> = ({
  isDarkMode,
  language = 'mr'
}) => {
  const isMarathi = language === 'mr';
  const redirectUrl = 'https://danube.sales-centre.com/?utm_source=Google+Ads&utm_platform=Google+Search&utm_adset=danube+ww&utm_keyword=danube%20properties&gad_source=1&gad_campaignid=23450118939&gclid=CjwKCAjwx7LSBhB3EiwAjcodxP-99vo-ecfoCCiXDAROpW0N3Z6LH6JQpVLLeIWFyjvXEiveTlQtxBoC_CgQAvD_BwE';
  const imageUrl = "https://lh3.googleusercontent.com/d/1c9HJMSIUmt4KkMCoTFKr6XiXxiQZz20V";

  return (
    <div className="w-full mb-14 animate-fade-in" id="ad-banner-slot-container">

      {/* Complete Image-Only Clickable Billboard Banner */}
      <a 
        href={redirectUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-full rounded-2xl overflow-hidden shadow-xl border border-zinc-200 dark:border-zinc-800 bg-[#0e0e11] flex flex-col items-stretch group transition-all duration-300 hover:shadow-2xl hover:border-orange-500/50 block cursor-pointer"
      >
        <div className="relative w-full overflow-hidden">
          <img
            src={imageUrl}
            alt="Danube Properties Luxury Dubai Homes"
            className="w-full h-auto object-cover transform scale-100 group-hover:scale-[1.01] transition-transform duration-500 select-none pointer-events-none rounded-2xl"
            referrerPolicy="no-referrer"
          />
          {/* Subtle overlay badge in corner that fades slightly on hover */}
          <div className="absolute bottom-3 right-3 z-10 bg-black/75 hover:bg-black/90 text-[8px] font-mono font-bold text-zinc-400 py-1 px-2.5 rounded tracking-wider uppercase backdrop-blur-sm transition-all">
            {isMarathi ? 'क्लिक करा' : 'CLICK TO VISIT'}
          </div>
        </div>
      </a>
    </div>
  );
};
