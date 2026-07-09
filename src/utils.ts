/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MarketPrice, WeatherInfo } from './types';

// Convert a standard Date into a traditional Marathi date label for the masthead
export function getMarathiDateString(date: Date): string {
  const safeDate = !date || isNaN(date.getTime()) ? new Date('2026-07-05T06:43:12-07:00') : date;
  
  const marathiDays = [
    'रविवार', // Sunday
    'सोमवार', // Monday
    'मंगळवार', // Tuesday
    'बुधवार', // Wednesday
    'गुरुवार', // Thursday
    'शुक्रवार', // Friday
    'शनिवार'   // Saturday
  ];

  const marathiMonths = [
    'जानेवारी', 'फेब्रुवारी', 'मार्च', 'एप्रिल', 'मे', 'जून',
    'जुलै', 'ऑगस्ट', 'सप्टेंबर', 'ऑक्टोबर', 'नोव्हेंबर', 'डिसेंबर'
  ];

  const dayName = marathiDays[safeDate.getDay()] ?? 'सोमवार';
  const dateNum = safeDate.getDate();
  const monthName = marathiMonths[safeDate.getMonth()] ?? 'जुलै';
  const yearNum = safeDate.getFullYear();

  // Simple number translation to Marathi digits
  const toMarathiDigits = (num: number): string => {
    const digitsMap: Record<string, string> = {
      '0': '०', '1': '१', '2': '२', '3': '३', '4': '४',
      '5': '५', '6': '६', '7': '७', '8': '८', '9': '९'
    };
    return (num ?? 0).toString().split('').map(char => digitsMap[char] || char).join('');
  };

  return `${dayName}, ${toMarathiDigits(dateNum)} ${monthName} ${toMarathiDigits(yearNum)}`;
}

// Convert a standard Date to classic English newspaper display format
export function getFormattedDate(date: Date): string {
  const safeDate = !date || isNaN(date.getTime()) ? new Date('2026-07-05T06:43:12-07:00') : date;
  return safeDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Market rates from key Nashik agricultural trading terminals
export const LOCAL_MARKET_TICKERS: MarketPrice[] = [
  { commodity: 'Onion (No. 1)', market: 'Lasalgaon APMC', variety: 'Summer Red', pricePerQuintal: 2450, trend: 'up' },
  { commodity: 'Grapes', market: 'Pimpalgaon APMC', variety: 'Thompson Seedless', pricePerQuintal: 8200, trend: 'stable' },
  { commodity: 'Pomegranate', market: 'Sinnar APMC', variety: 'Mridula Premium', pricePerQuintal: 9500, trend: 'up' },
  { commodity: 'Onion (No. 2)', market: 'Yeola APMC', variety: 'Pol / Red', pricePerQuintal: 1800, trend: 'down' },
  { commodity: 'Tomatoes', market: 'Girnare APMC', variety: 'Local Organic', pricePerQuintal: 2100, trend: 'up' },
  { commodity: 'Maize', market: 'Satana APMC', variety: 'Yellow Indian', pricePerQuintal: 1950, trend: 'stable' }
];

// Weather simulator in Nashik region (pleasant hilly Deccan plateau climate)
export const NASHIK_WEATHER: WeatherInfo = {
  temp: 30, // in Celsius
  condition: 'Sunny with vineyard breeze',
  humidity: 45,
  windSpeed: 14 // km/h
};

// Preset high quality cover images representing Nashik or corporate themes for easy selection during admin composition
export const IMAGE_PRESETS = [
  {
    name: 'Nashik Vineyards & Sula Lake',
    url: 'https://images.unsplash.com/photo-1543418219-44e30b057fc5?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: 'Godavari Ghat & Temple Heritage',
    url: 'https://images.unsplash.com/photo-1600100397573-047df1ec5bf1?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: 'Someshwar Waterfall & Agritourism',
    url: 'https://images.unsplash.com/photo-1545231027-63b3f162d20e?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: 'Lasalgaon Red Onion Farms',
    url: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: 'Satpur Tech Manufacturing & Logistics',
    url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: 'City Highrises & Elevated Flyovers',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: 'Culinary Indian Feast & Spicy Misal',
    url: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: 'Western Ghats Haze & Mountain Slopes',
    url: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=800'
  }
];
