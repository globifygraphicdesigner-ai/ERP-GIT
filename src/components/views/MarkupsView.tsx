import React, { useState } from 'react';
import { Percent, Plus, Save, RotateCcw } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MarketplaceBadge } from '../common/MarketplaceBadge';

export const MarkupsView: React.FC = () => {
  const { showToast } = useApp();

  const [markups, setMarkups] = useState([
    { marketplace: 'talabat', defaultMarkup: 20, rounding: '0.25', active: true },
    { marketplace: 'snoonu', defaultMarkup: 20, rounding: '0.25', active: true },
    { marketplace: 'rafeeq', defaultMarkup: 20, rounding: '0.50', active: true },
    { marketplace: 'keeta', defaultMarkup: 25, rounding: 'Exact', active: false },
  ]);

  const [categoryOverrides, setCategoryOverrides] = useState([
    { category: 'Beverages', marketplace: 'talabat', markup: 25 },
    { category: 'Dairy & Eggs', marketplace: 'snoonu', markup: 12 },
    { category: 'Snacks & Confectionery', marketplace: 'rafeeq', markup: 22 },
  ]);

  const handleSave = () => {
    showToast('Marketplace markups and rules updated successfully!');
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-150">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Markups & Pricing Rules
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Configure default price markups and margins applied to ERP cost prices for each marketplace.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Default Markups Table */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-gray-900">
                Default marketplace markups
              </h2>
              <button
                onClick={handleSave}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#0D6D4E] hover:bg-[#0b5c42] rounded-lg shadow-xs"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save rules</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold">
                  <tr>
                    <th className="py-2.5 px-3">Marketplace</th>
                    <th className="py-2.5 px-3">Default markup (%)</th>
                    <th className="py-2.5 px-3">Rounding rule</th>
                    <th className="py-2.5 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {markups.map((m, idx) => (
                    <tr key={m.marketplace} className="hover:bg-gray-50">
                      <td className="py-3 px-3">
                        <MarketplaceBadge marketplace={m.marketplace as any} />
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            value={m.defaultMarkup}
                            onChange={(e) => {
                              const copy = [...markups];
                              copy[idx].defaultMarkup = parseFloat(e.target.value) || 0;
                              setMarkups(copy);
                            }}
                            className="w-20 border border-gray-200 rounded-lg p-1.5 text-xs font-semibold"
                          />
                          <span className="text-gray-400 font-medium">%</span>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <select
                          value={m.rounding}
                          onChange={(e) => {
                            const copy = [...markups];
                            copy[idx].rounding = e.target.value;
                            setMarkups(copy);
                          }}
                          className="border border-gray-200 rounded-lg p-1.5 text-xs bg-white text-gray-700"
                        >
                          <option value="Exact">Exact</option>
                          <option value="0.25">Round to 0.25 QAR</option>
                          <option value="0.50">Round to 0.50 QAR</option>
                        </select>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${
                            m.active
                              ? 'bg-[#DEF7EC] text-[#03543F]'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {m.active ? 'Active' : 'Disabled'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Category Overrides */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-gray-900">Category overrides</h2>
                <p className="text-xs text-gray-500">
                  Override the default markup for specific categories.
                </p>
              </div>
              <button
                onClick={() => showToast('Add new category override')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5 text-gray-500" />
                <span>Add override</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold">
                  <tr>
                    <th className="py-2.5 px-3">Category</th>
                    <th className="py-2.5 px-3">Marketplace</th>
                    <th className="py-2.5 px-3">Custom markup</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {categoryOverrides.map((ov, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="py-3 px-3 font-medium text-gray-900">{ov.category}</td>
                      <td className="py-3 px-3">
                        <MarketplaceBadge marketplace={ov.marketplace as any} size="sm" />
                      </td>
                      <td className="py-3 px-3 font-semibold text-gray-900">{ov.markup}%</td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => {
                            setCategoryOverrides(categoryOverrides.filter((_, idx) => idx !== i));
                            showToast('Override removed');
                          }}
                          className="text-red-600 hover:underline"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Info Box */}
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-xs space-y-3 text-xs">
            <h3 className="font-bold uppercase tracking-wider text-gray-900">
              Pricing formula
            </h3>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 font-mono text-[11px] text-gray-700 leading-relaxed">
              Marketplace Price = ERP Price × (1 + Markup %)
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              When a product has an individual custom markup set in product details, it overrides both category and default marketplace markups.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
