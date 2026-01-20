import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Order, OrderStatus, DeliveryLocation, CartItem } from '@/types';
import { generateMockOrders } from '@/data/mockData';
import { useAuth } from './AuthContext';

interface OrderContextType {
  orders: Order[];
  createOrder: (items: CartItem[], deliveryLocation: DeliveryLocation, paymentMethod: 'mpesa' | 'card') => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrdersByVendor: (vendorId: string) => Order[];
  getOrdersByCustomer: (customerId: string) => Order[];
  getAllOrders: () => Order[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

interface OrderProviderProps {
  children: ReactNode;
}

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Load mock orders
    const storedOrders = localStorage.getItem('jl_marketplace_orders');
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    } else {
      const mockOrders = generateMockOrders();
      setOrders(mockOrders);
      localStorage.setItem('jl_marketplace_orders', JSON.stringify(mockOrders));
    }
  }, []);

  const createOrder = (items: CartItem[], deliveryLocation: DeliveryLocation, paymentMethod: 'mpesa' | 'card'): Order => {
    const newOrder: Order = {
      id: `order-${Date.now()}`,
      customerId: user?.id || 'guest',
      customerName: user?.name || 'Guest User',
      customerEmail: user?.email || 'guest@example.com',
      items,
      total: items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
      status: 'pending',
      deliveryLocation,
      paymentMethod,
      vendorId: items[0]?.product.vendorId || 'vendor-1',
      vendorName: items[0]?.product.vendorName || 'Unknown Vendor',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setOrders(current => {
      const updated = [newOrder, ...current];
      localStorage.setItem('jl_marketplace_orders', JSON.stringify(updated));
      return updated;
    });

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(current => {
      const updated = current.map(order =>
        order.id === orderId
          ? { ...order, status, updatedAt: new Date() }
          : order
      );
      localStorage.setItem('jl_marketplace_orders', JSON.stringify(updated));
      return updated;
    });
  };

  const getOrdersByVendor = (vendorId: string) => {
    return orders.filter(order => order.vendorId === vendorId);
  };

  const getOrdersByCustomer = (customerId: string) => {
    return orders.filter(order => order.customerId === customerId);
  };

  const getAllOrders = () => orders;

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        updateOrderStatus,
        getOrdersByVendor,
        getOrdersByCustomer,
        getAllOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
