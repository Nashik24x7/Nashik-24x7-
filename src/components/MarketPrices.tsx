/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TrendingUp, TrendingDown, MinusCircle, Sprout, Tag } from 'lucide-react';
import { LOCAL_MARKET_TICKERS } from '../utils';

export const MarketPrices: React.FC = () => {
  return (
    <div className="w-full bg-gray-50 border-b border-gray-200 py-2 text-xs">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:items-center justify-between gap-2.5">
        
        {/* Left Indicator */}
        <div className="flex items-center gap-1 text-gray-500 font-mono tracking-wider text-[10px] uppercase font-bold shrink-0">
          <Sprout className="w-4.5 h-4.5 text-emerald-700 animate-pulse" />
          <span>Nashik APMC Agricultural Spot Price Indexes</span>
        </div>

        {/* Right Scrolling Ticker Container */}
        <div className="w-full overflow-x-auto no-scrollbar py-0.5">
          <div className="flex items-center gap-6 min-w-max text-[11px] font-mono">
            {LOCAL_MARKET_TICKERS.map((item, index) => {
              const isUp = item.trend === 'up';
              const isDown = item.trend === 'down';
              return (
                <div
                  key={index}
                  className="flex items-center gap-1.5 px-2 py-1 bg-white border border-gray-200 rounded-sm shadow-xs"
                >
                  <Tag className="w-3 h-3 text-gray-400" />
                  <span className="font-semibold text-gray-900">{item.commodity}</span>
                  <span className="text-gray-400">({item.market})</span>
                  <span className="font-bold text-gray-950">₹{item.pricePerQuintal}/qtl</span>
                  
                  {isUp && (
                    <span className="flex items-center text-emerald-700 font-bold bg-emerald-50 px-1 rounded-sm text-[10px]">
                      <TrendingUp className="w-3 h-3 mr-0.5 text-emerald-700" />
                      UP
                    </span>
                  )}
                  {isDown && (
                    <span className="flex items-center text-rose-700 font-bold bg-rose-50 px-1 rounded-sm text-[10px]">
                      <TrendingDown className="w-3 h-3 mr-0.5 text-rose-700" />
                      DOWN
                    </span>
                  )}
                  {item.trend === 'stable' && (
                    <span className="flex items-center text-blue-700 font-bold bg-blue-50 px-1 rounded-sm text-[10px]">
                      <MinusCircle className="w-3 h-3 mr-0.5 text-blue-700" />
                      FLAT
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
      </div>
    </div>
  );
};
