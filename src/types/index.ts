export type ViewType =
  | 'dashboard'
  | 'uploads'
  | 'upload-review'
  | 'column-mapping'
  | 'reports'
  | 'reports-stock'
  | 'reports-price-discrepancies'
  | 'reports-price-mismatches'
  | 'catalogue'
  | 'product-detail'
  | 'new-products'
  | 'new-product'
  | 'categories'
  | 'category-detail'
  | 'markups'
  | 'category-mapping'
  | 'templates'
  | 'outputs-generate'
  | 'onboarding'
  | 'settings';

export type MarketplaceId = 'talabat' | 'snoonu' | 'rafeeq' | 'keeta';

export interface MarketplaceConfig {
  id: MarketplaceId;
  name: string;
  shortName: string;
  initial: string;
  bgColor: string;
  textColor: string;
  status: 'active' | 'warning' | 'empty';
  updatedAt?: string;
  warningNote?: string;
}

export interface MarketplaceStatus {
  listed: boolean;
  price?: number;
  expectedPrice?: number;
  priceDiff?: number;
  stock?: number;
  erpStock?: number;
  stockDiff?: number;
  lastUpdated?: string;
  note?: 'Price and stock mismatch' | 'In sync' | 'Price mismatch' | 'Stock mismatch' | 'No file uploaded yet';
  customMarkup?: number;
}

export interface Product {
  id: string;
  sku: string;
  nameEn: string;
  nameAr: string;
  barcode: string;
  category: string;
  subcategory?: string;
  brand: string;
  size: string;
  unit: string;
  packSize: number;
  erpPrice: number;
  costPrice: number;
  defaultMarkup: number;
  sellingPrice: number;
  erpStock: number;
  status: 'Active' | 'Inactive';
  isNew?: boolean;
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
  imageKey: string;
  marketplaces: Record<MarketplaceId, MarketplaceStatus>;
}

export interface CategoryItem {
  id: string;
  nameEn: string;
  nameAr: string;
  icon: string;
  productCount: number;
  activeCount: number;
  inactiveCount: number;
  status: 'Active' | 'Inactive';
  updatedAt: string;
  updatedBy: string;
  parentCategory?: string;
  subcategories: {
    id: string;
    name: string;
    count: number;
    icon?: string;
  }[];
}

export interface OutputFileRecord {
  id: string;
  generatedOn: string;
  marketplace: MarketplaceId;
  fileName: string;
  productsInFile: number;
  changes: number;
  generatedBy: string;
  status: 'Ready' | 'Processing' | 'Failed';
  fileType: 'Excel (.xlsx)' | 'CSV (.csv)';
}

export interface TeamMember {
  id: string;
  email: string;
  role: 'Catalogue Manager' | 'Store Admin' | 'Viewer';
  status: 'Invited' | 'Active';
  invitedAt: string;
}
