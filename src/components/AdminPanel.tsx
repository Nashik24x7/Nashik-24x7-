/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Sparkles, PlusCircle, Trash2, Edit3, RefreshCw, Send, CheckCircle, 
  Image, Layers, Globe, Radio, Star, ChevronRight, BarChart4, BookOpen,
  Cpu, Play, Pause, FastForward, Clock, Activity, Check, Settings, AlertTriangle, Calendar,
  LogOut
} from 'lucide-react';
import { NewsArticle, NewsCategory } from '../types';
import { IMAGE_PRESETS } from '../utils';
import { SafeImage } from './SafeImage';

interface AdminPanelProps {
  articles: NewsArticle[];
  onCreateArticle: (article: Omit<NewsArticle, 'id' | 'likes' | 'comments'>) => void;
  onUpdateArticle: (article: NewsArticle) => void;
  onDeleteArticle: (id: string) => void;
  onResetToDefaults: () => void;
  onUpload20News: () => void;
  onExitAdmin?: () => void;
  
  // Autopilot Control Props
  simulatedDay: number;
  setSimulatedDay: (day: number) => void;
  autopilotEnabled: boolean;
  setAutopilotEnabled: (enabled: boolean) => void;
  autopilotSpeed: number;
  setAutopilotSpeed: (speed: number) => void;
  onTriggerBulkLeap: (leapDaysCount: number) => void;
  currentSimulatedDate: Date;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  articles,
  onCreateArticle,
  onUpdateArticle,
  onDeleteArticle,
  onResetToDefaults,
  onUpload20News,
  onExitAdmin,
  simulatedDay,
  setSimulatedDay,
  autopilotEnabled,
  setAutopilotEnabled,
  autopilotSpeed,
  setAutopilotSpeed,
  onTriggerBulkLeap,
  currentSimulatedDate
}) => {
  // Navigation inside Admin Panel: 'write' | 'manage' | 'autopilot'
  const [activeTab, setActiveTab] = useState<'write' | 'manage' | 'autopilot'>('write');

  // AI Generation State
  const [aiTopic, setAiTopic] = useState('');
  const [aiCategory, setAiCategory] = useState<NewsCategory>('City Buzz');
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiSuccessMessage, setAiSuccessMessage] = useState('');
  const [aiErrorMessage, setAiErrorMessage] = useState('');

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formSubtitle, setFormSubtitle] = useState('');
  const [formCategory, setFormCategory] = useState<NewsCategory>('City Buzz');
  const [formBody, setFormBody] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formAuthor, setFormAuthor] = useState('Staff Reporter');
  const [formReadTime, setFormReadTime] = useState(4);
  const [formIsLead, setFormIsLead] = useState(false);
  const [formIsBreaking, setFormIsBreaking] = useState(false);
  const [formIsEditorial, setFormIsEditorial] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState('');

  // Search inside manage tab
  const [manageSearch, setManageSearch] = useState('');

  const handleAiDraft = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiTopic.trim()) {
      setAiErrorMessage('Please specify an article headline or outline.');
      return;
    }

    setIsAiGenerating(true);
    setAiErrorMessage('');
    setAiSuccessMessage('');

    try {
      const response = await fetch('/api/generate-news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: aiTopic, category: aiCategory }),
      });

      if (!response.ok) {
        throw new Error('Server returned an error status.');
      }

      const data = await response.json();

      // Populate core form fields
      setFormTitle(data.title || '');
      setFormSubtitle(data.subtitle || '');
      setFormCategory(aiCategory);
      setFormBody(data.body || '');
      setFormImageUrl(data.imageUrl || IMAGE_PRESETS[0].url);
      setFormAuthor(data.author || 'Nashik Times Editorial');
      setFormReadTime(data.readTime || 5);
      
      setAiSuccessMessage(`Gemini AI successfully drafted "${data.title || 'the article'}". The editor form has been populated below automatically!`);
      setAiTopic('');
    } catch (err: any) {
      console.error(err);
      setAiErrorMessage('Could not connect to the Gemini draft generator. Proceeding with offline safety model.');
      
      // Standalone structural mock write helper inside client when network breaks
      const offlineTitle =`Expansion of ${aiTopic.trim()} Project Approved for Nashik Valley`;
      const offlineSubtitle = `NMC planning commission delegates release detailed implementation models for Satpur and Niphad.`;
      const offlineBody = `NASHIK — Following intense deliberation, local planning commissions and civic administrators in Nashik have released an extensive development mandate for "${aiTopic.trim()}". The upcoming framework, slated for municipal review by next week, aims to address long-standing corporate, agricultural, and public alignment barriers.

Local division operators highlighted that projects of high densities require immediate municipal cooperation. Large grids, particularly those surrounding critical trade corridors or central terminals like Dwarka Circle or wholesale sites in Dindori, are set to receive prioritized funding allotments.

"This is an incredible milestone for our city’s transition into a modern agro-industrial powerhouse," remarked a regional director. "By incorporating smart-city indicators and preserving ancient heritage values in Panchavati and Godavari, we are positioning Nashik as the premier blueprint of Maharashtra."`;
      
      setFormTitle(offlineTitle);
      setFormSubtitle(offlineSubtitle);
      setFormCategory(aiCategory);
      setFormBody(offlineBody);
      setFormImageUrl(IMAGE_PRESETS[0].url);
      setFormAuthor('Staff Correspondent');
      setFormReadTime(4);
      setAiSuccessMessage('Draft created locally (offline safety model activated)! Form auto-filled below.');
    } finally {
      setIsAiGenerating(false);
    }
  };

  const convertGoogleDriveLink = (url: string): string => {
    if (!url) return '';
    
    // Already converted or direct
    if (url.includes('lh3.googleusercontent.com/d/')) {
      return url;
    }
    
    // Standard sharing link: https://drive.google.com/file/d/IMAGE_ID/view?usp=sharing
    const driveRegex = /\/file\/d\/([a-zA-Z0-9_-]+)/;
    const match = url.match(driveRegex);
    if (match && match[1]) {
      return `https://lh3.googleusercontent.com/d/${match[1]}`;
    }
    
    // Alternative open url format: https://drive.google.com/open?id=IMAGE_ID or uc?id=IMAGE_ID
    const queryRegex = /[?&]id=([a-zA-Z0-9_-]+)/;
    const queryMatch = url.match(queryRegex);
    if (queryMatch && queryMatch[1]) {
      return `https://lh3.googleusercontent.com/d/${queryMatch[1]}`;
    }
    
    return url;
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const processedImageUrl = convertGoogleDriveLink(formImageUrl.trim());
    const finalBody = formBody.trim() || formSubtitle.trim();

    if (!formTitle.trim() || !formSubtitle.trim() || !processedImageUrl) {
      alert('Please fill out the Headline, Summary, and Cover Image.');
      return;
    }

    const payload = {
      title: formTitle.trim(),
      subtitle: formSubtitle.trim(),
      category: formCategory,
      body: finalBody,
      imageUrl: processedImageUrl,
      author: formAuthor.trim() || 'Sai Wagh',
      readTime: Number(formReadTime) || 3,
      isLead: formIsLead,
      isBreaking: formIsBreaking,
      isEditorial: formIsEditorial,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };

    if (editingId) {
      // Find old comment list & like count
      const existing = articles.find(a => a.id === editingId);
      onUpdateArticle({
        ...payload,
        id: editingId,
        likes: existing ? existing.likes : 0,
        comments: existing ? existing.comments : []
      });
      setSubmitSuccess('Article successfully modified in the press record.');
    } else {
      onCreateArticle(payload);
      setSubmitSuccess('New Article successfully added to the Newspaper archive!');
    }

    // Reset Form
    setEditingId(null);
    setFormTitle('');
    setFormSubtitle('');
    setFormBody('');
    setFormImageUrl('');
    setFormAuthor('Sai Wagh');
    setFormReadTime(4);
    setFormIsLead(false);
    setFormIsBreaking(false);
    setFormIsEditorial(false);

    // Fade notification
    setTimeout(() => setSubmitSuccess(''), 4000);
  };

  const handleEditClick = (article: NewsArticle) => {
    setEditingId(article.id);
    setFormTitle(article.title);
    setFormSubtitle(article.subtitle);
    setFormCategory(article.category);
    setFormBody(article.body);
    setFormImageUrl(article.imageUrl);
    setFormAuthor(article.author);
    setFormReadTime(article.readTime);
    setFormIsLead(!!article.isLead);
    setFormIsBreaking(!!article.isBreaking);
    setFormIsEditorial(!!article.isEditorial);
    setActiveTab('write');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormTitle('');
    setFormSubtitle('');
    setFormBody('');
    setFormImageUrl('');
    setFormAuthor('Staff Reporter');
    setFormReadTime(4);
    setFormIsLead(false);
    setFormIsBreaking(false);
    setFormIsEditorial(false);
  };

  // Compute live KPIs
  const totalCount = articles.length;
  const leadStoryCount = articles.filter(a => a.isLead).length;
  const breakingCount = articles.filter(a => a.isBreaking).length;
  const editorialCount = articles.filter(a => a.isEditorial).length;
  const totalCommentsCount = articles.reduce((sum, a) => sum + a.comments.length, 0);

  // Filter manage search
  const filteredManage = articles.filter(a =>
    a.title.toLowerCase().includes(manageSearch.toLowerCase()) ||
    a.category.toLowerCase().includes(manageSearch.toLowerCase()) ||
    a.author.toLowerCase().includes(manageSearch.toLowerCase())
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 font-sans">
      
      {/* Top Banner & Control Board */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-4 mb-8 gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-amber-900 font-mono text-xs font-semibold mb-1">
            <Radio className="w-4 h-4 animate-ping text-red-700" />
            <span>NASHIK TIMES CONTROL OFFICE • LIVE PRESS DESK</span>
          </div>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-gray-950">
            Administrative Editor Workspace
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {onExitAdmin && (
            <button
              onClick={onExitAdmin}
              className="px-3 py-1.5 border border-red-300 text-red-900 bg-red-50 hover:bg-red-100 rounded text-xs font-mono font-semibold cursor-pointer flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit Dashboard & Back to Web</span>
            </button>
          )}

          {/* Option default restore button */}
          <button
            onClick={() => {
              if (window.confirm('Restore default articles database? This deletes custom items.')) {
                onResetToDefaults();
              }
            }}
            className="px-3 py-1.5 border border-amber-300 text-amber-900 bg-amber-50 hover:bg-amber-100 rounded text-xs font-mono font-semibold cursor-pointer flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Database to Defaults</span>
          </button>
        </div>
      </div>

      {/* Quick stats grid */}
      <section className="grid grid-cols-2 md:grid-cols-5 gap-3.5 mb-8">
        <div className="bg-[#fcfbf9] border p-4 flex flex-col justify-between rounded shadow-2xs">
          <span className="text-[10px] font-mono tracking-widest text-gray-400 font-bold uppercase flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-blue-700" /> Total Catalog
          </span>
          <p className="font-serif text-3xl font-extrabold text-gray-950 mt-1">{totalCount}</p>
          <span className="text-[9px] text-gray-500 font-mono mt-1">Stored to local storage</span>
        </div>

        <div className="bg-[#fcfbf9] border p-4 flex flex-col justify-between rounded shadow-2xs">
          <span className="text-[10px] font-mono tracking-widest text-gray-400 font-bold uppercase flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-550" /> Lead Story
          </span>
          <p className="font-serif text-3xl font-extrabold text-gray-950 mt-1">{leadStoryCount}</p>
          <span className="text-[9px] text-gray-500 font-mono mt-1">Highlighted on front page</span>
        </div>

        <div className="bg-[#fcfbf9] border p-4 flex flex-col justify-between rounded shadow-2xs">
          <span className="text-[10px] font-mono tracking-widest text-gray-400 font-bold uppercase flex items-center gap-1">
            <Radio className="w-3.5 h-3.5 text-red-600" /> Breaking Tickers
          </span>
          <p className="font-serif text-3xl font-extrabold text-gray-950 mt-1">{breakingCount}</p>
          <span className="text-[9px] text-gray-500 font-mono mt-1">Active in header line</span>
        </div>

        <div className="bg-[#fcfbf9] border p-4 flex flex-col justify-between rounded shadow-2xs">
          <span className="text-[10px] font-mono tracking-widest text-gray-400 font-bold uppercase flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-emerald-800" /> Op-Ed Essays
          </span>
          <p className="font-serif text-3xl font-extrabold text-gray-950 mt-1">{editorialCount}</p>
          <span className="text-[9px] text-gray-500 font-mono mt-1">Italic perspective cards</span>
        </div>

        <div className="bg-[#fcfbf9] border p-4 flex flex-col justify-between rounded col-span-2 md:col-span-1 shadow-2xs">
          <span className="text-[10px] font-mono tracking-widest text-gray-400 font-bold uppercase flex items-center gap-1">
            <BarChart4 className="w-3.5 h-3.5 text-purple-700" /> Opinions Feed
          </span>
          <p className="font-serif text-3xl font-extrabold text-gray-950 mt-1">{totalCommentsCount}</p>
          <span className="text-[9px] text-gray-500 font-mono mt-1">Written by readers</span>
        </div>
      </section>

      {/* Tabs navigation */}
      <div className="flex border-b border-gray-200 mb-6 bg-gray-50 p-1 rounded-sm max-w-xl">
        <button
          onClick={() => setActiveTab('write')}
          className={`flex-1 py-1.5 text-xs font-mono font-bold tracking-wider rounded-xs cursor-pointer text-center flex items-center justify-center gap-1.5 transition-colors ${
            activeTab === 'write' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>{editingId ? 'EDITING ARTICLE' : 'WRITE & COMPOSE'}</span>
        </button>
        <button
          onClick={() => setActiveTab('manage')}
          className={`flex-1 py-1.5 text-xs font-mono font-bold tracking-wider rounded-xs cursor-pointer text-center flex items-center justify-center gap-1.5 transition-colors ${
            activeTab === 'manage' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>CATALOG ({totalCount})</span>
        </button>
        <button
          onClick={() => setActiveTab('autopilot')}
          className={`flex-1 py-1.5 text-xs font-mono font-bold tracking-wider rounded-xs cursor-pointer text-center flex items-center justify-center gap-1.5 transition-colors relative ${
            activeTab === 'autopilot' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>AUTOPILOT PRESS ROOM</span>
          {autopilotEnabled && (
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
            </span>
          )}
        </button>
      </div>

      {/* Live feedback indicators */}
      {submitSuccess && (
        <div className="mb-6 p-3 bg-emerald-50 border border-emerald-250 text-emerald-800 text-xs font-mono rounded flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>{submitSuccess}</span>
        </div>
      )}

      {/* TAB 1: WRITE & AI COMPOSE FORM */}
      {activeTab === 'write' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Fields and Composition Inputs */}
          <div className="lg:col-span-8 bg-white border p-6 rounded shadow-3xs">
            <h3 className="font-serif text-lg font-bold text-gray-950 border-b pb-2 mb-6">
              {editingId ? 'Modify Stored News Records' : 'Direct News Composition'}
            </h3>

            <form onSubmit={handleManualSubmit} className="space-y-5 text-xs text-gray-800">
              {/* Dynamic Warning for edit */}
              {editingId && (
                <div className="p-3 bg-indigo-50 border border-indigo-200 text-indigo-800 rounded font-mono flex items-center justify-between">
                  <span>Currently editing article reference: <strong>{editingId}</strong>. Likes and comments are safe.</span>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="underline font-semibold hover:text-indigo-950 cursor-pointer"
                  >
                    Cancel Editing
                  </button>
                </div>
              )}

              {/* 1st: Cover Image Field / Google Drive Link Option */}
              <div className="bg-gray-50 p-4 border border-gray-200 rounded-sm">
                <label className="block text-xs font-mono font-semibold text-gray-700 uppercase mb-1 flex items-center justify-between">
                  <span>1. Google Drive / Image Link Option <span className="text-red-600">*</span></span>
                  <span className="text-[10px] text-zinc-500 font-normal lowercase">(Auto-converts Google Drive view links to raw download image URLs)</span>
                </label>
                <input
                  type="text"
                  placeholder="Paste Google Drive sharing link (e.g. https://drive.google.com/file/d/...) or image URL"
                  value={formImageUrl}
                  onChange={(e) => setFormImageUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded text-gray-900 bg-white font-mono focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 mb-2.5"
                  required
                />
                
                <div className="mb-3 p-2 bg-amber-50 border border-amber-200 rounded text-[11px] text-amber-800 leading-normal font-sans">
                  ⚠️ <strong>CRITICAL REQUIREMENT:</strong> The Google Drive file <strong>MUST</strong> be shared as <strong>&quot;Anyone with the link can view&quot;</strong> (Public) in your Google Drive settings. If it is private, the application will automatically display a high-quality relevant news placeholder photo so your layout remains clean and professional.
                </div>
                
                {/* Instant Unsplash Quick-Selectors */}
                <div>
                  <p className="text-[10px] font-mono text-gray-500 mb-1.5 font-bold uppercase flex items-center gap-1">
                    <Image className="w-3 h-3 text-amber-900" />
                    <span>Or Select 1-Click Aesthetic Nashik Photo Preset:</span>
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    {IMAGE_PRESETS.map((preset, index) => {
                      const isSelected = formImageUrl === preset.url;
                      return (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setFormImageUrl(preset.url)}
                          className={`p-1 text-[10px] border rounded-sm text-left truncate transition-all cursor-pointer font-sans block ${
                            isSelected
                              ? 'border-gray-900 bg-gray-900 text-white font-bold shadow-2xs'
                              : 'border-gray-200 bg-white hover:bg-gray-100 text-gray-600'
                          }`}
                          title={preset.name}
                        >
                          {preset.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 2nd: Title Section / Headline Box */}
              <div>
                <label className="block text-xs font-mono font-semibold text-gray-700 uppercase mb-1">
                  2. News Banner Headline <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Nashik Airport Expansion Ready for International Cargo Flighter Operations"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded font-serif text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-950 focus:border-gray-950"
                  required
                />
              </div>

              {/* 3rd: Subtitle / Summarized Summary Box */}
              <div>
                <label className="block text-xs font-mono font-semibold text-gray-700 uppercase mb-1">
                  3. News Summary / Digest <span className="text-red-600">*</span>
                </label>
                <textarea
                  placeholder="Provide a brief, compelling one-sentence or two-sentence digest of the news item to draw readership."
                  value={formSubtitle}
                  onChange={(e) => setFormSubtitle(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded font-serif text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-950 focus:border-gray-950"
                  required
                ></textarea>
              </div>

              {/* 4th: Section Category Selection and Desk Credit Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono font-semibold text-gray-700 uppercase mb-1">
                    4. Section Category
                  </label>
                  <select
                    value={formIsLead ? 'Latest' : formCategory}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === 'Latest') {
                        setFormCategory('City Buzz');
                        setFormIsLead(true);
                      } else {
                        setFormCategory(val as NewsCategory);
                        setFormIsLead(false);
                      }
                    }}
                    className="w-full p-2 border border-gray-300 rounded font-mono text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                  >
                    <option value="Latest">Latest News (Front Page Banner)</option>
                    <option value="Education">Education (Schools/Colleges)</option>
                    <option value="Panchavati">Panchavati (Heritage/Temples)</option>
                    <option value="City Buzz">City Buzz (Civil/Events)</option>
                    <option value="Politics">Politics (State/Union)</option>
                    <option value="Business">Business (Satpur/Ambad Industry)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-gray-700 uppercase mb-1">
                    Author / Desk Credit
                  </label>
                  <input
                    type="text"
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                    className="w-full px-3 p-2 border border-gray-300 rounded text-gray-950 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-gray-700 uppercase mb-1">
                    Read Time (Minutes)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={formReadTime}
                    onChange={(e) => setFormReadTime(Number(e.target.value))}
                    className="w-full px-3 p-2 border border-gray-300 rounded text-gray-950 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-950 font-mono"
                  />
                </div>
              </div>

              {/* Stale Text Body */}
              <div>
                <label className="block text-xs font-mono font-semibold text-gray-700 uppercase mb-1">
                  Full Article Body (Standard paragraphs, write double linebreaks for spacing) <span className="text-red-600">*</span>
                </label>
                <textarea
                  placeholder="NASHIK — Write full editorial paragraphs here. Describe the events, cite and comment on relevant municipal or industrial delegates, give statistical counts, and state final milestones."
                  value={formBody}
                  onChange={(e) => setFormBody(e.target.value)}
                  rows={8}
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded font-serif text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-950 focus:border-gray-950 leading-relaxed"
                  required
                ></textarea>
              </div>

              {/* Status checkboxes */}
              <div className="bg-amber-50/50 p-4 border border-amber-900/10 rounded-sm">
                <p className="text-[11px] font-mono font-bold text-amber-900 uppercase mb-2.5">Chronicle Layout Classification Options</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <label className="flex items-center gap-2 text-xs font-mono text-gray-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formIsLead}
                      onChange={(e) => {
                        setFormIsLead(e.target.checked);
                        if (e.target.checked) {
                          setFormIsEditorial(false); // Can't be editorial if lead
                        }
                      }}
                      className="rounded border-gray-300 text-gray-900 focus:ring-gray-900 w-3.5 h-3.5"
                    />
                    <span className="font-semibold">Highlight as Leading Story?</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-mono text-gray-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formIsBreaking}
                      onChange={(e) => setFormIsBreaking(e.target.checked)}
                      className="rounded border-gray-300 text-gray-900 focus:ring-gray-900 w-3.5 h-3.5"
                    />
                    <span className="font-semibold">Add to Breaking Ticker?</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-mono text-gray-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formIsEditorial}
                      onChange={(e) => {
                        setFormIsEditorial(e.target.checked);
                        if (e.target.checked) {
                          setFormIsLead(false); // Can't be lead if editorial essay
                        }
                      }}
                      className="rounded border-gray-300 text-gray-900 focus:ring-gray-900 w-3.5 h-3.5"
                    />
                    <span className="font-semibold">Format as Op-Ed Essay?</span>
                  </label>
                </div>
              </div>

              {/* Action grid (submit / cancel) */}
              <div className="flex items-center justify-end gap-3.5 pt-4 border-t font-mono">
                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded font-semibold transition-colors cursor-pointer"
                  >
                    Cancel Editing
                  </button>
                )}
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gray-900 text-white hover:bg-gray-850 rounded font-bold tracking-wide uppercase shadow-xs flex items-center gap-1.5 cursor-pointer text-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{editingId ? 'Modify Stored Record' : 'Publish Article Live'}</span>
                </button>
              </div>

            </form>
          </div>

          {/* Right Column: AI Drafting Box powered by Gemini client handler */}
          <div className="lg:col-span-4 bg-amber-50 border border-amber-250 p-5 rounded shadow-2xs">
            <div className="flex items-center gap-1.5 text-amber-950 font-serif mb-2">
              <Sparkles className="w-5 h-5 text-amber-800 fill-amber-300" />
              <h3 className="font-serif text-base font-bold">Gemini AI Assistant Writer</h3>
            </div>
            
            <p className="text-xs text-amber-900/90 leading-relaxed font-sans mb-4">
              Write professional, full-length journalistic drafts in seconds! Type a quick topic description below and Gemini will structure the headlines, summaries, and paragraphs automatically.
            </p>

            <form onSubmit={handleAiDraft} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono font-bold text-amber-850 uppercase mb-1">
                  Specify Core Topic or Event Prompt:
                </label>
                <textarea
                  placeholder="e.g. New high-speed train connectivity proposed between Mumbai and Nashik"
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  rows={3}
                  className="w-full bg-white border border-amber-300 p-2.5 rounded text-xs text-gray-950 focus:outline-none focus:ring-1 focus:ring-amber-900 focus:border-amber-900 font-serif leading-relaxed"
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold text-amber-850 uppercase mb-1">
                  Drafting Section:
                </label>
                <select
                  value={aiCategory}
                  onChange={(e) => setAiCategory(e.target.value as NewsCategory)}
                  className="w-full p-2 bg-white border border-amber-300 rounded text-xs font-mono text-gray-900 focus:outline-none focus:ring-1 focus:ring-amber-900 focus:border-amber-900"
                >
                  <option value="City Buzz">City Buzz (Civil/Events)</option>
                  <option value="Education">Education (Schools/Colleges)</option>
                  <option value="Panchavati">Panchavati (Heritage/Temples)</option>
                  <option value="Business">Business (Industrial Hub)</option>
                </select>
              </div>

              {aiErrorMessage && (
                <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-[10px] font-mono rounded-sm leading-relaxed">
                  {aiErrorMessage}
                </div>
              )}

              {aiSuccessMessage && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-250 text-emerald-800 text-[10px] font-mono rounded-sm leading-relaxed">
                  {aiSuccessMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isAiGenerating}
                className={`w-full py-2.5 text-xs font-bold font-mono tracking-wider text-amber-955 rounded-sm flex items-center justify-center gap-1.5 cursor-pointer uppercase shadow-2xs border ${
                  isAiGenerating
                    ? 'bg-amber-100/50 border-amber-200 text-amber-400 cursor-not-allowed'
                    : 'bg-amber-100 hover:bg-amber-200 border-amber-300 text-amber-950'
                }`}
              >
                <Sparkles className={`w-4 h-4 text-amber-800 ${isAiGenerating ? 'animate-spin' : 'fill-amber-400'}`} />
                <span>{isAiGenerating ? 'AI ASSISTANT WRITING...' : 'COMPILE NEWS ARTICLE'}</span>
              </button>
            </form>

            <div className="mt-5 border-t border-amber-200/50 pt-3.5 text-[10px] text-amber-800/80 font-mono flex flex-col gap-1 list-none animate-pulse">
              <li>• Generates realistic paragraph grids about Nashik</li>
              <li>• Auto-assigns suitable bylines and tags</li>
              <li>• Directly fills the editor form on completion</li>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: CATALOG TABLES */}
      {activeTab === 'manage' && (
        <div className="bg-white border rounded shadow-3xs p-6 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h3 className="font-serif text-lg font-bold text-gray-950">
              Manage Stored News Records
            </h3>

            {/* Fast table search filter */}
            <div className="relative w-64 max-w-sm self-end">
              <input
                type="text"
                placeholder="Search headlines or authors..."
                value={manageSearch}
                onChange={(e) => setManageSearch(e.target.value)}
                className="w-full pl-3 pr-8 py-1.5 text-xs border border-gray-300 rounded font-mono text-gray-900 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
              />
              {manageSearch && (
                <button
                  onClick={() => setManageSearch('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-xs text-gray-400 hover:text-gray-600 font-mono"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Stored newspaper list table */}
          {filteredManage.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-gray-200 rounded text-xs text-gray-500 font-mono">
              No matching archive reports found in memory. Please search other tags or compose news.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 font-mono text-[10px] tracking-wider uppercase border-b">
                    <th className="p-3.5 font-bold">Report Details</th>
                    <th className="p-3.5 font-bold">Structure / Tags</th>
                    <th className="p-3.5 font-bold">Draft Classification</th>
                    <th className="p-3.5 font-bold text-right">Actions Panel</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-gray-800">
                  {filteredManage.map((article) => (
                    <tr key={article.id} className="hover:bg-gray-50/60 transition-colors">
                      {/* Left: Thumbnail & Title */}
                      <td className="p-3.5 max-w-md">
                        <div className="flex gap-3">
                          <SafeImage
                            src={article.imageUrl}
                            alt=""
                            fallbackText={article.title}
                            className="w-12 h-10 object-cover bg-gray-100 rounded-xs shrink-0 flex-none"
                          />
                          <div className="space-y-0.5">
                            <h4 className="font-serif text-[13px] font-semibold text-gray-950 line-clamp-1 leading-snug">
                              {article.title}
                            </h4>
                            <p className="text-[10px] font-mono text-gray-400">
                              ID: {article.id} • By {article.author.split(',')[0]}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Middle: Category & Read Time */}
                      <td className="p-3.5">
                        <div className="space-y-1 font-mono">
                          <span className="text-[10px] bg-slate-100 border text-slate-800 px-1.5 py-0.2 rounded font-bold">
                            {article.category.toUpperCase()}
                          </span>
                          <p className="text-[10px] text-gray-500">{article.readTime} min read • {article.date}</p>
                        </div>
                      </td>

                      {/* Middle-Right: State tags */}
                      <td className="p-3.5">
                        <div className="flex flex-wrap gap-1">
                          {article.isLead && (
                            <span className="bg-amber-100 border border-amber-300 text-amber-900 px-1.5 py-0.2 rounded-xs text-[9px] font-mono font-bold flex items-center gap-0.5" title="Leading Frontpage Banner">
                              <Star className="w-2.5 h-2.5 fill-amber-600 stroke-amber-600" />
                              <span>LEAD</span>
                            </span>
                          )}
                          {article.isBreaking && (
                            <span className="bg-red-50 border border-red-200 text-red-700 px-1.5 py-0.2 rounded-xs text-[9px] font-mono font-bold flex items-center gap-0.5" title="Active on header live ticker">
                              <Radio className="w-2.5 h-2.5 animate-pulse text-red-600" />
                              <span>TICKER</span>
                            </span>
                          )}
                          {article.isEditorial && (
                            <span className="bg-purple-100 border border-purple-200 text-purple-700 px-1.5 py-0.2 rounded-xs text-[9px] font-mono font-bold flex items-center gap-0.5" title="Formatted as Op-Ed Column">
                              <BookOpen className="w-2.5 h-2.5" />
                              <span>OP-ED</span>
                            </span>
                          )}
                          {!article.isLead && !article.isBreaking && !article.isEditorial && (
                            <span className="bg-gray-100 border text-gray-400 px-1.5 py-0.2 rounded-xs text-[9px] font-mono">
                              STANDARD
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Right: Actions */}
                      <td className="p-3.5 text-right font-mono">
                        <div className="flex items-center justify-end gap-2 text-xs">
                          <button
                            onClick={() => handleEditClick(article)}
                            className="p-1 px-2 border hover:bg-gray-100 hover:text-gray-950 font-bold rounded text-gray-700 flex items-center gap-1 cursor-pointer"
                            title="Edit Article Content"
                          >
                            <Edit3 className="w-3 h-3 text-cyan-700" />
                            <span>Edit</span>
                          </button>
                          
                          <button
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to delete "${article.title}"?`)) {
                                onDeleteArticle(article.id);
                              }
                            }}
                            className="p-1 px-2 border hover:bg-rose-50 hover:text-rose-700 font-bold rounded text-gray-500 flex items-center gap-1 cursor-pointer"
                            title="Delete Article"
                          >
                            <Trash2 className="w-3 h-3 text-rose-600" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-4 pt-3.5 border-t text-[10px] font-mono text-gray-400">
            * All catalog archives are saved dynamically using persistent LocalStorage triggers. Changes remain safe between sessions.
          </div>
        </div>
      )}

      {/* TAB 3: AUTOPILOT PRESS ROOM CONTROL CENTER */}
      {activeTab === 'autopilot' && (
        <div className="space-y-6">
          {/* Main Hero Header */}
          <div className="bg-[#fcfbf9] border border-[#e8e4d8] p-6 rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-3xs relative overflow-hidden">
            <div className="absolute top-0 right-0 p-1 bg-amber-500/10 rounded-bl text-[8px] font-mono tracking-widest text-amber-800 uppercase font-bold">
              Autonomous Press Desk
            </div>
            
            <div className="space-y-1.5 max-w-xl">
              <div className="flex items-center gap-2">
                <span className={`h-3 w-3 rounded-full shrink-0 ${autopilotEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`}></span>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-600">
                  {autopilotEnabled ? 'LIVE AUTOPILOT ACTIVE' : 'AUTOPILOT PAUSED / IDLE'}
                </span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-gray-950">
                2-Year Autonomous Press Agent Dashboard
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed font-sans">
                Automatically aggregate daily local news and trending bulletins from popular Marathi journals like <strong className="text-orange-900">lokmat.com</strong>, <strong className="text-emerald-950">nashik24x7.com</strong>, and <strong className="text-red-950">loksatta.com</strong>. The autonomous parser translates, rewrites, and publishes a customized local edition every single day for 2 years.
              </p>
            </div>

            {/* Simulated Date Card Indicator */}
            <div className="bg-white border-2 border-gray-950 p-4 rounded shadow-xs text-center min-w-[200px] shrink-0">
              <span className="text-[10px] font-mono font-bold text-red-800 tracking-widest uppercase block mb-1">
                CURRENT JOURNAL DATE
              </span>
              <p className="font-serif text-xl font-bold text-gray-950">
                {currentSimulatedDate.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
              <span className="text-[10px] font-mono text-gray-500 block mt-1">
                Day {simulatedDay} of 730 ({((simulatedDay / 730) * 100).toFixed(1)}% complete)
              </span>
            </div>
          </div>

          {/* Timeline Linear Progress Bar */}
          <div className="bg-[#fbfbfa] border p-4 rounded-sm">
            <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 mb-2">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Start: July 5, 2026
              </span>
              <span className="font-semibold text-gray-800">
                Simulation Horizon
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> End: July 4, 2028
              </span>
            </div>
            
            <div className="w-full bg-gray-200 h-3.5 rounded-full overflow-hidden relative shadow-inner">
              <div 
                className="bg-gradient-to-r from-amber-700 via-orange-600 to-red-800 h-full rounded-full transition-all duration-300 relative"
                style={{ width: `${Math.min(100, (simulatedDay / 730) * 100)}%` }}
              >
                {simulatedDay > 20 && (
                  <span className="absolute right-2 top-0 text-[8px] font-mono text-white font-bold h-full flex items-center">
                    Day {simulatedDay}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Controls Deck Column splits */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Box: Active Timeline Manipulation */}
            <div className="lg:col-span-7 bg-white border p-6 rounded shadow-3xs space-y-6">
              <div>
                <h4 className="text-sm font-serif font-bold text-gray-950 border-b pb-2 mb-4 flex items-center gap-2">
                  <Settings className="w-4 h-4 text-amber-900" />
                  <span>Autopilot Control Panel</span>
                </h4>

                <div className="flex flex-wrap gap-3 items-center">
                  {/* Play Pause Trigger */}
                  <button
                    onClick={() => setAutopilotEnabled(!autopilotEnabled)}
                    className={`px-4 py-2.5 rounded text-xs font-mono font-bold tracking-wider uppercase cursor-pointer flex items-center gap-2 transition-all shadow-2xs ${
                      autopilotEnabled 
                        ? 'bg-rose-700 hover:bg-rose-800 text-white animate-pulse' 
                        : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                    }`}
                  >
                    {autopilotEnabled ? (
                      <>
                        <Pause className="w-3.5 h-3.5 fill-white" />
                        <span>Pause Autopilot</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Start Autopilot</span>
                      </>
                    )}
                  </button>

                  {/* Step Day Trigger */}
                  <button
                    onClick={() => {
                      if (simulatedDay >= 730) {
                        alert('Autopilot has completed its 2-year cycle.');
                        return;
                      }
                      setSimulatedDay(simulatedDay + 1);
                    }}
                    disabled={autopilotEnabled || simulatedDay >= 730}
                    className="px-3.5 py-2.5 border border-gray-300 rounded text-xs font-mono font-bold text-gray-800 bg-gray-50 hover:bg-gray-100 disabled:opacity-50 cursor-pointer flex items-center gap-1.5 shadow-2xs transition-all"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                    <span>Advance 1 Day</span>
                  </button>

                  {/* Upload 20 News of Today */}
                  <button
                    onClick={() => {
                      onUpload20News();
                    }}
                    className="px-4 py-2.5 rounded text-xs font-mono font-bold tracking-wider uppercase cursor-pointer flex items-center gap-2 transition-all shadow-2xs bg-amber-600 hover:bg-amber-700 text-white"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Upload 20 Today's News (Nashik)</span>
                  </button>

                  {/* Reset Autopilot Timeline */}
                  <button
                    onClick={() => {
                      if (window.confirm('Reset Autopilot simulation timeline to Day 0 (July 5, 2026)? Stored autopilot articles will remain but the calendar resets.')) {
                        setSimulatedDay(0);
                        setAutopilotEnabled(false);
                      }
                    }}
                    className="px-3 py-2 text-xs font-mono font-semibold text-gray-500 hover:text-gray-900 cursor-pointer hover:bg-gray-50 border border-gray-200 rounded"
                  >
                    Reset Timeline
                  </button>
                </div>
              </div>

              {/* Speed Controller Selection */}
              <div>
                <h5 className="text-xs font-mono font-bold text-gray-700 mb-2">Agent Publication Speeds:</h5>
                <div className="grid grid-cols-3 gap-2 text-xs font-mono font-semibold">
                  {[
                    { label: 'Slow (5s / day)', value: 5000 },
                    { label: 'Normal (3s / day)', value: 3000 },
                    { label: 'Hyper (1s / day)', value: 1000 }
                  ].map((spd) => (
                    <button
                      key={spd.value}
                      onClick={() => setAutopilotSpeed(spd.value)}
                      className={`py-1.5 px-2.5 border text-center rounded transition-colors cursor-pointer ${
                        autopilotSpeed === spd.value
                          ? 'bg-amber-900 border-amber-950 text-white font-bold'
                          : 'border-gray-300 hover:bg-gray-50 text-gray-700 bg-white'
                      }`}
                    >
                      {spd.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* High Craftsmanship Leap Section */}
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <div className="flex items-center gap-1.5 text-gray-950 font-serif font-bold text-sm">
                  <FastForward className="w-4 h-4 text-orange-600" />
                  <span>Time Warp Chronicle Leap (Chronology Leap)</span>
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed font-sans">
                  Instantly fast-forward through weeks or months of regional publications. The Autopilot press assistant will procedurally generate daily, customized, English broadsheet adaptations of regional news logs representing each skipped calendar date, populating your database instantly.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono font-bold text-center pt-1">
                  {[
                    { label: 'Jump 30 Days', value: 30 },
                    { label: 'Jump 180 Days', value: 180 },
                    { label: 'Jump 365 Days', value: 365 },
                    { label: 'Jump 730 Days', value: 730 }
                  ].map((leap) => (
                    <button
                      key={leap.value}
                      onClick={() => {
                        const remaining = 730 - simulatedDay;
                        const actualLeap = Math.min(leap.value, remaining);
                        if (actualLeap <= 0) {
                          alert('Simulation timeline is already complete at Day 730.');
                          return;
                        }
                        if (window.confirm(`Instantly simulate ${actualLeap} consecutive days of Autopilot reporting? This will create ${actualLeap} customized local news articles matching each skipped date.`)) {
                          onTriggerBulkLeap(actualLeap);
                        }
                      }}
                      className="py-3 px-2 border-2 border-orange-200 hover:border-orange-500 bg-orange-50/50 hover:bg-orange-50 text-orange-950 rounded cursor-pointer transition-all flex flex-col items-center justify-center gap-1 shadow-2xs"
                    >
                      <FastForward className="w-4 h-4 text-orange-700" />
                      <span>{leap.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Box: Source feeds diagnostics & Logs */}
            <div className="lg:col-span-5 bg-[#faf9f5] border p-5 rounded-sm space-y-5">
              <div>
                <h4 className="text-sm font-serif font-bold text-gray-950 border-b border-gray-300 pb-2 mb-3.5 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-orange-800" />
                  <span>Active Sourcing Channels</span>
                </h4>

                <div className="space-y-2 text-xs text-gray-800 font-mono">
                  <div className="flex items-center justify-between p-2 bg-white rounded border border-gray-200">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-orange-500 rounded-full"></span>
                      <span>lokmat.com (Nashik Regional)</span>
                    </div>
                    <span className="text-[10px] bg-green-50 border border-green-200 text-green-700 px-1.5 rounded uppercase font-bold">Connected</span>
                  </div>

                  <div className="flex items-center justify-between p-2 bg-white rounded border border-gray-200">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
                      <span>nashik24x7.com (North Maharashtra Desk)</span>
                    </div>
                    <span className="text-[10px] bg-green-50 border border-green-200 text-green-700 px-1.5 rounded uppercase font-bold">Connected</span>
                  </div>

                  <div className="flex items-center justify-between p-2 bg-white rounded border border-gray-200">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                      <span>loksatta.com (Deccan News Syndicate)</span>
                    </div>
                    <span className="text-[10px] bg-green-50 border border-green-200 text-green-700 px-1.5 rounded uppercase font-bold">Connected</span>
                  </div>
                </div>
              </div>

              {/* Live Upload Log List */}
              <div className="space-y-3.5">
                <h4 className="text-xs font-mono font-bold text-gray-500 uppercase tracking-wider">
                  Live Upload Log Feed
                </h4>

                <div className="bg-white border rounded p-3 h-[240px] overflow-y-auto space-y-3 font-mono text-[11px] leading-relaxed select-all no-scrollbar">
                  {articles.filter(a => a.marathiSource !== undefined).length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 p-4 space-y-2">
                      <AlertTriangle className="w-8 h-8 text-gray-300" />
                      <p>No Autopilot logs created yet.</p>
                      <p className="text-[10px] text-gray-400 font-sans leading-tight">Start the Autopilot or trigger a Time Warp Leap to stream autonomous Marathi translations.</p>
                    </div>
                  ) : (
                    articles
                      .filter(a => a.marathiSource !== undefined)
                      .sort((a, b) => (b.simulatedDayIndex || 0) - (a.simulatedDayIndex || 0))
                      .slice(0, 30)
                      .map((log) => (
                        <div key={log.id} className="pb-3 border-b border-gray-100 last:border-0 last:pb-0 space-y-1 hover:bg-amber-50/20 p-1 transition-colors">
                          <div className="flex items-center justify-between font-bold text-[10px]">
                            <span className="text-orange-900 bg-orange-50 border px-1.5 py-0.2 rounded-xs">
                              {log.marathiSource}
                            </span>
                            <span className="text-gray-400">
                              Day {log.simulatedDayIndex} • {log.date}
                            </span>
                          </div>
                          
                          <p className="text-gray-500 italic font-serif leading-snug">
                            "मूळ मथळा: {log.marathiTitle}"
                          </p>

                          <div className="text-gray-900 font-bold font-sans text-xs leading-snug pl-1.5 border-l-2 border-amber-800">
                            {log.title}
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
