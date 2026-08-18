/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Sparkles, ArrowRight, UtensilsCrossed, ChevronDown, 
  ChevronUp, Heart, BookOpen, MapPin, Share2, Check
} from 'lucide-react';
import { NewsArticle } from '../types';
import { DEFAULT_ARTICLES } from '../defaultArticles';

interface AdBannerSlotProps {
  bannerUrl?: string | null;
  onBannerUpload?: (url: string | null) => void;
  isDarkMode: boolean;
  language?: 'en' | 'mr';
  onOpenArticle?: (article: NewsArticle) => void;
}

export const AdBannerSlot: React.FC<AdBannerSlotProps> = ({
  isDarkMode,
  language = 'mr',
  onOpenArticle
}) => {
  const isMarathi = language === 'mr';
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(428);
  const [copied, setCopied] = useState(false);

  // Retrieve the promotional article from default dataset or fallback
  const promoArticle = DEFAULT_ARTICLES.find(a => a.id === 'promo-kachori-cafe-2026') || {
    id: 'promo-kachori-cafe-2026',
    title: 'The Kachori Cafe — One India, Many Kachoris',
    marathiTitle: 'द कचोरी कॅफे — एक भारत, अनेक कचोऱ्या',
    marathiSource: 'nashik24x7.com' as const,
    subtitle: 'India’s food culture is a beautiful reflection of its history, geography and traditions. Discover the diverse world of Indian kachoris under one roof.',
    marathiSubtitle: 'भारताच्या समृद्ध स्ट्रीट-फूड संस्कृतीचा अनोखा संगम; विविध प्रांतांमधील अस्सल चवीच्या कचोऱ्या आता एकाच छताखाली.',
    category: 'City Buzz' as const,
    author: 'Special Food Feature Desk',
    date: 'July 30, 2026',
    readTime: 4,
    imageUrl: 'https://lh3.googleusercontent.com/d/1A5E4ESNFpdQ5dAnqJnhBUPu3HxQdcFgb',
    likes: 428,
    comments: [],
    body: '',
    marathiBody: ''
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLiked) {
      setLikeCount(prev => prev - 1);
      setIsLiked(false);
    } else {
      setLikeCount(prev => prev + 1);
      setIsLiked(true);
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCardClick = () => {
    if (onOpenArticle) {
      onOpenArticle(promoArticle);
    }
  };

  return (
    <section 
      id="promotional-feature-advertorial"
      aria-label="Promotional Feature Story"
      className="w-full mb-10 animate-fade-in"
    >
      <div className={`relative w-full rounded-2xl overflow-hidden border transition-all duration-300 shadow-md hover:shadow-xl ${
        isDarkMode 
          ? 'bg-gradient-to-b from-[#18181c] via-[#141417] to-[#101013] border-amber-500/25' 
          : 'bg-gradient-to-b from-[#fffbf5] via-[#fffdfa] to-white border-amber-300/70 shadow-amber-900/5'
      }`}>
        
        {/* Top Header Label Bar */}
        <div className={`px-4 sm:px-6 py-2.5 flex items-center justify-between border-b flex-wrap gap-2 ${
          isDarkMode 
            ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' 
            : 'bg-amber-500/10 border-amber-500/20 text-amber-900'
        }`}>
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center p-1 rounded bg-amber-500 text-white shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <span className="text-[11px] font-mono font-bold tracking-wider uppercase">
              {isMarathi ? 'प्रायोजित विशेषांक • खास खाद्यसंस्कृती' : 'PROMOTIONAL SPECIAL FEATURE • FOOD & CULTURE'}
            </span>
            <span className="hidden sm:inline text-amber-500/50">•</span>
            <span className={`hidden sm:inline-flex items-center gap-1 text-[10px] font-sans font-semibold px-2 py-0.5 rounded-full ${
              isDarkMode ? 'bg-zinc-800 text-amber-300' : 'bg-white text-amber-800 border border-amber-200'
            }`}>
              <UtensilsCrossed className="w-3 h-3 text-amber-500" />
              {isMarathi ? 'नवीन उद्घाटन / खास कट्टा' : 'New Culinary Landmark'}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <button
              onClick={handleShare}
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                isDarkMode ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-amber-100 text-zinc-600'
              }`}
              title="Share Story"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Share2 className="w-3 h-3" />}
              <span>{copied ? (isMarathi ? 'लिंक कॉपी केली' : 'Copied!') : (isMarathi ? 'शेअर करा' : 'Share')}</span>
            </button>

            <button
              onClick={handleLike}
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                isLiked 
                  ? 'text-rose-500 font-bold' 
                  : isDarkMode ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-amber-100 text-zinc-600'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span className="font-mono">{likeCount}</span>
            </button>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="p-4 sm:p-6 lg:p-7">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* Image Column */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <div 
                onClick={handleCardClick}
                className="relative rounded-xl overflow-hidden border border-amber-500/30 group cursor-pointer shadow-md"
              >
                <img
                  src="https://lh3.googleusercontent.com/d/1A5E4ESNFpdQ5dAnqJnhBUPu3HxQdcFgb"
                  alt="The Kachori Cafe — One India, Many Kachoris"
                  className="w-full h-[240px] sm:h-[300px] lg:h-[340px] object-cover object-center transform group-hover:scale-105 transition-transform duration-700 select-none"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
                
                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Corner Slogan Overlay Badge */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="bg-amber-600/90 backdrop-blur-xs text-white text-[10px] sm:text-[11px] font-bold font-sans px-3 py-1 rounded-md shadow-sm">
                    {isMarathi ? 'एक भारत • अनेक कचोऱ्या' : 'One India • Many Kachoris'}
                  </span>
                  <span className="bg-black/70 backdrop-blur-xs text-zinc-300 text-[10px] font-mono px-2 py-1 rounded">
                    4 Min Read
                  </span>
                </div>
              </div>

              {/* Regional Varieties Showcase Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  { name: isMarathi ? 'हरिद्वार कचोरी' : 'Haridwar Kachori', color: 'border-orange-500/30 text-orange-600 dark:text-orange-400' },
                  { name: isMarathi ? 'जोधपूर प्याज कचोरी' : 'Jodhpur Pyaz Kachori', color: 'border-amber-500/30 text-amber-600 dark:text-amber-400' },
                  { name: isMarathi ? 'कोटा कचोरी' : 'Kota Kachori', color: 'border-yellow-600/30 text-yellow-700 dark:text-yellow-400' },
                  { name: isMarathi ? 'शेगाव कचोरी' : 'Shegaon Kachori', color: 'border-emerald-500/30 text-emerald-700 dark:text-emerald-400' },
                  { name: isMarathi ? 'मथुरा बेढई पुरी' : 'Mathura Bedai', color: 'border-rose-500/30 text-rose-600 dark:text-rose-400' },
                  { name: isMarathi ? 'नाशिक मिसळ कचोरी' : 'Nashik Misal Kachori', color: 'border-indigo-500/30 text-indigo-600 dark:text-indigo-400 font-bold' },
                  { name: isMarathi ? 'कचोरी सिझलर्स' : 'Kachori Sizzlers', color: 'border-red-500/30 text-red-600 dark:text-red-400' },
                  { name: isMarathi ? 'अस्सल जलेबी व घेवर' : 'Jalebi & Ghevar', color: 'border-amber-600/30 text-amber-700 dark:text-amber-300' }
                ].map((item, idx) => (
                  <span 
                    key={idx}
                    className={`text-[10px] font-medium font-sans px-2.5 py-1 rounded-full bg-amber-500/5 border ${item.color}`}
                  >
                    • {item.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Article Text Column */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                {/* Headline */}
                <h2 
                  onClick={handleCardClick}
                  className={`font-serif text-xl sm:text-2xl lg:text-3xl font-extrabold leading-tight tracking-tight mb-2 cursor-pointer transition-colors ${
                    isDarkMode 
                      ? 'text-zinc-100 hover:text-amber-400' 
                      : 'text-zinc-900 hover:text-amber-700'
                  }`}
                >
                  {isMarathi 
                    ? 'द कचोरी कॅफे — एक भारत, अनेक कचोऱ्या' 
                    : 'The Kachori Cafe — One India, Many Kachoris'}
                </h2>

                {/* Subtitle */}
                <p className={`font-sans text-xs sm:text-sm font-medium leading-relaxed mb-4 ${
                  isDarkMode ? 'text-amber-400/90' : 'text-amber-900/90'
                }`}>
                  {isMarathi
                    ? 'भारताच्या समृद्ध स्ट्रीट-फूड संस्कृतीचा अनोखा संगम; विविध प्रांतांमधील अस्सल चवीच्या कचोऱ्या आता एकाच छताखाली.'
                    : 'India’s food culture is a beautiful reflection of its history, geography and traditions. Across the country, different regions have developed their own flavours, ingredients and culinary techniques.'}
                </p>

                {/* Editorial Body Excerpt */}
                <div className={`space-y-3 font-serif text-xs sm:text-[13px] leading-relaxed ${
                  isDarkMode ? 'text-zinc-300' : 'text-zinc-700'
                }`}>
                  <p>
                    {isMarathi
                      ? `'द कचोरी कॅफे'ची निर्मिती एका साध्या पण अत्यंत महत्त्वाकांक्षी संकल्पनेतून झाली: भारतातील विविध प्रांतांमधील कचोऱ्यांचे वैविध्य एकाच छताखाली आणणे. वेगवेगळ्या प्रांतांमधील अस्सल चवी चाखण्यासाठी शहर दर शहर भटकण्याऐवजी, भारतीय स्ट्रीट-फूडच्या प्रेरणेतून साकारलेल्या एका आधुनिक कॅफेमध्ये एकाच मेन्यूद्वारे संपूर्ण भारताची चव अनुभवता येईल.`
                      : `The Kachori Cafe was created with a simple yet ambitious idea: to bring the diverse world of Indian kachoris together under one roof. Instead of travelling from city to city to experience different regional varieties, guests can discover the flavours of India through a single menu at a contemporary café inspired by the spirit of Indian street food.`}
                  </p>

                  <p>
                    {isMarathi
                      ? `राजस्थानची प्रसिद्ध 'जोधपूर प्याज कचोरी', कोटा कचोरी, उत्तर भारताची आलू-भाजी कचोरी, मथुरेची 'बेढई पुरी', महाराष्ट्राची खास 'नाशिक मिसळ कचोरी', आणि अनोखे 'कचोरी सिझलर्स'—येथे परंपरेचा आदर आणि आधुनिक नावीन्यता यांचा सुंदर संगम साधला आहे.`
                      : `Across India, the kachori takes many forms: in Rajasthan, the famous Jodhpur Pyaz Kachori; in Kota, its distinctive spicy identity; in North India, kachori with aloo sabzi; in Mathura, the Bedai; and in Maharashtra, iconic local interpretations including the inventive Nashik Misal Kachori & TKC Fusion Sizzlers.`}
                  </p>

                  {/* Expanded content when user toggles inline */}
                  {isExpanded && (
                    <div className="pt-2 space-y-3 border-t border-dashed border-amber-500/30 animate-fade-in">
                      <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 font-sans text-xs">
                        <strong className="text-amber-600 dark:text-amber-400 block mb-1 font-bold">
                          {isMarathi ? '🌟 ' + 'तत्वज्ञान:' : '🌟 The Philosophy:'}
                        </strong>
                        <p className="italic">
                          {isMarathi 
                            ? 'परंपरेचा आदर करा. चव समजून घ्या. मग धाडसाने नवीन प्रयोग करा! अस्सल चव हीच पहिली प्राथमिकता.' 
                            : 'Respect the tradition. Understand the flavour. Then dare to innovate. Authentic taste comes first.'}
                        </p>
                      </div>

                      <p>
                        {isMarathi
                          ? `कचोरीसोबतच अस्सल कुरकुरीत जिलेबी, बनारसी थंडाई, मिरची वडा, मेथी मठरी आणि पारंपरिक घेवर अशा अनेक खाद्यपदार्थांचा समावेश असलेला हा मेन्यू म्हणजे संपूर्ण भारताचा एक छोटा खाद्य-नकाशा आहे.`
                          : `Beyond kachori, the menu celebrates India’s wider snacking culture with authentic crisp Jalebi, rich Banarasi Thandai, Mirchi Bada, Methi Mathri, Nimki, and regal Ghevar.`}
                      </p>

                      <p className="font-sans font-medium text-amber-700 dark:text-amber-400 text-xs">
                        {isMarathi 
                          ? 'द कचोरी कॅफे — एक भारत, अनेक कचोऱ्या, एक अविस्मरणीय खाद्यप्रवास!' 
                          : 'The Kachori Cafe — One India. Many Kachoris. One unforgettable journey.'}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons & Footer Controls */}
              <div className="mt-5 pt-4 border-t border-amber-500/20 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {/* Primary Read in Modal Button */}
                  <button
                    onClick={handleCardClick}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-sans text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>{isMarathi ? 'संपूर्ण लेख वाचा' : 'Read Full Feature'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {/* Inline Quick Expand/Collapse Button */}
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-sans font-semibold transition-colors cursor-pointer ${
                      isDarkMode 
                        ? 'border-zinc-700 text-zinc-300 hover:bg-zinc-800' 
                        : 'border-amber-300 text-amber-900 hover:bg-amber-100/60'
                    }`}
                  >
                    {isExpanded ? (
                      <>
                        <span>{isMarathi ? 'संक्षिप्त करा' : 'Show Less'}</span>
                        <ChevronUp className="w-3.5 h-3.5" />
                      </>
                    ) : (
                      <>
                        <span>{isMarathi ? 'विस्तारित करा' : 'Quick Preview'}</span>
                        <ChevronDown className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400">
                  <span>{isMarathi ? 'दिनांक: ३० जुलै २०२६' : 'Date: July 30, 2026'}</span>
                  <span>•</span>
                  <span>Nashik 24x7 Special</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
