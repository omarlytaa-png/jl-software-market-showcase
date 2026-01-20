import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Smartphone, MapPin, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useCart } from '@/contexts/CartContext';
import { useOrders } from '@/contexts/OrderContext';
import { useAuth } from '@/contexts/AuthContext';
import { DeliveryLocation } from '@/types';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { createOrder } = useOrders();
  const { user } = useAuth();
  
  const [deliveryLocation, setDeliveryLocation] = useState<DeliveryLocation>({
    city: '',
    area: '',
    streetLandmark: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'card'>('mpesa');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState<string>('');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!deliveryLocation.city || !deliveryLocation.area || !deliveryLocation.streetLandmark) {
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const order = createOrder(items, deliveryLocation, paymentMethod);
    setOrderId(order.id);
    setOrderComplete(true);
    clearCart();
    setIsProcessing(false);
  };

  if (orderComplete) {
    return (
      <div className="container py-12 animate-fade-in">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-success" />
          </div>
          <h1 className="text-2xl font-bold mb-2 font-display">Order Placed Successfully!</h1>
          <p className="text-muted-foreground mb-6">
            Your order #{orderId} has been placed and is being processed.
          </p>
          <div className="flex flex-col gap-3">
            <Button onClick={() => navigate('/orders')}>
              Track Your Order
            </Button>
            <Button variant="outline" onClick={() => navigate('/products')}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container py-6 animate-fade-in pb-24 md:pb-8">
      <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Cart
      </Button>

      <h1 className="text-2xl md:text-3xl font-bold mb-6 font-display">Checkout</h1>

      {/* Demo Notice */}
      <Alert className="mb-6 border-secondary bg-secondary/10">
        <AlertCircle className="h-4 w-4 text-secondary" />
        <AlertDescription className="text-sm">
          This is a demo payment system. No real payments are processed.
        </AlertDescription>
      </Alert>

      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Delivery & Payment */}
          <div className="md:col-span-2 space-y-6">
            {/* Delivery Location */}
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-primary" />
                <h2 className="font-bold text-lg">Delivery Location</h2>
              </div>

              <div className="grid gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="e.g., Nairobi"
                    value={deliveryLocation.city}
                    onChange={(e) => setDeliveryLocation(prev => ({ ...prev, city: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="area">Area / Estate</Label>
                  <Input
                    id="area"
                    placeholder="e.g., Westlands, Kilimani"
                    value={deliveryLocation.area}
                    onChange={(e) => setDeliveryLocation(prev => ({ ...prev, area: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="street">Street / Landmark</Label>
                  <Input
                    id="street"
                    placeholder="e.g., 123 Main Street, Near Shopping Mall"
                    value={deliveryLocation.streetLandmark}
                    onChange={(e) => setDeliveryLocation(prev => ({ ...prev, streetLandmark: e.target.value }))}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="font-bold text-lg mb-4">Payment Method</h2>

              <RadioGroup
                value={paymentMethod}
                onValueChange={(v) => setPaymentMethod(v as 'mpesa' | 'card')}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="mpesa" id="mpesa" />
                  <Label htmlFor="mpesa" className="flex items-center gap-3 cursor-pointer flex-1">
                    <div className="p-2 bg-success/10 rounded-lg">
                      <Smartphone className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <p className="font-medium">M-Pesa (Demo)</p>
                      <p className="text-sm text-muted-foreground">Pay via mobile money</p>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer flex-1">
                    <div className="p-2 bg-secondary/10 rounded-lg">
                      <CreditCard className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <p className="font-medium">Card Payment (Demo)</p>
                      <p className="text-sm text-muted-foreground">Visa, Mastercard, etc.</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-card rounded-lg border border-border p-6 sticky top-20">
              <h2 className="font-bold text-lg mb-4">Order Summary</h2>

              <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="text-success">Free</span>
                </div>
              </div>

              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-xl">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full btn-bounce"
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Place Order (Demo)'}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
