/**
 * Interactive Contract Modeling Canvas
 *
 * Real-time contract comparison with interactive controls
 * Side-by-side comparison of 3 offers with visual highlighting
 * Terminal Republic aesthetic matching infographic quality
 */

'use client';

import { useEffect, useRef, useState } from 'react';

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

export default function ContractModelingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const [offers] = useState<ContractOffer[]>(DEFAULT_OFFERS);
  const [hoveredOffer, setHoveredOffer] = useState<number | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<'guaranteed' | 'total' | 'avgPerYear'>('guaranteed');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const container = canvas.parentElement;
    if (!container) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const width = rect.width || 1100;
      const height = rect.height || 700;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      return { width, height };
    };

    const { width, height } = resize();

    const gold = '#FFD700';
    const gray = 'rgba(156, 163, 175, 0.6)';
    const red = '#EF4444';

    let animationId: number;

    const formatMoney = (value: number) => {
      return `$${(value / 1000000).toFixed(1)}M`;
    };

    const draw = () => {
      // Clear
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      // Title
      ctx.fillStyle = gold;
      ctx.font = 'bold 20px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('REAL-TIME CONTRACT COMPARISON', width / 2, 35);

      ctx.font = '12px monospace';
      ctx.fillStyle = gray;
      ctx.fillText('Side-by-side analysis • AI highlights key differences', width / 2, 52);

      // Calculate layout
      const offerWidth = 300;
      const offerGap = 50;
      const totalWidth = (offerWidth * 3) + (offerGap * 2);
      const startX = (width - totalWidth) / 2;
      const startY = 90;

      // Draw each offer card
      offers.forEach((offer, i) => {
        const x = startX + (i * (offerWidth + offerGap));
        const y = startY;
        const cardHeight = 520;
        const isHovered = hoveredOffer === i;

        // Card background
        ctx.fillStyle = isHovered ? `${offer.color}10` : `${offer.color}08`;
        ctx.fillRect(x, y, offerWidth, cardHeight);

        // Card border with glow on hover
        ctx.strokeStyle = isHovered ? offer.color : `${offer.color}60`;
        ctx.lineWidth = isHovered ? 3 : 2;
        if (isHovered) {
          ctx.shadowColor = offer.color;
          ctx.shadowBlur = 15;
        }
        ctx.strokeRect(x, y, offerWidth, cardHeight);
        ctx.shadowBlur = 0;

        // Team header
        ctx.fillStyle = offer.color;
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(offer.team, x + offerWidth / 2, y + 30);

        // Risk badge
        const riskColor = offer.risk === 'low' ? '#00FF94' : (offer.risk === 'medium' ? '#FFD700' : red);
        ctx.fillStyle = `${riskColor}20`;
        ctx.fillRect(x + 10, y + 45, 80, 24);
        ctx.strokeStyle = riskColor;
        ctx.lineWidth = 2;
        ctx.strokeRect(x + 10, y + 45, 80, 24);

        ctx.fillStyle = riskColor;
        ctx.font = 'bold 11px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`${offer.risk.toUpperCase()} RISK`, x + 50, y + 61);

        // Key metrics section
        const metricsY = y + 90;
        const metrics = [
          { label: 'GUARANTEED', value: formatMoney(offer.guaranteed), highlight: selectedMetric === 'guaranteed' },
          { label: 'TOTAL VALUE', value: formatMoney(offer.totalValue), highlight: selectedMetric === 'total' },
          { label: 'AVG/YEAR', value: formatMoney(offer.avgPerYear), highlight: selectedMetric === 'avgPerYear' },
          { label: 'YEARS', value: offer.years.toString(), highlight: false }
        ];

        metrics.forEach((metric, mi) => {
          const metricY = metricsY + (mi * 65);

          // Metric label
          ctx.fillStyle = metric.highlight ? offer.color : gray;
          ctx.font = 'bold 11px monospace';
          ctx.textAlign = 'left';
          ctx.fillText(metric.label, x + 20, metricY);

          // Metric value
          ctx.fillStyle = metric.highlight ? offer.color : '#ffffff';
          ctx.font = metric.highlight ? 'bold 32px monospace' : 'bold 28px monospace';
          ctx.textAlign = 'center';
          ctx.fillText(metric.value, x + offerWidth / 2, metricY + 35);

          // Highlight bar
          if (metric.highlight) {
            ctx.fillStyle = `${offer.color}30`;
            ctx.fillRect(x + 10, metricY - 10, offerWidth - 20, 50);
            ctx.strokeStyle = offer.color;
            ctx.lineWidth = 2;
            ctx.strokeRect(x + 10, metricY - 10, offerWidth - 20, 50);
          }
        });

        // Bonus breakdown section
        const bonusY = metricsY + 280;
        ctx.fillStyle = gray;
        ctx.font = 'bold 11px monospace';
        ctx.textAlign = 'left';
        ctx.fillText('BONUS STRUCTURE', x + 20, bonusY);

        const bonuses = [
          { label: 'Signing', value: formatMoney(offer.signingBonus) },
          { label: 'Roster', value: formatMoney(offer.rosterBonus) },
          { label: 'Escalator', value: formatMoney(offer.performanceEscalator) }
        ];

        bonuses.forEach((bonus, bi) => {
          const bonusLineY = bonusY + 20 + (bi * 24);

          ctx.fillStyle = gray;
          ctx.font = '11px monospace';
          ctx.textAlign = 'left';
          ctx.fillText(bonus.label, x + 20, bonusLineY);

          ctx.fillStyle = '#ffffff';
          ctx.textAlign = 'right';
          ctx.fillText(bonus.value, x + offerWidth - 20, bonusLineY);

          // Progress bar
          const maxBonus = 20000000;
          const barWidth = (parseInt(bonus.value.replace(/[^0-9]/g, '')) / (maxBonus / 1000000)) * (offerWidth - 160);
          ctx.fillStyle = `${offer.color}40`;
          ctx.fillRect(x + 20, bonusLineY + 4, barWidth, 4);
        });

        // Red flags section
        const flagsY = bonusY + 110;
        ctx.fillStyle = gray;
        ctx.font = 'bold 11px monospace';
        ctx.textAlign = 'left';
        ctx.fillText('RED FLAGS', x + 20, flagsY);

        const flags = [
          { flag: 'Offset Language', present: offer.offset },
          { flag: 'Injury Protection', present: !offer.injuryGuarantee }
        ];

        flags.forEach((flag, fi) => {
          const flagLineY = flagsY + 20 + (fi * 20);

          if (flag.present) {
            ctx.fillStyle = red;
            ctx.font = 'bold 11px monospace';
            ctx.fillText('⚠', x + 20, flagLineY);

            ctx.fillStyle = red;
            ctx.font = '11px monospace';
            ctx.fillText(flag.flag, x + 35, flagLineY);
          } else {
            ctx.fillStyle = '#00FF94';
            ctx.font = 'bold 11px monospace';
            ctx.fillText('✓', x + 20, flagLineY);

            ctx.fillStyle = gray;
            ctx.font = '11px monospace';
            ctx.fillText(`${flag.flag} Protected`, x + 35, flagLineY);
          }
        });
      });

      // Best value indicator
      const bestIndex = offers.reduce((maxI, offer, i, arr) =>
        offer.guaranteed > arr[maxI].guaranteed ? i : maxI, 0);

      const bestX = startX + (bestIndex * (offerWidth + offerGap));
      const badgeY = startY - 30;

      ctx.fillStyle = `${gold}30`;
      const badgeWidth = 140;
      ctx.fillRect(bestX + offerWidth / 2 - badgeWidth / 2, badgeY, badgeWidth, 26);

      ctx.strokeStyle = gold;
      ctx.lineWidth = 2;
      ctx.shadowColor = gold;
      ctx.shadowBlur = 10;
      ctx.strokeRect(bestX + offerWidth / 2 - badgeWidth / 2, badgeY, badgeWidth, 26);
      ctx.shadowBlur = 0;

      ctx.fillStyle = gold;
      ctx.font = 'bold 12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('HIGHEST GUARANTEED', bestX + offerWidth / 2, badgeY + 17);

      // Bottom insight
      ctx.fillStyle = gold;
      ctx.font = 'bold 14px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('AI HIGHLIGHTS KEY DIFFERENCES • CLICK TO EXPLORE SCENARIOS', width / 2, height - 25);

      frameRef.current += 1;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;

      const offerWidth = 300;
      const offerGap = 50;
      const totalWidth = (offerWidth * 3) + (offerGap * 2);
      const startX = (width - totalWidth) / 2;

      let hovered = null;
      for (let i = 0; i < 3; i++) {
        const offerX = startX + (i * (offerWidth + offerGap));
        if (x >= offerX && x <= offerX + offerWidth) {
          hovered = i;
          break;
        }
      }
      setHoveredOffer(hovered);
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [hoveredOffer, selectedMetric, offers]);

  return (
    <div className="space-y-4">
      {/* Metric selector controls */}
      <div className="flex items-center justify-center gap-3">
        <span className="text-white/60 text-sm font-mono">COMPARE BY:</span>
        {[
          { key: 'guaranteed' as const, label: 'Guaranteed Money' },
          { key: 'total' as const, label: 'Total Value' },
          { key: 'avgPerYear' as const, label: 'Avg Per Year' }
        ].map((metric) => (
          <button
            key={metric.key}
            onClick={() => setSelectedMetric(metric.key)}
            className={`px-4 py-2 rounded font-mono text-sm transition-all ${
              selectedMetric === metric.key
                ? 'bg-[#FFD700]/20 text-[#FFD700] border-2 border-[#FFD700]'
                : 'bg-white/5 text-white/60 border-2 border-white/20 hover:border-white/40'
            }`}
          >
            {metric.label}
          </button>
        ))}
      </div>

      {/* Canvas */}
      <div className="relative w-full min-h-[700px] bg-black rounded-lg border border-[#FFD700]/20 overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ imageRendering: 'crisp-edges' }}
        />

        {/* Scanline overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 215, 0, 0.1) 2px, rgba(255, 215, 0, 0.1) 4px)'
          }}
        />
      </div>

      {/* Interactive instructions */}
      <div className="flex items-center justify-center gap-8 text-sm font-mono text-white/60">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#00FF94]"></div>
          <span>Low Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FFD700]"></div>
          <span>Medium Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#EF4444]"></div>
          <span>High Risk</span>
        </div>
      </div>
    </div>
  );
}
