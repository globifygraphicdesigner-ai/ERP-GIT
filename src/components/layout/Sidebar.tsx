import React from 'react';
import {
  LayoutDashboard,
  Upload,
  BarChart2,
  Package,
  Tag,
  FileSpreadsheet,
  Settings,
  HelpCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useDemo } from '../../demo';
import { ViewType } from '../../types';

export const Sidebar: React.FC = () => {
  const { currentView, navigate } = useApp();
  const { state, pendingMapping } = useDemo();
  const editingFromFileMapping = !!pendingMapping?.fromFileMapping;

  const newProductsCount = state.products.filter((p) => p.status === 'new').length;

  const navItems: { label: string; view: ViewType; icon: React.ElementType; badge?: number }[] = [
    { label: 'Dashboard', view: 'dashboard', icon: LayoutDashboard },
    { label: 'Uploads', view: 'uploads', icon: Upload },
    { label: 'Reports', view: 'reports-stock', icon: BarChart2 },
    { label: 'Catalogue', view: 'catalogue', icon: Package },
    { label: 'New products', view: 'new-products', icon: Package, badge: newProductsCount || undefined },
    { label: 'Markups', view: 'markups', icon: Tag },
    { label: 'File mapping', view: 'templates', icon: FileSpreadsheet },
  ];

  const isNavActive = (view: ViewType) => {
    if (currentView === view) return true;
    if (view === 'reports-stock' && (currentView === 'reports-stock' || currentView === 'reports-price-discrepancies' || currentView === 'outputs-generate')) {
      return true;
    }
    if (view === 'templates' && currentView === 'column-mapping' && editingFromFileMapping) return true;
    if (view === 'uploads' && (currentView === 'upload-review' || (currentView === 'column-mapping' && !editingFromFileMapping))) return true;
    if (
      view === 'catalogue' &&
      (currentView === 'product-detail')
    ) {
      return true;
    }
    if (view === 'new-products' && currentView === 'new-products') return true;
    return false;
  };

  return (
    <aside className="w-56 shrink-0 bg-white border-r border-gray-200 h-screen sticky top-0 flex flex-col justify-between py-5 px-3 z-20">
      <div>
        {/* Brand Logo */}
        <div
          onClick={() => navigate('dashboard')}
          className="px-3 pb-6 flex items-center cursor-pointer select-none"
        >
          <span className="text-2xl font-bold tracking-tight text-[#0D6D4E]">
            Qorloop
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isNavActive(item.view);
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.view)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors text-left ${
                  active
                    ? 'bg-[#E8F5EE] text-[#0D6D4E]'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/70'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    active ? 'text-[#0D6D4E]' : 'text-gray-500'
                  }`}
                />
                <span className="flex-1">{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Links */}
      <div className="space-y-1 pt-4 border-t border-gray-100">
        <button
          onClick={() => navigate('settings')}
          className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors text-left ${
            currentView === 'settings'
              ? 'bg-[#E8F5EE] text-[#0D6D4E]'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/70'
          }`}
        >
          <Settings className="w-4 h-4 text-gray-500 shrink-0" />
          <span>Settings</span>
        </button>

        <button
          onClick={() => {
            /* Help link - does NOT open onboarding */
          }}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors text-left text-gray-600 hover:text-gray-900 hover:bg-gray-100/70"
        >
          <HelpCircle className="w-4 h-4 text-gray-500 shrink-0" />
          <span>Help</span>
        </button>
      </div>
    </aside>
  );
};
