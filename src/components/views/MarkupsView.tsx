import React, { useState } from 'react';
import {
  Percent,
  Search,
  Plus,
  Trash2,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MarketplaceBadge } from '../common/MarketplaceBadge';
import { useDemo, MARKETPLACE_IDS, expectedPrice } from '../../demo';
import type { MarketplaceId } from '../../demo';

const MP_NAMES: Record<MarketplaceId, string> = {
  talabat: 'Talabat',
  snoonu: 'Snoonu',
  rafeeq: 'Rafeeq',
  keeta: 'Keeta',
};

export const MarkupsView: React.FC = () => {
  const { showToast } = useApp();
  const {
    state,
    summary,
    setMarketplaceMarkup,
    setProductMarkup,
  } = useDemo();

  const [productSearch, setProductSearch] = useState('');
  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedMp, setSelectedMp] = useState<MarketplaceId>('talabat');
  const [newMarkupPct, setNewMarkupPct] = useState<string>('15');

  // Product search matches
  const searchMatches = productSearch.trim()
    ? state.products
        .filter(
          (p) =>
            p.nameEn.toLowerCase().includes(productSearch.toLowerCase()) ||
            p.barcode.includes(productSearch) ||
            p.id.includes(productSearch)
        )
        .slice(0, 8)
    : [];

  const handleAddOverride = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductId) {
      showToast('Please select a product from the search list', 'warning');
      return;
    }
    const pct = parseFloat(newMarkupPct);
    if (isNaN(pct) || pct < 0) {
      showToast('Please enter a valid markup percentage', 'warning');
      return;
    }

    const prod = state.products.find((p) => p.id === selectedProductId);
    setProductMarkup(selectedProductId, selectedMp, pct);
    showToast(
      `Set custom markup of ${pct}% for ${prod?.nameEn} on ${MP_NAMES[selectedMp]}`,
      'success'
    );
    setSelectedProductId('');
    setProductSearch('');
  };

  const handleRemoveOverride = (productId: string, mp: MarketplaceId) => {
    setProductMarkup(productId, mp, null);
    showToast(`Removed custom markup override`, 'info');
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Markups & Pricing Rules
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Configure default price markups applied to ERP selling prices. Expected price = ERP price + markup (rounded to 0.05 QAR).
        </p>
      </div>

      {/* Top: Default Marketplace Markups */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Default Marketplace Markups
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Applied automatically to all products unless an individual product override is defined
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {state.marketplaces.map((mp) => {
            const s = summary[mp.id];

            return (
              <div
                key={mp.id}
                className="p-4 bg-gray-50/70 border border-gray-200 rounded-xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <MarketplaceBadge marketplace={mp.id} />
                  <span className="text-[10px] font-semibold text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-100">
                    {s?.price ?? 0} price mismatches
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="1"
                    min="0"
                    max="100"
                    value={mp.defaultMarkupPct}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value) || 0;
                      setMarketplaceMarkup(mp.id, val);
                    }}
                    className="w-20 px-3 py-1.5 text-sm font-mono font-bold bg-white border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-[#0D6D4E]"
                  />
                  <span className="text-sm font-semibold text-gray-500 font-mono">%</span>
                </div>

                <div className="text-[11px] text-gray-500">
                  {MP_NAMES[mp.id]} expected prices update dynamically.
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Product-Specific Overrides Card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
        <div>
          <h2 className="text-base font-semibold text-gray-900">
            Product Markup Overrides ({state.markups.length})
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Individual products with custom markup percentages overriding the marketplace default
          </p>
        </div>

        {/* Add Override Form */}
        <form
          onSubmit={handleAddOverride}
          className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl space-y-3"
        >
          <div className="text-xs font-semibold text-emerald-950 flex items-center gap-1.5">
            <Plus className="w-4 h-4 text-emerald-700" />
            <span>Add Custom Product Markup</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Product Search */}
            <div className="relative sm:col-span-1">
              <label className="text-[10px] uppercase font-bold text-gray-500 block mb-1">
                Search Product
              </label>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Product name or barcode..."
                  value={productSearch}
                  onChange={(e) => {
                    setProductSearch(e.target.value);
                    setSelectedProductId('');
                  }}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-[#0D6D4E]"
                />
              </div>

              {/* Autocomplete dropdown */}
              {searchMatches.length > 0 && !selectedProductId && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 max-h-48 overflow-y-auto divide-y divide-gray-100">
                  {searchMatches.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        setSelectedProductId(p.id);
                        setProductSearch(p.nameEn);
                      }}
                      className="w-full px-3 py-2 text-left text-xs hover:bg-gray-50 flex items-center justify-between"
                    >
                      <span className="font-semibold text-gray-900 truncate">
                        {p.nameEn}
                      </span>
                      <span className="font-mono text-gray-400 text-[11px] shrink-0">
                        {p.erpPrice.toFixed(2)} QAR
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Marketplace Select */}
            <div>
              <label className="text-[10px] uppercase font-bold text-gray-500 block mb-1">
                Marketplace
              </label>
              <select
                value={selectedMp}
                onChange={(e) => setSelectedMp(e.target.value as MarketplaceId)}
                className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-[#0D6D4E] font-medium text-gray-800"
              >
                {MARKETPLACE_IDS.map((mp) => (
                  <option key={mp} value={mp}>
                    {MP_NAMES[mp]}
                  </option>
                ))}
              </select>
            </div>

            {/* Markup % and Submit */}
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <label className="text-[10px] uppercase font-bold text-gray-500 block mb-1">
                  Markup %
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    step="1"
                    min="0"
                    max="100"
                    value={newMarkupPct}
                    onChange={(e) => setNewMarkupPct(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs font-mono font-semibold bg-white border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-[#0D6D4E]"
                  />
                  <span className="text-xs text-gray-400 font-mono">%</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={!selectedProductId}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg shadow-xs transition-colors shrink-0 ${
                  selectedProductId
                    ? 'bg-[#0D6D4E] hover:bg-[#0A583E] text-white cursor-pointer'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                Apply
              </button>
            </div>
          </div>
        </form>

        {/* Overrides Table */}
        {state.markups.length === 0 ? (
          <div className="p-8 text-center text-xs text-gray-500 border border-dashed border-gray-200 rounded-xl">
            No product-level markup overrides configured. All products use marketplace defaults.
          </div>
        ) : (
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F9FAFB] text-gray-500 uppercase font-semibold text-[10px] tracking-wider border-b border-gray-100">
                <tr>
                  <th className="px-5 py-3">Product</th>
                  <th className="px-4 py-3">Marketplace</th>
                  <th className="px-4 py-3 text-right">ERP Price</th>
                  <th className="px-4 py-3 text-right">Custom Markup</th>
                  <th className="px-4 py-3 text-right">Expected Price</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {state.markups.map((m) => {
                  const product = state.products.find((p) => p.id === m.productId);
                  if (!product) return null;
                  const exp = expectedPrice(product.erpPrice, m.markupPct);

                  return (
                    <tr
                      key={`${m.productId}-${m.marketplaceId}`}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-5 py-3">
                        <div className="font-semibold text-gray-900">
                          {product.nameEn}
                        </div>
                        <div className="text-[10px] text-gray-400 font-mono">
                          {product.barcode}
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <MarketplaceBadge marketplace={m.marketplaceId} />
                      </td>

                      <td className="px-4 py-3 text-right font-mono text-gray-900">
                        {product.erpPrice.toFixed(2)} QAR
                      </td>

                      <td className="px-4 py-3 text-right">
                        <span className="font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {m.markupPct}%
                        </span>
                      </td>

                      <td className="px-4 py-3 text-right font-mono font-semibold text-gray-900">
                        {exp.toFixed(2)} QAR
                      </td>

                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => handleRemoveOverride(m.productId, m.marketplaceId)}
                          className="p-1 text-gray-400 hover:text-red-600 rounded transition-colors"
                          title="Remove custom markup override"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
