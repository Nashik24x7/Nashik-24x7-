/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ArticleComment {
  id: string;
  author: string;
  text: string;
  date: string;
}

export type NewsCategory =
  | 'Panchavati'
  | 'Education'
  | 'City Buzz'
  | 'Politics'
  | 'Business';

export interface NewsArticle {
  id: string;
  title: string;
  subtitle: string;
  category: NewsCategory;
  body: string;
  imageUrl: string;
  author: string;
  date: string;
  readTime: number; // in minutes
  isLead?: boolean;
  isBreaking?: boolean;
  isEditorial?: boolean;
  likes: number;
  comments: ArticleComment[];
  marathiTitle?: string;
  marathiSubtitle?: string;
  marathiBody?: string;
  marathiSource?: 'lokmat.com' | 'esakal.com' | 'loksatta.com' | 'nashik24x7.com';
  simulatedDayIndex?: number;
}

export interface MarketPrice {
  commodity: string;
  market: string;
  variety: string;
  pricePerQuintal: number;
  trend: 'up' | 'down' | 'stable';
}

export interface WeatherInfo {
  temp: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}
