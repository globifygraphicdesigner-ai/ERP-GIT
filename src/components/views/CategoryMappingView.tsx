import React, { useState } from 'react';
import { RotateCw, Info, HelpCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CategoryMappingView: React.FC = () => {
  const { navigate, showToast } = useApp();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const previewRows = [
    {
      id: '987654',
      barcode: '6281007012345',
      nameEn: 'Pepsi 330ml Can',
      nameAr: 'بيبسي ٣٣٠ مل علبة',
      price: '2.75',
      stock: '120',
      category: 'Soft Drinks',
      brand: 'Pepsi',
    },
    {
      id: '987655',
      barcode: '6291100231472',
      nameEn: 'Baladna Fresh Milk 1L',
      nameAr: 'حليب بلدنا الطازج ١ لتر',
      price: '7.25',
      stock: '45',
      category: 'Dairy',
      brand: 'Baladna',
    },
    {
      id: '987656',
      barcode: '6281036112233',
      nameEn: "Lay's Salted 170g",
      nameAr: 'ليز مملح ١٧٠ جم',
      price: '8.75',
      stock: '60',
      category: 'Snacks',
      brand: "Lay's",
    },
    {
      id: '987657',
      barcode: '6281007021118',
      nameEn: 'Almarai Laban 180ml',
      nameAr: 'المراعي لبن ١٨٠ مل',
      price: '1.95',
      stock: '200',
      category: 'Dairy',
      brand: 'Almarai',
    },
    {
      id: '987658',
      barcode: '5000159461122',
      nameEn: 'Snickers 50g',
      nameAr: 'سنيكرز ٥٠ جم',
      price: '3.50',
      stock: '80',
      category: 'Confectionery',
      brand: 'Snickers',
    },
  ];

  const handleContinue = () => {
    if (step === 1) {
      setStep(2);
      showToast('Data preview generated from Talabat mapping');
    } else if (step === 2) {
      setStep(3);
      showToast('Mapping configuration saved for Talabat uploads!');
      navigate('dashboard');
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-150">
      {/* Header & Breadcrumb */}
      <div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
          <span className="text-blue-600 cursor-pointer hover:underline">
            Category mapping
          </span>
          <span>/</span>
          <span className="text-gray-700">Talabat</span>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Map Talabat file
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Tell Shelf which columns in your Talabat file match our fields. We'll remember
          this for future uploads.
        </p>
      </div>

      {/* Stepper Progress */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4 text-xs">
        <div className="flex items-center gap-3">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
              step >= 1 ? 'bg-[#0D6D4E] text-white' : 'bg-gray-200 text-gray-600'
            }`}
          >
            1
          </div>
          <div>
            <div
              className={`font-semibold ${
                step === 1 ? 'text-[#0D6D4E]' : 'text-gray-900'
              }`}
            >
              Map columns
            </div>
            <div className="text-[11px] text-gray-500">
              Match file columns to Shelf fields
            </div>
          </div>
        </div>

        <div className="h-0.5 w-16 bg-gray-200" />

        <div className="flex items-center gap-3">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
              step >= 2 ? 'bg-[#0D6D4E] text-white' : 'bg-gray-200 text-gray-600'
            }`}
          >
            2
          </div>
          <div>
            <div
              className={`font-semibold ${
                step === 2 ? 'text-[#0D6D4E]' : 'text-gray-900'
              }`}
            >
              Preview data
            </div>
            <div className="text-[11px] text-gray-500">Check the results</div>
          </div>
        </div>

        <div className="h-0.5 w-16 bg-gray-200" />

        <div className="flex items-center gap-3">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
              step >= 3 ? 'bg-[#0D6D4E] text-white' : 'bg-gray-200 text-gray-600'
            }`}
          >
            3
          </div>
          <div>
            <div
              className={`font-semibold ${
                step === 3 ? 'text-[#0D6D4E]' : 'text-gray-900'
              }`}
            >
              Save mapping
            </div>
            <div className="text-[11px] text-gray-500">Name and save</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Main Mapping Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Select fields */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-gray-900">1. Select fields</h2>
              <button
                onClick={() => showToast('Auto-detection re-evaluated')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <RotateCw className="w-3.5 h-3.5 text-gray-500" />
                <span>Auto-detect again</span>
              </button>
            </div>

            <p className="text-xs text-gray-500 -mt-2">
              For each Shelf field, choose the column from your file.
            </p>

            <div className="flex items-start gap-2 p-2.5 rounded-lg bg-blue-50/70 border border-blue-100 text-blue-900 text-xs">
              <Info className="w-4 h-4 shrink-0 text-blue-600 mt-0.5" />
              <span>
                We've tried to detect some columns automatically. Check and adjust if
                needed.
              </span>
            </div>

            {/* Field rows */}
            <div className="divide-y divide-gray-100 text-xs">
              <div className="grid grid-cols-12 py-2 font-semibold text-gray-500 bg-gray-50 px-2 rounded">
                <div className="col-span-4">Shelf field</div>
                <div className="col-span-5">Selected column from file</div>
                <div className="col-span-3 text-right">Sample data from file</div>
              </div>

              {/* Row 1 */}
              <div className="grid grid-cols-12 py-3 px-2 items-center">
                <div className="col-span-4">
                  <div className="font-semibold text-gray-900">Marketplace product ID</div>
                  <div className="text-[10px] text-gray-500">Required</div>
                </div>
                <div className="col-span-5 pr-2">
                  <select className="w-full text-xs border border-gray-200 rounded-md py-1.5 px-2 bg-white">
                    <option>Product ID (column A)</option>
                  </select>
                </div>
                <div className="col-span-3 text-right font-mono text-gray-600">
                  987654
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-12 py-3 px-2 items-center">
                <div className="col-span-4">
                  <div className="font-semibold text-gray-900">Barcode</div>
                  <div className="text-[10px] text-gray-500">Required</div>
                </div>
                <div className="col-span-5 pr-2">
                  <select className="w-full text-xs border border-gray-200 rounded-md py-1.5 px-2 bg-white">
                    <option>Barcode (column B)</option>
                  </select>
                </div>
                <div className="col-span-3 text-right font-mono text-gray-600">
                  6281007012345
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-12 py-3 px-2 items-center">
                <div className="col-span-4">
                  <div className="font-semibold text-gray-900">
                    Product name (English)
                  </div>
                  <div className="text-[10px] text-gray-500">Required</div>
                </div>
                <div className="col-span-5 pr-2">
                  <select className="w-full text-xs border border-gray-200 rounded-md py-1.5 px-2 bg-white">
                    <option>Product Name EN (column C)</option>
                  </select>
                </div>
                <div className="col-span-3 text-right text-gray-800 font-medium">
                  Pepsi 330ml Can
                </div>
              </div>

              {/* Row 4 */}
              <div className="grid grid-cols-12 py-3 px-2 items-center">
                <div className="col-span-4">
                  <div className="font-semibold text-gray-900">Product name (Arabic)</div>
                  <div className="text-[10px] text-gray-500">Optional</div>
                </div>
                <div className="col-span-5 pr-2">
                  <select className="w-full text-xs border border-gray-200 rounded-md py-1.5 px-2 bg-white">
                    <option>Product Name AR (column D)</option>
                  </select>
                </div>
                <div className="col-span-3 text-right text-gray-800 font-arabic">
                  بيبسي ٣٣٠ مل علبة
                </div>
              </div>

              {/* Row 5 */}
              <div className="grid grid-cols-12 py-3 px-2 items-center">
                <div className="col-span-4">
                  <div className="font-semibold text-gray-900">Price (QAR)</div>
                  <div className="text-[10px] text-gray-500">Required</div>
                </div>
                <div className="col-span-5 pr-2">
                  <select className="w-full text-xs border border-gray-200 rounded-md py-1.5 px-2 bg-white">
                    <option>Selling Price (column E)</option>
                  </select>
                </div>
                <div className="col-span-3 text-right font-semibold text-gray-900">
                  2.75
                </div>
              </div>

              {/* Row 6 */}
              <div className="grid grid-cols-12 py-3 px-2 items-center">
                <div className="col-span-4">
                  <div className="font-semibold text-gray-900">Stock quantity</div>
                  <div className="text-[10px] text-gray-500">Required</div>
                </div>
                <div className="col-span-5 pr-2">
                  <select className="w-full text-xs border border-gray-200 rounded-md py-1.5 px-2 bg-white">
                    <option>Available Qty (column F)</option>
                  </select>
                </div>
                <div className="col-span-3 text-right font-semibold text-gray-900">
                  120
                </div>
              </div>

              {/* Row 7 */}
              <div className="grid grid-cols-12 py-3 px-2 items-center">
                <div className="col-span-4">
                  <div className="font-semibold text-gray-900">Category</div>
                  <div className="text-[10px] text-gray-500">Optional</div>
                </div>
                <div className="col-span-5 pr-2">
                  <select className="w-full text-xs border border-gray-200 rounded-md py-1.5 px-2 bg-white">
                    <option>Category (column G)</option>
                  </select>
                </div>
                <div className="col-span-3 text-right text-gray-700">Soft Drinks</div>
              </div>

              {/* Row 8 */}
              <div className="grid grid-cols-12 py-3 px-2 items-center">
                <div className="col-span-4">
                  <div className="font-semibold text-gray-900">Brand</div>
                  <div className="text-[10px] text-gray-500">Optional</div>
                </div>
                <div className="col-span-5 pr-2">
                  <select className="w-full text-xs border border-gray-200 rounded-md py-1.5 px-2 bg-white">
                    <option>Brand (column H)</option>
                  </select>
                </div>
                <div className="col-span-3 text-right text-gray-700">Pepsi</div>
              </div>
            </div>
          </div>

          {/* Section 2: Preview rows */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-gray-900">2. Preview rows</h2>
                <p className="text-xs text-gray-500">
                  Here are the first rows from your file using the mapping above.
                </p>
              </div>
              <select className="text-xs border border-gray-200 rounded-md py-1 px-2 bg-white">
                <option>Show 10 rows</option>
                <option>Show 25 rows</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-gray-100 rounded-lg">
                <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200">
                  <tr>
                    <th className="py-2 px-2.5">Product ID</th>
                    <th className="py-2 px-2.5">Barcode</th>
                    <th className="py-2 px-2.5">Product name (English)</th>
                    <th className="py-2 px-2.5">Product name (Arabic)</th>
                    <th className="py-2 px-2.5">Price (QAR)</th>
                    <th className="py-2 px-2.5">Stock quantity</th>
                    <th className="py-2 px-2.5">Category</th>
                    <th className="py-2 px-2.5">Brand</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {previewRows.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50">
                      <td className="py-2 px-2.5 font-mono text-gray-600">{r.id}</td>
                      <td className="py-2 px-2.5 font-mono text-gray-600">{r.barcode}</td>
                      <td className="py-2 px-2.5 font-medium text-gray-900">{r.nameEn}</td>
                      <td className="py-2 px-2.5 text-gray-600 font-arabic">{r.nameAr}</td>
                      <td className="py-2 px-2.5 text-gray-900 font-semibold">{r.price}</td>
                      <td className="py-2 px-2.5 text-gray-900">{r.stock}</td>
                      <td className="py-2 px-2.5 text-gray-700">{r.category}</td>
                      <td className="py-2 px-2.5 text-gray-700">{r.brand}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          {/* File Details */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-xs space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
              File details
            </h3>
            <div className="flex items-center gap-2.5 pt-1">
              <div className="w-8 h-8 rounded bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                X
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-900">
                  talabat_items_06Oct.xlsx
                </div>
                <div className="text-[10px] text-gray-500">
                  1.4 MB &nbsp;•&nbsp; Uploaded today 09:08
                </div>
                <div className="text-[10px] text-gray-500">
                  1,248 rows (showing first 10)
                </div>
              </div>
            </div>
          </div>

          {/* Unmapped columns */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-xs space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
              Unmapped columns (2)
            </h3>
            <p className="text-[11px] text-gray-500">
              These columns aren't used. You can ignore them.
            </p>
            <div className="space-y-1.5 pt-1">
              <div className="px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded text-xs text-gray-700 font-mono">
                Image URL (column I)
              </div>
              <div className="px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded text-xs text-gray-700 font-mono">
                Description (column J)
              </div>
            </div>
          </div>

          {/* Helpful tips */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-xs space-y-2 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-gray-900">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              <span>Helpful tips</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-gray-600 text-[11px]">
              <li>You must map at least the required fields.</li>
              <li>Column names in your file may be different. Check the sample data to confirm.</li>
              <li>You can save this mapping and reuse it for future Talabat uploads.</li>
              <li>
                Category, Arabic name, image and markups in your file are ignored if you've already set them in Shelf.
              </li>
            </ul>
          </div>

          {/* Action buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handleContinue}
              className="w-full py-2.5 text-xs font-bold text-white bg-[#0D6D4E] hover:bg-[#0b5c42] rounded-lg transition-colors shadow-xs"
            >
              Continue to preview
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
