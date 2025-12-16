/**
 * Mobile Contract Modeling View
 *
 * Swipeable carousel of contract cards optimized for mobile
 * - One card at a time with swipe navigation
 * - Focused metrics with tap-to-expand details
 * - Terminal Republic aesthetic with mobile-first UX
 */

'use client';

import { useState } from 'react';

interface ContractOffer {
  team: string;
  guaranteed: number;
  totalValue: number;
  years: number;
  signingBonus: number;
  avgPerYear: number;
  rosterBonus: number;
  performanceEscalator: number;
  offset: boolean;
  injuryGuarantee: boolean;
  color: string;
  risk: 'low' | 'medium' | 'high';
}

const DEFAULT_OFFERS: ContractOffer[] = [
  {
    team: 'Team A',
    guaranteed: 45000000,
    totalValue: 80000000,
    years: 4,
    signingBonus: 15000000,
    avgPerYear: 20000000,
    rosterBonus: 8000000,
    performanceEscalator: 12000000,
    offset: false,
    injuryGuarantee: true,
    color: '#00FF94',
    risk: 'low'
  },
  {
    team: 'Team B',
    guaranteed: 38000000,
    totalValue: 90000000,
    years: 5,
    signingBonus: 12000000,
    avgPerYear: 18000000,
    rosterBonus: 6000000,
    performanceEscalator: 34000000,
    offset: true,
    injuryGuarantee: false,
    color: '#9D4EDD',
    risk: 'high'
  },
  {
    team: 'Team C',
    guaranteed: 52000000,
    totalValue: 85000000,
    years: 4,
    signingBonus: 20000000,
    avgPerYear: 21250000,
    rosterBonus: 10000000,
    performanceEscalator: 3000000,
    offset: false,
    injuryGuarantee: true,
    color: '#FF6B00',
    risk: 'low'
  }
];

interface ContractModelingMobileProps {
  onContractClick?: (contract: ContractOffer) => void;
}

