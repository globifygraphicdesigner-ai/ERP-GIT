import React, { useState } from 'react';
import {
  CheckCircle2,
  MoreHorizontal,
  Info,
  Search,
  Download,
  AlertTriangle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProductImage } from '../common/ProductImage';

export const UploadReviewView: React.FC = () => {
  const { navigate, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'price' | 'stock' | 'new' | 'missing'>('price');
  const [searchTerm, setSearchTerm] = useState('');

  const priceChangesData = [
    {
      barcode: '6281007012345',
      nameEn: 'Pepsi 330ml Can',
      nameAr: 'بيبسي ٣٣٠ مل علبة',
      imageKey: 'pepsi',
      oldPrice: '2.50',
      newPrice: '2.75',
      change: '+0.25',
    },
    {
      barcode: '6291100231472',
      nameEn: 'Baladna Fresh Milk 1L',
      nameAr: 'حليب بلدنا الطازج ١ لتر',
      imageKey: 'baladna',
      oldPrice: '7.00',
      newPrice: '7.25',
      change: '+0.25',
    },
    {
      barcode: '6281036112233',
      nameEn: "Lay's Salted 170g",
      nameAr: 'ليز مملح ١٧٠ جم',
      imageKey: 'lays',
      oldPrice: '8.50',
      newPrice: '8.75',
      change: '+0.25',
    },
    {
      barcode: '6281007021118',
      nameEn: 'Almarai Laban 180ml',
      nameAr: 'المراعي لبن ١٨٠ مل',
      imageKey: 'almarai',
      oldPrice: '1.75',
      newPrice: '1.95',
      change: '+0.20',
    },
    {
      barcode: '5000159461122',
      nameEn: 'Snickers 50g',
      nameAr: 'سنيكرز ٥٠ جم',
      imageKey: 'snickers',
      oldPrice: '3.25',
      newPrice: '3.50',
      change: '+0.25',
    },
    {
      barcode: '6291003001234',
      nameEn: 'Al Ain Water 1.5L',
      nameAr: 'مياه العين ١.٥ لتر',
      imageKey: 'alain',
      oldPrice: '2.00',
      newPrice: '2.25',
      change: '+0.25',
    },
    {
      barcode: '6289001234567',
      nameEn: 'Coca-Cola 1.5L',
      nameAr: 'كوكاكولا ١.٥ لتر',
      imageKey: 'coke',
      oldPrice: '5.00',
      newPrice: '5.25',
      change: '+0.25',
    },
    {
      barcode: '6281234567890',
      nameEn: 'Nescafe Classic 200g',
      nameAr: 'نسكافيه كلاسيك ٢٠٠ جم',
      imageKey: 'nescafe',
      oldPrice: '18.00',
      newPrice: '18.50',
      change: '+0.50',
    },
  ];

  const filteredChanges = priceChangesData.filter((item) =>
    item.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.barcode.includes(searchTerm)
  );

  const handleConfirmAndApply = () => {
    showToast('214 price changes and 1,932 stock changes applied to catalogue successfully!');
    navigate('catalogue');
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-150">
      {/* Breadcrumbs & Header */}
      <div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
          <button
            onClick={() => navigate('uploads')}
            className="hover:text-gray-800 text-blue-600 hover:underline"
          >
            Uploads
          </button>
          <span>/</span>
          <span className="text-gray-700">Item_Master_06Oct2026.xlsx</span>
        </div>

        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Item_Master_06Oct2026.xlsx
            </h1>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
              Needs review
            </span>
          </div>

          <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-1">
          ERP (RetailOne) &nbsp;•&nbsp; Full list &nbsp;•&nbsp; Uploaded by Omar Haddad today 09:10
        </p>
      </div>

      {/* Stepper Progress Bar */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-xs">
        <div className="grid grid-cols-6 gap-2">
          {/* Step 1: Scan */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#0D6D4E] text-white flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-gray-900">Scan</div>
              <div className="text-[10px] text-gray-500">File is safe</div>
            </div>
          </div>

          {/* Step 2: Check */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#0D6D4E] text-white flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-gray-900">Check</div>
              <div className="text-[10px] text-gray-500">No issues found</div>
            </div>
          </div>

          {/* Step 3: Detect */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#0D6D4E] text-white flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-gray-900">Detect</div>
              <div className="text-[10px] text-gray-500">Layout recognised</div>
            </div>
          </div>

          {/* Step 4: Read */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#0D6D4E] text-white flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-gray-900">Read</div>
              <div className="text-[10px] text-gray-500">12,829 rows read</div>
            </div>
          </div>

          {/* Step 5: Review */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#0D6D4E] text-white flex items-center justify-center text-xs font-bold shrink-0">
              5
            </div>
            <div>
              <div className="text-xs font-bold text-[#0D6D4E]">Review</div>
              <div className="text-[10px] text-gray-500">Confirm changes</div>
            </div>
          </div>

          {/* Step 6: Apply */}
          <div className="flex items-center gap-2 opacity-60">
            <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs font-semibold shrink-0">
              6
            </div>
            <div>
              <div className="text-xs font-medium text-gray-700">Apply</div>
              <div className="text-[10px] text-gray-500">Update catalogue</div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Notice Banner */}
      <div className="flex items-center gap-2.5 p-3 rounded-lg bg-blue-50/70 text-blue-900 border border-blue-100 text-xs">
        <Info className="w-4 h-4 shrink-0 text-blue-600" />
        <span>
          <strong>Category, Arabic name, image and markups in this file are ignored.</strong>{' '}
          Shelf keeps the values you manage here.
        </span>
      </div>

      {/* Summary Cards */}
      <div className="space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900">
          Summary
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-xs">
            <div className="text-[11px] text-gray-500">Rows read</div>
            <div className="text-xl font-bold text-gray-900 mt-1">12,829</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-xs">
            <div className="text-[11px] text-gray-500">Matched to catalogue</div>
            <div className="text-xl font-bold text-[#0D6D4E] mt-1">12,786</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-xs">
            <div className="text-[11px] text-gray-500">New products</div>
            <div className="text-xl font-bold text-blue-600 mt-1">18</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-xs">
            <div className="text-[11px] text-gray-500">Rows with errors</div>
            <div className="text-xl font-bold text-red-600 mt-1">25</div>
            <button className="text-[10px] text-red-600 underline font-medium mt-0.5">
              View errors
            </button>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-xs">
            <div className="text-[11px] text-gray-500">Price changes</div>
            <div className="text-xl font-bold text-blue-600 mt-1">214</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-xs">
            <div className="text-[11px] text-gray-500">Stock changes</div>
            <div className="text-xl font-bold text-blue-600 mt-1">1,932</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-xs">
            <div className="text-[11px] text-gray-500">Missing from file</div>
            <div className="text-xl font-bold text-amber-600 mt-1">9</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Review Table, Right Details Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left 2 Cols: Table & Tabs */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl shadow-xs overflow-hidden">
          {/* Tabs */}
          <div className="flex items-center border-b border-gray-200 px-4">
            <button
              onClick={() => setActiveTab('price')}
              className={`py-3 px-3 text-xs font-semibold border-b-2 transition-colors ${
                activeTab === 'price'
                  ? 'border-[#0D6D4E] text-[#0D6D4E]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Price changes (214)
            </button>
            <button
              onClick={() => setActiveTab('stock')}
              className={`py-3 px-3 text-xs font-semibold border-b-2 transition-colors ${
                activeTab === 'stock'
                  ? 'border-[#0D6D4E] text-[#0D6D4E]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Stock changes (1,932)
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={`py-3 px-3 text-xs font-semibold border-b-2 transition-colors ${
                activeTab === 'new'
                  ? 'border-[#0D6D4E] text-[#0D6D4E]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              New products (18)
            </button>
            <button
              onClick={() => setActiveTab('missing')}
              className={`py-3 px-3 text-xs font-semibold border-b-2 transition-colors ${
                activeTab === 'missing'
                  ? 'border-[#0D6D4E] text-[#0D6D4E]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Missing (9)
            </button>
          </div>

          {/* Search bar & Actions */}
          <div className="p-3.5 border-b border-gray-100 flex items-center justify-between gap-3">
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

            <button
              onClick={() => showToast('Exported review list to CSV')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-gray-500" />
              <span>Export list</span>
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold">
                <tr>
                  <th className="py-2.5 px-3 w-8">
                    <input type="checkbox" className="rounded accent-[#0D6D4E]" />
                  </th>
                  <th className="py-2.5 px-3 font-semibold">Barcode</th>
                  <th className="py-2.5 px-3 font-semibold">Product</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Old price (QAR)</th>
                  <th className="py-2.5 px-3 font-semibold text-right">New price (QAR)</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Change</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredChanges.map((item) => (
                  <tr key={item.barcode} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3 px-3">
                      <input type="checkbox" className="rounded accent-[#0D6D4E]" />
                    </td>
                    <td className="py-3 px-3 font-mono text-gray-600">
                      {item.barcode}
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <ProductImage imageKey={item.imageKey} size="sm" />
                        <div>
                          <div className="font-medium text-gray-900 leading-tight">
                            {item.nameEn}
                          </div>
                          <div className="text-[11px] text-gray-500 font-arabic leading-tight">
                            {item.nameAr}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right text-gray-600 font-medium">
                      {item.oldPrice}
                    </td>
                    <td className="py-3 px-3 text-right font-semibold text-gray-900">
                      {item.newPrice}
                    </td>
                    <td className="py-3 px-3 text-right font-semibold text-[#0D6D4E]">
                      {item.change}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="p-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span>Showing 1 to 8 of 214 price changes</span>
            <div className="flex items-center gap-1">
              <button className="px-2 py-1 rounded bg-gray-100 font-semibold text-[#0D6D4E]">
                1
              </button>
              <button className="px-2 py-1 rounded hover:bg-gray-100">2</button>
              <button className="px-2 py-1 rounded hover:bg-gray-100">3</button>
              <button className="px-2 py-1 rounded hover:bg-gray-100">4</button>
              <button className="px-2 py-1 rounded hover:bg-gray-100">5</button>
              <span className="px-1">...</span>
              <button className="px-2 py-1 rounded hover:bg-gray-100">27</button>
            </div>
          </div>
        </div>

        {/* Right Sidebar: File Details, Safety checks, Actions */}
        <div className="space-y-4">
          {/* File Details Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
              File details
            </h3>

            <div className="flex items-center gap-2.5 pb-2 border-b border-gray-100">
              <div className="w-8 h-8 rounded bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                X
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-900">
                  Item_Master_06Oct2026.xlsx
                </div>
                <div className="text-[10px] text-gray-500">1.4 MB</div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500">Source</span>
                <span className="font-medium text-gray-900">ERP (RetailOne)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500">File type</span>
                <span className="font-medium text-gray-900">Excel (.xlsx)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500">Uploaded by</span>
                <span className="font-medium text-gray-900">Omar Haddad</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500">Uploaded at</span>
                <span className="font-medium text-gray-900">06 Oct 2026 09:10</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500">Contains</span>
                <span className="font-medium text-gray-900">All products (full list)</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500">Status</span>
                <span className="inline-flex items-center gap-1 text-amber-700 font-semibold bg-amber-50 px-1.5 py-0.5 rounded text-[11px]">
                  <AlertTriangle className="w-3 h-3 text-amber-600" />
                  Needs review
                </span>
              </div>
            </div>
          </div>

          {/* Safety Checks Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-xs space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
              Safety checks
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-[#0D6D4E] shrink-0" />
                <span>File format is valid</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-[#0D6D4E] shrink-0" />
                <span>File size 1.4 MB (limit 25 MB)</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-[#0D6D4E] shrink-0" />
                <span>No viruses detected</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-[#0D6D4E] shrink-0" />
                <span>No sensitive macros</span>
              </div>
            </div>
          </div>

          {/* Detected Layout Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-xs space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
              Detected layout
            </h3>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500">Format</span>
                <span className="font-medium text-gray-900">RetailOne (v3)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500">Products sheet</span>
                <span className="font-medium text-gray-900">Item_Master</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500">Columns</span>
                <span className="font-medium text-gray-900">18 (recognised)</span>
              </div>
            </div>
            <button
              onClick={() => navigate('category-mapping')}
              className="text-xs text-[#0D6D4E] font-medium hover:underline pt-1 block"
            >
              View detected columns
            </button>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handleConfirmAndApply}
              className="w-full py-2.5 text-xs font-bold text-white bg-[#0D6D4E] hover:bg-[#0b5c42] rounded-lg transition-colors shadow-xs"
            >
              Confirm and apply
            </button>
            <button
              onClick={() => navigate('dashboard')}
              className="w-full py-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
