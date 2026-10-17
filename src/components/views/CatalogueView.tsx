import React, { useState, useMemo } from 'react';
import {
  Search,
  Upload,
  ChevronLeft,
  ChevronRight,
  Info,
  Package,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProductImage } from '../common/ProductImage';
import { useDemo, relative } from '../../demo';
import type { Product } from '../../demo';

export const CatalogueView: React.FC = () => {
  const { navigate, openUploadModal } = useApp();
  const { state } = useDemo();

  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'inactive' | 'new' | 'missing'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');

  const products = state.products;

  // Counts for tabs
  const tabCounts = useMemo(() => {
    return {
      all: products.length,
      active: products.filter((p) => p.status === 'active').length,
      inactive: products.filter((p) => p.status === 'inactive').length,
      new: products.filter((p) => p.status === 'new').length,
      missing: products.filter((p) => !p.inLatestErpFile).length,
    };
  }, [products]);

  // Unique brands
  const brands = useMemo(() => {
    const set = new Set<string>();
    for (const p of products) {
      if (p.brand) set.add(p.brand);
    }
    return Array.from(set).sort();
  }, [products]);

  // Category lookup
  const categoryMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const c of state.categories) {
      map.set(c.id, c.nameEn);
    }
    return map;
  }, [state.categories]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Tab filter
      if (activeTab === 'active' && p.status !== 'active') return false;
      if (activeTab === 'inactive' && p.status !== 'inactive') return false;
      if (activeTab === 'new' && p.status !== 'new') return false;
      if (activeTab === 'missing' && p.inLatestErpFile) return false;

      // Search filter
      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        const matches =
          p.nameEn.toLowerCase().includes(q) ||
          (p.nameAr && p.nameAr.toLowerCase().includes(q)) ||
          p.barcode.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && p.categoryId !== selectedCategory) {
        return false;
      }

      // Brand filter
      if (selectedBrand !== 'all' && p.brand !== selectedBrand) {
        return false;
      }

      return true;
    });
  }, [products, activeTab, searchTerm, selectedCategory, selectedBrand]);

  const getStatusBadge = (p: Product) => {
    if (!p.inLatestErpFile) {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
          Missing from ERP
        </span>
      );
    }
    if (p.status === 'active') {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          Active
        </span>
      );
    }
    if (p.status === 'new') {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
          New
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 text-gray-600 border border-gray-200">
        Inactive
      </span>
    );
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Catalogue
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Master catalogue of ERP items synced with Qorloop attributes and marketplace listings
          </p>
        </div>

        <button
          onClick={() => openUploadModal('erp')}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors shadow-xs"
        >
          <Upload className="w-4 h-4 text-gray-500" />
          <span>Import from ERP</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('all')}
          className={`pb-3 px-2 text-xs font-semibold transition-colors flex items-center gap-2 border-b-2 ${
            activeTab === 'all'
              ? 'border-[#0D6D4E] text-[#0D6D4E]'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <span>All Products</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-gray-100 text-gray-600">
            {tabCounts.all}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('active')}
          className={`pb-3 px-2 text-xs font-semibold transition-colors flex items-center gap-2 border-b-2 ${
            activeTab === 'active'
              ? 'border-[#0D6D4E] text-[#0D6D4E]'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <span>Active</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-100 text-emerald-800">
            {tabCounts.active}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('inactive')}
          className={`pb-3 px-2 text-xs font-semibold transition-colors flex items-center gap-2 border-b-2 ${
            activeTab === 'inactive'
              ? 'border-[#0D6D4E] text-[#0D6D4E]'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <span>Inactive</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-gray-100 text-gray-600">
            {tabCounts.inactive}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('new')}
          className={`pb-3 px-2 text-xs font-semibold transition-colors flex items-center gap-2 border-b-2 ${
            activeTab === 'new'
              ? 'border-[#0D6D4E] text-[#0D6D4E]'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <span>New</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-blue-100 text-blue-800">
            {tabCounts.new}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('missing')}
          className={`pb-3 px-2 text-xs font-semibold transition-colors flex items-center gap-2 border-b-2 ${
            activeTab === 'missing'
              ? 'border-[#0D6D4E] text-[#0D6D4E]'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <span>Missing from ERP</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-100 text-amber-800">
            {tabCounts.missing}
          </span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, Arabic, barcode, or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs border border-gray-200 rounded-xl focus:ring-1 focus:ring-[#0D6D4E] outline-none"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 text-xs border border-gray-200 rounded-xl focus:ring-1 focus:ring-[#0D6D4E] outline-none bg-white text-gray-700 font-medium"
          >
            <option value="all">All categories</option>
            {state.categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nameEn}
              </option>
            ))}
          </select>

          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="px-3 py-2 text-xs border border-gray-200 rounded-xl focus:ring-1 focus:ring-[#0D6D4E] outline-none bg-white text-gray-700 font-medium"
          >
            <option value="all">All brands</option>
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div className="text-xs text-gray-500 font-medium">
          Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> of {products.length} products
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center">
            <Package className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-sm font-semibold text-gray-900">No products match your criteria</p>
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
                  <th className="px-4 py-3.5">Category</th>
                  <th className="px-4 py-3.5">Brand</th>
                  <th className="px-4 py-3.5 text-right">ERP Price</th>
                  <th className="px-4 py-3.5 text-right">ERP Stock</th>
                  <th className="px-4 py-3.5 text-center">Status</th>
                  <th className="px-4 py-3.5 text-center">Marketplaces</th>
                  <th className="px-4 py-3.5">Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-600 font-medium">
                {filteredProducts.map((p) => {
                  const categoryName = categoryMap.get(p.categoryId) || p.erpCategory || '—';
                  const listedCount = state.listings.filter((l) => l.productId === p.id).length;
                  const totalMp = state.marketplaces.length;

                  return (
                    <tr
                      key={p.id}
                      onClick={() => navigate('product-detail', { id: p.id })}
                      className="hover:bg-gray-50/80 cursor-pointer transition-colors"
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <ProductImage
                            imageKey={p.brand?.toLowerCase() || 'default'}
                            className="w-9 h-9 rounded-lg border border-gray-100 p-0.5 object-contain shrink-0 bg-white"
                          />
                          <div>
                            <div className="font-semibold text-gray-900 hover:text-[#0D6D4E] transition-colors">
                              {p.nameEn}
                            </div>
                            {p.nameAr && (
                              <div className="text-[11px] text-gray-400 mt-0.5" dir="rtl">
                                {p.nameAr}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3.5 font-mono text-[11px] text-gray-600 whitespace-nowrap">
                        {p.barcode || '—'}
                      </td>

                      <td className="px-4 py-3.5 whitespace-nowrap text-gray-800">
                        {categoryName}
                      </td>

                      <td className="px-4 py-3.5 whitespace-nowrap text-gray-800">
                        {p.brand || '—'}
                      </td>

                      <td className="px-4 py-3.5 text-right font-mono font-semibold text-gray-900 whitespace-nowrap">
                        {p.erpPrice.toFixed(2)} QAR
                      </td>

                      <td className="px-4 py-3.5 text-right font-mono text-gray-900 whitespace-nowrap">
                        {p.erpStock.toLocaleString()}
                      </td>

                      <td className="px-4 py-3.5 text-center whitespace-nowrap">
                        {getStatusBadge(p)}
                      </td>

                      <td className="px-4 py-3.5 text-center whitespace-nowrap">
                        <span className="text-xs font-medium text-gray-700">
                          {listedCount} of {totalMp} listed
                        </span>
                      </td>

                      <td className="px-4 py-3.5 text-[11px] text-gray-400 whitespace-nowrap">
                        {p.updatedAt ? relative(p.updatedAt, state.now) : '—'}
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
