import React from 'react';
import { Order, OrderStatus } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OrderStatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status, className }) => {
  const config = {
    pending: { label: 'Pending', className: 'status-pending' },
    confirmed: { label: 'Confirmed', className: 'status-confirmed' },
    shipped: { label: 'Shipped', className: 'status-shipped' },
    delivered: { label: 'Delivered', className: 'status-delivered' },
  };

  const { label, className: statusClass } = config[status];

  return (
    <Badge variant="outline" className={cn(statusClass, className)}>
      {label}
    </Badge>
  );
};

interface OrderTimelineProps {
  status: OrderStatus;
}

export const OrderTimeline: React.FC<OrderTimelineProps> = ({ status }) => {
  const steps = [
    { key: 'pending', label: 'Pending', icon: Clock },
    { key: 'confirmed', label: 'Confirmed', icon: Package },
    { key: 'shipped', label: 'Shipped', icon: Truck },
    { key: 'delivered', label: 'Delivered', icon: CheckCircle },
  ];

  const currentIndex = steps.findIndex(s => s.key === status);

  return (
    <div className="flex items-center justify-between w-full py-4">
      {steps.map((step, index) => {
        const isComplete = index <= currentIndex;
        const isCurrent = index === currentIndex;
        const Icon = step.icon;

        return (
          <div key={step.key} className="flex flex-col items-center flex-1 relative">
            {/* Connector Line */}
            {index > 0 && (
              <div 
                className={cn(
                  "absolute top-5 right-1/2 w-full h-0.5 -translate-y-1/2",
                  index <= currentIndex ? "bg-primary" : "bg-border"
                )}
              />
            )}

            {/* Icon */}
            <div
              className={cn(
                "relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all",
                isComplete ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                isCurrent && "ring-4 ring-primary/20"
              )}
            >
              <Icon className="h-5 w-5" />
            </div>

            {/* Label */}
            <span className={cn(
              "text-xs mt-2 text-center",
              isComplete ? "text-foreground font-medium" : "text-muted-foreground"
            )}>
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

interface OrderCardProps {
  order: Order;
  showVendorActions?: boolean;
  onUpdateStatus?: (orderId: string, status: OrderStatus) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, showVendorActions, onUpdateStatus }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-KE', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(date));
  };

  const nextStatus: Record<OrderStatus, OrderStatus | null> = {
    pending: 'confirmed',
    confirmed: 'shipped',
    shipped: 'delivered',
    delivered: null,
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
        <div>
          <p className="text-sm text-muted-foreground">Order #{order.id}</p>
          <p className="text-xs text-muted-foreground">{formatDate(order.createdAt)}</p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      {/* Timeline */}
      <OrderTimeline status={order.status} />

      {/* Items */}
      <div className="space-y-3 my-4">
        {order.items.map((item) => (
          <div key={item.product.id} className="flex items-center gap-3">
            <img
              src={item.product.images[0]}
              alt={item.product.name}
              className="w-12 h-12 rounded object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{item.product.name}</p>
              <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
            </div>
            <p className="text-sm font-medium">{formatPrice(item.product.price * item.quantity)}</p>
          </div>
        ))}
      </div>

      {/* Delivery Location */}
      <div className="border-t border-border pt-4 mt-4">
        <p className="text-sm font-medium mb-1">Delivery Location</p>
        <p className="text-sm text-muted-foreground">
          {order.deliveryLocation.streetLandmark}, {order.deliveryLocation.area}, {order.deliveryLocation.city}
        </p>
      </div>

      {/* Total */}
      <div className="flex items-center justify-between border-t border-border pt-4 mt-4">
        <span className="font-medium">Total</span>
        <span className="font-bold text-lg">{formatPrice(order.total)}</span>
      </div>

      {/* Vendor Actions */}
      {showVendorActions && nextStatus[order.status] && onUpdateStatus && (
        <button
          onClick={() => onUpdateStatus(order.id, nextStatus[order.status]!)}
          className="w-full mt-4 py-2 px-4 bg-primary text-primary-foreground rounded-lg font-medium btn-bounce"
        >
          Mark as {nextStatus[order.status]}
        </button>
      )}
    </div>
  );
};

export default OrderCard;
