import React, { useState } from 'react';
import { Package, ShoppingCart, DollarSign, Clock, Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import StatCard from '@/components/dashboard/StatCard';
import OrderCard from '@/components/orders/OrderCard';
import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/contexts/OrderContext';
import { mockProducts, categories } from '@/data/mockData';
import { Product } from '@/types';

const VendorDashboard: React.FC = () => {
  const { user } = useAuth();
  const { orders, updateOrderStatus, getOrdersByVendor } = useOrders();
  
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders'>('overview');
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [vendorProducts, setVendorProducts] = useState<Product[]>(
    mockProducts.filter(p => p.vendorId === 'vendor-1').slice(0, 5)
  );

  const vendorOrders = user ? getOrdersByVendor(user.id) : orders.slice(0, 5);

  const stats = {
    totalProducts: vendorProducts.length,
    totalOrders: vendorOrders.length,
    totalRevenue: vendorOrders.reduce((sum, o) => sum + o.total, 0),
    pendingOrders: vendorOrders.filter(o => o.status === 'pending').length,
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
  });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const product: Product = {
      id: `product-${Date.now()}`,
      name: newProduct.name,
      description: newProduct.description,
      price: Number(newProduct.price),
      images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400'],
      category: newProduct.category,
      vendorId: user?.id || 'vendor-1',
      vendorName: user?.name || 'My Store',
      stock: Number(newProduct.stock),
      rating: 4.5,
      reviewCount: 0,
      createdAt: new Date(),
    };
    setVendorProducts([product, ...vendorProducts]);
    setProductDialogOpen(false);
    setNewProduct({ name: '', description: '', price: '', category: '', stock: '' });
  };

  const handleDeleteProduct = (productId: string) => {
    setVendorProducts(vendorProducts.filter(p => p.id !== productId));
  };

  return (
    <div className="container py-6 animate-fade-in pb-24 md:pb-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold font-display">Vendor Dashboard</h1>
        <p className="text-sm text-muted-foreground hidden md:block">Welcome, {user?.name}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {['overview', 'products', 'orders'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as typeof activeTab)}
            className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
              activeTab === tab
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              title="Total Products"
              value={stats.totalProducts}
              icon={Package}
            />
            <StatCard
              title="Total Orders"
              value={stats.totalOrders}
              icon={ShoppingCart}
            />
            <StatCard
              title="Revenue"
              value={formatPrice(stats.totalRevenue)}
              icon={DollarSign}
            />
            <StatCard
              title="Pending"
              value={stats.pendingOrders}
              icon={Clock}
            />
          </div>

          {/* Recent Orders */}
          <div>
            <h2 className="font-bold text-lg mb-4">Recent Orders</h2>
            {vendorOrders.length > 0 ? (
              <div className="space-y-4">
                {vendorOrders.slice(0, 3).map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    showVendorActions
                    onUpdateStatus={updateOrderStatus}
                  />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">No orders yet</p>
            )}
          </div>
        </div>
      )}

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">{vendorProducts.length} products</p>
            <Dialog open={productDialogOpen} onOpenChange={setProductDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddProduct} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Price (KES)</Label>
                      <Input
                        id="price"
                        type="number"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="stock">Stock</Label>
                      <Input
                        id="stock"
                        type="number"
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={newProduct.category}
                      onValueChange={(v) => setNewProduct({ ...newProduct, category: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.icon} {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full">Add Product</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {vendorProducts.map((product) => (
            <div key={product.id} className="flex gap-4 bg-card rounded-lg border border-border p-4">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{formatPrice(product.price)}</p>
                <p className="text-xs text-muted-foreground mt-1">Stock: {product.stock}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="text-destructive hover:text-destructive"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">{vendorOrders.length} orders</p>
          {vendorOrders.length > 0 ? (
            vendorOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                showVendorActions
                onUpdateStatus={updateOrderStatus}
              />
            ))
          ) : (
            <p className="text-muted-foreground text-center py-8">No orders yet</p>
          )}
        </div>
      )}
    </div>
  );
};

export default VendorDashboard;
