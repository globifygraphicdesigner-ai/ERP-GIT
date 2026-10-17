import React, { useState } from 'react';
import {
  Download,
  FileSpreadsheet,
  Search,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProductImage } from '../common/ProductImage';
import { MarketplacePill } from '../common/MarketplaceBadge';
import { MarketplaceId } from '../../types';

export const PriceMismatchesView: React.FC = () => {
  const { navigate, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const priceMismatches = [
    {
      id: '987654',
      nameEn: 'Pepsi 330ml Can',
      nameAr: 'بيبسي ٣٣٠ مل علبة',
      imageKey: 'pepsi',
      barcode: '6281007012345',
      erpPrice: '2.50',
      marketPrice: '2.75',
      diff: '+0.25',
      marketplace: 'talabat' as MarketplaceId,
      updatedAt: '05 Oct 2026 18:40',
    },
    {
      id: '987655',
      nameEn: 'Baladna Fresh Milk 1L',
      nameAr: 'حليب بلدنا الطازج ١ لتر',
      imageKey: 'baladna',
      barcode: '6291100231472',
      erpPrice: '7.00',
      marketPrice: '6.50',
      diff: '-0.50',
      marketplace: 'snoonu' as MarketplaceId,
      updatedAt: '06 Oct 2026 08:55',
    },
    {
      id: '987656',
      nameEn: "Lay's Salted 170g",
      nameAr: 'ليز مملح ١٧٠ جم',
      imageKey: 'lays',
      barcode: '6281036112233',
      erpPrice: '8.50',
      marketPrice: '9.00',
      diff: '+0.50',
      marketplace: 'rafeeq' as MarketplaceId,
      updatedAt: '06 Oct 2026 07:30',
    },
    {
      id: '987657',
      nameEn: 'Almarai Laban 180ml',
      nameAr: 'المراعي لبن ١٨٠ مل',
      imageKey: 'almarai',
      barcode: '6281007021118',
      erpPrice: '1.75',
      marketPrice: '1.50',
      diff: '-0.25',
      marketplace: 'talabat' as MarketplaceId,
      updatedAt: '05 Oct 2026 18:40',
    },
    {
      id: '987658',
      nameEn: 'Snickers 50g',
      nameAr: 'سنيكرز ٥٠ جم',
      imageKey: 'snickers',
      barcode: '5000159461122',
      erpPrice: '3.25',
      marketPrice: '3.75',
      diff: '+0.50',
      marketplace: 'snoonu' as MarketplaceId,
      updatedAt: '06 Oct 2026 08:55',
    },
    {
      id: '987659',
      nameEn: 'Al Ain Water 1.5L',
      nameAr: 'مياه العين ١.٥ لتر',
      imageKey: 'alain',
      barcode: '6291003001234',
      erpPrice: '2.00',
      marketPrice: '2.50',
      diff: '+0.50',
      marketplace: 'keeta' as MarketplaceId,
      updatedAt: 'No file',
    },
    {
      id: '987660',
      nameEn: 'Coca-Cola 1.5L',
      nameAr: 'كوكاكولا ١.٥ لتر',
      imageKey: 'coke',
      barcode: '6289001234567',
      erpPrice: '5.00',
      marketPrice: '4.50',
      diff: '-0.50',
      marketplace: 'rafeeq' as MarketplaceId,
      updatedAt: '06 Oct 2026 07:30',
    },
    {
      id: '987661',
      nameEn: 'Nescafe Classic 200g',
      nameAr: 'نسكافيه كلاسيك ٢٠٠ جم',
      imageKey: 'nescafe',
      barcode: '6281234567890',
      erpPrice: '18.00',
      marketPrice: '17.50',
      diff: '-0.50',
      marketplace: 'talabat' as MarketplaceId,
      updatedAt: '05 Oct 2026 18:40',
    },
    {
      id: '987662',
      nameEn: 'Maggi Chicken Stock 20g',
      nameAr: 'ماجي مرقة دجاج ٢٠ جم',
      imageKey: 'maggi',
      barcode: '6281012345678',
      erpPrice: '1.25',
      marketPrice: '1.50',
      diff: '+0.25',
      marketplace: 'snoonu' as MarketplaceId,
      updatedAt: '06 Oct 2026 08:55',
    },
    {
      id: '987663',
      nameEn: 'Pringles Original 165g',
      nameAr: 'برينجلز الأصلي ١٦٥ جم',
      imageKey: 'pringles',
      barcode: '5053990154321',
      erpPrice: '9.00',
      marketPrice: '8.75',
      diff: '-0.25',
      marketplace: 'rafeeq' as MarketplaceId,
      updatedAt: '06 Oct 2026 07:35',
    },
    {
      id: '987664',
      nameEn: 'KitKat 4 Finger 41.5g',
      nameAr: 'كيت كات ٤ أصابع ٤١.٩ جم',
      imageKey: 'kitkat',
      barcode: '6291100998877',
      erpPrice: '4.00',
      marketPrice: '4.50',
      diff: '+0.50',
      marketplace: 'talabat' as MarketplaceId,
      updatedAt: '05 Oct 2026 18:40',
    },
    {
      id: '987665',
      nameEn: 'Oreo Original 36.8g',
      nameAr: 'أوريو الأصلي ٣٦.٨ جم',
      imageKey: 'oreo',
      barcode: '7622300441427',
      erpPrice: '2.00',
      marketPrice: '1.75',
      diff: '-0.25',
      marketplace: 'keeta' as MarketplaceId,
      updatedAt: 'No file',
    },
    {
      id: '987666',
      nameEn: 'Lurpak Butter 200g',
      nameAr: 'لورباك زبدة ٢٠٠ جم',
      imageKey: 'lurpak',
      barcode: '5711953012345',
      erpPrice: '12.50',
      marketPrice: '13.00',
      diff: '+0.50',
      marketplace: 'snoonu' as MarketplaceId,
      updatedAt: '06 Oct 2026 08:55',
    },
  ];

  const filtered = priceMismatches.filter((item) => {
    if (activeTab !== 'all' && item.marketplace !== activeTab) return false;
    if (
      searchTerm &&
      !item.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !item.barcode.includes(searchTerm)
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
          <span className="text-gray-700">Price report</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Price mismatches
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Products where ERP and marketplace prices do not match.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => showToast('Exported price mismatches to CSV')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-gray-500" />
              <span>Export</span>
            </button>

            <button
              onClick={() => navigate('outputs-generate')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#0D6D4E] hover:bg-[#0b5c42] rounded-lg transition-colors shadow-xs"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Generate price file</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-gray-200 text-xs">
        <button
          onClick={() => setActiveTab('all')}
          className={`pb-3 font-semibold border-b-2 transition-colors ${
            activeTab === 'all'
              ? 'border-[#0D6D4E] text-[#0D6D4E]'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setActiveTab('talabat')}
          className={`pb-3 font-semibold border-b-2 transition-colors ${
            activeTab === 'talabat'
              ? 'border-[#0D6D4E] text-[#0D6D4E]'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Talabat (18)
        </button>
        <button
          onClick={() => setActiveTab('snoonu')}
          className={`pb-3 font-semibold border-b-2 transition-colors ${
            activeTab === 'snoonu'
              ? 'border-[#0D6D4E] text-[#0D6D4E]'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Snoonu (73)
        </button>
        <button
          onClick={() => setActiveTab('rafeeq')}
          className={`pb-3 font-semibold border-b-2 transition-colors ${
            activeTab === 'rafeeq'
              ? 'border-[#0D6D4E] text-[#0D6D4E]'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Rafeeq (94)
        </button>
        <button
          onClick={() => setActiveTab('keeta')}
          className={`pb-3 font-semibold border-b-2 transition-colors ${
            activeTab === 'keeta'
              ? 'border-[#0D6D4E] text-[#0D6D4E]'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Keeta (29)
        </button>
      </div>

      {/* Main Grid: Table (3 cols) + Filter Sidebar (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Table Area */}
        <div className="lg:col-span-3 bg-white border border-gray-200 rounded-xl shadow-xs overflow-hidden">
          <div className="p-3.5 border-b border-gray-200 flex items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by product name or barcode..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0D6D4E]"
              />
            </div>

            <select className="text-xs border border-gray-200 rounded-lg py-1.5 px-2 bg-white text-gray-700">
              <option>Show 25 rows</option>
              <option>Show 50 rows</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold">
                <tr>
                  <th className="py-2.5 px-3 w-8">
                    <input type="checkbox" className="rounded accent-[#0D6D4E]" />
                  </th>
                  <th className="py-2.5 px-3">Product</th>
                  <th className="py-2.5 px-3">Barcode</th>
                  <th className="py-2.5 px-3 text-right">ERP price (QAR)</th>
                  <th className="py-2.5 px-3 text-right">Marketplace price (QAR)</th>
                  <th className="py-2.5 px-3 text-right">Difference</th>
                  <th className="py-2.5 px-3">Marketplace</th>
                  <th className="py-2.5 px-3">Last updated</th>
                  <th className="py-2.5 px-3 w-8"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((item) => (
                  <tr
                    key={item.id + item.marketplace}
                    onClick={() => navigate('product-detail', { productId: item.id })}
                    className="hover:bg-gray-50/70 cursor-pointer group"
                  >
                    <td className="py-3 px-3" onClick={(e) => e.stopPropagation()}>
                      <input type="checkbox" className="rounded accent-[#0D6D4E]" />
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
                    <td className="py-3 px-3 font-mono text-gray-600">
                      {item.barcode}
                    </td>
                    <td className="py-3 px-3 text-right font-medium text-gray-800">
                      {item.erpPrice}
                    </td>
                    <td className="py-3 px-3 text-right font-medium text-gray-800">
                      {item.marketPrice}
                    </td>
                    <td className="py-3 px-3 text-right font-bold">
                      <span
                        className={
                          item.diff.startsWith('+') ? 'text-red-600' : 'text-emerald-600'
                        }
                      >
                        {item.diff}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <MarketplacePill marketplace={item.marketplace} />
                    </td>
                    <td className="py-3 px-3 text-gray-500 whitespace-nowrap">
                      {item.updatedAt}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button className="text-gray-400 hover:text-gray-600 p-1">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
            <span>Showing price mismatches</span>
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
              <button className="px-2 py-1 rounded hover:bg-gray-100">17</button>
              <button className="p-1 rounded hover:bg-gray-100">
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Filter Sidebar */}
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-xs space-y-4 text-xs">
            <h3 className="font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-2">
              Filters
            </h3>

            {/* Marketplace */}
            <div className="space-y-1.5">
              <div className="font-semibold text-gray-900">Marketplace</div>
              <label className="flex items-center justify-between text-gray-700 cursor-pointer">
                <div className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded accent-[#0D6D4E]" />
                  <span>Talabat</span>
                </div>
                <span className="text-gray-400 text-[11px]">18</span>
              </label>
              <label className="flex items-center justify-between text-gray-700 cursor-pointer">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded accent-[#0D6D4E]" />
                  <span>Snoonu</span>
                </div>
                <span className="text-gray-400 text-[11px]">73</span>
              </label>
              <label className="flex items-center justify-between text-gray-700 cursor-pointer">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded accent-[#0D6D4E]" />
                  <span>Rafeeq</span>
                </div>
                <span className="text-gray-400 text-[11px]">94</span>
              </label>
              <label className="flex items-center justify-between text-gray-700 cursor-pointer">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded accent-[#0D6D4E]" />
                  <span>Keeta</span>
                </div>
                <span className="text-gray-400 text-[11px]">29</span>
              </label>
            </div>

            {/* Difference ranges */}
            <div className="space-y-1.5">
              <div className="font-semibold text-gray-900">Difference</div>
              <label className="flex items-center justify-between text-gray-700 cursor-pointer">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded accent-[#0D6D4E]" />
                  <span>More than +1.00</span>
                </div>
                <span className="text-gray-400 text-[11px]">52</span>
              </label>
              <label className="flex items-center justify-between text-gray-700 cursor-pointer">
                <div className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded accent-[#0D6D4E]" />
                  <span>+0.26 to +1.00</span>
                </div>
                <span className="text-gray-400 text-[11px]">68</span>
              </label>
              <label className="flex items-center justify-between text-gray-700 cursor-pointer">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded accent-[#0D6D4E]" />
                  <span>+0.01 to +0.25</span>
                </div>
                <span className="text-gray-400 text-[11px]">43</span>
              </label>
              <label className="flex items-center justify-between text-gray-700 cursor-pointer">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded accent-[#0D6D4E]" />
                  <span>-0.25 to -0.01</span>
                </div>
                <span className="text-gray-400 text-[11px]">36</span>
              </label>
              <label className="flex items-center justify-between text-gray-700 cursor-pointer">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded accent-[#0D6D4E]" />
                  <span>-1.00 to -0.26</span>
                </div>
                <span className="text-gray-400 text-[11px]">15</span>
              </label>
              <label className="flex items-center justify-between text-gray-700 cursor-pointer">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded accent-[#0D6D4E]" />
                  <span>More than -1.00</span>
                </div>
                <span className="text-gray-400 text-[11px]">0</span>
              </label>
            </div>

            {/* Product details */}
            <div className="space-y-1">
              <div className="font-semibold text-gray-900">Category</div>
              <select className="w-full border border-gray-200 rounded-lg p-2 text-xs bg-white text-gray-700">
                <option>All categories</option>
                <option>Soft Drinks</option>
                <option>Dairy</option>
                <option>Snacks</option>
                <option>Confectionery</option>
              </select>
            </div>

            <div className="space-y-1">
              <div className="font-semibold text-gray-900">Brand</div>
              <select className="w-full border border-gray-200 rounded-lg p-2 text-xs bg-white text-gray-700">
                <option>All brands</option>
                <option>Pepsi</option>
                <option>Baladna</option>
                <option>Lay's</option>
                <option>Almarai</option>
              </select>
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={() => showToast('Price filters applied')}
                className="w-full py-2 text-xs font-semibold text-white bg-[#0D6D4E] hover:bg-[#0b5c42] rounded-lg transition-colors shadow-xs"
              >
                Apply filters
              </button>
              <button
                onClick={() => showToast('Price filters reset')}
                className="w-full text-center text-xs text-gray-600 hover:text-gray-900 hover:underline"
              >
                Clear filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
