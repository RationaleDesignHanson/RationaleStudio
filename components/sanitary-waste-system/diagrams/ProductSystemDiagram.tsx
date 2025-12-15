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
      color: 'bg-blue-500/20 border-blue-500/50',
      textColor: 'text-blue-400'
    },
    {
      name: 'Refill Packs',
      price: '$15-18/box',
      role: 'Subscription Engine',
      color: 'bg-purple-500/20 border-purple-500/50',
      textColor: 'text-purple-400'
    },
    {
      name: 'Premium Dispenser',
      price: '$24.99',
      role: 'Acquisition Tool',
      color: 'bg-green-500/20 border-green-500/50',
      textColor: 'text-green-400'
    }
  ];

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 sm:p-8">
      <h3 className="text-2xl font-bold text-center mb-8">The Three-SKU System</h3>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {skus.map((sku, index) => (
          <div key={index} className={`${sku.color} border-2 rounded-lg p-6 space-y-4`}>
            <div className="text-center">
              <div className={`text-4xl font-bold ${sku.textColor} mb-2`}>
                {index + 1}
              </div>
              <h4 className="font-bold text-white mb-2">{sku.name}</h4>
              <div className={`text-2xl font-bold ${sku.textColor} mb-2`}>
                {sku.price}
              </div>
              <div className="text-sm text-gray-400">
                {sku.role}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 text-gray-400 text-sm">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
          <span>Format Lock-in</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-purple-500"></div>
          <span>Recurring Revenue</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-blue-500"></div>
          <span>High Margins</span>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-800 text-center">
        <p className="text-gray-400">
          Razor + blade economics: Break-even on dispenser, profit on refills
        </p>
      </div>
    </div>
  );
}
