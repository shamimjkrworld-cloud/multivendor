
import { MOCK_PRODUCTS } from '../constants';
import { Product, Order, User, UserRole } from '../types';

const STORAGE_KEYS = {
  ORDERS: 'tracketo_orders',
  USERS: 'tracketo_users',
  PRODUCTS: 'tracketo_products',
  AUTH: 'tracketo_auth_session'
};

const getFromStorage = <T,>(key: string, defaultValue: T[] = []): T[] => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};

const saveToStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Initialize products if not exists
if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
  saveToStorage(STORAGE_KEYS.PRODUCTS, MOCK_PRODUCTS);
}

export const mockApi = {
  getProducts: async (): Promise<Product[]> => {
    await new Promise(r => setTimeout(r, 300));
    return getFromStorage<Product>(STORAGE_KEYS.PRODUCTS, MOCK_PRODUCTS);
  },

  getProductById: async (id: string): Promise<Product | undefined> => {
    const products = await mockApi.getProducts();
    return products.find(p => p.id === id);
  },

  getVendorProducts: async (vendorId: string): Promise<Product[]> => {
    const products = await mockApi.getProducts();
    return products.filter(p => p.vendorId === vendorId);
  },

  addProduct: async (product: Omit<Product, 'id' | 'rating' | 'reviewsCount'>): Promise<Product> => {
    const products = await mockApi.getProducts();
    const newProduct: Product = {
      ...product,
      id: `p-${Math.random().toString(36).substr(2, 9)}`,
      rating: 0,
      reviewsCount: 0
    };
    const updated = [newProduct, ...products];
    saveToStorage(STORAGE_KEYS.PRODUCTS, updated);
    return newProduct;
  },

  deleteProduct: async (id: string): Promise<void> => {
    const products = await mockApi.getProducts();
    const filtered = products.filter(p => p.id !== id);
    saveToStorage(STORAGE_KEYS.PRODUCTS, filtered);
  },

  createOrder: async (order: Omit<Order, 'id' | 'createdAt' | 'status'>): Promise<Order> => {
    await new Promise(r => setTimeout(r, 1000));
    const orders = getFromStorage<Order>(STORAGE_KEYS.ORDERS);
    const newOrder: Order = {
      ...order,
      id: `ORD-${Math.floor(Math.random() * 1000000)}`,
      createdAt: new Date().toISOString(),
      status: 'PENDING'
    };
    saveToStorage(STORAGE_KEYS.ORDERS, [...orders, newOrder]);
    return newOrder;
  },

  getOrders: async (role: UserRole, id: string): Promise<Order[]> => {
    await new Promise(r => setTimeout(r, 400));
    const orders = getFromStorage<Order>(STORAGE_KEYS.ORDERS);
    if (role === UserRole.ADMIN) return orders;
    if (role === UserRole.VENDOR) {
      // In a real app, orders would be split by vendor. 
      // For this mock, we'll return orders where at least one item is from this vendor.
      return orders.filter(o => o.items.some(item => item.vendorId === id));
    }
    return orders.filter(o => o.userId === id);
  },

  updateOrderStatus: async (orderId: string, status: Order['status']): Promise<void> => {
    const orders = getFromStorage<Order>(STORAGE_KEYS.ORDERS);
    const updated = orders.map(o => o.id === orderId ? { ...o, status } : o);
    saveToStorage(STORAGE_KEYS.ORDERS, updated);
  }
};
