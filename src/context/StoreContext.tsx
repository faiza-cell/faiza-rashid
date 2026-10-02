import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Order,
  Coupon,
  Review,
  User,
  SiteSettings,
  ShippingAddress,
  PaymentMethod,
  OrderStatus,
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_COUPONS,
  INITIAL_REVIEWS,
  INITIAL_ORDERS,
  INITIAL_SETTINGS,
} from '../data/mockData';

export type AppView =
  | 'home'
  | 'shop'
  | 'product'
  | 'cart'
  | 'checkout'
  | 'track'
  | 'wishlist'
  | 'account'
  | 'about'
  | 'contact'
  | 'size-guide'
  | 'shipping-policy'
  | 'return-exchange'
  | 'faq'
  | 'privacy-policy'
  | 'terms-conditions'
  | 'admin';

export interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}

interface StoreContextType {
  products: Product[];
  categories: typeof INITIAL_CATEGORIES;
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  reviews: Review[];
  user: User | null;
  settings: SiteSettings;
  activeView: AppView;
  selectedProductId: string | null;
  selectedCategory: string | null;
  searchQuery: string;
  isCartOpen: boolean;
  isSearchOpen: boolean;
  isAuthOpen: boolean;
  isSizeGuideOpen: boolean;
  quickViewProduct: Product | null;
  toasts: ToastMessage[];

  // Navigation
  navigateTo: (view: AppView, params?: { productId?: string; category?: string; query?: string }) => void;

