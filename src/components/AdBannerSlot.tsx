/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { 
  Upload, Image as ImageIcon, X, ExternalLink, 
  Sparkles, Megaphone, Check
} from 'lucide-react';

interface AdBannerSlotProps {
  bannerUrl?: string | null;
  onBannerUpload?: (url: string | null) => void;
  isDarkMode: boolean;
  language?: 'en' | 'mr';
}

export const AdBannerSlot: React.FC<AdBannerSlotProps> = ({
  bannerUrl,
  onBannerUpload,
  isDarkMode,
  language = 'mr',
}) => {
  const isMarathi = language === 'mr';
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [inputUrl, setInputUrl] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (onBannerUpload) {
          onBannerUpload(result);
        }
        setShowUploadModal(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl.trim() && onBannerUpload) {
      onBannerUpload(inputUrl.trim());
      setInputUrl('');
      setShowUploadModal(false);
    }
  };

  const handleRemoveBanner = () => {
    if (onBannerUpload) {
      onBannerUpload(null);
    }
  };

  const handleCopyContact = () => {
    navigator.clipboard.writeText('ads@nashik24x7.com | +91 98220 00000');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section 
      id="advertisement-banner-slot" 
      aria-label="Advertisement Banner"
      className="w-full mb-8 animate-fade-in"
    >
      <div className="flex items-center justify-between px-1 mb-1.5">
        <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-zinc-400">
          {isMarathi ? 'जाहिरात • Sponsored' : 'Advertisement • Sponsored'}
        </span>
        <div className="flex items-center gap-2">
          {bannerUrl && onBannerUpload && (
            <button
              onClick={handleRemoveBanner}
              className={`text-[10px] font-sans px-2 py-0.5 rounded cursor-pointer transition-colors ${
                isDarkMode ? 'bg-zinc-800 text-zinc-400 hover:text-red-400' : 'bg-gray-100 text-gray-500 hover:text-red-600'
              }`}
            >
              {isMarathi ? 'बॅनर काढा' : 'Remove Banner'}
            </button>
          )}
          {onBannerUpload && (
            <button
              onClick={() => setShowUploadModal(true)}
              className={`text-[10px] font-sans flex items-center gap-1 px-2 py-0.5 rounded cursor-pointer transition-colors ${
                isDarkMode 
                  ? 'bg-zinc-800 text-orange-400 hover:bg-zinc-700' 
                  : 'bg-orange-50 text-orange-600 border border-orange-200 hover:bg-orange-100'
              }`}
            >
              <Upload className="w-2.5 h-2.5" />
              <span>{bannerUrl ? (isMarathi ? 'बॅनर बदला' : 'Change Banner') : (isMarathi ? 'बॅनर अपलोड' : 'Upload Banner')}</span>
            </button>
          )}
        </div>
      </div>

      {bannerUrl ? (
        <div className={`relative w-full rounded-xl overflow-hidden border transition-all duration-300 shadow-sm hover:shadow-md ${
          isDarkMode ? 'border-zinc-800 bg-zinc-900' : 'border-gray-200 bg-white'
        }`}>
          <img 
            src={bannerUrl} 
            alt="Advertisement Banner" 
            className="w-full h-auto max-h-[180px] sm:max-h-[220px] object-cover object-center block"
          />
        </div>
      ) : (
        /* Default Sleek Regional Sponsor Space */
        <div className={`w-full rounded-xl border p-4 sm:p-6 transition-all duration-300 flex flex-col sm:flex-row items-center justify-between gap-4 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-950 border-zinc-800 text-zinc-200' 
            : 'bg-gradient-to-r from-amber-50/60 via-orange-50/40 to-white border-orange-100 text-zinc-800'
        }`}>
          <div className="flex items-center gap-3.5 text-left w-full sm:w-auto">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0 text-orange-500">
              <Megaphone className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-sm sm:text-base">
                  {isMarathi ? 'नाशिक २४x७ सह आपल्या व्यवसायाची जाहिरात करा' : 'Advertise Your Brand on Nashik 24x7'}
                </span>
                <span className="text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-orange-500/15 text-orange-500">
                  {isMarathi ? 'विशेष जागा' : 'Prime Slot'}
                </span>
              </div>
              <p className="text-xs text-zinc-500 mt-0.5 font-sans">
                {isMarathi 
                  ? 'दररोज हजारो नाशिककरांपर्यंत थेट पोहोचण्यासाठी आजच संपर्क साधा.'
                  : 'Reach thousands of daily readers across Nashik district and North Maharashtra.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={handleCopyContact}
              className={`px-3.5 py-2 rounded-lg text-xs font-medium font-sans flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 ${
                isDarkMode 
                  ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700' 
                  : 'bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-200 shadow-xs'
              }`}
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <ExternalLink className="w-3.5 h-3.5 text-orange-500" />}
              <span>{isCopied ? (isMarathi ? 'माहिती कॉपी झाली!' : 'Copied!') : (isMarathi ? 'जाहिरातीसाठी संपर्क' : 'Contact for Ads')}</span>
            </button>
            {onBannerUpload && (
              <button
                onClick={() => setShowUploadModal(true)}
                className="px-3.5 py-2 rounded-lg text-xs font-semibold font-sans bg-orange-500 hover:bg-orange-600 text-white transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 shadow-xs"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>{isMarathi ? 'बॅनर लावा' : 'Place Banner'}</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-2xl p-6 border shadow-2xl relative animate-fade-in ${
            isDarkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-100' : 'bg-white border-zinc-200 text-zinc-800'
          }`}>
            <button
              onClick={() => setShowUploadModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold font-serif mb-1 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-orange-500" />
              {isMarathi ? 'जाहिरात बॅनर जोडा' : 'Add Advertisement Banner'}
            </h3>
            <p className="text-xs text-zinc-500 mb-4 font-sans">
              {isMarathi 
                ? 'आपल्या संगणकावरून इमेज निवडा किंवा थेट इमेज URL टाका.' 
                : 'Upload an image from your device or paste an image URL directly.'}
            </p>

            {/* File Upload Option */}
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors mb-4 ${
                isDarkMode 
                  ? 'border-zinc-700 hover:border-orange-500 bg-zinc-800/40' 
                  : 'border-zinc-300 hover:border-orange-500 bg-zinc-50'
              }`}
            >
              <Upload className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <p className="text-xs font-semibold font-sans mb-1">
                {isMarathi ? 'इमेज फाइल निवडा' : 'Choose image file'}
              </p>
              <p className="text-[11px] text-zinc-400">
                PNG, JPG, WEBP, GIF (Max 5MB)
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            <div className="relative flex py-2 items-center">
              <div className="grow border-t border-zinc-200 dark:border-zinc-700"></div>
              <span className="shrink mx-3 text-xs text-zinc-400 font-mono uppercase">
                {isMarathi ? 'किंवा URL' : 'OR URL'}
              </span>
              <div className="grow border-t border-zinc-200 dark:border-zinc-700"></div>
            </div>

            {/* URL Form */}
            <form onSubmit={handleUrlSubmit} className="mt-3">
              <input
                type="url"
                placeholder="https://example.com/banner.jpg"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                className={`w-full text-xs px-3.5 py-2.5 rounded-lg border mb-3 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  isDarkMode 
                    ? 'bg-zinc-800 border-zinc-700 text-zinc-100 placeholder-zinc-500' 
                    : 'bg-white border-zinc-300 text-zinc-800 placeholder-zinc-400'
                }`}
              />
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className={`px-3 py-2 rounded-lg text-xs font-sans font-medium transition-colors cursor-pointer ${
                    isDarkMode ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-zinc-100 text-zinc-600'
                  }`}
                >
                  {isMarathi ? 'रद्द करा' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={!inputUrl.trim()}
                  className="px-4 py-2 rounded-lg text-xs font-sans font-semibold bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white transition-colors cursor-pointer"
                >
                  {isMarathi ? 'बॅनर लागू करा' : 'Apply Banner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
