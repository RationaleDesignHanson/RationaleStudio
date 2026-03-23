'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, X, AlertCircle } from 'lucide-react';

interface ComparisonRow {
  feature: string;
  heirloom: boolean | string;
  paprika: boolean | string;
  pestle: boolean | string;
  nyt: boolean | string;
}

interface ComparisonTableProps {
  rows: ComparisonRow[];
  callout: string;
}

export default function ComparisonTable({ rows, callout }: ComparisonTableProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const renderCheckmark = (value: boolean | string) => {
    if (value === true) {
      return <Check className="w-5 h-5 text-green-600" />;
    } else if (value === false) {
      return <X className="w-5 h-5 text-gray-400" />;
    } else if (value === 'partial') {
      return <AlertCircle className="w-5 h-5 text-amber-500" />;
    }
    return null;
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-[var(--heirloom-pitch-sand)]">
              <th className="text-left p-4 font-bold text-[var(--heirloom-pitch-brown)]">Feature</th>
              <th className="text-center p-4 font-bold text-[var(--heirloom-pitch-terracotta)]">Heirloom</th>
              <th className="text-center p-4 font-bold text-[var(--heirloom-pitch-warm-gray)]">Paprika</th>
              <th className="text-center p-4 font-bold text-[var(--heirloom-pitch-warm-gray)]">Pestle</th>
              <th className="text-center p-4 font-bold text-[var(--heirloom-pitch-warm-gray)]">NYT</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <motion.tr
                key={row.feature}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border-b border-[var(--heirloom-pitch-sand)] hover:bg-[var(--heirloom-pitch-cream)] transition-colors"
              >
                <td className="p-4 text-[var(--heirloom-pitch-brown)] font-medium">{row.feature}</td>
                <td className="p-4 text-center">{renderCheckmark(row.heirloom)}</td>
                <td className="p-4 text-center">{renderCheckmark(row.paprika)}</td>
                <td className="p-4 text-center">{renderCheckmark(row.pestle)}</td>
                <td className="p-4 text-center">{renderCheckmark(row.nyt)}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {rows.map((row, index) => (
          <motion.div
            key={row.feature}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-[var(--heirloom-pitch-cream)] rounded-xl p-4 border border-[var(--heirloom-pitch-sand)]"
          >
            <h4 className="font-bold text-[var(--heirloom-pitch-brown)] mb-3">{row.feature}</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-[var(--heirloom-pitch-terracotta)] font-medium">Heirloom:</span>
                {renderCheckmark(row.heirloom)}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[var(--heirloom-pitch-warm-gray)]">Paprika:</span>
                {renderCheckmark(row.paprika)}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[var(--heirloom-pitch-warm-gray)]">Pestle:</span>
                {renderCheckmark(row.pestle)}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[var(--heirloom-pitch-warm-gray)]">NYT:</span>
                {renderCheckmark(row.nyt)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Callout Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.3, delay: rows.length * 0.1 }}
        className="mt-6 bg-[var(--heirloom-pitch-terracotta)] rounded-xl p-4 md:p-6 text-center"
      >
        <p className="text-white font-semibold text-lg">{callout}</p>
      </motion.div>
    </motion.div>
  );
}
