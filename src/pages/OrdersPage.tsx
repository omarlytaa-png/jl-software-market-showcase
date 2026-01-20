import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/contexts/OrderContext';
import OrderCard from '@/components/orders/OrderCard';
import { Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const OrdersPage: React.FC = () => {
  const { user } = useAuth();
  const { getOrdersByCustomer } = useOrders();
  
  const orders = user ? getOrdersByCustomer(user.id) : [];

  if (orders.length === 0) {
    return (
      <div className="container py-12 animate-fade-in">
        <div className="max-w-md mx-auto text-center">
          <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2 font-display">No Orders Yet</h1>
          <p className="text-muted-foreground mb-6">
            Start shopping to see your orders here
          </p>
          <Button asChild>
            <Link to="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-6 animate-fade-in pb-24 md:pb-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 font-display">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
