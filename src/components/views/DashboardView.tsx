import React from 'react';
import {
  RotateCw,
  Upload,
  AlertTriangle,
  Info,
  AlertCircle,
  ChevronRight,
  Slash,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useDemo, latestUpload, relative } from '../../demo';
import type { MarketplaceId } from '../../demo';

export const DashboardView: React.FC = () => {
  const { navigate, openUploadModal, showToast } = useApp();
  const { state, summary, attention } = useDemo();
  const enabledMpIds = state.marketplaces.filter((m) => m.enabled).map((m) => m.id);

  const handleRunComparison = () => {
    showToast('Comparison is up to date', 'info');
  };

  const erpUpload = latestUpload(state, 'erp');
  const erpActiveCount = state.products.filter((p) => p.status === 'active').length;

  // Determine dot color for each source
  const dotColor = (source: 'erp' | MarketplaceId) => {
    const up = latestUpload(state, source);
    if (!up) return 'bg-gray-400';
    const s = summary[source as MarketplaceId];
    if (source === 'erp') {
      // ERP: stale check manually
      const hours = (Date.parse(state.now) - Date.parse(up.uploadedAt)) / 3_600_000;
      return hours > state.settings.staleHours ? 'bg-amber-500' : 'bg-emerald-500';
    }
    return s?.isStale ? 'bg-amber-500' : 'bg-emerald-500';
  };

  const toneIcon = (tone: string) => {
    if (tone === 'error') return <AlertCircle className="w-4 h-4" />;
    if (tone === 'warning') return <AlertTriangle className="w-4 h-4" />;
    return <Info className="w-4 h-4" />;
  };
  const toneBg = (tone: string) => {
    if (tone === 'error') return 'bg-red-50 text-red-600';
    if (tone === 'warning') return 'bg-amber-50 text-amber-600';
    return 'bg-blue-50 text-blue-600';
  };
  const toneBtn = (tone: string) => {
    if (tone === 'error') return 'text-red-600 hover:text-red-800';
    if (tone === 'warning') return 'text-amber-600 hover:text-amber-800';
    return 'text-blue-600 hover:text-blue-800';
  };

  const handleAttentionClick = (item: (typeof attention)[0]) => {
    switch (item.action.target) {
      case 'new-products':
        navigate('new-products');
        break;
      case 'upload':
        openUploadModal(item.action.source as MarketplaceId | 'erp');
        break;
      case 'missing':
        navigate('catalogue');
        break;
      case 'templates':
        navigate('templates');
        break;
      case 'category-mapping':
        navigate('category-mapping');
        break;
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-150">
      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Stock and price check
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {state.tenant.branch}. Last comparison {relative(state.now, state.now)}.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRunComparison}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-xs"
          >
            <RotateCw className="w-3.5 h-3.5 text-gray-500" />
            <span>Run comparison again</span>
          </button>

          <button
            onClick={() => openUploadModal()}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#0D6D4E] hover:bg-[#0b5c42] rounded-lg transition-colors shadow-xs"
          >
            <Upload className="w-3.5 h-3.5 text-white" />
            <span>Upload file</span>
          </button>
        </div>
      </div>

      {/* 1. Data Sources Section */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-900 tracking-tight">
          Data sources
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {/* ERP Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${dotColor('erp')} shrink-0`} />
                <span className="text-xs font-semibold text-gray-900">
                  ERP ({state.tenant.erpName})
                </span>
              </div>
              <p className="text-[11px] text-gray-500 mt-1">
                {erpUpload ? `Updated ${relative(erpUpload.uploadedAt, state.now)}` : 'No file yet'}
              </p>
              <p className="text-xs font-medium text-gray-700 mt-1">
                {erpActiveCount.toLocaleString()} active products
              </p>
              {erpUpload && dotColor('erp') === 'bg-amber-500' && (
                <div className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded text-[10px] font-medium bg-amber-50 text-amber-800 border border-amber-200">
                  <AlertTriangle className="w-3 h-3 text-amber-600" />
                  <span>Older than 12 hours</span>
                </div>
              )}
            </div>
            <button
              onClick={() => openUploadModal('erp')}
              className="mt-4 w-full flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors"
            >
              <Upload className="w-3 h-3 text-gray-500" />
              <span>Upload</span>
            </button>
          </div>

          {/* Marketplace Cards */}
          {enabledMpIds.map((mpId) => {
            const s = summary[mpId];
            const dot = dotColor(mpId);
            return (
              <div key={mpId} className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${dot} shrink-0`} />
                    <span className="text-xs font-semibold text-gray-900">{s.name}</span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1">
                    {s.lastUpload ? `Updated ${relative(s.lastUpload.uploadedAt, state.now)}` : 'No file yet'}
                  </p>
                  {!s.hasData && (
                    <button
                      onClick={() => openUploadModal(mpId)}
                      className="text-[11px] text-[#0D6D4E] hover:underline mt-1 font-medium block text-left"
                    >
                      Upload {s.name} file
                    </button>
                  )}
                  {s.isStale && s.hasData && (
                    <div className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded text-[10px] font-medium bg-amber-50 text-amber-800 border border-amber-200">
                      <AlertTriangle className="w-3 h-3 text-amber-600" />
                      <span>Older than 12 hours</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => openUploadModal(mpId)}
                  className="mt-4 w-full flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors"
                >
                  <Upload className="w-3 h-3 text-gray-500" />
                  <span>Upload</span>
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. Mismatches Section - ERP vs marketplace only */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-gray-900 tracking-tight">
          Mismatches
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {enabledMpIds.map((mpId) => {
            const s = summary[mpId];
            if (!s.hasData) {
              // Keeta-like card: no data
              return (
                <div
                  key={mpId}
                  onClick={() => openUploadModal(mpId)}
                  className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col justify-between cursor-pointer hover:border-gray-300 transition-all shadow-xs group"
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-gray-900">
                    <span>{s.name}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <div className="flex items-center gap-3 my-4">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 shrink-0">
                      <Slash className="w-4 h-4" />
                    </div>
                    <span className="text-xs text-gray-500 leading-snug">
                      Upload a {s.name} file to compare
                    </span>
                  </div>
                  <div className="text-[11px] text-[#0D6D4E] font-medium group-hover:underline">
                    Upload {s.name} file →
                  </div>
                </div>
              );
            }
            return (
              <div key={mpId} className="bg-white border border-gray-200 rounded-xl p-4 relative group hover:border-gray-300 transition-all shadow-xs">
                <div
                  onClick={() => navigate('reports-price-discrepancies', { marketplaceFilter: mpId })}
                  className="cursor-pointer"
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-gray-900">
                    <span>{s.name}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className={`text-3xl font-bold ${s.total > 0 ? 'text-[#C81E1E]' : 'text-[#0D6D4E]'}`}>
                      {s.total}
                    </span>
                    <span className="text-xs text-gray-600 font-medium">
                      {s.total === 1 ? 'mismatch' : 'mismatches'}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    <span className="font-semibold">{s.stock}</span> stock &nbsp;•&nbsp;{' '}
                    <span className="font-semibold">{s.price}</span> price
                  </div>
                  {s.isStale && (
                    <div className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded text-[10px] font-medium bg-amber-50 text-amber-800 border border-amber-200">
                      <AlertTriangle className="w-3 h-3 text-amber-600" />
                      <span>Older than 12 hours</span>
                    </div>
                  )}
                </div>
                <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center gap-2 text-xs">
                  <button
                    onClick={() => navigate('reports-stock', { marketplaceFilter: mpId })}
                    className="text-[#0D6D4E] hover:underline font-medium"
                  >
                    Stock
                  </button>
                  <span className="text-gray-300">|</span>
                  <button
                    onClick={() => navigate('reports-price-discrepancies', { marketplaceFilter: mpId })}
                    className="text-[#0D6D4E] hover:underline font-medium"
                  >
                    Price
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Needs Attention Section */}
      {attention.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-gray-900 tracking-tight">
            Needs attention
          </h2>

          <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100 shadow-xs overflow-hidden">
            {attention.map((item) => (
              <div
                key={item.id}
                onClick={() => handleAttentionClick(item)}
                className="p-3.5 flex items-center justify-between hover:bg-gray-50/80 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full ${toneBg(item.tone)} flex items-center justify-center shrink-0`}>
                    {toneIcon(item.tone)}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-900">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-gray-500 mt-0.5">
                      {item.detail}
                    </div>
                  </div>
                </div>
                <button className={`flex items-center gap-1 text-xs font-medium ${toneBtn(item.tone)}`}>
                  <span>{item.action.label}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
