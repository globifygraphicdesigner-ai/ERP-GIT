import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { MarketplaceId, ViewType } from '../types';

interface ToastInfo {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface NavigateOptions {
  id?: string;
  productId?: string;
  categoryId?: string;
  preselectedUpload?: MarketplaceId | 'erp';
  marketplaceFilter?: MarketplaceId;
}

interface AppContextType {
  currentView: ViewType;
  selectedProductId: string;
  selectedCategoryId: string;
  marketplaceFilter: MarketplaceId | null;
  isUploadModalOpen: boolean;
  uploadModalPreselectedSource: MarketplaceId | 'erp';
  toasts: ToastInfo[];
  navigate: (view: ViewType, options?: NavigateOptions) => void;
  openUploadModal: (source?: MarketplaceId | 'erp') => void;
  closeUploadModal: () => void;
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  dismissToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// ---- Hash routing helpers ----
const VIEW_TO_HASH: Record<ViewType, string> = {
  dashboard: '/dashboard',
  uploads: '/uploads',
  'upload-review': '/uploads/review',
  'column-mapping': '/uploads/mapping',
  reports: '/reports/stock',
  'reports-stock': '/reports/stock',
  'reports-price-discrepancies': '/reports/price',
  'reports-price-mismatches': '/reports/price-mismatches',
  catalogue: '/catalogue',
  'product-detail': '/catalogue', // will append /pXXX
  'new-products': '/catalogue/new',
  'new-product': '/catalogue/new',
  categories: '/categories',
  'category-detail': '/categories', // will append /cXXX
  markups: '/markups',
  'category-mapping': '/category-mapping',
  templates: '/templates',
  'outputs-generate': '/generate',
  onboarding: '/onboarding',
  settings: '/settings',
};

function viewToHash(view: ViewType, opts?: NavigateOptions): string {
  let base = VIEW_TO_HASH[view] || '/dashboard';
  const prodId = opts?.productId || opts?.id;
  if (view === 'product-detail' && prodId) base = `/catalogue/${prodId}`;
  if (view === 'category-detail' && opts?.categoryId) base = `/categories/${opts.categoryId}`;
  if (opts?.marketplaceFilter) base += `?mp=${opts.marketplaceFilter}`;
  return base;
}

function hashToView(hash: string): { view: ViewType; productId?: string; categoryId?: string; marketplaceFilter?: MarketplaceId } {
  const h = (hash || '#/dashboard').replace(/^#/, '');
  const [path, qs] = h.split('?');
  const params = new URLSearchParams(qs || '');
  const mp = params.get('mp') as MarketplaceId | null;

  if (path.startsWith('/catalogue/new')) return { view: 'new-products', marketplaceFilter: mp || undefined };
  if (path.startsWith('/catalogue/')) {
    const id = path.replace('/catalogue/', '');
    return { view: 'product-detail', productId: id, marketplaceFilter: mp || undefined };
  }
  if (path === '/catalogue') return { view: 'catalogue', marketplaceFilter: mp || undefined };
  if (path.startsWith('/categories/')) {
    const id = path.replace('/categories/', '');
    return { view: 'category-detail', categoryId: id, marketplaceFilter: mp || undefined };
  }
  if (path === '/categories') return { view: 'categories', marketplaceFilter: mp || undefined };
  if (path === '/uploads/review') return { view: 'upload-review', marketplaceFilter: mp || undefined };
  if (path === '/uploads/mapping') return { view: 'column-mapping', marketplaceFilter: mp || undefined };
  if (path === '/uploads') return { view: 'uploads', marketplaceFilter: mp || undefined };
  if (path === '/reports/stock') return { view: 'reports-stock', marketplaceFilter: mp || undefined };
  if (path === '/reports/price') return { view: 'reports-price-discrepancies', marketplaceFilter: mp || undefined };
  if (path === '/reports/price-mismatches') return { view: 'reports-price-mismatches', marketplaceFilter: mp || undefined };
  if (path === '/generate') return { view: 'outputs-generate', marketplaceFilter: mp || undefined };
  if (path === '/markups') return { view: 'markups', marketplaceFilter: mp || undefined };
  if (path === '/category-mapping') return { view: 'category-mapping', marketplaceFilter: mp || undefined };
  if (path === '/templates') return { view: 'templates', marketplaceFilter: mp || undefined };
  if (path === '/onboarding') return { view: 'onboarding', marketplaceFilter: mp || undefined };
  if (path === '/settings') return { view: 'settings', marketplaceFilter: mp || undefined };
  return { view: 'dashboard', marketplaceFilter: mp || undefined };
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initial = hashToView(window.location.hash);
  const [currentView, setCurrentView] = useState<ViewType>(initial.view);
  const [selectedProductId, setSelectedProductId] = useState<string>(initial.productId || '');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(initial.categoryId || '');
  const [marketplaceFilter, setMarketplaceFilter] = useState<MarketplaceId | null>(initial.marketplaceFilter || null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadModalPreselectedSource, setUploadModalPreselectedSource] = useState<MarketplaceId | 'erp'>('talabat');
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  const showToast = useCallback((message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const navigate = useCallback((view: ViewType, options?: NavigateOptions) => {
    const prodId = options?.productId || options?.id;
    if (prodId) setSelectedProductId(prodId);
    if (options?.categoryId) setSelectedCategoryId(options.categoryId);
    if (options?.preselectedUpload) setUploadModalPreselectedSource(options.preselectedUpload);
    setMarketplaceFilter(options?.marketplaceFilter || null);
    setCurrentView(view);
    window.location.hash = '#' + viewToHash(view, options);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Listen for hash changes (back/forward button)
  useEffect(() => {
    const onHashChange = () => {
      const parsed = hashToView(window.location.hash);
      setCurrentView(parsed.view);
      if (parsed.productId) setSelectedProductId(parsed.productId);
      if (parsed.categoryId) setSelectedCategoryId(parsed.categoryId);
      setMarketplaceFilter(parsed.marketplaceFilter || null);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const openUploadModal = useCallback((source: MarketplaceId | 'erp' = 'talabat') => {
    setUploadModalPreselectedSource(source);
    setIsUploadModalOpen(true);
  }, []);

  const closeUploadModal = useCallback(() => {
    setIsUploadModalOpen(false);
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentView,
        selectedProductId,
        selectedCategoryId,
        marketplaceFilter,
        isUploadModalOpen,
        uploadModalPreselectedSource,
        toasts,
        navigate,
        openUploadModal,
        closeUploadModal,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
