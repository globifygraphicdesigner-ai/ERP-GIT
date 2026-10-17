import React, { useMemo, useState } from 'react';
import {
  Download,
  Eye,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  FileSpreadsheet,
  X,
  Upload,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MarketplaceBadge } from '../common/MarketplaceBadge';
import {
  useDemo,
  relative,
  MARKETPLACE_IDS,
  marketplaceCategoryOptions,
} from '../../demo';
import type {
  MarketplaceId,
  FileKind,
  FileScope,
  FilePreview,
} from '../../demo';

const MP_NAMES: Record<MarketplaceId, string> = {
  talabat: 'Talabat',
  snoonu: 'Snoonu',
  rafeeq: 'Rafeeq',
  keeta: 'Keeta',
};

export const GenerateFilesView: React.FC = () => {
  const { navigate, openUploadModal, showToast } = useApp();
  const {
    state,
    summary,
    preview,
    generate,
    redownload,
    markAcceptedByMarketplace,
    setCategoryMapping,
  } = useDemo();

  const [scopes, setScopes] = useState<Record<MarketplaceId, FileScope>>({
    talabat: 'mismatches',
    snoonu: 'mismatches',
    rafeeq: 'mismatches',
    keeta: 'mismatches',
  });

  const [kinds, setKinds] = useState<Record<MarketplaceId, FileKind>>({
    talabat: 'stock_price',
    snoonu: 'stock_price',
    rafeeq: 'stock_price',
    keeta: 'stock_price',
  });

  const [format, setFormat] = useState<'xlsx' | 'csv'>('xlsx');

  // Stored previews per marketplace (required before generate is enabled)
  const [activePreviews, setActivePreviews] = useState<Partial<Record<MarketplaceId, FilePreview>>>({});
  const enabledMarketplaces = useMemo(() => state.marketplaces.filter((m) => m.enabled), [state.marketplaces]);

  // Dialog state
  // The dialog keeps what was asked for and recomputes from live data, so choosing a
  // missing marketplace category inside it updates the preview straight away.
  const [dialogKey, setDialogKey] = useState<{ mp: MarketplaceId; kind: FileKind; scope: FileScope } | null>(null);
  const dialogPreview = useMemo(
    () => (dialogKey ? preview(dialogKey.mp, dialogKey.kind, dialogKey.scope) : null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dialogKey, state],
  );
  const setDialogPreview = (p: FilePreview | null) =>
    setDialogKey(p ? { mp: p.marketplaceId, kind: p.kind, scope: p.scope } : null);
  const [customCategory, setCustomCategory] = useState<Record<string, string>>({});

  // Success panel state for simulate accepted
  const [lastGenerated, setLastGenerated] = useState<FilePreview | null>(null);

  const handleOpenPreview = (mp: MarketplaceId) => {
    const scope = scopes[mp];
    const kind = kinds[mp];
    const p = preview(mp, kind, scope);
    setActivePreviews((prev) => ({ ...prev, [mp]: p }));
    setDialogPreview(p);
  };

  const handleGenerate = (p: FilePreview) => {
    generate(p, format);
    showToast(`Generated and downloaded ${p.fileName}`, 'success');
    setLastGenerated(p);
    if (dialogPreview) {
      setDialogPreview(null);
    }
  };

  const handleSimulateAccepted = (p: FilePreview) => {
    markAcceptedByMarketplace(p);
    showToast(`Simulated acceptance by ${MP_NAMES[p.marketplaceId]}: 0 mismatches remaining`, 'success');
    setLastGenerated(null);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Breadcrumb & Header */}
      <div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
          <span
            onClick={() => navigate('reports-stock')}
            className="text-gray-600 hover:text-gray-900 cursor-pointer"
          >
            Reports
          </span>
          <span>/</span>
          <span className="text-gray-900 font-medium">Generate files</span>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Generate Marketplace Files
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Export corrected inventory & price updates formatted in each marketplace portal's exact required columns
        </p>
      </div>

      {/* Success Simulation Panel */}
      {lastGenerated && (
        <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0 mt-0.5">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  File Ready to Upload
                </span>
                <span className="text-sm font-semibold text-gray-900 font-mono">
                  {lastGenerated.fileName}
                </span>
              </div>
              <p className="text-xs text-emerald-900 mt-1">
                Upload this file to the <strong>{MP_NAMES[lastGenerated.marketplaceId]} seller portal</strong>. To verify the full cycle in this demo, click the simulate button:
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleSimulateAccepted(lastGenerated)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl shadow-sm transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
              <span>Simulate: {MP_NAMES[lastGenerated.marketplaceId]} accepted the file</span>
            </button>
            <button
              onClick={() => setLastGenerated(null)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-emerald-100/50"
              title="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Format Selector Bar */}
      <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-2xl shadow-sm">
        <div className="text-xs text-gray-600">
          Select export settings. Preview changes before generating each file.
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-gray-700">Export format:</span>
          <div className="inline-flex rounded-lg border border-gray-200 p-0.5 bg-gray-50 text-xs">
            <button
              type="button"
              onClick={() => setFormat('xlsx')}
              className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                format === 'xlsx' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Excel (.xlsx)
            </button>
            <button
              type="button"
              onClick={() => setFormat('csv')}
              className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                format === 'csv' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              CSV (.csv)
            </button>
          </div>
        </div>
      </div>

      {/* Marketplace Rows Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900">Marketplaces</h2>
          <span className="text-xs text-gray-500">{enabledMarketplaces.length} {enabledMarketplaces.length === 1 ? 'marketplace' : 'marketplaces'} configured</span>
        </div>

        <div className="divide-y divide-gray-100">
          {enabledMarketplaces.map((m) => {
            const mp = m.id;
            const s = summary[mp];
            const hasData = s?.hasData ?? false;
            const scope = scopes[mp];
            const kind = kinds[mp];
            const previewReady = activePreviews[mp];

            if (!hasData) {
              return (
                <div
                  key={mp}
                  className="px-6 py-5 bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <MarketplaceBadge marketplace={mp} />
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-500">
                      No data uploaded
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400">
                      Upload a {MP_NAMES[mp]} file first to generate updates
                    </span>
                    <button
                      onClick={() => openUploadModal(mp)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#0D6D4E] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload {MP_NAMES[mp]} file</span>
                    </button>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={mp}
                className="px-6 py-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-gray-50/40 transition-colors"
              >
                {/* Left: Badge & Mismatch info */}
                <div className="min-w-[200px]">
                  <div className="flex items-center gap-3">
                    <MarketplaceBadge marketplace={mp} />
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-gray-100 text-gray-800">
                      {s.total} mismatches
                    </span>
                  </div>
                  <div className="text-[11px] text-gray-500 mt-1">
                    {s.stock} stock · {s.price} price · {s.listed} listed products
                  </div>
                </div>

                {/* Center: Scope and Kind selectors */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase tracking-wider font-semibold text-gray-400">
                      Scope
                    </label>
                    {kind === 'new_products' ? (
                      <div className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-gray-50 text-gray-700 font-semibold">
                        New products ({s.notListed})
                      </div>
                    ) : (
                      <select
                        value={scope}
                        onChange={(e) => {
                          const newScope = e.target.value as FileScope;
                          setScopes((prev) => ({ ...prev, [mp]: newScope }));
                          setActivePreviews((prev) => {
                            const c = { ...prev };
                            delete c[mp];
                            return c;
                          });
                        }}
                        className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white text-gray-800 font-medium outline-none focus:ring-1 focus:ring-[#0D6D4E]"
                      >
                        <option value="mismatches">Mismatches only ({s.total})</option>
                        <option value="all">All listed ({s.listed})</option>
                      </select>
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase tracking-wider font-semibold text-gray-400">
                      File Content
                    </label>
                    <select
                      value={kind}
                      onChange={(e) => {
                        const newKind = e.target.value as FileKind;
                        setKinds((prev) => ({ ...prev, [mp]: newKind }));
                        setActivePreviews((prev) => {
                          const c = { ...prev };
                          delete c[mp];
                          return c;
                        });
                      }}
                      className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white text-gray-800 font-medium outline-none focus:ring-1 focus:ring-[#0D6D4E]"
                    >
                      <option value="stock_price">Stock + Price</option>
                      <option value="stock">Stock only</option>
                      <option value="price">Price only</option>
                      <option value="new_products">New products</option>
                    </select>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => handleOpenPreview(mp)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl shadow-xs transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-gray-500" />
                    <span>Preview changes</span>
                  </button>

                  <button
                    onClick={() => previewReady && handleGenerate(previewReady)}
                    disabled={!previewReady}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl shadow-sm transition-colors ${
                      previewReady
                        ? 'bg-[#0D6D4E] hover:bg-[#0A583E] text-white cursor-pointer'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                    title={!previewReady ? 'Preview changes first to enable generate' : undefined}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Generate</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Generated Files Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900">Recent Generated Files</h2>
          <span className="text-xs text-gray-500">{state.generatedFiles.length} files</span>
        </div>

        {state.generatedFiles.length === 0 ? (
          <div className="p-12 text-center text-gray-500 text-xs">
            <FileSpreadsheet className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            No files generated yet in this session.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F9FAFB] text-gray-500 uppercase font-semibold text-[10px] tracking-wider border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3">File Name</th>
                  <th className="px-6 py-3">Marketplace</th>
                  <th className="px-6 py-3">Content</th>
                  <th className="px-6 py-3 text-right">Products</th>
                  <th className="px-6 py-3">Generated At</th>
                  <th className="px-6 py-3">Generated By</th>
                  <th className="px-6 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {state.generatedFiles.map((gf) => (
                  <tr key={gf.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3.5 font-mono text-[11px] font-semibold text-gray-900">
                      {gf.fileName}
                    </td>
                    <td className="px-6 py-3.5">
                      <MarketplaceBadge marketplace={gf.marketplaceId} />
                    </td>
                    <td className="px-6 py-3.5 capitalize">
                      {gf.kind.replace('_', ' ')}
                    </td>
                    <td className="px-6 py-3.5 text-right font-mono font-semibold">
                      {gf.productCount}
                    </td>
                    <td className="px-6 py-3.5 text-gray-500">
                      {relative(gf.generatedAt, state.now)}
                    </td>
                    <td className="px-6 py-3.5 text-gray-600">
                      {gf.generatedBy}
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <button
                        onClick={() => redownload(gf.id)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-[#0D6D4E] hover:bg-emerald-50 rounded-lg transition-colors"
                      >
                        <Download className="w-3 h-3" />
                        <span>Download</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Preview Dialog Modal */}
      {dialogPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-900">
                  Preview: {dialogPreview.fileName}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Marketplace: {MP_NAMES[dialogPreview.marketplaceId]} · {dialogPreview.productCount} rows
                </p>
              </div>
              <button
                onClick={() => setDialogPreview(null)}
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-5">
              {/* Blocked Reason Alert */}
              {/* Missing marketplace categories: asked here, only when a new-products file needs them */}
              {dialogPreview.unmappedCategoryIds.length > 0 && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-3 text-xs">
                  <div className="text-amber-900">
                    <span className="font-bold">{MP_NAMES[dialogPreview.marketplaceId]} needs a category for each new product.</span>{' '}
                    Pick the {MP_NAMES[dialogPreview.marketplaceId]} category that matches each of yours. Qorloop remembers it, so you won't be asked again for that category.
                  </div>
                  {dialogPreview.unmappedCategoryIds.map((catId) => {
                    const cat = state.categories.find((c) => c.id === catId);
                    const mp = dialogPreview.marketplaceId;
                    const options = marketplaceCategoryOptions(mp);
                    const count = dialogPreview.rows.filter((r) => r.product.categoryId === catId).length;
                    return (
                      <div key={catId} className="flex flex-wrap items-center gap-3 bg-white border border-amber-100 rounded-lg px-3 py-2">
                        <div className="w-44 shrink-0">
                          <div className="font-semibold text-gray-900">{cat?.nameEn ?? catId}</div>
                          <div className="text-[10px] text-gray-500">{count} product{count === 1 ? '' : 's'} in this file</div>
                        </div>
                        <span className="text-gray-400">→</span>
                        {options.length > 0 ? (
                          <select
                            defaultValue=""
                            onChange={(e) => {
                              if (!e.target.value) return;
                              setCategoryMapping(catId, mp, e.target.value);
                              showToast(`${cat?.nameEn ?? catId} → ${e.target.value} on ${MP_NAMES[mp]}`, 'success');
                            }}
                            className="flex-1 min-w-[200px] px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0D6D4E]"
                          >
                            <option value="">Choose {MP_NAMES[mp]} category…</option>
                            {options.map((o) => (
                              <option key={o} value={o}>{o}</option>
                            ))}
                          </select>
                        ) : (
                          <div className="flex flex-1 min-w-[200px] gap-2">
                            <input
                              value={customCategory[catId] ?? ''}
                              onChange={(e) => setCustomCategory((c) => ({ ...c, [catId]: e.target.value }))}
                              placeholder={`Type the ${MP_NAMES[mp]} category name`}
                              className="flex-1 px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0D6D4E]"
                            />
                            <button
                              disabled={!customCategory[catId]?.trim()}
                              onClick={() => setCategoryMapping(catId, mp, customCategory[catId].trim())}
                              className="px-3 py-1.5 font-semibold text-white bg-[#0D6D4E] rounded-lg disabled:opacity-50"
                            >
                              Save
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {dialogPreview.blockedReason && dialogPreview.unmappedCategoryIds.length === 0 && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-xs text-red-800">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Generation Blocked: </span>
                    {dialogPreview.blockedReason}
                  </div>
                </div>
              )}

              {/* Stats Overview Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="text-[10px] uppercase font-bold text-gray-400">Total Rows</div>
                  <div className="text-lg font-bold text-gray-900 mt-0.5">
                    {dialogPreview.productCount}
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="text-[10px] uppercase font-bold text-gray-400">Price Changes</div>
                  <div className="text-lg font-bold text-gray-900 mt-0.5">
                    {dialogPreview.priceChanges}
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="text-[10px] uppercase font-bold text-gray-400">Availability Changes</div>
                  <div className="text-lg font-bold text-gray-900 mt-0.5">
                    {dialogPreview.availabilityChanges}
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="text-[10px] uppercase font-bold text-gray-400">Largest Price Shift</div>
                  <div className="text-xs font-semibold text-gray-900 mt-1 truncate" title={dialogPreview.largestPriceChange ? `${dialogPreview.largestPriceChange.name}: ${dialogPreview.largestPriceChange.from.toFixed(2)} → ${dialogPreview.largestPriceChange.to.toFixed(2)}` : 'None'}>
                    {dialogPreview.largestPriceChange ? (
                      <span>
                        {dialogPreview.largestPriceChange.name} (
                        {dialogPreview.largestPriceChange.from.toFixed(2)} &rarr; {dialogPreview.largestPriceChange.to.toFixed(2)})
                      </span>
                    ) : (
                      'None'
                    )}
                  </div>
                </div>
              </div>

              {/* Sample Sheet Data Preview Table */}
              <div>
                <div className="text-xs font-bold text-gray-900 mb-2">
                  First 10 Rows ({MP_NAMES[dialogPreview.marketplaceId]} Columns)
                </div>
                <div className="border border-gray-200 rounded-xl overflow-x-auto max-h-64">
                  <table className="w-full text-left text-[11px]">
                    <thead className="bg-[#F9FAFB] text-gray-600 font-semibold border-b border-gray-200 sticky top-0">
                      <tr>
                        {dialogPreview.columns.map((col) => (
                          <th key={col} className="px-3 py-2 whitespace-nowrap">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-700 font-mono">
                      {dialogPreview.sheetRows.slice(0, 10).map((row, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                          {dialogPreview.columns.map((col) => {
                            const val = row[col];
                            return (
                              <td key={col} className="px-3 py-1.5 whitespace-nowrap">
                                {val === null || val === undefined ? '—' : String(val)}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Ready to download as {format.toUpperCase()}
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setDialogPreview(null)}
                  className="px-4 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl shadow-xs transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => handleGenerate(dialogPreview)}
                  disabled={!!dialogPreview.blockedReason}
                  className={`inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold rounded-xl shadow-sm transition-colors ${
                    !dialogPreview.blockedReason
                      ? 'bg-[#0D6D4E] hover:bg-[#0A583E] text-white cursor-pointer'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Download className="w-4 h-4" />
                  <span>Generate file</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
