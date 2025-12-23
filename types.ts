
export enum UserRole {
  USER = 'USER',
  VENDOR = 'VENDOR',
  ADMIN = 'ADMIN',
  GUEST = 'GUEST'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  verified?: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  description: string;
  category: string;
  images: string[];
  vendorId: string;
  vendorName: string;
  vendorVerified: boolean;
  rating: number;
  reviewsCount: number;
  stock: number;
  specifications: { [key: string]: string };
}

export interface CartItem extends Product {
  quantity: number;
}

export type OrderStatus = 'PENDING' | 'CONFIRM' | 'PROCESSING' | 'PICKUP' | 'ON_THE_WAY' | 'DELIVERED' | 'CANCELLED';

export interface Order {
  id: string;
  userId: string;
  vendorId: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  customerDetails: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface DashboardStats {
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
  activeVendors?: number;
}