  // Cart operations
  addToCart: (product: Product, size?: string, color?: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartSubtotal: () => number;
  getCartDiscount: () => number;
  getCartShipping: () => number;
  getCartTotal: () => number;

  // Wishlist
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Coupon
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Checkout & Orders
  createOrder: (orderData: {
    customer: { name: string; email: string; phone: string };
    shippingAddress: ShippingAddress;
    paymentMethod: PaymentMethod;
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, trackingNumber?: string, courier?: string, note?: string) => void;
  cancelOrder: (orderId: string, reason: string) => void;

  // Reviews
  addReview: (reviewData: Omit<Review, 'id' | 'createdAt' | 'status'>) => void;
  updateReviewStatus: (reviewId: string, status: 'approved' | 'rejected') => void;

  // Auth
  login: (email: string, role?: 'customer' | 'admin') => void;
  logout: () => void;
  register: (name: string, email: string, phone: string) => void;

  // Admin Management
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  adjustStock: (productId: string, variantId: string, adjustment: number) => void;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  addCoupon: (coupon: Omit<Coupon, 'id' | 'usageCount'>) => void;
  toggleCouponActive: (couponId: string) => void;

  // UI state toggles
  setIsCartOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
  setIsAuthOpen: (open: boolean) => void;
  setIsSizeGuideOpen: (open: boolean) => void;
  setQuickViewProduct: (product: Product | null) => void;
  setSearchQuery: (query: string) => void;
  showToast: (title: string, message?: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial products from localStorage if present
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('desi_drip_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [categories] = useState(INITIAL_CATEGORIES);

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('desi_drip_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('desi_drip_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('desi_drip_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    try {
      const saved = localStorage.getItem('desi_drip_coupons');
      return saved ? JSON.parse(saved) : INITIAL_COUPONS;
    } catch {
      return INITIAL_COUPONS;
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('desi_drip_reviews');
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem('desi_drip_settings');
      return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('desi_drip_user');
      return saved ? JSON.parse(saved) : {
        id: 'user-demo-admin',
        name: 'Desi Drip Team',
        email: 'faizybear64@gmail.com',
        phone: '0300-1234567',
        role: 'admin',
        createdAt: '2026-01-01',
      };
    } catch {
      return null;
    }
  });

  // UI state
  const [activeView, setActiveView] = useState<AppView>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('desi_drip_products', JSON.stringify(products));
    } catch (e) {
      console.warn('Could not save products to localStorage', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('desi_drip_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Could not save cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('desi_drip_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Could not save wishlist to localStorage', e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('desi_drip_orders', JSON.stringify(orders));
    } catch (e) {
      console.warn('Could not save orders to localStorage', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('desi_drip_coupons', JSON.stringify(coupons));
    } catch (e) {
      console.warn('Could not save coupons to localStorage', e);
    }
  }, [coupons]);

  useEffect(() => {
    try {
      localStorage.setItem('desi_drip_reviews', JSON.stringify(reviews));
    } catch (e) {
      console.warn('Could not save reviews to localStorage', e);
    }
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem('desi_drip_settings', JSON.stringify(settings));
    } catch (e) {
      console.warn('Could not save settings to localStorage', e);
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem('desi_drip_user', JSON.stringify(user));
    } catch (e) {
      console.warn('Could not save user to localStorage', e);
    }
  }, [user]);

  // Toast Helper
  const showToast = (title: string, message?: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Navigation Helper
  const navigateTo = (view: AppView, params?: { productId?: string; category?: string; query?: string }) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveView(view);
    if (params?.productId) setSelectedProductId(params.productId);
    if (params?.category) setSelectedCategory(params.category);
    if (params?.query !== undefined) setSearchQuery(params.query);
  };

  // Cart Functions
  const addToCart = (product: Product, size?: string, color?: string, quantity: number = 1) => {
    const chosenVariant = product.variants.find((v) => !size || v.size === size) || product.variants[0];
    const chosenSize = size || chosenVariant?.size || 'M';
    const chosenColor = color || chosenVariant?.color || 'Standard';
    const effectivePrice = product.salePrice ?? product.price;

    const cartItemId = `${product.id}-${chosenSize}-${chosenColor}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            id: cartItemId,
            productId: product.id,
            product,
            variantId: chosenVariant?.id || 'v-default',
            size: chosenSize,
            color: chosenColor,
            quantity,
            unitPrice: effectivePrice,
          },
        ];
      }
    });

    showToast('Added to Cart', `${product.name} (${chosenSize}) added to your bag`, 'success');
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item Removed', 'Product removed from your shopping bag', 'info');
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  };

  const getCartDiscount = () => {
    const subtotal = getCartSubtotal();
    if (!appliedCoupon) return 0;
    if (subtotal < appliedCoupon.minOrderAmount) return 0;

    if (appliedCoupon.discountType === 'percentage') {
      const disc = Math.round((subtotal * appliedCoupon.discountValue) / 100);
      if (appliedCoupon.maxDiscountAmount) {
        return Math.min(disc, appliedCoupon.maxDiscountAmount);
      }
      return disc;
    } else {
      return appliedCoupon.discountValue;
    }
  };

  const getCartShipping = () => {
    const subtotal = getCartSubtotal();
    if (subtotal === 0) return 0;
    if (subtotal >= settings.freeShippingThreshold) return 0;
    return settings.standardShippingFee;
  };

  const getCartTotal = () => {
    const subtotal = getCartSubtotal();
    const discount = getCartDiscount();
    const shipping = getCartShipping();
    return Math.max(0, subtotal - discount + shipping);
  };

  // Wishlist Functions
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const product = products.find((p) => p.id === productId);
      const name = product?.name || 'Item';
      if (exists) {
        showToast('Removed from Wishlist', `${name} removed from your saved items`, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to Wishlist', `${name} added to your wishlist`, 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Coupon Logic
  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const coupon = coupons.find((c) => c.code.toUpperCase() === cleanCode && c.active);

    if (!coupon) {
      return { success: false, message: 'Invalid or expired promo code.' };
    }

    const subtotal = getCartSubtotal();
    if (subtotal < coupon.minOrderAmount) {
      return {
        success: false,
        message: `This coupon requires a minimum cart value of PKR ${coupon.minOrderAmount.toLocaleString()}.`,
      };
    }

    setAppliedCoupon(coupon);
    showToast('Coupon Applied!', `${coupon.code} gave you a discount.`, 'success');
    return { success: true, message: `Promo code applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon Removed', 'Promo code removed from cart', 'info');
  };

  // Order Operations
  const createOrder = ({
    customer,
    shippingAddress,
    paymentMethod,
  }: {
    customer: { name: string; email: string; phone: string };
    shippingAddress: ShippingAddress;
    paymentMethod: PaymentMethod;
  }) => {
    const subtotal = getCartSubtotal();
    const discount = getCartDiscount();
    const shippingFee = getCartShipping();
    const grandTotal = getCartTotal();

    const orderNumber = `DD-2026-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      customer,
      shippingAddress,
      items: cart.map((item) => ({
        productId: item.productId,
        productName: item.product.name,
        image: item.product.images[0],
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.unitPrice * item.quantity,
      })),
      subtotal,
      discount,
      couponCode: appliedCoupon?.code,
      shippingFee,
      tax: 0,
      grandTotal,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      orderStatus: 'Confirmed',
      courier: 'TCS Express',
      trackingNumber: `TCS-${Math.floor(10000000 + Math.random() * 90000000)}`,
      statusHistory: [
        {
          status: 'Confirmed',
          timestamp: new Date().toISOString(),
          note: `Order received and confirmed via ${paymentMethod.toUpperCase()}`,
        },
      ],
    };

    // Deduct stock safely
    setProducts((prevProducts) =>
      prevProducts.map((prod) => {
        const cartItemForProduct = cart.filter((ci) => ci.productId === prod.id);
        if (cartItemForProduct.length === 0) return prod;

        let newTotalStock = prod.totalStock;
        const updatedVariants = prod.variants.map((variant) => {
          const matchedCartItem = cartItemForProduct.find((ci) => ci.size === variant.size);
          if (matchedCartItem) {
            const deduction = matchedCartItem.quantity;
            newTotalStock = Math.max(0, newTotalStock - deduction);
            return {
              ...variant,
              stock: Math.max(0, variant.stock - deduction),
            };
          }
          return variant;
        });

        return {
          ...prod,
          totalStock: newTotalStock,
          variants: updatedVariants,
        };
      })
    );

    // Save order
    setOrders((prev) => [newOrder, ...prev]);

    // Clear cart & coupon
    setCart([]);
    setAppliedCoupon(null);

    showToast('Order Placed Successfully!', `Your order ${orderNumber} has been received.`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (
    orderId: string,
    status: OrderStatus,
    trackingNumber?: string,
    courier?: string,
    note?: string
  ) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;
        const newHistory = [
          ...order.statusHistory,
          {
            status,
            timestamp: new Date().toISOString(),
            note: note || `Status updated to ${status}`,
          },
        ];
        return {
          ...order,
          orderStatus: status,
          trackingNumber: trackingNumber || order.trackingNumber,
          courier: courier || order.courier,
          statusHistory: newHistory,
        };
      })
    );
    showToast('Order Updated', `Order status changed to ${status}`, 'info');
  };

  const cancelOrder = (orderId: string, reason: string) => {
    updateOrderStatus(orderId, 'Cancelled', undefined, undefined, `Cancelled: ${reason}`);
  };

  // Review Operations
  const addReview = (reviewData: Omit<Review, 'id' | 'createdAt' | 'status'>) => {
    const newRev: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'approved', // Auto-publish for smooth UX, admin can moderate
    };
    setReviews((prev) => [newRev, ...prev]);
    showToast('Review Submitted', 'Thank you for reviewing this product!', 'success');
  };

  const updateReviewStatus = (reviewId: string, status: 'approved' | 'rejected') => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, status } : r))
    );
    showToast('Review Updated', `Review marked as ${status}`, 'info');
  };

  // Auth
  const login = (email: string, role: 'customer' | 'admin' = 'customer') => {
    const loggedUser: User = {
      id: `usr-${Date.now()}`,
      name: role === 'admin' ? 'Desi Drip Administrator' : email.split('@')[0],
      email,
      role,
      createdAt: new Date().toISOString(),
    };
    setUser(loggedUser);
    setIsAuthOpen(false);
    showToast('Logged In', `Welcome back, ${loggedUser.name}!`, 'success');
  };

  const logout = () => {
    setUser(null);
    showToast('Signed Out', 'You have been logged out.', 'info');
  };

  const register = (name: string, email: string, phone: string) => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      phone,
      role: 'customer',
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    setIsAuthOpen(false);
    showToast('Account Created!', `Welcome to DESI DRIP, ${name}!`, 'success');
  };

  // Admin Product Management
  const addProduct = (productData: Omit<Product, 'id' | 'createdAt'>) => {
    const id = `prod-${Date.now()}`;
    const slug = productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newProd: Product = {
      ...productData,
      id,
      slug,
      createdAt: new Date().toISOString(),
    };
    setProducts((prev) => [newProd, ...prev]);
    showToast('Product Added', `${newProd.name} is now listed.`, 'success');
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast('Product Updated', `${updated.name} changes saved.`, 'success');
  };

  const deleteProduct = (productId: string) => {
    const prod = products.find((p) => p.id === productId);
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Product Removed', `${prod?.name || 'Product'} has been deleted.`, 'info');
  };

  const adjustStock = (productId: string, variantId: string, adjustment: number) => {
    setProducts((prev) =>
      prev.map((prod) => {
        if (prod.id !== productId) return prod;
        let newTotal = prod.totalStock + adjustment;
        const newVariants = prod.variants.map((v) => {
          if (v.id === variantId) {
            return { ...v, stock: Math.max(0, v.stock + adjustment) };
          }
          return v;
        });
        return {
          ...prod,
          totalStock: Math.max(0, newTotal),
          variants: newVariants,
        };
      })
    );
    showToast('Stock Adjusted', 'Inventory levels updated successfully.', 'success');
  };

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Settings Updated', 'Store configuration saved.', 'success');
  };

  const addCoupon = (couponData: Omit<Coupon, 'id' | 'usageCount'>) => {
    const newCoupon: Coupon = {
      ...couponData,
      id: `c-${Date.now()}`,
      usageCount: 0,
    };
    setCoupons((prev) => [newCoupon, ...prev]);
    showToast('Coupon Created', `Code ${newCoupon.code} is now active.`, 'success');
  };

  const toggleCouponActive = (couponId: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === couponId ? { ...c, active: !c.active } : c))
    );
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        cart,
        wishlist,
        orders,
        coupons,
        appliedCoupon,
        reviews,
        user,
        settings,
        activeView,
        selectedProductId,
        selectedCategory,
        searchQuery,
        isCartOpen,
        isSearchOpen,
        isAuthOpen,
        isSizeGuideOpen,
        quickViewProduct,
        toasts,
        navigateTo,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        getCartSubtotal,
        getCartDiscount,
        getCartShipping,
        getCartTotal,
        toggleWishlist,
        isInWishlist,
        applyCoupon,
        removeCoupon,
        createOrder,
        updateOrderStatus,
        cancelOrder,
        addReview,
        updateReviewStatus,
        login,
        logout,
        register,
        addProduct,
        updateProduct,
        deleteProduct,
        adjustStock,
        updateSettings,
        addCoupon,
        toggleCouponActive,
        setIsCartOpen,
        setIsSearchOpen,
        setIsAuthOpen,
        setIsSizeGuideOpen,
        setQuickViewProduct,
        setSearchQuery,
        showToast,
        removeToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
