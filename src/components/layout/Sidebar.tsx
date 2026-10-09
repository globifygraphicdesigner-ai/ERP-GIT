import React from 'react';
import {
  LayoutDashboard,
  Upload,
  BarChart2,
  Package,
  Plus,
  Tag,
  Network,
  FileSpreadsheet,
  Settings,
  HelpCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ViewType } from '../../types';

export const Sidebar: React.FC = () => {
  const { currentView, navigate } = useApp();

  const navItems: { label: string; view: ViewType; icon: React.ElementType }[] = [
    { label: 'Dashboard', view: 'dashboard', icon: LayoutDashboard },
    { label: 'Uploads', view: 'uploads', icon: Upload },
    { label: 'Reports', view: 'reports', icon: BarChart2 },
    { label: 'Catalogue', view: 'catalogue', icon: Package },
    { label: 'Markups', view: 'markups', icon: Tag },
    { label: 'Category mapping', view: 'category-mapping', icon: Network },
    { label: 'Templates', view: 'templates', icon: FileSpreadsheet },
  ];

  const isNavActive = (view: ViewType) => {
    if (currentView === view) return true;
    if (view === 'reports' && (currentView === 'reports-stock' || currentView === 'reports-price-discrepancies' || currentView === 'reports-price-mismatches')) {
      return true;
    }
    if (view === 'uploads' && currentView === 'upload-review') return true;
    if (
      view === 'catalogue' &&
      (currentView === 'product-detail' ||
        currentView === 'new-product' ||
        currentView === 'categories' ||
        currentView === 'category-detail')
    ) {
      return true;
    }
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
            Shelf
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
                <span>{item.label}</span>
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
          onClick={() => navigate('onboarding')}
          className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors text-left ${
            currentView === 'onboarding'
              ? 'bg-[#E8F5EE] text-[#0D6D4E]'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/70'
          }`}
        >
          <HelpCircle className="w-4 h-4 text-gray-500 shrink-0" />
          <span>Help</span>
        </button>
      </div>
    </aside>
  );
};
