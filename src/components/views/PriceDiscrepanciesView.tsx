import React, { useState, useMemo } from 'react';
import {
  Download,
  Search,
  Filter,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Info,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProductImage } from '../common/ProductImage';
import {
  useDemo,
  priceMismatches,
  signedMoney,
  MARKETPLACE_IDS,
  reconRow,
} from '../../demo';
import type { MarketplaceId, ReconRow } from '../../demo';

const MP_NAMES: Record<MarketplaceId, string> = {
  talabat: 'Talabat',
  snoonu: 'Snoonu',
  rafeeq: 'Rafeeq',
  keeta: 'Keeta',
};

export const PriceDiscrepanciesView: React.FC = () => {
  const { navigate, showToast } = useApp();
  const { state, summary } = useDemo();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMarketplace, setSelectedMarketplace] = useState<string>('all');
  const [directionFilter, setDirectionFilter] = useState<'all' | 'lower' | 'higher'>('all');
  const [minDiff, setMinDiff] = useState<string>('');

  // Total counts across all marketplaces
  const totalStock = Object.values(summary).reduce((acc, s) => acc + s.stock, 0);
  const totalPrice = Object.values(summary).reduce((acc, s) => acc + s.price, 0);
  const generatedFilesCount = state.generatedFiles.length;

  // Stale marketplaces for freshness strip
  const staleMarketplaces = state.marketplaces.filter(
    (m) => summary[m.id]?.isStale && summary[m.id]?.hoursOld !== null
  );

  // Get all price mismatches from demo
  const allPriceMismatches = useMemo(() => {
    return priceMismatches(state);
  }, [state]);

  const enabledMpIds = useMemo(
    () => state.marketplaces.filter((m) => m.enabled).map((m) => m.id),
    [state.marketplaces]
  );

  // Group by product
  const groupedProducts = useMemo(() => {
    // Unique products having at least one price mismatch
    const productMap = new Map<string, typeof state.products[0]>();
    for (const row of allPriceMismatches) {
      if (!productMap.has(row.product.id)) {
        productMap.set(row.product.id, row.product);
      }
    }

    // For each product, gather rows for all 4 marketplaces
    const result: {
      product: typeof state.products[0];
      rows: Record<MarketplaceId, ReconRow>;
      comment: string;
      maxDiff: number;
      hasLower: boolean;
      hasHigher: boolean;
      mismatchedMps: MarketplaceId[];
    }[] = [];

    for (const p of productMap.values()) {
      const rowsForP = {} as Record<MarketplaceId, ReconRow>;
      const comments: string[] = [];
      let maxDiff = 0;
      let hasLower = false;
      let hasHigher = false;
      const mismatchedMps: MarketplaceId[] = [];

      for (const mpId of enabledMpIds) {
        const row = reconRow(state, p, mpId);
        rowsForP[mpId] = row;

        if (row.priceMismatch && row.priceDiff !== null) {
          mismatchedMps.push(mpId);
          const abs = Math.abs(row.priceDiff);
          if (abs > maxDiff) maxDiff = abs;
          if (row.priceDiff < 0) {
            hasLower = true;
            comments.push(`Lower on ${MP_NAMES[mpId]}`);
          } else {
            hasHigher = true;
            comments.push(`Higher on ${MP_NAMES[mpId]}`);
          }
        }
      }

      result.push({
        product: p,
        rows: rowsForP,
        comment: comments.length > 0 ? comments.join(', ') : '—',
        maxDiff,
        hasLower,
        hasHigher,
        mismatchedMps,
      });
    }

    return result;
  }, [state, allPriceMismatches]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return groupedProducts.filter((item) => {
      // Search term
      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        const matchesName =
          item.product.nameEn.toLowerCase().includes(q) ||
          (item.product.nameAr && item.product.nameAr.includes(q)) ||
          item.product.barcode.toLowerCase().includes(q) ||
          item.product.id.toLowerCase().includes(q);
        if (!matchesName) return false;
      }

      // Marketplace filter
      if (selectedMarketplace !== 'all') {
        if (!item.mismatchedMps.includes(selectedMarketplace as MarketplaceId)) {
          return false;
        }
      }

      // Direction filter
      if (directionFilter === 'lower' && !item.hasLower) return false;
      if (directionFilter === 'higher' && !item.hasHigher) return false;

      // Min diff filter
      if (minDiff) {
        const threshold = parseFloat(minDiff);
        if (!isNaN(threshold) && item.maxDiff < threshold) return false;
      }

      return true;
    });
  }, [groupedProducts, searchTerm, selectedMarketplace, directionFilter, minDiff]);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Price Discrepancies</h1>
          <p className="text-sm text-gray-500 mt-1">
            Compare ERP expected selling prices against live marketplace prices
          </p>
        </div>

        <button
          onClick={() => navigate('outputs-generate')}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0D6D4E] hover:bg-[#0A583E] text-white text-sm font-semibold rounded-xl shadow-sm transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Generate price files</span>
        </button>
      </div>

      {/* Freshness Strip if stale */}
      {staleMarketplaces.length > 0 && (
        <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2 text-xs text-amber-800">
          <Clock className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            {staleMarketplaces
              .map((m) => `${m.name} data is ${summary[m.id].hoursOld} hours old`)
              .join(' · ')}
            . Upload fresh files for exact current pricing.
          </span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-gray-200">
        <button
          onClick={() => navigate('reports-stock')}
          className="pb-3 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-2"
        >
          <span>Stock issues</span>
          <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-700 font-semibold">
            {totalStock}
          </span>
        </button>
        <button className="pb-3 text-sm font-bold text-[#0D6D4E] border-b-2 border-[#0D6D4E] flex items-center gap-2">
          <span>Price discrepancies</span>
          <span className="px-2 py-0.5 rounded-full text-xs bg-emerald-100 text-emerald-800 font-semibold">
            {totalPrice}
          </span>
        </button>
        <button
          onClick={() => navigate('outputs-generate')}
          className="pb-3 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-2"
        >
          <span>Generated files</span>
          <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-700 font-semibold">
            {generatedFilesCount}
          </span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by product name, barcode or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs border border-gray-200 rounded-xl focus:ring-1 focus:ring-[#0D6D4E] outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedMarketplace}
              onChange={(e) => setSelectedMarketplace(e.target.value)}
              className="px-3 py-2 text-xs border border-gray-200 rounded-xl focus:ring-1 focus:ring-[#0D6D4E] outline-none bg-white text-gray-700 font-medium"
            >
              <option value="all">All Marketplaces</option>
              {enabledMpIds.map((mp) => (
                <option key={mp} value={mp}>
                  {MP_NAMES[mp]} ({summary[mp]?.price ?? 0})
                </option>
              ))}
            </select>

            <select
              value={directionFilter}
              onChange={(e) => setDirectionFilter(e.target.value as any)}
              className="px-3 py-2 text-xs border border-gray-200 rounded-xl focus:ring-1 focus:ring-[#0D6D4E] outline-none bg-white text-gray-700 font-medium"
            >
              <option value="all">All directions</option>
              <option value="lower">Lower on marketplace</option>
              <option value="higher">Higher on marketplace</option>
            </select>

            <div className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-xl bg-white">
              <span className="text-[11px] text-gray-500 font-medium">Diff &ge;</span>
              <input
                type="number"
                step="0.05"
                min="0"
                placeholder="0.00"
                value={minDiff}
                onChange={(e) => setMinDiff(e.target.value)}
                className="w-14 text-xs font-mono outline-none text-gray-800"
              />
              <span className="text-[10px] text-gray-400">QAR</span>
            </div>
          </div>
        </div>

        <div className="text-xs text-gray-500 font-medium">
          Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> of {groupedProducts.length} products
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center">
            <Info className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-sm font-semibold text-gray-900">No price discrepancies found</p>
            <p className="text-xs text-gray-400 mt-1">
              Try adjusting your search query or filters
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F9FAFB] text-gray-500 uppercase font-semibold text-[10px] tracking-wider border-b border-gray-100">
                <tr>
                  <th className="px-5 py-3.5">Product</th>
                  <th className="px-4 py-3.5">Barcode</th>
                  <th className="px-4 py-3.5 text-right">ERP Price</th>
                  {enabledMpIds.map((mp) => (
                    <th key={mp} className="px-4 py-3.5 text-center">
                      <div>{MP_NAMES[mp]}</div>
                      <div className="text-[9px] text-gray-400 font-normal normal-case">
                        Expected / Actual
                      </div>
                    </th>
                  ))}
                  <th className="px-4 py-3.5">Comment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-600 font-medium">
                {filteredProducts.map(({ product, rows, comment }) => (
                  <tr
                    key={product.id}
                    onClick={() => navigate('product-detail', { id: product.id })}
                    className="hover:bg-gray-50/80 cursor-pointer transition-colors"
                  >
                    {/* Product */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <ProductImage
                          imageKey={product.brand?.toLowerCase() || 'default'}
                          className="w-9 h-9 rounded-lg border border-gray-100 p-0.5 object-contain shrink-0 bg-white"
                        />
                        <div>
                          <div className="font-semibold text-gray-900 hover:text-[#0D6D4E] transition-colors">
                            {product.nameEn}
                          </div>
                          {product.nameAr && (
                            <div className="text-[11px] text-gray-400 mt-0.5" dir="rtl">
                              {product.nameAr}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Barcode */}
                    <td className="px-4 py-3.5 font-mono text-[11px] text-gray-600 whitespace-nowrap">
                      {product.barcode || '—'}
                    </td>

                    {/* ERP Price */}
                    <td className="px-4 py-3.5 text-right font-mono font-semibold text-gray-900 whitespace-nowrap">
                      {product.erpPrice.toFixed(2)} QAR
                    </td>

                    {/* Marketplace Columns */}
                    {enabledMpIds.map((mp) => {
                      const row = rows[mp];
                      const mpSummary = summary[mp];

                      if (!mpSummary?.hasData) {
                        return (
                          <td key={mp} className="px-4 py-3.5 text-center text-gray-400 text-[11px]">
                            No data
                          </td>
                        );
                      }

                      if (!row || !row.listing) {
                        return (
                          <td key={mp} className="px-4 py-3.5 text-center text-gray-400 text-[11px]">
                            Not listed
                          </td>
                        );
                      }

                      const isMismatch = row.priceMismatch;

                      return (
                        <td
                          key={mp}
                          className={`px-4 py-3.5 text-center whitespace-nowrap transition-colors ${
                            isMismatch ? 'bg-red-50/70' : ''
                          }`}
                        >
                          <div className="flex items-center justify-center gap-1.5 font-mono text-xs">
                            <span className="text-gray-500">
                              {row.expectedPrice.toFixed(2)}
                            </span>
                            <span className="text-gray-300">/</span>
                            <span
                              className={`font-semibold ${
                                isMismatch ? 'text-red-700' : 'text-gray-900'
                              }`}
                            >
                              {row.actualPrice !== null ? row.actualPrice.toFixed(2) : '—'}
                            </span>
                          </div>
                          {isMismatch && row.priceDiff !== null && (
                            <div className="text-[10px] font-mono font-semibold text-red-600 mt-0.5">
                              {signedMoney(row.priceDiff)}
                            </div>
                          )}
                        </td>
                      );
                    })}

                    {/* Comment */}
                    <td className="px-4 py-3.5 text-xs text-gray-600 whitespace-nowrap">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-gray-100 text-gray-700">
                        {comment}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
