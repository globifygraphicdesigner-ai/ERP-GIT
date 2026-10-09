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

export const DashboardView: React.FC = () => {
  const { navigate, openUploadModal, showToast } = useApp();

  const handleRunComparison = () => {
    showToast('Re-running catalogue and marketplace comparison...');
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
            Al Waab Branch. Last comparison today 09:14.
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
          {/* Card 1: ERP */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                <span className="text-xs font-semibold text-gray-900">
                  ERP (RetailOne)
                </span>
              </div>
              <p className="text-[11px] text-gray-500 mt-1">Updated today 09:12</p>
              <p className="text-xs font-medium text-gray-700 mt-1">
                12,480 active products
              </p>
            </div>
            <button
              onClick={() => openUploadModal('erp')}
              className="mt-4 w-full flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors"
            >
              <Upload className="w-3 h-3 text-gray-500" />
              <span>Upload</span>
            </button>
          </div>

          {/* Card 2: Talabat */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                <span className="text-xs font-semibold text-gray-900">Talabat</span>
              </div>
              <p className="text-[11px] text-gray-500 mt-1">
                Updated yesterday 18:40
              </p>
              <div className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded text-[10px] font-medium bg-amber-50 text-amber-800 border border-amber-200">
                <AlertTriangle className="w-3 h-3 text-amber-600" />
                <span>Older than 12 hours</span>
              </div>
            </div>
            <button
              onClick={() => openUploadModal('talabat')}
              className="mt-4 w-full flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors"
            >
              <Upload className="w-3 h-3 text-gray-500" />
              <span>Upload</span>
            </button>
          </div>

          {/* Card 3: Snoonu */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                <span className="text-xs font-semibold text-gray-900">Snoonu</span>
              </div>
              <p className="text-[11px] text-gray-500 mt-1">Updated today 08:55</p>
            </div>
            <button
              onClick={() => openUploadModal('snoonu')}
              className="mt-4 w-full flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors"
            >
              <Upload className="w-3 h-3 text-gray-500" />
              <span>Upload</span>
            </button>
          </div>

          {/* Card 4: Rafeeq */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                <span className="text-xs font-semibold text-gray-900">Rafeeq</span>
              </div>
              <p className="text-[11px] text-gray-500 mt-1">Updated today 07:30</p>
            </div>
            <button
              onClick={() => openUploadModal('rafeeq')}
              className="mt-4 w-full flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors"
            >
              <Upload className="w-3 h-3 text-gray-500" />
              <span>Upload</span>
            </button>
          </div>

          {/* Card 5: Keeta */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-gray-400 shrink-0" />
                <span className="text-xs font-semibold text-gray-900">Keeta</span>
              </div>
              <p className="text-[11px] text-gray-500 mt-1">No file yet</p>
              <button
                onClick={() => openUploadModal('keeta')}
                className="text-[11px] text-[#0D6D4E] hover:underline mt-1 font-medium block text-left"
              >
                Upload Keeta file
              </button>
            </div>
            <button
              onClick={() => openUploadModal('keeta')}
              className="mt-4 w-full flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors"
            >
              <Upload className="w-3 h-3 text-gray-500" />
              <span>Upload</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Mismatches Section */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-gray-900 tracking-tight">
          Mismatches
        </h2>

        {/* ERP vs marketplace */}
        <div>
          <div className="text-xs font-medium text-gray-600 mb-2">
            ERP vs marketplace
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* ERP vs Talabat */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 relative group hover:border-gray-300 transition-all shadow-xs">
              <div
                onClick={() => navigate('reports-price-mismatches')}
                className="cursor-pointer"
              >
                <div className="flex items-center justify-between text-xs font-semibold text-gray-900">
                  <span>ERP vs Talabat</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-[#C81E1E]">50</span>
                  <span className="text-xs text-gray-600 font-medium">mismatches</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  <span className="font-semibold text-red-600">32</span> stock &nbsp;•&nbsp;{' '}
                  <span className="font-semibold text-red-600">18</span> price
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center gap-2 text-xs">
                <button
                  onClick={() => navigate('reports-stock')}
                  className="text-[#0D6D4E] hover:underline font-medium"
                >
                  Stock
                </button>
                <span className="text-gray-300">|</span>
                <button
                  onClick={() => navigate('reports-price-discrepancies')}
                  className="text-[#0D6D4E] hover:underline font-medium"
                >
                  Price
                </button>
              </div>
            </div>

            {/* ERP vs Snoonu */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 relative group hover:border-gray-300 transition-all shadow-xs">
              <div
                onClick={() => navigate('reports-price-mismatches')}
                className="cursor-pointer"
              >
                <div className="flex items-center justify-between text-xs font-semibold text-gray-900">
                  <span>ERP vs Snoonu</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-[#C81E1E]">41</span>
                  <span className="text-xs text-gray-600 font-medium">mismatches</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  <span className="font-semibold text-red-600">27</span> stock &nbsp;•&nbsp;{' '}
                  <span className="font-semibold text-red-600">14</span> price
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center gap-2 text-xs">
                <button
                  onClick={() => navigate('reports-stock')}
                  className="text-[#0D6D4E] hover:underline font-medium"
                >
                  Stock
                </button>
                <span className="text-gray-300">|</span>
                <button
                  onClick={() => navigate('reports-price-discrepancies')}
                  className="text-[#0D6D4E] hover:underline font-medium"
                >
                  Price
                </button>
              </div>
            </div>

            {/* ERP vs Rafeeq */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 relative group hover:border-gray-300 transition-all shadow-xs">
              <div
                onClick={() => navigate('reports-price-mismatches')}
                className="cursor-pointer"
              >
                <div className="flex items-center justify-between text-xs font-semibold text-gray-900">
                  <span>ERP vs Rafeeq</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-[#C81E1E]">63</span>
                  <span className="text-xs text-gray-600 font-medium">mismatches</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  <span className="font-semibold text-red-600">40</span> stock &nbsp;•&nbsp;{' '}
                  <span className="font-semibold text-red-600">23</span> price
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center gap-2 text-xs">
                <button
                  onClick={() => navigate('reports-stock')}
                  className="text-[#0D6D4E] hover:underline font-medium"
                >
                  Stock
                </button>
                <span className="text-gray-300">|</span>
                <button
                  onClick={() => navigate('reports-price-discrepancies')}
                  className="text-[#0D6D4E] hover:underline font-medium"
                >
                  Price
                </button>
              </div>
            </div>

            {/* ERP vs Keeta */}
            <div
              onClick={() => openUploadModal('keeta')}
              className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col justify-between cursor-pointer hover:border-gray-300 transition-all shadow-xs group"
            >
              <div className="flex items-center justify-between text-xs font-semibold text-gray-900">
                <span>ERP vs Keeta</span>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <div className="flex items-center gap-3 my-4">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 shrink-0">
                  <Slash className="w-4 h-4" />
                </div>
                <span className="text-xs text-gray-500 leading-snug">
                  Upload a Keeta file to compare
                </span>
              </div>
              <div className="text-[11px] text-[#0D6D4E] font-medium group-hover:underline">
                Upload Keeta file →
              </div>
            </div>
          </div>
        </div>

        {/* Marketplace vs marketplace */}
        <div className="pt-2">
          <div className="text-xs font-medium text-gray-600 mb-2">
            Marketplace vs marketplace
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {/* Snoonu vs Talabat */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 group hover:border-gray-300 transition-all shadow-xs">
              <div
                onClick={() => navigate('reports-price-discrepancies')}
                className="cursor-pointer"
              >
                <div className="flex items-center justify-between text-xs font-semibold text-gray-900">
                  <span>Snoonu vs Talabat</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-blue-600">22</span>
                  <span className="text-xs text-gray-600 font-medium">mismatches</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  14 stock &nbsp;•&nbsp; 8 price
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center gap-2 text-xs">
                <button
                  onClick={() => navigate('reports-stock')}
                  className="text-[#0D6D4E] hover:underline font-medium"
                >
                  Stock
                </button>
                <span className="text-gray-300">|</span>
                <button
                  onClick={() => navigate('reports-price-discrepancies')}
                  className="text-[#0D6D4E] hover:underline font-medium"
                >
                  Price
                </button>
              </div>
            </div>

            {/* Rafeeq vs Talabat */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 group hover:border-gray-300 transition-all shadow-xs">
              <div
                onClick={() => navigate('reports-price-discrepancies')}
                className="cursor-pointer"
              >
                <div className="flex items-center justify-between text-xs font-semibold text-gray-900">
                  <span>Rafeeq vs Talabat</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-blue-600">35</span>
                  <span className="text-xs text-gray-600 font-medium">mismatches</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  21 stock &nbsp;•&nbsp; 14 price
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center gap-2 text-xs">
                <button
                  onClick={() => navigate('reports-stock')}
                  className="text-[#0D6D4E] hover:underline font-medium"
                >
                  Stock
                </button>
                <span className="text-gray-300">|</span>
                <button
                  onClick={() => navigate('reports-price-discrepancies')}
                  className="text-[#0D6D4E] hover:underline font-medium"
                >
                  Price
                </button>
              </div>
            </div>

            {/* Rafeeq vs Snoonu */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 group hover:border-gray-300 transition-all shadow-xs">
              <div
                onClick={() => navigate('reports-price-discrepancies')}
                className="cursor-pointer"
              >
                <div className="flex items-center justify-between text-xs font-semibold text-gray-900">
                  <span>Rafeeq vs Snoonu</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-blue-600">19</span>
                  <span className="text-xs text-gray-600 font-medium">mismatches</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  11 stock &nbsp;•&nbsp; 8 price
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center gap-2 text-xs">
                <button
                  onClick={() => navigate('reports-stock')}
                  className="text-[#0D6D4E] hover:underline font-medium"
                >
                  Stock
                </button>
                <span className="text-gray-300">|</span>
                <button
                  onClick={() => navigate('reports-price-discrepancies')}
                  className="text-[#0D6D4E] hover:underline font-medium"
                >
                  Price
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Needs Attention Section */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-900 tracking-tight">
          Needs attention
        </h2>

        <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100 shadow-xs overflow-hidden">
          {/* Item 1: 18 new products */}
          <div
            onClick={() => navigate('upload-review')}
            className="p-3.5 flex items-center justify-between hover:bg-gray-50/80 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Info className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-900">
                  18 new products from today's ERP file
                </div>
                <div className="text-[11px] text-gray-500 mt-0.5">
                  These products are not listed on any marketplace yet.
                </div>
              </div>
            </div>
            <button className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800">
              <span>Review</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Item 2: Talabat data is 15 hours old */}
          <div
            onClick={() => openUploadModal('talabat')}
            className="p-3.5 flex items-center justify-between hover:bg-gray-50/80 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-900">
                  Talabat data is 15 hours old
                </div>
                <div className="text-[11px] text-gray-500 mt-0.5">
                  Upload the latest Talabat file to keep mismatch counts accurate.
                </div>
              </div>
            </div>
            <button className="flex items-center gap-1 text-xs font-medium text-amber-600 hover:text-amber-800">
              <span>Upload Talabat file</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Item 3: 9 products missing */}
          <div
            onClick={() => navigate('upload-review')}
            className="p-3.5 flex items-center justify-between hover:bg-gray-50/80 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                <AlertCircle className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-900">
                  9 products missing from the latest ERP file
                </div>
                <div className="text-[11px] text-gray-500 mt-0.5">
                  These products exist on marketplaces but are not in today's ERP file.
                </div>
              </div>
            </div>
            <button className="flex items-center gap-1 text-xs font-medium text-red-600 hover:text-red-800">
              <span>Review</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Item 4: Rafeeq new product template missing */}
          <div
            onClick={() => navigate('templates')}
            className="p-3.5 flex items-center justify-between hover:bg-gray-50/80 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-900">
                  Rafeeq new product template missing
                </div>
                <div className="text-[11px] text-gray-500 mt-0.5">
                  You need an output template to list new products on Rafeeq.
                </div>
              </div>
            </div>
            <button className="flex items-center gap-1 text-xs font-medium text-amber-600 hover:text-amber-800">
              <span>Add template</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
