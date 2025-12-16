/**
 * Product System Diagram
 * 3-SKU razor-blade ecosystem
 */

'use client';

export default function ProductSystemDiagram() {
  const skus = [
    {
      name: 'Absorbent-Lined Bags',
      price: '$0.25-0.30',
      role: 'Consumable',
      color: 'bg-[#2A9D8F]/10 border-[#2A9D8F]/30',
      textColor: 'text-[#2A9D8F]'
    },
    {
      name: 'Refill Packs',
      price: '$15-18/box',
      role: 'Subscription Engine',
      color: 'bg-[#F4A261]/10 border-[#F4A261]/30',
      textColor: 'text-[#F4A261]'
    },
    {
      name: 'Premium Dispenser',
      price: '$24.99',
      role: 'Acquisition Tool',
      color: 'bg-[#E85D42]/10 border-[#E85D42]/30',
      textColor: 'text-[#E85D42]'
    }
  ];

  return (
    <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
      <h3 className="text-2xl font-bold text-center mb-8 text-[#2D2D2D]">The Three-SKU System</h3>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {skus.map((sku, index) => (
          <div key={index} className={`${sku.color} border-2 rounded-2xl p-6 space-y-4`}>
            <div className="text-center">
              <div className={`text-4xl font-bold ${sku.textColor} mb-2`}>
                {index + 1}
              </div>
              <h4 className="font-bold text-[#2D2D2D] mb-2">{sku.name}</h4>
              <div className={`text-2xl font-bold ${sku.textColor} mb-2`}>
                {sku.price}
              </div>
              <div className="text-sm text-[#2D2D2D]/60">
                {sku.role}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 text-[#2D2D2D]/70 text-sm">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[#E85D42]"></div>
          <span>Format Lock-in</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[#F4A261]"></div>
          <span>Recurring Revenue</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[#2A9D8F]"></div>
          <span>High Margins</span>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t-2 border-gray-200 text-center">
        <p className="text-[#2D2D2D]/70">
          Razor + blade economics: Break-even on dispenser, profit on refills
        </p>
      </div>
    </div>
  );
}
