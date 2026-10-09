import React, { useState } from 'react';
import {
  Download,
  Sparkles,
  Search,
  Filter,
  RotateCw,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Info,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProductImage } from '../common/ProductImage';

export const PriceDiscrepanciesView: React.FC = () => {
  const { navigate, showToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMarketplace, setSelectedMarketplace] = useState('All marketplaces');

  const discrepancies = [
    {
      id: '987654',
      barcode: '6281007012345',
      nameEn: 'Pepsi 330ml Can',
      nameAr: 'بيبسي ٣٣٠ مل علبة',
      imageKey: 'pepsi',
      erpPrice: '2.50',
      talabat: { exp: '2.75', act: '2.50', diff: '-0.25', mismatch: true },
      snoonu: { exp: '2.75', act: '2.75', diff: '0', mismatch: false },
      rafeeq: { exp: '2.70', act: '2.70', diff: '0', mismatch: false },
      keeta: { exp: '—', act: '—', diff: '0', mismatch: false },
      comment: 'Lower on Talabat',
    },
    {
      id: '987656',
      barcode: '6281036112233',
      nameEn: "Lay's Classic 170g",
      nameAr: 'ليز كلاسيك ١٧٠ جم',
      imageKey: 'lays',
      erpPrice: '8.50',
      talabat: { exp: '9.35', act: '9.35', diff: '0', mismatch: false },
      snoonu: { exp: '9.35', act: '8.95', diff: '-0.40', mismatch: true },
      rafeeq: { exp: '9.35', act: '9.35', diff: '0', mismatch: false },
      keeta: { exp: '—', act: '—', diff: '0', mismatch: false },
      comment: 'Lower on Snoonu',
    },
    {
      id: '987658',
      barcode: '5000159461122',
      nameEn: 'Snickers 50g',
      nameAr: 'سنيكرز ٥٠ جم',
      imageKey: 'snickers',
      erpPrice: '3.25',
      talabat: { exp: '3.50', act: '3.50', diff: '0', mismatch: false },
      snoonu: { exp: '3.50', act: '3.50', diff: '0', mismatch: false },
      rafeeq: { exp: '3.50', act: '3.75', diff: '+0.25', mismatch: true },
      keeta: { exp: '—', act: '—', diff: '0', mismatch: false },
      comment: 'Higher on Rafeeq',
    },
    {
      id: '987655',
      barcode: '6291100231472',
      nameEn: 'Baladna Fresh Milk 1L',
      nameAr: 'حليب بلدنا الطازج ١ لتر',
      imageKey: 'baladna',
      erpPrice: '7.00',
      talabat: { exp: '7.70', act: '7.70', diff: '0', mismatch: false },
      snoonu: { exp: '7.70', act: '7.70', diff: '0', mismatch: false },
      rafeeq: { exp: '7.70', act: '7.50', diff: '-0.20', mismatch: true },
      keeta: { exp: '8.00', act: '8.00', diff: '0', mismatch: false },
      comment: 'Lower on Rafeeq',
    },
    {
      id: '987657',
      barcode: '6281007021118',
      nameEn: 'Almarai Laban 180ml',
      nameAr: 'المراعي لبن ١٨٠ مل',
      imageKey: 'almarai',
      erpPrice: '1.75',
      talabat: { exp: '1.90', act: '1.90', diff: '0', mismatch: false },
      snoonu: { exp: '1.90', act: '1.65', diff: '-0.25', mismatch: true },
      rafeeq: { exp: '1.90', act: '1.90', diff: '0', mismatch: false },
      keeta: { exp: '—', act: '—', diff: '0', mismatch: false },
      comment: 'Lower on Snoonu',
    },
    {
      id: '987659',
      barcode: '6291003001234',
      nameEn: 'Al Ain Water 1.5L',
      nameAr: 'مياه العين ١.٥ لتر',
      imageKey: 'alain',
      erpPrice: '2.00',
      talabat: { exp: '2.20', act: '2.20', diff: '0', mismatch: false },
      snoonu: { exp: '2.20', act: '2.20', diff: '0', mismatch: false },
      rafeeq: { exp: '2.20', act: '2.20', diff: '0', mismatch: false },
      keeta: { exp: '—', act: '—', diff: '0', mismatch: false },
      comment: '—',
    },
    {
      id: '987660',
      barcode: '6281036123456',
      nameEn: 'Coca-Cola 330ml Can',
      nameAr: 'كوكاكولا ٣٣٠ مل علبة',
      imageKey: 'coke',
      erpPrice: '2.50',
      talabat: { exp: '2.75', act: '2.65', diff: '-0.10', mismatch: true },
      snoonu: { exp: '2.75', act: '2.75', diff: '0', mismatch: false },
      rafeeq: { exp: '2.70', act: '2.70', diff: '0', mismatch: false },
      keeta: { exp: '—', act: '—', diff: '0', mismatch: false },
      comment: 'Lower on Talabat',
    },
    {
      id: '987665',
      barcode: '6223004414277',
      nameEn: 'Oreo Original 36.8g',
      nameAr: 'أوريو الأصلي ٣٦.٨ جم',
      imageKey: 'oreo',
      erpPrice: '2.00',
      talabat: { exp: '2.20', act: '2.20', diff: '0', mismatch: false },
      snoonu: { exp: '2.20', act: '2.20', diff: '0', mismatch: false },
      rafeeq: { exp: '2.20', act: '2.20', diff: '0', mismatch: false },
      keeta: { exp: '—', act: '—', diff: '0', mismatch: false },
      comment: '—',
    },
  ];

  const filtered = discrepancies.filter((d) => {
    if (
      searchTerm &&
      !d.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !d.nameAr.includes(searchTerm) &&
      !d.barcode.includes(searchTerm)
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-150">
      {/* Breadcrumb & Header */}
      <div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
          <button
            onClick={() => navigate('reports')}
            className="hover:text-gray-800 text-blue-600 hover:underline"
          >
            Reports
          </button>
          <span>/</span>
          <span className="text-gray-700">Price discrepancies</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Price discrepancies
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Expected price = ERP price + markup. Tolerance 0.00 QAR.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => showToast('Discrepancies report exported')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-gray-500" />
              <span>Download report</span>
            </button>

            <button
              onClick={() => navigate('outputs-generate')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#0D6D4E] hover:bg-[#0b5c42] rounded-lg transition-colors shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Generate price files</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-gray-200 text-xs">
        <button
          onClick={() => navigate('reports-stock')}
          className="pb-3 font-semibold text-gray-500 hover:text-gray-700 transition-colors"
        >
          Stock (84)
        </button>
        <button
          className="pb-3 font-semibold border-b-2 border-[#0D6D4E] text-[#0D6D4E] transition-colors"
        >
          Price (41)
        </button>
        <button
          onClick={() => navigate('outputs-generate')}
          className="pb-3 font-semibold text-gray-500 hover:text-gray-700 transition-colors"
        >
          Generated files (12)
        </button>
      </div>

      {/* Info Notice Banner */}
      <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-blue-900">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-blue-600 shrink-0" />
          <div>
            <span className="font-semibold">Data from latest uploads:</span>{' '}
            <span className="text-blue-800">
              ERP export: 06 Oct 2026 09:12 &nbsp;|&nbsp; Talabat: 05 Oct 2026 18:40 &nbsp;|&nbsp; Snoonu: 05 Oct 2026 17:25 &nbsp;|&nbsp; Rafeeq: 05 Oct 2026 16:10 &nbsp;|&nbsp; Keeta: No file yet
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          <button
            onClick={() => showToast('Data refreshed with latest marketplace uploads')}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 shadow-xs"
          >
            <RotateCw className="w-3 h-3 text-gray-500" />
            <span>Refresh data</span>
          </button>
          <span className="text-[10px] text-gray-500">Last updated 06 Oct 2026 09:15</span>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-xs flex flex-wrap items-center gap-3 text-xs">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by product name, barcode or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0D6D4E]"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-500">Marketplace</span>
          <select
            value={selectedMarketplace}
            onChange={(e) => setSelectedMarketplace(e.target.value)}
            className="border border-gray-200 rounded-lg py-1.5 px-2 bg-white text-gray-700"
          >
            <option>All marketplaces</option>
            <option>Talabat</option>
            <option>Snoonu</option>
            <option>Rafeeq</option>
            <option>Keeta</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-500">Direction</span>
          <select className="border border-gray-200 rounded-lg py-1.5 px-2 bg-white text-gray-700">
            <option>All differences</option>
            <option>Marketplace lower</option>
            <option>Marketplace higher</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-500">Difference above (QAR)</span>
          <input
            type="text"
            placeholder="e.g. 0.50"
            className="w-24 border border-gray-200 rounded-lg py-1.5 px-2 bg-white text-gray-700"
          />
        </div>

        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-lg bg-white text-gray-700 hover:bg-gray-50">
          <Filter className="w-3.5 h-3.5 text-gray-500" />
          <span>Filters</span>
        </button>
      </div>

      {/* Discrepancies Matrix Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold">
              <tr>
                <th className="py-2.5 px-3 w-8" rowSpan={2}>
                  <input type="checkbox" className="rounded accent-[#0D6D4E]" />
                </th>
                <th className="py-2.5 px-3" rowSpan={2}>Barcode / SKU</th>
                <th className="py-2.5 px-3" rowSpan={2}>Product</th>
                <th className="py-2.5 px-3 text-right" rowSpan={2}>ERP price (QAR)</th>

                {/* Marketplace Group Headers */}
                <th className="py-1.5 px-3 text-center border-l border-gray-200" colSpan={2}>
                  <div className="inline-flex items-center gap-1.5">
                    <span className="w-4 h-4 bg-[#FF5A00] text-white rounded text-[10px] font-bold flex items-center justify-center">t</span>
                    <span>Talabat</span>
                  </div>
                </th>
                <th className="py-1.5 px-3 text-center border-l border-gray-200" colSpan={2}>
                  <div className="inline-flex items-center gap-1.5">
                    <span className="w-4 h-4 bg-[#EE1C24] text-white rounded text-[10px] font-bold flex items-center justify-center">S</span>
                    <span>Snoonu</span>
                  </div>
                </th>
                <th className="py-1.5 px-3 text-center border-l border-gray-200" colSpan={2}>
                  <div className="inline-flex items-center gap-1.5">
                    <span className="w-4 h-4 bg-[#5B2C90] text-white rounded text-[10px] font-bold flex items-center justify-center">R</span>
                    <span>Rafeeq</span>
                  </div>
                </th>
                <th className="py-1.5 px-3 text-center border-l border-gray-200" colSpan={2}>
                  <div className="inline-flex items-center gap-1.5">
                    <span className="w-4 h-4 bg-[#FFD200] text-black rounded text-[10px] font-black flex items-center justify-center">K</span>
                    <span>Keeta</span>
                  </div>
                </th>

                <th className="py-2.5 px-3" rowSpan={2}>Comment</th>
                <th className="py-2.5 px-3 w-8" rowSpan={2}>Actions</th>
              </tr>
              <tr className="border-t border-gray-200 text-[11px] text-gray-500">
                <th className="py-1 px-2 text-center border-l border-gray-200">Expected</th>
                <th className="py-1 px-2 text-center">Actual</th>
                <th className="py-1 px-2 text-center border-l border-gray-200">Expected</th>
                <th className="py-1 px-2 text-center">Actual</th>
                <th className="py-1 px-2 text-center border-l border-gray-200">Expected</th>
                <th className="py-1 px-2 text-center">Actual</th>
                <th className="py-1 px-2 text-center border-l border-gray-200">Expected</th>
                <th className="py-1 px-2 text-center">Actual</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => navigate('product-detail', { productId: item.id })}
                  className="hover:bg-gray-50/70 cursor-pointer group"
                >
                  <td className="py-3 px-3" onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" className="rounded accent-[#0D6D4E]" />
                  </td>
                  <td className="py-3 px-3 font-mono text-gray-600">
                    {item.barcode}
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <ProductImage imageKey={item.imageKey} size="sm" />
                      <div>
                        <div className="font-medium text-gray-900 group-hover:text-[#0D6D4E] transition-colors leading-tight">
                          {item.nameEn}
                        </div>
                        <div className="text-[11px] text-gray-500 font-arabic leading-tight">
                          {item.nameAr}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right font-medium text-gray-800">
                    {item.erpPrice}
                  </td>

                  {/* Talabat */}
                  <td className="py-3 px-2 text-center border-l border-gray-100 text-gray-600">
                    {item.talabat.exp}
                  </td>
                  <td className="py-3 px-2 text-center">
                    {item.talabat.mismatch ? (
                      <span className="inline-block px-1.5 py-0.5 rounded text-[11px] font-bold bg-[#FEF2F2] text-[#B91C1C]">
                        {item.talabat.act} <br />
                        <span className="text-[10px]">{item.talabat.diff}</span>
                      </span>
                    ) : (
                      <span className="text-gray-800">{item.talabat.act}</span>
                    )}
                  </td>

                  {/* Snoonu */}
                  <td className="py-3 px-2 text-center border-l border-gray-100 text-gray-600">
                    {item.snoonu.exp}
                  </td>
                  <td className="py-3 px-2 text-center">
                    {item.snoonu.mismatch ? (
                      <span className="inline-block px-1.5 py-0.5 rounded text-[11px] font-bold bg-[#FEF2F2] text-[#B91C1C]">
                        {item.snoonu.act} <br />
                        <span className="text-[10px]">{item.snoonu.diff}</span>
                      </span>
                    ) : (
                      <span className="text-gray-800">{item.snoonu.act}</span>
                    )}
                  </td>

                  {/* Rafeeq */}
                  <td className="py-3 px-2 text-center border-l border-gray-100 text-gray-600">
                    {item.rafeeq.exp}
                  </td>
                  <td className="py-3 px-2 text-center">
                    {item.rafeeq.mismatch ? (
                      <span className="inline-block px-1.5 py-0.5 rounded text-[11px] font-bold bg-[#FEF2F2] text-[#B91C1C]">
                        {item.rafeeq.act} <br />
                        <span className="text-[10px]">{item.rafeeq.diff}</span>
                      </span>
                    ) : (
                      <span className="text-gray-800">{item.rafeeq.act}</span>
                    )}
                  </td>

                  {/* Keeta */}
                  <td className="py-3 px-2 text-center border-l border-gray-100 text-gray-400">
                    {item.keeta.exp}
                  </td>
                  <td className="py-3 px-2 text-center text-gray-400">
                    {item.keeta.act}
                  </td>

                  <td className="py-3 px-3 text-gray-700 whitespace-nowrap">
                    {item.comment}
                  </td>

                  <td className="py-3 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                    <button className="text-gray-400 hover:text-gray-600 p-1">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-3 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
          <span>Showing 1 to 8 of 41 products</span>
          <div className="flex items-center gap-1">
            <button className="p-1 rounded hover:bg-gray-100 disabled:opacity-40">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button className="px-2 py-1 rounded bg-[#E8F5EE] font-bold text-[#0D6D4E]">
              1
            </button>
            <button className="px-2 py-1 rounded hover:bg-gray-100">2</button>
            <button className="px-2 py-1 rounded hover:bg-gray-100">3</button>
            <button className="px-2 py-1 rounded hover:bg-gray-100">4</button>
            <button className="px-2 py-1 rounded hover:bg-gray-100">5</button>
            <span className="px-1">...</span>
            <button className="px-2 py-1 rounded hover:bg-gray-100">6</button>
            <button className="p-1 rounded hover:bg-gray-100">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