export default function ContractModelingMobile({ onContractClick }: ContractModelingMobileProps = {}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedDetails, setExpandedDetails] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const formatMoney = (value: number) => {
    return `$${(value / 1000000).toFixed(1)}M`;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance && activeIndex < DEFAULT_OFFERS.length - 1) {
      // Swipe left - next card
      setActiveIndex(activeIndex + 1);
      setExpandedDetails(false);
    }

    if (distance < -minSwipeDistance && activeIndex > 0) {
      // Swipe right - previous card
      setActiveIndex(activeIndex - 1);
      setExpandedDetails(false);
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  const currentOffer = DEFAULT_OFFERS[activeIndex];
  const riskColor = currentOffer.risk === 'low' ? '#00FF94' : (currentOffer.risk === 'medium' ? '#FFD700' : '#EF4444');

  // Find best offer
  const bestIndex = DEFAULT_OFFERS.reduce((maxI, offer, i, arr) =>
    offer.guaranteed > arr[maxI].guaranteed ? i : maxI, 0);
  const isBest = activeIndex === bestIndex;

  return (
    <div className="space-y-4">
      {/* Title */}
      <div className="text-center space-y-2">
        <h3 className="text-lg font-bold font-mono text-terminal-gold">
          CONTRACT COMPARISON
        </h3>
        <p className="text-xs font-mono text-white/60">
          Swipe to compare offers • Tap card to explore
        </p>
      </div>

      {/* Card indicators - informative tabs */}
      <div className="flex items-center justify-center gap-2">
        {DEFAULT_OFFERS.map((offer, i) => (
          <button
            key={i}
            onClick={() => {
              setActiveIndex(i);
              setExpandedDetails(false);
            }}
            className="flex-1 max-w-[120px] px-3 py-3 rounded-lg font-mono transition-all flex flex-col items-center"
            style={{
              backgroundColor: i === activeIndex ? `${offer.color}20` : `${offer.color}08`,
              borderWidth: '2px',
              borderStyle: 'solid',
              borderColor: i === activeIndex ? offer.color : `${offer.color}40`,
              color: i === activeIndex ? offer.color : `${offer.color}80`
            }}
          >
            <div className="text-sm font-bold leading-tight">{offer.team}</div>
            <div className="text-xs mt-1 leading-tight">
              {formatMoney(offer.guaranteed)}
            </div>
          </button>
        ))}
      </div>

      {/* Main card */}
      <div
        className="relative bg-black rounded-lg overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={() => {
          if (onContractClick && !expandedDetails) {
            onContractClick(currentOffer);
          }
        }}
      >
        {/* Best offer badge */}
        {isBest && (
          <div
            className="absolute top-0 left-0 right-0 py-2 text-center text-xs font-bold font-mono z-10"
            style={{
              backgroundColor: `${riskColor}20`,
              borderBottom: `2px solid ${riskColor}`,
              color: riskColor
            }}
          >
            ★ HIGHEST GUARANTEED
          </div>
        )}

        <div
          className="border-2 rounded-lg p-6 space-y-6"
          style={{
            borderColor: currentOffer.color,
            backgroundColor: `${currentOffer.color}08`,
            marginTop: isBest ? '40px' : '0'
          }}
        >
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h4
                className="text-2xl font-bold font-mono"
                style={{ color: currentOffer.color }}
              >
                {currentOffer.team}
              </h4>
              <div
                className="inline-flex items-center gap-2 px-3 py-1 mt-2 rounded border-2 text-xs font-bold font-mono"
                style={{
                  borderColor: riskColor,
                  backgroundColor: `${riskColor}20`,
                  color: riskColor
                }}
              >
                {currentOffer.risk.toUpperCase()} RISK
              </div>
            </div>
          </div>

          {/* Key metrics */}
          <div className="space-y-4">
            <div>
              <div className="text-xs font-mono text-white/60 mb-1">GUARANTEED</div>
              <div
                className="text-4xl font-bold font-mono"
                style={{ color: currentOffer.color }}
              >
                {formatMoney(currentOffer.guaranteed)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs font-mono text-white/60 mb-1">TOTAL VALUE</div>
                <div className="text-xl font-bold font-mono text-white">
                  {formatMoney(currentOffer.totalValue)}
                </div>
              </div>
              <div>
                <div className="text-xs font-mono text-white/60 mb-1">AVG/YEAR</div>
                <div className="text-xl font-bold font-mono text-white">
                  {formatMoney(currentOffer.avgPerYear)}
                </div>
              </div>
            </div>

            <div>
              <div className="text-xs font-mono text-white/60 mb-1">CONTRACT LENGTH</div>
              <div className="text-xl font-bold font-mono text-white">
                {currentOffer.years} {currentOffer.years === 1 ? 'Year' : 'Years'}
              </div>
            </div>
          </div>

          {/* Expandable details toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setExpandedDetails(!expandedDetails);
            }}
            className="w-full py-3 border-2 rounded-lg font-mono text-sm font-bold transition-all"
            style={{
              borderColor: `${currentOffer.color}60`,
              backgroundColor: expandedDetails ? `${currentOffer.color}20` : 'transparent',
              color: currentOffer.color
            }}
          >
            {expandedDetails ? '▼ HIDE DETAILS' : '▶ VIEW DETAILS'}
          </button>

          {/* Expanded details */}
          {expandedDetails && (
            <div
              className="space-y-4 pt-4 border-t-2"
              style={{ borderColor: `${currentOffer.color}40` }}
            >
              {/* Bonus structure */}
              <div>
                <div className="text-xs font-bold font-mono text-white/60 mb-3">BONUS STRUCTURE</div>
                <div className="space-y-3">
                  {[
                    { label: 'Signing Bonus', value: currentOffer.signingBonus },
                    { label: 'Roster Bonus', value: currentOffer.rosterBonus },
                    { label: 'Performance Escalator', value: currentOffer.performanceEscalator }
                  ].map((bonus, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between text-sm font-mono mb-1">
                        <span className="text-white/60">{bonus.label}</span>
                        <span className="text-white font-bold">{formatMoney(bonus.value)}</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${(bonus.value / 20000000) * 100}%`,
                            backgroundColor: currentOffer.color
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Red flags */}
              <div>
                <div className="text-xs font-bold font-mono text-white/60 mb-3">RISK FACTORS</div>
                <div className="space-y-2">
                  {[
                    { flag: 'Offset Language', present: currentOffer.offset },
                    { flag: 'Injury Protection', present: !currentOffer.injuryGuarantee }
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-sm font-mono"
                    >
                      {item.present ? (
                        <>
                          <span className="text-[#EF4444] font-bold">⚠</span>
                          <span className="text-[#EF4444]">{item.flag}</span>
                        </>
                      ) : (
                        <>
                          <span className="text-[#00FF94] font-bold">✓</span>
                          <span className="text-white/60">{item.flag} Protected</span>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* CTA */}
          <button
            onClick={() => onContractClick?.(currentOffer)}
            className="w-full py-4 rounded-lg font-mono text-sm font-bold transition-all"
            style={{
              backgroundColor: currentOffer.color,
              color: '#000000'
            }}
          >
            EXPLORE {currentOffer.team.toUpperCase()} →
          </button>
        </div>

        {/* Scanline overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 215, 0, 0.1) 2px, rgba(255, 215, 0, 0.1) 4px)'
          }}
        />
      </div>

      {/* Navigation hints */}
      <div className="flex items-center justify-between px-4 text-xs font-mono text-white/40">
        <div className="flex items-center gap-2">
          {activeIndex > 0 && (
            <>
              <span>←</span>
              <span>Swipe for {DEFAULT_OFFERS[activeIndex - 1].team}</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          {activeIndex < DEFAULT_OFFERS.length - 1 && (
            <>
              <span>Swipe for {DEFAULT_OFFERS[activeIndex + 1].team}</span>
              <span>→</span>
            </>
          )}
        </div>
      </div>

      {/* Risk legend */}
      <div className="flex items-center justify-center gap-4 text-xs font-mono text-white/60 pt-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#00FF94]"></div>
          <span>Low</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#FFD700]"></div>
          <span>Med</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#EF4444]"></div>
          <span>High</span>
        </div>
      </div>
    </div>
  );
}
