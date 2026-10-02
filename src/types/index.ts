export type Gender = 'women' | 'men' | 'unisex';

export type ProductCategory = 
  | 'traditional-wear'
  | 'casual-wear'
  | 'womens-wear'
  | 'mens-wear'
  | 'accessories';

export interface ProductVariant {
  id: string;
  sku: string;
  size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
  color: string;
  colorHex: string;
  stock: number;
  priceModifier?: number; // difference from base price if any
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  price: number;
  salePrice?: number;
  costPrice?: number;
  category: ProductCategory;
  categoryName: string;
  gender: Gender;
  description: string;
  shortDescription: string;
  fabric: string;
  careInstructions: string[];
  features: string[];
  images: string[];
  badge?: 'New' | 'Bestseller' | 'Sale' | 'Limited' | 'Trending';
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  rating: number;
  reviewCount: number;
  variants: ProductVariant[];
  totalStock: number;
  lowStockThreshold: number;
  status: 'published' | 'draft' | 'archived';
  tags: string[];
  createdAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  variantId: string;
  size: string;
  color: string;
  quantity: number;
  unitPrice: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  streetAddress: string;
  area: string;
  city: string;
  province: string;
  postalCode: string;
  notes?: string;
}

export type OrderStatus = 
  | 'Pending'
  | 'Confirmed'
  | 'Processing'
  | 'Packed'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled'
  | 'Returned';

export type PaymentMethod = 'cod' | 'card' | 'easypaisa' | 'jazzcash' | 'bank_transfer';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface OrderItem {
  productId: string;
  productName: string;
  image: string;
  size: string;
  color: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. DD-2026-001042
  createdAt: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  shippingAddress: ShippingAddress;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  shippingFee: number;
  tax: number;
  grandTotal: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  courier?: string; // TCS, Leopards, Call Courier, Trax
  trackingNumber?: string;
  statusHistory: {
    status: OrderStatus;
    timestamp: string;
    note?: string;
  }[];
  adminNotes?: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number; // e.g. 10 for 10%, or 500 for PKR 500
  minOrderAmount: number;
  maxDiscountAmount?: number;
  active: boolean;
  expiryDate: string;
  usageCount: number;
  description: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userEmail: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
  isVerifiedPurchase: boolean;
  status: 'approved' | 'pending' | 'rejected';
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin' | 'superadmin';
  createdAt: string;
  addresses?: ShippingAddress[];
}

export interface SiteSettings {
  brandName: string;
  tagline: string;
  announcementText: string;
  announcementHighlight: string;
  freeShippingThreshold: number;
  standardShippingFee: number;
  expressShippingFee: number;
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  storeAddress: string;
  currency: string;
  taxRatePercent: number;
  bannerDiscountText: string;
  bannerTitle: string;
  bannerSubtitle: string;
}
