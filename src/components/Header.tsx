/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Newspaper, Search, ShieldCheck, Heart, CloudSun, Calendar, ArrowRight,
  Sun, Moon, CloudRain, ChevronDown, MapPin, Menu, X, Crown, Info, Volume2,
  BookOpen, Zap
} from 'lucide-react';
import { getFormattedDate, getMarathiDateString } from '../utils';
import { NewsCategory } from '../types';

interface HeaderProps {
  activeCategory: NewsCategory | 'All';
  setActiveCategory: (category: NewsCategory | 'All') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isAdmin: boolean;
  setIsAdmin: (admin: boolean) => void;
  bookmarkedCount: number;
  setShowBookmarksOnly: (show: boolean) => void;
  showBookmarksOnly: boolean;
  breakingArticles: string[];
  currentDate: Date;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
  language: 'en' | 'mr';
  onLanguageToggle: () => void;
  showEPaper?: boolean;
  setShowEPaper?: (show: boolean) => void;
  showShorts?: boolean;
  setShowShorts?: (show: boolean) => void;
  openPasscodeModal?: boolean;
  setOpenPasscodeModal?: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  isAdmin,
  setIsAdmin,
  bookmarkedCount,
  setShowBookmarksOnly,
  showBookmarksOnly,
  breakingArticles,
  currentDate,
  isDarkMode,
  setIsDarkMode,
  language,
  onLanguageToggle,
  showEPaper,
  setShowEPaper,
  showShorts,
  setShowShorts,
  openPasscodeModal = false,
  setOpenPasscodeModal = (open: boolean) => {}
}) => {
  const [loginId, setLoginId] = useState('');
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');
  const [showWeatherDetail, setShowWeatherDetail] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  // Live ticking time state for today's timing display
  const [liveTime, setLiveTime] = useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setLiveTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toMarathiDigits = (num: string | number): string => {
    const digitsMap: Record<string, string> = {
      '0': '०', '1': '१', '2': '२', '3': '३', '4': '४',
      '5': '५', '6': '६', '7': '७', '8': '८', '9': '९'
    };
    return (num ?? '').toString().split('').map(char => digitsMap[char] || char).join('');
  };

  const formattedTime = useMemo(() => {
    return liveTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  }, [liveTime]);

  const marathiFormattedTime = useMemo(() => {
    const hour = liveTime.getHours();
    const period = hour < 12 ? 'सकाळ' : hour < 16 ? 'दुपार' : hour < 20 ? 'संध्याकाळ' : 'रात्र';
    const timeStr = liveTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
    const formatted = timeStr.replace(/\s*[A-Z]+$/, ''); // remove AM/PM
    return `${period} ${toMarathiDigits(formatted)}`;
  }, [liveTime]);

  // Weather generator helper
  const getNashikWeather = (date: Date) => {
    const isInvalid = !date || isNaN(date.getTime());
    const month = isInvalid ? 0 : date.getMonth(); // 0 = Jan, 11 = Dec
    const day = isInvalid ? 1 : date.getDate();
    const seed = isNaN((month * 31 + day) % 5) ? 0 : (month * 31 + day) % 5;

    if (month >= 5 && month <= 8) {
      // Monsoon (June to Sept)
      const temps = [24, 25, 23, 26, 24];
      const conditions = ["Heavy Rain", "Overcast Sky", "Monsoon Drizzle", "Passing Rainstorms", "Misty Rain"];
      const humidities = ["88%", "92%", "95%", "85%", "90%"];
      const winds = ["22 km/h W", "18 km/h WSW", "25 km/h W", "15 km/h W", "20 km/h WNW"];
      return {
        temp: temps[seed] ?? 24,
        condition: conditions[seed] ?? "Heavy Rain",
        humidity: humidities[seed] ?? "88%",
        wind: winds[seed] ?? "22 km/h W",
        aqi: 34 + seed * 2,
        season: "Monsoon",
        icon: "rain" as const
      };
    } else if (month >= 9 || month === 0) {
      // Winter (Oct to Jan)
      const temps = [18, 20, 16, 21, 19];
      const conditions = ["Chilly Mist", "Abundant Sunshine", "Crisp Clear Sky", "Vineyard Morning Fog", "Mild & Pleasant"];
      const humidities = ["52%", "48%", "55%", "60%", "50%"];
      const winds = ["8 km/h NE", "10 km/h NE", "6 km/h NNE", "12 km/h NE", "7 km/h ENE"];
      return {
        temp: temps[seed] ?? 18,
        condition: conditions[seed] ?? "Crisp Clear Sky",
        humidity: humidities[seed] ?? "52%",
        wind: winds[seed] ?? "8 km/h NE",
        aqi: 45 + seed * 3,
        season: "Vineyard Winter",
        icon: "cool" as const
      };
    } else {
      // Summer (Feb to May)
      const temps = [34, 36, 38, 33, 35];
      const conditions = ["Hot & Sunny", "Clear Dry Skies", "Intense Sunshine", "Hazy Heat", "Warm Vineyard Breeze"];
      const humidities = ["22%", "25%", "18%", "30%", "28%"];
      const winds = ["12 km/h WNW", "15 km/h NW", "10 km/h W", "14 km/h NW", "11 km/h WNW"];
      return {
        temp: temps[seed] ?? 34,
        condition: conditions[seed] ?? "Hot & Sunny",
        humidity: humidities[seed] ?? "22%",
        wind: winds[seed] ?? "12 km/h WNW",
        aqi: 68 + seed * 4,
        season: "Deccan Summer",
        icon: "hot" as const
      };
    }
  };

  const safeCurrentDate = !currentDate || isNaN(currentDate.getTime()) ? new Date('2026-07-05T06:43:12-07:00') : currentDate;
  const currentWeather = getNashikWeather(safeCurrentDate);

  const forecastDays = useMemo(() => {
    return [1, 2, 3].map(offset => {
      const fDate = new Date(safeCurrentDate.getTime() + offset * 24 * 60 * 60 * 1000);
      const w = getNashikWeather(fDate);
      return {
        date: fDate,
        temp: w.temp,
        condition: w.condition,
        icon: w.icon
      };
    });
  }, [safeCurrentDate]);

  const hourlyForecast = useMemo(() => {
    const baseTemp = currentWeather.temp;
    const isMonsoon = safeCurrentDate.getMonth() >= 5 && safeCurrentDate.getMonth() <= 8;
    const isWinter = safeCurrentDate.getMonth() >= 9 || safeCurrentDate.getMonth() === 0;

    return [
      { 
        time: '08:00 AM', 
        marathiTime: 'सकाळी ०८:००', 
        temp: baseTemp - 3, 
        condition: isMonsoon ? 'Drizzle' : isWinter ? 'Mist' : 'Pleasant', 
        marathiCondition: isMonsoon ? 'रिमझिम पाऊस' : isWinter ? 'धुके' : 'ल्हाददायक',
        icon: isMonsoon ? 'rain' as const : isWinter ? 'cool' as const : 'cool' as const
      },
      { 
        time: '12:00 PM', 
        marathiTime: 'दुपारी १२:००', 
        temp: baseTemp + 2, 
        condition: isMonsoon ? 'Overcast' : isWinter ? 'Sunny' : 'Hot', 
        marathiCondition: isMonsoon ? 'ढगाळ वातावरण' : isWinter ? 'सूर्यप्रकाश' : 'उष्ण',
        icon: isMonsoon ? 'rain' as const : isWinter ? 'cool' as const : 'hot' as const
      },
      { 
        time: '03:00 PM', 
        marathiTime: 'दुपारी ०३:००', 
        temp: baseTemp + 1, 
        condition: isMonsoon ? 'Passing Showers' : isWinter ? 'Clear' : 'Dry Heat', 
        marathiCondition: isMonsoon ? 'पावसाच्या सरी' : isWinter ? 'स्वच्छ आकाश' : 'कोरडी उष्णता',
        icon: isMonsoon ? 'rain' as const : isWinter ? 'cool' as const : 'hot' as const
      },
      { 
        time: '06:00 PM', 
        marathiTime: 'संध्याकाळी ०६:००', 
        temp: baseTemp - 1, 
        condition: isMonsoon ? 'Cloudy' : isWinter ? 'Cool Breeze' : 'Warm Breeze', 
        marathiCondition: isMonsoon ? 'ढगाळ' : isWinter ? 'थंडगार वारा' : 'उबदार वारा',
        icon: isMonsoon ? 'rain' as const : isWinter ? 'cool' as const : 'cool' as const
      },
      { 
        time: '09:00 PM', 
        marathiTime: 'रात्री ०९:००', 
        temp: baseTemp - 2, 
        condition: isMonsoon ? 'Heavy Rain' : isWinter ? 'Chilly' : 'Mild', 
        marathiCondition: isMonsoon ? 'मुसळधार पाऊस' : isWinter ? 'थंडी' : 'सौम्य',
        icon: isMonsoon ? 'rain' as const : isWinter ? 'cool' as const : 'cool' as const
      }
    ];
  }, [currentWeather, safeCurrentDate]);

  const getWeatherIcon = (iconType: "rain" | "cool" | "hot", sizeClass = "w-4 h-4") => {
    switch (iconType) {
      case "rain":
        return <CloudRain className={`${sizeClass} text-sky-400`} />;
      case "cool":
        return <CloudSun className={`${sizeClass} text-emerald-400`} />;
      case "hot":
        return <Sun className={`${sizeClass} text-amber-400`} />;
    }
  };

  // Mapped categories for the Nashik 24x7 layout
  const isMarathi = language === 'mr';
  const categoryTabs = [
    { key: 'All', label: isMarathi ? 'ताज्या घडामोडी' : 'Latest News', sub: 'Front Page' },
    { key: 'Panchavati', label: isMarathi ? 'नाशिक शहर' : 'Nashik City', sub: 'Panchavati' },
    { key: 'Education', label: isMarathi ? 'शिक्षण' : 'Education', sub: 'Education' },
    { key: 'City Buzz', label: isMarathi ? 'क्रीडा / कट्टा' : 'City Buzz', sub: 'City Buzz' },
    { key: 'Politics', label: isMarathi ? 'राजकारण' : 'Politics', sub: 'Politics' },
    { key: 'Business', label: isMarathi ? 'व्यापार व बाजार' : 'Business & Trade', sub: 'Business' }
  ];

  const handleAdminToggle = () => {
    if (isAdmin) {
      setIsAdmin(false);
    } else {
      setOpenPasscodeModal(true);
      setLoginId('');
      setPasscode('');
      setPasscodeError('');
    }
  };

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginId.trim() === 'Sai Wagh' && passcode === 'SaiWagh1234') {
      setIsAdmin(true);
      setOpenPasscodeModal(false);
    } else {
      setPasscodeError(isMarathi ? 'चुकीचे क्रेडेंशियल्स. कृपया पुन्हा लॉगिन आयडी आणि पासवर्ड तपासा.' : 'Invalid Credentials. Please check your Login ID and Password and try again.');
    }
  };

  return (
    <header className={`w-full border-b sticky top-0 z-40 transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-[#0a0a0c] text-white border-zinc-900' 
        : 'bg-[#fafaf7] text-zinc-900 border-zinc-200 shadow-sm'
    }`}>
      
      {/* 1. NASHIK 24x7 TOP BAR */}
      <div className={`w-full border-b py-3.5 px-4 transition-colors duration-300 ${
        isDarkMode ? 'bg-[#111114] border-zinc-900 text-white' : 'bg-white border-zinc-150 text-zinc-900'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Left Area: Hamburger and Brand */}
          <div className="flex items-center gap-3 md:gap-4">
            <button 
              onClick={() => setShowDrawer(true)}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                isDarkMode ? 'hover:bg-zinc-800' : 'hover:bg-zinc-100'
              }`}
              aria-label="Toggle Side Drawer"
            >
              <Menu className={`w-6 h-6 ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`} />
            </button>
            
            {/* Apla Nashik Emblem Logo */}
            <div 
              onClick={() => {
                setActiveCategory('All');
                setShowBookmarksOnly(false);
                setSearchQuery('');
              }}
              className="flex items-center select-none cursor-pointer group"
            >
              <img 
                src="https://lh3.googleusercontent.com/d/1VoNiJS-xT5k4o6DnuOtBXNDEndePyj_X" 
                alt="Nashik 24x7" 
                className="h-8 md:h-10 w-auto object-contain transition-transform group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Center Area: Live Weather Popover and Date */}
          <div className={`hidden lg:flex items-center gap-6 text-xs font-sans transition-colors duration-300 ${
            isDarkMode ? 'text-zinc-400' : 'text-zinc-500'
          }`}>
            <div 
              className="relative cursor-pointer py-1"
              onMouseEnter={() => setShowWeatherDetail(true)}
              onMouseLeave={() => setShowWeatherDetail(false)}
            >
              <div className={`flex items-center gap-1.5 transition-colors ${
                isDarkMode ? 'text-zinc-300 hover:text-white' : 'text-zinc-750 hover:text-zinc-900'
              }`}>
                {getWeatherIcon(currentWeather.icon, "w-4 h-4")}
                <span className="font-semibold text-orange-400">
                  {isMarathi 
                    ? `नाशिक: ${toMarathiDigits(currentWeather.temp)}°C | ${marathiFormattedTime}` 
                    : `Nashik: ${currentWeather.temp}°C @ ${formattedTime}`}
                </span>
                <ChevronDown className="w-3 h-3 text-zinc-500" />
              </div>

              {/* Weather Popover */}
              {showWeatherDetail && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-64 bg-zinc-900 border border-zinc-800 rounded shadow-xl z-50 p-4 text-xs text-zinc-300 select-none">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-2">
                    <span className="font-mono font-bold text-[10px] uppercase text-zinc-400 tracking-wider flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-orange-500" />
                      Nashik, MH
                    </span>
                    <span className="text-[9px] font-mono text-orange-400 bg-orange-400/10 px-1.5 py-0.5 rounded border border-orange-500/20">
                      {currentWeather.season}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-zinc-800 rounded">
                        {getWeatherIcon(currentWeather.icon, "w-8 h-8")}
                      </div>
                      <div>
                        <div className="text-2xl font-bold font-serif text-white tracking-tight leading-none">
                          {isMarathi ? `${toMarathiDigits(currentWeather.temp)}°C` : `${currentWeather.temp}°C`}
                        </div>
                        <div className="text-[11px] text-zinc-400 font-semibold mt-1">
                          {isMarathi ? (
                            currentWeather.condition === 'Heavy Rain' ? 'मुसळधार पाऊस' :
                            currentWeather.condition === 'Overcast Sky' ? 'ढगाळ आकाश' :
                            currentWeather.condition === 'Monsoon Drizzle' ? 'रिमझिम पाऊस' :
                            currentWeather.condition === 'Crisp Clear Sky' ? 'स्वच्छ आकाश' :
                            currentWeather.condition === 'Hot & Sunny' ? 'उष्ण आणि सूर्यप्रकाश' :
                            currentWeather.condition
                          ) : currentWeather.condition}
                        </div>
                        <div className="text-[10px] text-orange-400 font-mono mt-1 font-medium">
                          {isMarathi ? `वेळ: ${marathiFormattedTime}` : `As of ${formattedTime}`}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 py-2 border-t border-b border-zinc-800 my-2 text-[10px] font-mono text-zinc-400">
                    <div className="bg-zinc-800 p-1 rounded text-center">
                      <div className="text-[8px] uppercase tracking-wider text-zinc-500">HUMIDITY</div>
                      <div className="font-semibold text-white mt-0.5">{currentWeather.humidity}</div>
                    </div>
                    <div className="bg-zinc-800 p-1 rounded text-center">
                      <div className="text-[8px] uppercase tracking-wider text-zinc-500">WIND</div>
                      <div className="font-semibold text-white mt-0.5 truncate">{currentWeather.wind.split(' ')[0]}</div>
                    </div>
                    <div className="bg-zinc-800 p-1 rounded text-center">
                      <div className="text-[8px] uppercase tracking-wider text-zinc-500">AQI</div>
                      <div className="font-semibold text-emerald-400 mt-0.5">{currentWeather.aqi}</div>
                    </div>
                  </div>

                  {/* Hourly Temperature & Timing Section */}
                  <div className="space-y-1.5 mt-2 border-b border-zinc-800 pb-2.5 mb-2">
                    <div className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-wider">
                      {isMarathi ? 'तासवार तापमान व वेळ' : 'Hourly Temp & Timing'}
                    </div>
                    <div className="grid grid-cols-5 gap-1 text-[10px]">
                      {hourlyForecast.map((h, i) => (
                        <div key={i} className="bg-zinc-800/50 p-1 rounded text-center flex flex-col items-center justify-between">
                          <span className="text-[8px] font-mono text-zinc-400 block leading-tight">
                            {isMarathi ? h.marathiTime.split(' ')[1] : h.time.split(':')[0] + h.time.slice(-2)}
                          </span>
                          <div className="my-0.5">
                            {getWeatherIcon(h.icon, "w-3.5 h-3.5")}
                          </div>
                          <span className="font-semibold text-white leading-none">
                            {isMarathi ? toMarathiDigits(h.temp) : h.temp}°C
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5 mt-2">
                    <div className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-wider">
                      3-Day Vineyard Outlook
                    </div>
                    {forecastDays.map((f, i) => (
                      <div key={i} className="flex items-center justify-between py-1 border-b border-zinc-800/40 last:border-0 last:pb-0 text-[11px]">
                        <span className="font-mono text-zinc-500 text-[10px]">
                          {f.date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })}
                        </span>
                        <div className="flex items-center gap-1.5">
                          {getWeatherIcon(f.icon, "w-3 h-3")}
                          <span className="font-semibold text-white">{isMarathi ? toMarathiDigits(f.temp) : f.temp}°C</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className={`flex items-center gap-2 transition-colors duration-300 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
              <span className={`font-semibold transition-colors duration-300 ${isDarkMode ? 'text-zinc-300' : 'text-zinc-850'}`}>{getFormattedDate(currentDate)}</span>
              <span>•</span>
              <span className="font-sans">{getMarathiDateString(currentDate)}</span>
            </div>
          </div>

          {/* Right Area: Only English/Marathi language option remains */}
          <div className="flex items-center gap-3">
            {/* Global Language Toggle inside Header */}
            <button
              onClick={onLanguageToggle}
              className={`hover:border-orange-500 flex items-center gap-1 border px-3.5 py-1.5 rounded-full text-xs font-sans font-bold transition-all cursor-pointer shadow ${
                isDarkMode 
                  ? 'bg-[#18181c] border-zinc-800 text-zinc-300 hover:bg-zinc-800' 
                  : 'bg-zinc-100 border-zinc-300 text-zinc-700 hover:bg-zinc-200'
              }`}
              title="Switch Language / भाषा बदला"
            >
              <span className={language === 'en' ? 'text-orange-500 font-extrabold' : 'text-zinc-500'}>EN</span>
              <span className="text-zinc-700">/</span>
              <span className={language === 'mr' ? 'text-orange-500 font-extrabold' : 'text-zinc-500'}>म</span>
            </button>
          </div>

        </div>
      </div>

      {/* 2. NASHIK 24x7 SUB-HEADER BAR (Vibrant Orange Category Menu!) */}
      <div className="w-full bg-orange-600 border-b border-orange-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          
          {/* Categories Tab Bar */}
          <nav className="flex items-center overflow-x-auto gap-1.5 py-2.5 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
            {categoryTabs.map((cat) => {
              const isSelected = activeCategory === cat.key && !showBookmarksOnly;
              return (
                <button
                  key={cat.key}
                  onClick={() => {
                    setActiveCategory(cat.key as NewsCategory | 'All');
                    setShowBookmarksOnly(false);
                    setSearchQuery('');
                  }}
                  className={`px-3 py-1 text-xs font-bold rounded-full whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white text-orange-700 shadow-sm font-extrabold'
                      : 'text-orange-50 hover:text-white hover:bg-orange-700/50'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </nav>

          {/* Light/Dark theme toggle & Search Bar combo */}
          <div className="flex items-center gap-4 py-1 shrink-0 pl-4 border-l border-orange-500/50">
            {/* Quick Search trigger inside input */}
            <div className="relative hidden md:block w-48">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none text-orange-300">
                <Search className="w-3.5 h-3.5" />
              </span>
              <input
                type="text"
                placeholder={isMarathi ? "शोध घ्या..." : "Search..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-7 py-1 text-xs border border-orange-500 bg-orange-700/40 text-white rounded-full placeholder-orange-200 focus:outline-none focus:bg-orange-700/80 transition-all font-semibold"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-xs text-orange-200 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Dark Mode toggle icon button */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-1.5 rounded-full hover:bg-orange-700/50 text-white transition-colors cursor-pointer"
              title={isDarkMode ? "Light Mode" : "Dark Mode"}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-orange-100" /> : <Moon className="w-4 h-4 text-orange-100" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Location & Date Bar */}
      <div className={`w-full border-b py-1.5 px-4 block lg:hidden text-[11px] font-sans transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-zinc-900 border-zinc-800/80 text-zinc-400' 
          : 'bg-zinc-50 border-zinc-200 text-zinc-600'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <span className="flex items-center gap-1.5 font-medium text-orange-400">
            <MapPin className="w-3 h-3 text-orange-500" /> 
            {isMarathi 
              ? `नाशिक: ${toMarathiDigits(currentWeather.temp)}°C | ${marathiFormattedTime}` 
              : `Nashik: ${currentWeather.temp}°C @ ${formattedTime}`}
          </span>
          <div className="flex items-center justify-between sm:justify-end gap-2 text-zinc-400">
            <span className={`font-mono ${isDarkMode ? 'text-zinc-500' : 'text-zinc-450'}`}>{getFormattedDate(currentDate)}</span>
            <span>•</span>
            <span className="font-sans">{getMarathiDateString(currentDate)}</span>
          </div>
        </div>
      </div>

      {/* Side Slide-out Drawer */}
      {showDrawer && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop blur */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setShowDrawer(false)}
          ></div>

          {/* Sidebar */}
          <div className="relative flex flex-col w-full max-w-xs bg-[#111114] border-r border-zinc-850 h-full p-6 text-white overflow-y-auto shadow-2xl z-55">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-850 pb-4 mb-6">
              <div className="flex items-center">
                <img 
                  src="https://lh3.googleusercontent.com/d/1VoNiJS-xT5k4o6DnuOtBXNDEndePyj_X" 
                  alt="Nashik 24x7" 
                  className="h-8 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <button 
                onClick={() => setShowDrawer(false)}
                className="p-1.5 hover:bg-zinc-800 rounded-md text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="space-y-4 font-sans text-sm flex-1">
              <div className="text-xs uppercase tracking-wider text-zinc-500 font-bold mb-1">
                {isMarathi ? 'विभागीय आवृत्त्या' : 'Sections / Editions'}
              </div>
              {categoryTabs.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => {
                    setActiveCategory(cat.key as NewsCategory | 'All');
                    setShowBookmarksOnly(false);
                    setSearchQuery('');
                    setShowDrawer(false);
                  }}
                  className="flex items-center justify-between w-full px-3 py-2 text-left text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-md transition-all cursor-pointer font-medium"
                >
                  <span>{cat.label}</span>
                  <span className="text-[10px] text-zinc-500 uppercase">{cat.sub}</span>
                </button>
              ))}

              <div className="border-t border-zinc-850 pt-4 mt-4 space-y-3">
                <div className="text-xs uppercase tracking-wider text-zinc-500 font-bold mb-1">
                  {isMarathi ? 'थीम आणि डिस्प्ले' : 'Display Mode'}
                </div>

                {/* Dark or Light toggle requested by user */}
                <button
                  onClick={() => {
                    setIsDarkMode(!isDarkMode);
                  }}
                  className="flex items-center justify-between w-full px-3 py-2.5 text-left text-zinc-100 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800/80 rounded-lg transition-all cursor-pointer font-semibold shadow-sm"
                >
                  <div className="flex items-center gap-2.5">
                    {isDarkMode ? (
                      <Sun className="w-4.5 h-4.5 text-amber-400 fill-amber-400/20" />
                    ) : (
                      <Moon className="w-4.5 h-4.5 text-indigo-400 fill-indigo-400/10" />
                    )}
                    <span>
                      {isDarkMode 
                        ? (isMarathi ? 'लाईट मोड वापरा' : 'Switch to Light Mode') 
                        : (isMarathi ? 'डार्क मोड वापरा' : 'Switch to Dark Mode')}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono bg-orange-600 text-white px-2 py-0.5 rounded font-black tracking-wider uppercase">
                    {isDarkMode ? (isMarathi ? 'डार्क' : 'DARK') : (isMarathi ? 'लाईट' : 'LIGHT')}
                  </span>
                </button>
              </div>

              <div className="border-t border-zinc-850 pt-4 mt-4 space-y-3">
                <div className="text-xs uppercase tracking-wider text-zinc-500 font-bold mb-1">
                  {isMarathi ? 'विशेष पर्याय' : 'Special Options'}
                </div>
                
                <button
                  onClick={() => {
                    if (setShowEPaper) {
                      setShowEPaper(true);
                      setShowBookmarksOnly(false);
                    }
                    if (setShowShorts) {
                      setShowShorts(false);
                    }
                    setShowDrawer(false);
                  }}
                  className="flex items-center gap-2.5 w-full px-3 py-2 text-left text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-md transition-colors cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-orange-500" />
                  <span>{isMarathi ? 'दैनिक ई-पेपर (Magazine)' : 'Daily E-Paper (Magazine)'}</span>
                </button>

                <button
                  onClick={() => {
                    if (setShowShorts) {
                      setShowShorts(true);
                    }
                    if (setShowEPaper) {
                      setShowEPaper(false);
                    }
                    setShowBookmarksOnly(false);
                    setShowDrawer(false);
                  }}
                  className="flex items-center gap-2.5 w-full px-3 py-2 text-left text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-md transition-colors cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-orange-500 animate-pulse" />
                  <span>{isMarathi ? 'दैनिक शॉर्ट्स (Shorts)' : 'Daily Shorts (Shorts)'}</span>
                </button>

                <button
                  onClick={() => {
                    if (setShowEPaper) {
                      setShowEPaper(false);
                    }
                    if (setShowShorts) {
                      setShowShorts(false);
                    }
                    setShowBookmarksOnly(true);
                    setShowDrawer(false);
                  }}
                  className="flex items-center gap-2.5 w-full px-3 py-2 text-left text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-md transition-colors cursor-pointer"
                >
                  <Heart className="w-4 h-4 text-rose-500" />
                  <span>{isMarathi ? `माझी आवडती पत्रे (${bookmarkedCount})` : `My Favorites (${bookmarkedCount})`}</span>
                </button>



                <button
                  onClick={() => {
                    setShowSubscriptionModal(true);
                    setShowDrawer(false);
                  }}
                  className="flex items-center gap-2.5 w-full px-3 py-2 text-left text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-md transition-colors cursor-pointer"
                >
                  <Crown className="w-4 h-4 text-yellow-500" />
                  <span>{isMarathi ? 'सबस्क्रिप्शन सवलती' : 'Subscription Benefits'}</span>
                </button>

                <button
                  onClick={() => {
                    setShowDrawer(false);
                    handleAdminToggle();
                  }}
                  className="flex items-center gap-2.5 w-full px-3 py-2.5 text-left text-orange-400 bg-orange-950/20 hover:bg-orange-950/40 border border-orange-900/30 hover:border-orange-500/50 rounded-lg transition-all cursor-pointer font-bold mt-2"
                >
                  <ShieldCheck className="w-4 h-4 text-orange-500" />
                  <span>{isAdmin ? (isMarathi ? 'प्रशासक पॅनेलबाहेर पडा' : 'Exit Admin Dashboard') : (isMarathi ? 'प्रशासकीय लॉग इन (Admin)' : 'Admin Panel Log In')}</span>
                </button>
              </div>
            </div>

            {/* Bottom Credit */}
            <div className="border-t border-zinc-850 pt-4 mt-6 text-xs text-zinc-500 font-mono">
              <p className="font-semibold text-zinc-400 mb-1">{isMarathi ? 'नाशिक २४x७ वृत्त समूह' : 'Nashik 24x7 News Hub'}</p>
              <p>© 2026 Nashik 24x7. All rights, designs, and content licenses active.</p>
            </div>
          </div>
        </div>
      )}

      {/* Premium Subscription Benefits Modal */}
      {showSubscriptionModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-xs">
          <div className="bg-zinc-900 border border-zinc-800 text-white rounded-lg p-6 max-w-md w-full shadow-2xl relative">
            <button 
              onClick={() => setShowSubscriptionModal(false)}
              className="absolute top-4 right-4 p-1 hover:bg-zinc-800 rounded-md text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-4 text-yellow-400 border-b border-zinc-800 pb-3">
              <Crown className="w-6 h-6 fill-yellow-400" />
              <h3 className="font-serif text-xl font-bold">सकाळ प्रीमियम सभासदत्व</h3>
            </div>

            <p className="text-xs text-zinc-300 mb-4 font-sans leading-relaxed">
              सकाळ डिजिटल प्रीमियममध्ये आपले स्वागत आहे! नाशिक आणि महाराष्ट्रातील विश्वासार्ह बातम्यांचे अमर्याद प्रवेश मिळवा.
            </p>

            <div className="space-y-3.5 my-5 text-xs font-sans">
              <div className="flex gap-2.5">
                <span className="text-orange-500 font-bold">✓</span>
                <div>
                  <h4 className="font-bold text-white">जाहिरातमुक्त अनुभव</h4>
                  <p className="text-zinc-400 text-[11px]">बातम्या वाचताना कोणत्याही जाहिरातींचा अडथळा नाही.</p>
                </div>
              </div>
              <div className="flex gap-2.5">
                <span className="text-orange-500 font-bold">✓</span>
                <div>
                  <h4 className="font-bold text-white">दैनिक ई-पेपर प्रवेश</h4>
                  <p className="text-zinc-400 text-[11px]">सकाळच्या सर्व विभागीय छापील आवृत्तींचे डिजिटल व्हर्जन वाचता येईल.</p>
                </div>
              </div>
              <div className="flex gap-2.5">
                <span className="text-orange-500 font-bold">✓</span>
                <div>
                  <h4 className="font-bold text-white">दोन वर्षांचे ऑटोपायलट आर्काइव्ह्ज</h4>
                  <p className="text-zinc-400 text-[11px]">भविष्यातील आणि भूतकाळातील ७३० दिवसांच्या बातम्यांचे विशेष भांडार.</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowSubscriptionModal(false)}
              className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-2.5 rounded-md text-xs transition-colors cursor-pointer shadow-md"
            >
              प्रीमियम सदस्य व्हा - ₹५९९ / वर्ष
            </button>
          </div>
        </div>
      )}

      {/* Admin Passcode Gate Modal */}
      {openPasscodeModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-xs">
          <div className="bg-zinc-900 border border-zinc-800 text-white rounded-md p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center gap-2 mb-3 border-b border-zinc-800 pb-2">
              <ShieldCheck className="w-5 h-5 text-orange-500" />
              <h3 className="font-serif text-lg font-bold text-white">प्रशासकीय लॉग इन (Admin Gate)</h3>
            </div>
            <p className="text-xs text-zinc-300 mb-4 font-sans leading-relaxed">
              {isMarathi 
                ? 'नाशिक २४x७ च्या प्रशासकीय पॅनेलमध्ये प्रवेश करण्यासाठी लॉगिन आयडी आणि पासवर्ड प्रविष्ट करा:' 
                : 'Enter your Admin Login ID and Password to access the Nashik 24x7 Administrative Panel:'}
            </p>
            
            <form onSubmit={handlePasscodeSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-medium text-zinc-400 mb-1">
                  Login ID (वापरकर्ता नाव):
                </label>
                <input
                  type="text"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-zinc-800 border border-zinc-700 rounded text-white focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 font-sans"
                  required
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-zinc-400 mb-1">
                  Password (पासवर्ड):
                </label>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-zinc-800 border border-zinc-700 rounded text-white focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 font-mono"
                  required
                />
                {passcodeError && (
                  <p className="text-[11px] text-red-500 mt-2 font-mono">{passcodeError}</p>
                )}
              </div>
              
              <div className="flex justify-end gap-2 text-xs font-mono pt-2">
                <button
                  type="button"
                  onClick={() => setOpenPasscodeModal(false)}
                  className="px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-zinc-300 hover:bg-zinc-700 transition-colors cursor-pointer"
                >
                  मागे फिरा (Cancel)
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded font-semibold flex items-center gap-1 cursor-pointer transition-colors shadow-sm"
                >
                  <span>प्रवेश करा</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </header>
  );
};
