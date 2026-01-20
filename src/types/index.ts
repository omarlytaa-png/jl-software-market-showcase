export type UserRole = 'customer' | 'vendor' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  category: string;
  vendorId: string;
  vendorName: string;
  stock: number;
  rating: number;
  reviewCount: number;
  createdAt: Date;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface DeliveryLocation {
  city: string;
  area: string;
  streetLandmark: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered';

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  deliveryLocation: DeliveryLocation;
  paymentMethod: 'mpesa' | 'card';
  vendorId: string;
  vendorName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface VendorStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
}

export interface AdminStats {
  totalUsers: number;
  totalVendors: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  productCount: number;
}
