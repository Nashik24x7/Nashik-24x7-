/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowLeft, Heart, ThumbsUp, MessageSquare, Clock, Calendar, Send, Copy, Check } from 'lucide-react';
import { NewsArticle, ArticleComment } from '../types';
import { MARATHI_ARTICLES_TRANSLATIONS } from '../marathiTranslations';
import { SafeImage } from './SafeImage';

interface ArticleViewModalProps {
  article: NewsArticle | null;
  onClose: () => void;
  isBookmarked: boolean;
  onBookmarkToggle: (id: string, e: React.MouseEvent) => void;
  onLike: (id: string, e: React.MouseEvent) => void;
  onAddComment: (articleId: string, comment: Omit<ArticleComment, 'id' | 'date'>) => void;
  language: 'en' | 'mr';
  onLanguageToggle: () => void;
}

export const ArticleViewModal: React.FC<ArticleViewModalProps> = ({
  article,
  onClose,
  isBookmarked,
  onBookmarkToggle,
  onLike,
  onAddComment,
  language,
  onLanguageToggle
}) => {
  if (!article) return null;

  const [fontSizeClass, setFontSizeClass] = useState<'text-xs' | 'text-sm' | 'text-base' | 'text-lg'>('text-base');
  const [copiedLink, setCopiedLink] = useState(false);
  
  // Comment forms
  const [authorName, setAuthorName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [formError, setFormError] = useState('');

  const isMarathi = language === 'mr';
  const translation = isMarathi ? MARATHI_ARTICLES_TRANSLATIONS[article.id] : null;

  const displayedTitle = isMarathi ? (translation?.title || article.marathiTitle || article.title) : article.title;
  const displayedSubtitle = isMarathi ? (translation?.subtitle || article.marathiSubtitle || article.subtitle) : article.subtitle;
  const displayedBody = isMarathi ? (translation?.body || article.marathiBody || article.body) : article.body;
  const displayedAuthor = isMarathi ? (translation?.author || article.author) : article.author;
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

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !commentText.trim()) {
      setFormError(isMarathi ? 'कृपया नाव आणि मत दोन्ही प्रविष्ट करा.' : 'Please enter both your name and comment.');
      return;
    }
    
    onAddComment(article.id, {
      author: authorName.trim(),
      text: commentText.trim()
    });

    setCommentText('');
    setFormError('');
  };

  const fontOptions: { label: string; value: typeof fontSizeClass }[] = [
    { label: isMarathi ? 'बारीक' : 'Small', value: 'text-xs' },
    { label: isMarathi ? 'मध्यम' : 'Medium', value: 'text-sm' },
    { label: isMarathi ? 'मोठे' : 'Large', value: 'text-base' },
    { label: isMarathi ? 'अति मोठे' : 'Extra Large', value: 'text-lg' }
  ];

  return (
    <div className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center z-50 p-3 md:p-6 animate-fade-in">
      <div className="bg-white dark:bg-[#111114] text-zinc-800 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 shadow-2xl max-w-4xl w-full h-full max-h-[92vh] flex flex-col rounded-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Controls Bar - Only contains Back button and Language Switcher */}
        <div className="px-4 py-3 bg-zinc-50 dark:bg-[#18181c] border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between shrink-0">
          {/* Back Button */}
          <button 
            onClick={onClose}
            className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 hover:text-orange-600 dark:hover:text-white bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-850 border border-zinc-200 dark:border-zinc-800 py-1.5 px-3.5 rounded-lg cursor-pointer transition-all text-xs font-sans font-bold shadow-xs"
            title={isMarathi ? 'मागे जा' : 'Back to Home'}
          >
            <ArrowLeft className="w-4 h-4 text-orange-500" />
            <span>{isMarathi ? 'मागे जा' : 'Back'}</span>
          </button>

          {/* Language Toggle */}
          <button
            onClick={onLanguageToggle}
            className="hover:border-orange-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center gap-1.5 border border-zinc-200 dark:border-zinc-800 px-3.5 py-1.5 rounded-full text-xs font-sans font-bold bg-zinc-50 dark:bg-zinc-900 transition-all cursor-pointer text-zinc-700 dark:text-zinc-300 shadow-xs"
            title="Switch Language / भाषा बदला"
          >
            <span className={language === 'en' ? 'text-orange-500 font-extrabold' : 'text-zinc-500'}>EN</span>
            <span className="text-zinc-400 dark:text-zinc-700">/</span>
            <span className={language === 'mr' ? 'text-orange-500 font-extrabold' : 'text-zinc-500'}>म</span>
          </button>
        </div>

        {/* Core Reading Content */}
        <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-6">
          <div className="max-w-3xl mx-auto">
            
            {/* Category tag & Metadata */}
            <div className="flex flex-wrap items-center gap-2.5 mb-3.5 text-[11px] text-zinc-500 dark:text-zinc-400 font-sans">
              <span className="text-orange-500 font-extrabold tracking-wider uppercase border-b border-orange-500/30">
                {getCategoryLabel(article.category)}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" /> {article.readTime} {isMarathi ? 'मि. वाचन' : 'Min Read'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" /> {article.date}
              </span>
            </div>

            {/* News Headline */}
            <h1 className="font-serif text-2xl md:text-4xl font-black text-zinc-900 dark:text-white leading-tight tracking-tight mb-4">
              {displayedTitle}
            </h1>

            {/* Subtitle/Subheadline */}
            <p className="font-sans text-sm md:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed italic border-l-2 border-orange-500 pl-4 mb-6">
              {displayedSubtitle}
            </p>

            {/* Byline & Interaction Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3.5 border-y border-zinc-200 dark:border-zinc-800/80 mb-6 text-xs text-zinc-600 dark:text-zinc-300">
              <div className="font-sans">
                <span className="text-zinc-400 dark:text-zinc-500">By</span> <span className="font-bold text-zinc-900 dark:text-white">{displayedAuthor}</span>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Recommend */}
                <button
                  onClick={(e) => onLike(article.id, e)}
                  className="flex items-center gap-1.5 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 py-1.5 px-3 rounded text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer font-sans shadow-xs"
                >
                  <ThumbsUp className="w-3.5 h-3.5 text-orange-500" />
                  <span>{isMarathi ? 'आवडले' : 'Like'} ({article.likes})</span>
                </button>

                {/* Bookmark */}
                <button
                  onClick={(e) => onBookmarkToggle(article.id, e)}
                  className="flex items-center gap-1.5 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 py-1.5 px-3 rounded text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer font-sans shadow-xs"
                >
                  <Heart className={`w-3.5 h-3.5 ${isBookmarked ? 'text-rose-500 fill-rose-500 animate-pulse' : 'text-zinc-400 dark:text-zinc-500'}`} />
                  <span>{isBookmarked ? (isMarathi ? 'जतन केले' : 'Saved') : (isMarathi ? 'जतन करा' : 'Save')}</span>
                </button>

                {/* Share Link */}
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-1.5 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 py-1.5 px-3 rounded text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer font-sans shadow-xs"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />}
                  <span>{copiedLink ? (isMarathi ? 'कॉपी झाले' : 'Copied!') : (isMarathi ? 'शेअर' : 'Share')}</span>
                </button>
              </div>
            </div>

            {/* Header Cover Image */}
            <div className="mb-6 bg-zinc-100 dark:bg-zinc-900 rounded-lg overflow-hidden max-h-[420px] border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <SafeImage
                src={article.imageUrl}
                alt={displayedTitle}
                fallbackText={article.title}
                className="w-full object-cover filter brightness-95 max-h-[420px]"
              />
              <p className="p-3 bg-zinc-50 dark:bg-zinc-950/80 font-sans italic text-[11px] text-zinc-500 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-850">
                {isMarathi 
                  ? 'छायाचित्र: नाशिक जिल्हा व परिसर कृषी उत्पन्न आणि वाईन पर्यटन केंद्र. (नाशिक २४x७ छायाचित्र सेवा)' 
                  : 'Photo: Nashik District & surrounding Agricultural spot and wine tourism hub. (Nashik 24x7 Photo Service)'}
              </p>
            </div>

            {/* Article Body */}
            <div className={`font-sans text-zinc-800 dark:text-zinc-200 leading-relaxed space-y-5 whitespace-pre-wrap ${fontSizeClass}`}>
              {displayedBody.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="first-letter:text-3xl first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:text-orange-500 first-letter:font-serif">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* End Marker */}
            <div className="flex justify-center items-center gap-3 my-12">
              <span className="w-16 h-px bg-zinc-200 dark:bg-zinc-800"></span>
              <span className="text-[10px] font-sans tracking-widest text-zinc-400 dark:text-zinc-500 font-bold uppercase select-none">
                {isMarathi ? '✦ समाप्त ✦' : '✦ THE END ✦'}
              </span>
              <span className="w-16 h-px bg-zinc-200 dark:bg-zinc-800"></span>
            </div>

            {/* Comments Feed */}
            <section className="border-t border-zinc-200 dark:border-zinc-800 pt-8 mb-4">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="w-5 h-5 text-orange-500" />
                <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-white">
                  {isMarathi ? `वाचक प्रतिक्रिया (${article.comments.length})` : `Reader Comments (${article.comments.length})`}
                </h3>
              </div>

              {/* Add Comment Form */}
              <form onSubmit={handlePostComment} className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-lg mb-6 text-left shadow-xs">
                <h4 className="text-xs font-sans font-extrabold text-orange-500 dark:text-orange-400 uppercase mb-3">
                  {isMarathi ? 'आपले मत नोंदवा' : 'Post Your Comment'}
                </h4>
                
                <div className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder={isMarathi ? 'आपले नाव...' : 'Your Name...'}
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="px-3 py-2 text-xs bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-750 text-zinc-900 dark:text-white rounded focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  
                  <textarea
                    rows={3}
                    placeholder={isMarathi ? 'प्रतिक्रिया लिहा...' : 'Write comment...'}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-750 text-zinc-900 dark:text-white rounded focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  />

                  {formError && (
                    <p className="text-[11px] text-red-500 font-mono">{formError}</p>
                  )}

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
                    >
                      <span>{isMarathi ? 'पाठवा' : 'Post'}</span>
                      <Send className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </form>

              {/* Comments list */}
              <div className="space-y-4 text-left">
                {article.comments.map((comment) => (
                  <div 
                    key={comment.id} 
                    className="p-3.5 bg-zinc-50/65 dark:bg-zinc-900/60 border border-zinc-150 dark:border-zinc-850 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-1.5 text-xs">
                      <span className="font-bold text-zinc-900 dark:text-white">{comment.author}</span>
                      <span className="text-[10px] text-zinc-500 font-mono">{comment.date}</span>
                    </div>
                    <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans">{comment.text}</p>
                  </div>
                ))}

                {article.comments.length === 0 && (
                  <p className="text-xs text-zinc-500 italic py-4">
                    {isMarathi ? 'पहिली प्रतिक्रिया देणारे व्हा!' : 'Be the first to comment!'}
                  </p>
                )}
              </div>
            </section>

          </div>
        </div>

      </div>
    </div>
  );
};
