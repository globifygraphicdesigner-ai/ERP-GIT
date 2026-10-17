import React, { useState } from 'react';
import {
  Copy,
  ChevronDown,
  Percent,
  FolderTree,
  Languages,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Clock,
  ArrowLeft,
  Lock,
  Edit3,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProductImage } from '../common/ProductImage';
import { MarketplaceBadge } from '../common/MarketplaceBadge';
import {
  useDemo,
  rowsForProduct,
  signedMoney,
  relative,
  MARKETPLACE_IDS,
} from '../../demo';
import type { MarketplaceId } from '../../demo';

const MP_NAMES: Record<MarketplaceId, string> = {
  talabat: 'Talabat',
  snoonu: 'Snoonu',
  rafeeq: 'Rafeeq',
  keeta: 'Keeta',
};

export const ProductDetailView: React.FC = () => {
  const { selectedProductId, navigate, showToast } = useApp();
  const { state, updateProduct, setProductMarkup } = useDemo();

  const [activeTab, setActiveTab] = useState<'status' | 'details' | 'history'>('status');

  // Extract ID from hash or selectedProductId
  const hashId = window.location.hash.startsWith('#/catalogue/')
    ? window.location.hash.replace('#/catalogue/', '').split('?')[0]
    : '';
  const currentId = selectedProductId || hashId;
  const product = state.products.find((p) => p.id === currentId) || state.products[0];

  if (!product) {
    return (
      <div className="p-8 text-center text-gray-500">
        <p>Product not found.</p>
        <button
          onClick={() => navigate('catalogue')}
          className="mt-4 px-4 py-2 bg-[#0D6D4E] text-white rounded-lg text-xs"
        >
          Return to Catalogue
        </button>
      </div>
    );
  }

  // Live rows for all marketplaces
  const reconRows = rowsForProduct(state, product.id);

  // History entries for this product
  const productActivity = state.activity.filter((a) => a.productId === product.id);

  const handleCopyBarcode = () => {
    if (product.barcode) {
      navigator.clipboard?.writeText(product.barcode);
      showToast(`Copied barcode ${product.barcode} to clipboard`, 'info');
    }
  };

  const handleToggleStatus = () => {
    const nextStatus = product.status === 'active' ? 'inactive' : 'active';
    updateProduct(product.id, { status: nextStatus });
    showToast(`Product marked as ${nextStatus}`, 'success');
  };

  const getStatusPill = (status: string, priceMismatch: boolean, stockIssue: string | null) => {
    if (status === 'no_data') {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 text-gray-500">
          No data
        </span>
      );
    }
    if (status === 'not_listed') {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 text-gray-600">
          Not listed
        </span>
      );
    }
    if (status === 'missing_from_erp') {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
          Missing from ERP
        </span>
      );
    }
    if (priceMismatch || stockIssue) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-50 text-red-700 border border-red-200">
          <AlertCircle className="w-3 h-3" />
          Mismatch
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
        <CheckCircle2 className="w-3 h-3" />
        In sync
      </span>
    );
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-150">
      {/* Breadcrumb & Navigation */}
      <div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
          <button
            onClick={() => navigate('catalogue')}
            className="hover:text-gray-900 text-gray-600 flex items-center gap-1"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Catalogue</span>
          </button>
          <span>/</span>
          <span className="text-gray-900 font-medium">{product.nameEn}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
          <div className="flex items-center gap-4">
            <ProductImage
              imageKey={product.brand?.toLowerCase() || 'default'}
              className="w-14 h-14 rounded-2xl border border-gray-200 p-1 object-contain bg-white shadow-xs"
            />
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                  {product.nameEn}
                </h1>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${
                    product.status === 'active'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : product.status === 'new'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {product.status}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                <span>SKU: {product.sku || '—'}</span>
                <span>&middot;</span>
                <span className="font-mono">{product.barcode || '—'}</span>
                <button
                  onClick={handleCopyBarcode}
                  className="text-gray-400 hover:text-gray-600 p-0.5"
                  title="Copy barcode"
                >
                  <Copy className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleStatus}
              className={`px-3.5 py-2 text-xs font-semibold rounded-xl border transition-colors ${
                product.status === 'active'
                  ? 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  : 'bg-[#0D6D4E] text-white border-transparent hover:bg-[#0A583E]'
              }`}
            >
              {product.status === 'active' ? 'Mark as inactive' : 'Mark as active'}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('status')}
          className={`pb-3 text-sm font-semibold transition-colors border-b-2 ${
            activeTab === 'status'
              ? 'border-[#0D6D4E] text-[#0D6D4E]'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          Marketplace Status
        </button>
        <button
          onClick={() => setActiveTab('details')}
          className={`pb-3 text-sm font-semibold transition-colors border-b-2 ${
            activeTab === 'details'
              ? 'border-[#0D6D4E] text-[#0D6D4E]'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          Product Details
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`pb-3 text-sm font-semibold transition-colors border-b-2 ${
            activeTab === 'history'
              ? 'border-[#0D6D4E] text-[#0D6D4E]'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          History ({productActivity.length})
        </button>
      </div>

      {/* Tab 1: Marketplace Status Table */}
      {activeTab === 'status' && (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-gray-900">
                  Marketplace Status & Reconciliation
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  ERP Base Price: <strong className="font-mono text-gray-900">{product.erpPrice.toFixed(2)} QAR</strong> &middot; Stock: <strong className="font-mono text-gray-900">{product.erpStock}</strong>
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F9FAFB] text-gray-500 uppercase font-semibold text-[10px] tracking-wider border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-3.5">Marketplace</th>
                    <th className="px-4 py-3.5 text-center">Listing</th>
                    <th className="px-4 py-3.5">Markup Rule</th>
                    <th className="px-4 py-3.5 text-right">Expected</th>
                    <th className="px-4 py-3.5 text-right">Actual</th>
                    <th className="px-4 py-3.5 text-right">Difference</th>
                    <th className="px-4 py-3.5 text-center">Availability</th>
                    <th className="px-4 py-3.5">Last Updated</th>
                    <th className="px-6 py-3.5 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
                  {reconRows.map((r) => {
                    const mpSummary = state.marketplaces.find((m) => m.id === r.marketplaceId);
                    const defaultMarkup = mpSummary?.defaultMarkupPct ?? 0;

                    return (
                      <tr key={r.marketplaceId} className="hover:bg-gray-50/70 transition-colors">
                        {/* Marketplace */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <MarketplaceBadge marketplace={r.marketplaceId} />
                        </td>

                        {/* Listing Status */}
                        <td className="px-4 py-4 text-center whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${
                              r.listing ? 'bg-gray-100 text-gray-800' : 'bg-gray-50 text-gray-400'
                            }`}
                          >
                            {r.listing ? 'Listed' : 'Not listed'}
                          </span>
                        </td>

                        {/* Markup with override editor */}
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <input
                              type="number"
                              step="1"
                              placeholder={String(defaultMarkup)}
                              value={r.markupIsOverride ? r.markupPct : ''}
                              onChange={(e) => {
                                const val = e.target.value.trim();
                                setProductMarkup(
                                  product.id,
                                  r.marketplaceId,
                                  val === '' ? null : parseFloat(val)
                                );
                              }}
                              className={`w-14 px-2 py-1 text-xs border rounded-md font-mono outline-none text-right focus:ring-1 focus:ring-[#0D6D4E] ${
                                r.markupIsOverride
                                  ? 'border-emerald-500 bg-emerald-50/30 font-bold text-emerald-900'
                                  : 'border-gray-200 bg-white text-gray-700'
                              }`}
                            />
                            <span className="text-gray-400 font-mono">%</span>
                            {r.markupIsOverride ? (
                              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                                custom
                              </span>
                            ) : (
                              <span className="text-[10px] text-gray-400">default</span>
                            )}
                          </div>
                        </td>

                        {/* Expected */}
                        <td className="px-4 py-4 text-right font-mono font-semibold text-gray-900 whitespace-nowrap">
                          {r.expectedPrice.toFixed(2)} QAR
                        </td>

                        {/* Actual */}
                        <td className="px-4 py-4 text-right font-mono font-semibold text-gray-900 whitespace-nowrap">
                          {r.actualPrice !== null ? `${r.actualPrice.toFixed(2)} QAR` : '—'}
                        </td>

                        {/* Diff */}
                        <td className="px-4 py-4 text-right font-mono whitespace-nowrap">
                          {r.priceDiff !== null ? (
                            <span
                              className={`font-semibold ${
                                r.priceMismatch ? 'text-red-600' : 'text-gray-700'
                              }`}
                            >
                              {signedMoney(r.priceDiff)}
                            </span>
                          ) : (
                            '—'
                          )}
                        </td>

                        {/* Availability */}
                        <td className="px-4 py-4 text-center whitespace-nowrap">
                          {r.actualAvailable !== null ? (
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                                r.actualAvailable
                                  ? 'text-emerald-700 bg-emerald-50'
                                  : 'text-gray-600 bg-gray-100'
                              }`}
                            >
                              {r.actualAvailable ? 'Available' : 'Unavailable'}
                            </span>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>

                        {/* Last Updated */}
                        <td className="px-4 py-4 text-[11px] text-gray-500 whitespace-nowrap">
                          {r.lastUpdated ? relative(r.lastUpdated, state.now) : '—'}
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4 text-center whitespace-nowrap">
                          {getStatusPill(r.status, r.priceMismatch, r.stockIssue)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Product Details (ERP vs Qorloop-managed) */}
      {activeTab === 'details' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Qorloop Managed Fields */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-gray-900">Managed in Qorloop</h3>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Qorloop Owned
              </span>
            </div>

            {/* Arabic Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 flex items-center justify-between">
                <span>Arabic Product Name</span>
                <span className="text-[10px] text-gray-400">Editable</span>
              </label>
              <input
                type="text"
                dir="rtl"
                placeholder="أدخل اسم المنتج بالعربية"
                value={product.nameAr || ''}
                onChange={(e) => updateProduct(product.id, { nameAr: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:ring-1 focus:ring-[#0D6D4E] outline-none"
              />
            </div>

            {/* Qorloop Category */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 flex items-center justify-between">
                <span>Qorloop Category</span>
                <span className="text-[10px] text-gray-400">Editable</span>
              </label>
              <select
                value={product.categoryId || ''}
                onChange={(e) => updateProduct(product.id, { categoryId: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:ring-1 focus:ring-[#0D6D4E] outline-none bg-white text-gray-800"
              >
                <option value="">Select category...</option>
                {state.categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nameEn}
                  </option>
                ))}
              </select>
            </div>

            {/* Marketplace Markup Overrides */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <label className="text-xs font-semibold text-gray-700 block">
                Marketplace Markup Overrides
              </label>
              <p className="text-[11px] text-gray-500">
                Leave blank to use marketplace default. Custom markups recalculate expected prices instantly.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-1">
                {MARKETPLACE_IDS.map((mp) => {
                  const override = state.markups.find(
                    (m) => m.productId === product.id && m.marketplaceId === mp
                  );
                  const mpConfig = state.marketplaces.find((m) => m.id === mp);

                  return (
                    <div key={mp} className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-semibold text-gray-800">{MP_NAMES[mp]}</span>
                        <span className="text-[10px] text-gray-400">
                          def: {mpConfig?.defaultMarkupPct}%
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          step="1"
                          placeholder={String(mpConfig?.defaultMarkupPct ?? 0)}
                          value={override ? override.markupPct : ''}
                          onChange={(e) => {
                            const val = e.target.value.trim();
                            setProductMarkup(
                              product.id,
                              mp,
                              val === '' ? null : parseFloat(val)
                            );
                          }}
                          className="w-full px-2 py-1 text-xs border border-gray-200 rounded-lg bg-white font-mono outline-none focus:ring-1 focus:ring-[#0D6D4E]"
                        />
                        <span className="text-xs text-gray-400 font-mono">%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ERP Managed Fields (Read Only) */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-gray-500" />
                <h3 className="text-sm font-bold text-gray-900">ERP Attributes</h3>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600 bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
                From ERP (RetailOne)
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">English Name</span>
                <span className="font-semibold text-gray-900 mt-0.5 block">{product.nameEn}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Barcode</span>
                <span className="font-mono text-gray-900 mt-0.5 block">{product.barcode || '—'}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">ERP Selling Price</span>
                <span className="font-mono font-semibold text-gray-900 mt-0.5 block">
                  {product.erpPrice.toFixed(2)} QAR
                </span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Cost Price</span>
                <span className="font-mono text-gray-900 mt-0.5 block">
                  {product.costPrice ? `${product.costPrice.toFixed(2)} QAR` : '—'}
                </span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Current ERP Stock</span>
                <span className="font-mono font-semibold text-gray-900 mt-0.5 block">
                  {product.erpStock.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Brand</span>
                <span className="text-gray-900 mt-0.5 block">{product.brand || '—'}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">ERP Category</span>
                <span className="text-gray-900 mt-0.5 block">{product.erpCategory || '—'}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Size / Volume</span>
                <span className="text-gray-900 mt-0.5 block">{product.size || '—'}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: History */}
      {activeTab === 'history' && (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900">Activity Log</h2>
            <span className="text-xs text-gray-500">{productActivity.length} events</span>
          </div>

          {productActivity.length === 0 ? (
            <div className="p-12 text-center text-xs text-gray-500">
              <Clock className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              No audit trail recorded for this product yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F9FAFB] text-gray-500 uppercase font-semibold text-[10px] tracking-wider border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-3">Timestamp</th>
                    <th className="px-6 py-3">Source</th>
                    <th className="px-6 py-3">Field</th>
                    <th className="px-6 py-3">Old Value</th>
                    <th className="px-6 py-3">New Value</th>
                    <th className="px-6 py-3">User</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                  {productActivity.map((a) => (
                    <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-3.5 text-gray-500 whitespace-nowrap">
                        {relative(a.at, state.now)}
                      </td>
                      <td className="px-6 py-3.5 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-800 text-[11px] font-semibold">
                          {a.source}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 capitalize">{a.field}</td>
                      <td className="px-6 py-3.5 font-mono text-gray-400">{a.oldValue || '—'}</td>
                      <td className="px-6 py-3.5 font-mono text-gray-900 font-semibold">{a.newValue}</td>
                      <td className="px-6 py-3.5 text-gray-600">{a.user}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
