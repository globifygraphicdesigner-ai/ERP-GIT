import React, { createContext, useContext, useState } from 'react';
import {
  INITIAL_CATEGORIES,
  INITIAL_OUTPUT_FILES,
  INITIAL_PRODUCTS,
  INITIAL_TEAM_MEMBERS,
} from '../data/mockData';
import {
  CategoryItem,
  MarketplaceId,
  OutputFileRecord,
  Product,
  TeamMember,
  ViewType,
} from '../types';

interface ToastInfo {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  currentView: ViewType;
  selectedProductId: string;
  selectedCategoryId: string;
  selectedBranch: string;
  setSelectedBranch: (branch: string) => void;
  products: Product[];
  categories: CategoryItem[];
  outputFiles: OutputFileRecord[];
  teamMembers: TeamMember[];
  isUploadModalOpen: boolean;
  uploadModalPreselectedSource: MarketplaceId | 'erp';
  toasts: ToastInfo[];
  navigate: (
    view: ViewType,
    options?: {
      productId?: string;
      categoryId?: string;
      preselectedUpload?: MarketplaceId | 'erp';
    }
  ) => void;
  openUploadModal: (source?: MarketplaceId | 'erp') => void;
  closeUploadModal: () => void;
  updateProduct: (product: Product) => void;
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'updatedBy'>) => void;
  deleteProduct: (id: string) => void;
  updateCategory: (category: CategoryItem) => void;
  generateMarketplaceFiles: (
    selectedMarketplaces: MarketplaceId[],
    fileContent: 'mismatches' | 'all',
    format: 'xlsx' | 'csv'
  ) => void;
  inviteTeamMember: (email: string, role: TeamMember['role']) => void;
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  dismissToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [selectedProductId, setSelectedProductId] = useState<string>('987654');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('snacks-confectionery');
  const [selectedBranch, setSelectedBranch] = useState<string>('Doha Fresh Markets');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [categories, setCategories] = useState<CategoryItem[]>(INITIAL_CATEGORIES);
  const [outputFiles, setOutputFiles] = useState<OutputFileRecord[]>(INITIAL_OUTPUT_FILES);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(INITIAL_TEAM_MEMBERS);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadModalPreselectedSource, setUploadModalPreselectedSource] = useState<MarketplaceId | 'erp'>('talabat');
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const navigate = (
    view: ViewType,
    options?: {
      productId?: string;
      categoryId?: string;
      preselectedUpload?: MarketplaceId | 'erp';
    }
  ) => {
    if (options?.productId) setSelectedProductId(options.productId);
    if (options?.categoryId) setSelectedCategoryId(options.categoryId);
    if (options?.preselectedUpload) setUploadModalPreselectedSource(options.preselectedUpload);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openUploadModal = (source: MarketplaceId | 'erp' = 'talabat') => {
    setUploadModalPreselectedSource(source);
    setIsUploadModalOpen(true);
  };

  const closeUploadModal = () => {
    setIsUploadModalOpen(false);
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast(`Updated "${updated.nameEn}" successfully`);
  };

  const addProduct = (newProdData: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'updatedBy'>) => {
    const newId = Math.floor(100000 + Math.random() * 900000).toString();
    const newProd: Product = {
      ...newProdData,
      id: newId,
      createdAt: '08 Oct 2026 10:15',
      updatedAt: '08 Oct 2026 10:15',
      updatedBy: 'Omar Haddad',
    };
    setProducts((prev) => [newProd, ...prev]);
    showToast(`Product "${newProd.nameEn}" created successfully!`);
    navigate('catalogue');
  };

  const deleteProduct = (id: string) => {
    const prod = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast(`Deleted "${prod?.nameEn || 'Product'}"`, 'info');
    navigate('catalogue');
  };

  const updateCategory = (updated: CategoryItem) => {
    setCategories((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    showToast(`Category "${updated.nameEn}" updated`);
  };

  const generateMarketplaceFiles = (
    selectedMarketplaces: MarketplaceId[],
    fileContent: 'mismatches' | 'all',
    format: 'xlsx' | 'csv'
  ) => {
    const newFiles: OutputFileRecord[] = selectedMarketplaces.map((mp) => {
      const counts: Record<MarketplaceId, number> = {
        talabat: 50,
        snoonu: 41,
        rafeeq: 63,
        keeta: 0,
      };
      const prefix = mp.charAt(0).toUpperCase() + mp.slice(1);
      const ext = format === 'xlsx' ? 'xlsx' : 'csv';
      return {
        id: 'out-' + Date.now() + '-' + mp,
        generatedOn: '08 Oct 2026 10:20',
        marketplace: mp,
        fileName: `${prefix}_Price_08Oct2026.${ext}`,
        productsInFile: fileContent === 'mismatches' ? counts[mp] : 12480,
        changes: counts[mp],
        generatedBy: 'Omar Haddad',
        status: 'Ready',
        fileType: format === 'xlsx' ? 'Excel (.xlsx)' : 'CSV (.csv)',
      };
    });

    setOutputFiles((prev) => [...newFiles, ...prev]);
    showToast(`Generated ${selectedMarketplaces.length} marketplace output files successfully!`);
  };

  const inviteTeamMember = (email: string, role: TeamMember['role']) => {
    if (!email) return;
    const newMember: TeamMember = {
      id: 'tm-' + Date.now(),
      email,
      role,
      status: 'Invited',
      invitedAt: '08 Oct 2026 10:22',
    };
    setTeamMembers((prev) => [...prev, newMember]);
    showToast(`Invitation sent to ${email}`);
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        selectedProductId,
        selectedCategoryId,
        selectedBranch,
        setSelectedBranch,
        products,
        categories,
        outputFiles,
        teamMembers,
        isUploadModalOpen,
        uploadModalPreselectedSource,
        toasts,
        navigate,
        openUploadModal,
        closeUploadModal,
        updateProduct,
        addProduct,
        deleteProduct,
        updateCategory,
        generateMarketplaceFiles,
        inviteTeamMember,
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
