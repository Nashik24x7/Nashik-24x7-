/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Heart, MessageSquare, Clock, ThumbsUp } from 'lucide-react';
import { NewsArticle } from '../types';
import { MARATHI_ARTICLES_TRANSLATIONS } from '../marathiTranslations';
import { SafeImage } from './SafeImage';

interface ArticleCardProps {
  article: NewsArticle;
  layout: 'lead' | 'standard' | 'bulletin' | 'editorial';
  onRead: (article: NewsArticle) => void;
  isBookmarked: boolean;
  onBookmarkToggle: (id: string, e: React.MouseEvent) => void;
  onLike: (id: string, e: React.MouseEvent) => void;
  language: 'en' | 'mr';
  onLanguageToggle: () => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  layout,
  onRead,
  isBookmarked,
  onBookmarkToggle,
  onLike,
  language,
  onLanguageToggle
}) => {
  const isMarathi = language === 'mr';
  const translation = isMarathi ? MARATHI_ARTICLES_TRANSLATIONS[article.id] : null;

  // Bilingual Display helpers
  const displayedTitle = isMarathi ? (translation?.title || article.marathiTitle || article.title) : article.title;
  const displayedSubtitle = isMarathi ? (translation?.subtitle || article.subtitle) : article.subtitle;
  const displayedSource = isMarathi ? (article.marathiSource || 'nashik24x7.com') : 'nashik24x7.com';

  const getCategoryLabel = (cat: string) => {
    if (!isMarathi) return cat;
    switch (cat) {
      case 'Panchavati': return 'नाशिक शहर';
      case 'Education': return 'शिक्षण';
      case 'City Buzz': return 'क्रीडा / कट्टा';
      case 'Politics': return 'राजकारण';
      case 'Business': return 'व्यापार';
      case 'Lifestyle': return 'जीवनशैली';
      case 'Heritage': return 'वारसा';
      default: return 'नाशिक वृत्त';
    }
  };

  // Lead layout (Featured big headline at the top center)
  if (layout === 'lead') {
    return (
      <div 
        onClick={() => onRead(article)}
        className="group cursor-pointer flex flex-col gap-4 border-b border-zinc-200 dark:border-zinc-800/80 pb-6 hover:opacity-98 transition-all h-full select-none"
      >
        <div className="relative w-full overflow-hidden rounded-lg bg-zinc-800">
          <SafeImage 
            src={article.imageUrl} 
            alt={displayedTitle}
            fallbackText={article.title}
            className="w-full h-[220px] sm:h-[320px] object-cover filter brightness-95 group-hover:scale-[1.01] transition-transform duration-500"
          />
          <span className="absolute top-4 left-4 bg-orange-600 text-white font-sans text-[10px] font-extrabold py-1 px-3 tracking-wider rounded shadow-md uppercase">
            {isMarathi ? 'आजची मुख्य बातमी' : 'Featured Story'}
          </span>
          {article.isBreaking && (
            <span className="absolute top-4 right-4 bg-red-600 text-white font-sans text-[10px] font-extrabold py-1 px-3 tracking-wider rounded shadow-md animate-pulse">
              BREAKER
            </span>
          )}
        </div>

        <div className="px-1 text-left">
          <div className="flex flex-wrap items-center gap-2.5 text-[10px] text-zinc-500 dark:text-zinc-400 font-sans mb-2">
            <span className="bg-orange-600/10 text-orange-600 dark:text-orange-400 px-2 py-0.5 rounded font-extrabold text-[10px]">
              {getCategoryLabel(article.category)}
            </span>
            <span>•</span>
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">
              {displayedSource === 'esakal.com' || displayedSource === 'nashik24x7.com' ? (isMarathi ? '२४x७ वृत्तसेवा' : '24x7 News Service') : displayedSource === 'lokmat.com' ? (isMarathi ? 'लोकमत न्यूज' : 'Lokmat News') : (isMarathi ? 'लोकसत्ता डेस्क' : 'Loksatta Desk')}
            </span>
            <span>•</span>
            <span>{article.date}</span>
          </div>

          <h2 className="font-serif text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 leading-tight tracking-tight mb-2.5 transition-colors">
            {displayedTitle}
          </h2>

          <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed line-clamp-2 sm:line-clamp-3 mb-4">
            {displayedSubtitle || article.body.split('\n\n')[0]}
          </p>

          <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono border-t border-zinc-100 dark:border-zinc-800/60 pt-3">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 font-sans">
                <Clock className="w-3.5 h-3.5" /> {article.readTime} {isMarathi ? 'मि. वाचन' : 'Min Read'}
              </span>
              <span className="flex items-center gap-1 font-sans">
                <MessageSquare className="w-3.5 h-3.5" /> {article.comments.length} {isMarathi ? 'मत' : 'Comments'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Language toggle inside Card */}
              <button
                onClick={(e) => { e.stopPropagation(); onLanguageToggle(); }}
                className="hover:border-orange-500 flex items-center gap-1 border border-zinc-200 dark:border-zinc-800 px-2 py-1 rounded shadow-2xs cursor-pointer text-[10px] font-sans font-bold bg-zinc-50 dark:bg-zinc-800/50"
                title="Switch Language / भाषा बदला"
              >
                <span className={language === 'en' ? 'text-orange-600 dark:text-orange-400 font-extrabold' : 'text-zinc-450 dark:text-zinc-500'}>EN</span>
                <span className="text-zinc-350 dark:text-zinc-700">/</span>
                <span className={language === 'mr' ? 'text-orange-600 dark:text-orange-400 font-extrabold' : 'text-zinc-450 dark:text-zinc-500'}>म</span>
              </button>

              <button 
                onClick={(e) => { e.stopPropagation(); onLike(article.id, e); }} 
                className="hover:text-orange-500 dark:hover:text-orange-400 flex items-center gap-1 border border-zinc-200 dark:border-zinc-800 px-2 py-1 rounded shadow-2xs cursor-pointer group/btn bg-zinc-50 dark:bg-zinc-800/50"
              >
                <ThumbsUp className="w-3 h-3 group-hover/btn:scale-110 transition-transform" /> 
                <span className="font-sans">{isMarathi ? 'आवडले' : 'Like'} ({article.likes})</span>
              </button>
              
              <button 
                onClick={(e) => { e.stopPropagation(); onBookmarkToggle(article.id, e); }}
                className="hover:text-rose-500 border border-zinc-200 dark:border-zinc-800 p-1.5 rounded hover:bg-rose-50 dark:hover:bg-rose-950/20 cursor-pointer bg-zinc-50 dark:bg-zinc-800/50"
                title="Save Paper"
              >
                <Heart className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-rose-600 stroke-rose-600 text-rose-600' : 'text-zinc-400'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Perspective Column/Essay Card
  if (layout === 'editorial') {
    return (
      <div 
        onClick={() => onRead(article)}
        className="group relative flex flex-col justify-between p-5 bg-zinc-50 dark:bg-[#151518] border border-zinc-200 dark:border-zinc-850 rounded-lg hover:shadow-md transition-all duration-300 cursor-pointer text-left h-full select-none"
      >
        <div className="absolute top-0 left-0 w-1 h-full bg-orange-600 rounded-l-lg"></div>
        
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-850 mb-3.5 text-[10px] font-sans text-zinc-500">
            <span className="text-orange-600 dark:text-orange-400 font-extrabold tracking-wider uppercase">
              {isMarathi ? '२४x७ विशेष • मत' : '24x7 Special • Opinion'}
            </span>
            <span>{article.date}</span>
          </div>

          <p className="text-[11px] font-sans italic text-orange-600 dark:text-orange-400 mb-1">{article.author}</p>
          
          <h3 className="font-serif text-base font-bold text-zinc-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors leading-snug mb-2">
            {displayedTitle}
          </h3>
          
          <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans line-clamp-3 leading-relaxed mb-4">
            {displayedSubtitle || article.subtitle}
          </p>
        </div>

        <div className="flex items-center justify-between text-[11px] text-zinc-500 font-sans pt-3 border-t border-zinc-200 dark:border-zinc-850/60 mt-3">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> {article.readTime} {isMarathi ? 'मि. वाचन' : 'Min Read'}
          </span>
          
          <div className="flex items-center gap-2">
            {/* Language toggle inside Card */}
            <button
              onClick={(e) => { e.stopPropagation(); onLanguageToggle(); }}
              className="hover:border-orange-500 flex items-center gap-1 border border-zinc-200 dark:border-zinc-800 px-1.5 py-0.5 rounded shadow-2xs cursor-pointer text-[9px] font-sans font-bold bg-zinc-50 dark:bg-zinc-800/50"
              title="Switch Language / भाषा बदला"
            >
              <span className={language === 'en' ? 'text-orange-600 dark:text-orange-400 font-extrabold' : 'text-zinc-450 dark:text-zinc-550'}>EN</span>
              <span className="text-zinc-350 dark:text-zinc-700">/</span>
              <span className={language === 'mr' ? 'text-orange-600 dark:text-orange-400 font-extrabold' : 'text-zinc-450 dark:text-zinc-550'}>म</span>
            </button>

            <button 
              onClick={(e) => { e.stopPropagation(); onLike(article.id, e); }} 
              className="hover:text-orange-500 dark:hover:text-orange-400 flex items-center gap-0.5 cursor-pointer"
            >
              <ThumbsUp className="w-3 h-3 text-zinc-400" /> {article.likes}
            </button>
            <span className="flex items-center gap-0.5">
              <MessageSquare className="w-3 h-3 text-zinc-400" /> {article.comments.length}
            </span>
            <button 
              onClick={(e) => { e.stopPropagation(); onBookmarkToggle(article.id, e); }}
              className="hover:text-rose-500 cursor-pointer"
            >
              <Heart className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-rose-600 stroke-rose-600 text-rose-600' : 'text-zinc-400'}`} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Bulletin/Short Row item
  if (layout === 'bulletin') {
    return (
      <div 
        onClick={() => onRead(article)}
        className="group py-3.5 border-b border-zinc-200 dark:border-zinc-850 hover:bg-zinc-100/50 dark:hover:bg-zinc-900/40 cursor-pointer transition-colors last:border-0 text-left select-none"
      >
        <div className="flex items-center justify-between gap-2 mb-1.5 text-[10px] font-sans text-zinc-500">
          <span className="bg-orange-600/10 text-orange-600 dark:text-orange-400 px-1.5 py-0.5 rounded font-bold text-[9px] uppercase">
            {getCategoryLabel(article.category)}
          </span>
          <span>{article.date}</span>
        </div>
        
        <h4 className="font-serif text-sm font-bold text-zinc-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 leading-snug transition-colors">
          {displayedTitle}
        </h4>
        
        <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 mt-1 font-sans">
          {displayedSubtitle || article.subtitle}
        </p>

        <div className="flex items-center justify-between text-[10px] text-zinc-500 mt-2 font-sans">
          <span>{displayedSource === 'esakal.com' || displayedSource === 'nashik24x7.com' ? (isMarathi ? '२४x७ वृत्त' : '24x7 News') : (isMarathi ? 'लोकमत' : 'Lokmat')}</span>
          <div className="flex items-center gap-2">
            {/* Language toggle inside Card */}
            <button
              onClick={(e) => { e.stopPropagation(); onLanguageToggle(); }}
              className="hover:border-orange-500 flex items-center gap-1 border border-zinc-200 dark:border-zinc-800 px-1 rounded shadow-2xs cursor-pointer text-[9px] font-sans font-bold bg-zinc-50 dark:bg-zinc-800/50"
              title="Switch Language / भाषा बदला"
            >
              <span className={language === 'en' ? 'text-orange-600 dark:text-orange-400 font-extrabold' : 'text-zinc-450 dark:text-zinc-550'}>EN</span>
              <span className="text-zinc-350 dark:text-zinc-700">/</span>
              <span className={language === 'mr' ? 'text-orange-600 dark:text-orange-400 font-extrabold' : 'text-zinc-450 dark:text-zinc-550'}>म</span>
            </button>

            <button 
              onClick={(e) => { e.stopPropagation(); onLike(article.id, e); }} 
              className="hover:text-orange-500 flex items-center gap-0.5 cursor-pointer"
            >
              <ThumbsUp className="w-3 h-3" /> {article.likes}
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onBookmarkToggle(article.id, e); }}
              className="hover:text-rose-500 cursor-pointer"
            >
              <Heart className={`w-3 h-3 ${isBookmarked ? 'fill-rose-600 text-rose-600' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Standard/Feed Row Layout (24x7 Left Image list layout!)
  return (
    <div 
      onClick={() => onRead(article)}
      className="group bg-white dark:bg-[#111114] border-b border-zinc-200 dark:border-zinc-850 p-3.5 sm:p-4 flex items-start gap-4 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-all cursor-pointer text-left select-none"
    >
      {/* Left Rounded Image */}
      <div className="relative w-28 h-20 sm:w-36 sm:h-24 rounded-lg overflow-hidden bg-zinc-800 shrink-0 border border-zinc-200 dark:border-zinc-850">
        <SafeImage 
          src={article.imageUrl} 
          alt={displayedTitle}
          fallbackText={article.title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
        />
        {article.isBreaking && (
          <span className="absolute bottom-1 left-1 bg-red-600 text-white text-[8px] font-extrabold px-1 py-0.5 rounded shadow">
            BREAKING
          </span>
        )}
      </div>

      {/* Right Content Space */}
      <div className="flex-1 min-w-0 flex flex-col justify-between h-20 sm:h-24">
        <div>
          {/* Metadata Top */}
          <div className="flex items-center gap-2 text-[10px] text-zinc-500 dark:text-zinc-400 font-sans mb-1">
            <span className="font-extrabold text-orange-600 dark:text-orange-400">
              {getCategoryLabel(article.category)}
            </span>
            <span>•</span>
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">
              {displayedSource === 'esakal.com' || displayedSource === 'nashik24x7.com' ? (isMarathi ? '२४x७ वृत्तसेवा' : '24x7 News Service') : displayedSource === 'lokmat.com' ? (isMarathi ? 'लोकमत न्यूज' : 'Lokmat News') : (isMarathi ? 'लोकसत्ता डेस्क' : 'Loksatta Desk')}
            </span>
          </div>

          {/* Headline Title */}
          <h3 className="font-sans text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 leading-snug transition-colors line-clamp-2">
            {displayedTitle}
          </h3>
        </div>

        {/* Action Belt Bottom */}
        <div className="flex items-center justify-between text-[11px] text-zinc-500 font-sans pt-1.5 mt-0.5 border-t border-zinc-100 dark:border-zinc-850/40">
          <span className="flex items-center gap-1 font-mono text-[10px]">
            <Clock className="w-3 h-3" /> {article.readTime} {isMarathi ? 'मि.' : 'Min'}
          </span>

          <div className="flex items-center gap-2.5">
            {/* Language toggle inside Card beside Like */}
            <button
              onClick={(e) => { e.stopPropagation(); onLanguageToggle(); }}
              className="hover:border-orange-500 flex items-center gap-1 border border-zinc-200 dark:border-zinc-800 px-1.5 py-0.5 rounded shadow-2xs cursor-pointer text-[9px] font-sans font-bold bg-zinc-50 dark:bg-zinc-800/50"
              title="Switch Language / भाषा बदला"
            >
              <span className={language === 'en' ? 'text-orange-600 dark:text-orange-400 font-extrabold' : 'text-zinc-450 dark:text-zinc-550'}>EN</span>
              <span className="text-zinc-350 dark:text-zinc-700">/</span>
              <span className={language === 'mr' ? 'text-orange-600 dark:text-orange-400 font-extrabold' : 'text-zinc-450 dark:text-zinc-550'}>म</span>
            </button>

            <button 
              onClick={(e) => { e.stopPropagation(); onLike(article.id, e); }}
              className="hover:text-orange-500 dark:hover:text-orange-400 flex items-center gap-0.5 cursor-pointer"
              title="Like"
            >
              <ThumbsUp className="w-3 h-3" /> {article.likes}
            </button>

            <button 
              onClick={(e) => { e.stopPropagation(); onBookmarkToggle(article.id, e); }}
              className="hover:text-rose-500 cursor-pointer"
              title="Save"
            >
              <Heart className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-rose-600 stroke-rose-600 text-rose-600' : 'text-zinc-400'}`} />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
