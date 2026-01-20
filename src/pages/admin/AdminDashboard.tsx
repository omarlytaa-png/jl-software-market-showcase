import React, { useState } from 'react';
import { Users, Store, Package, ShoppingCart, DollarSign, TrendingUp, Search, MoreVertical, Eye, Ban, CheckCircle, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import StatCard from '@/components/dashboard/StatCard';
import OrderCard, { OrderStatusBadge } from '@/components/orders/OrderCard';
import { useOrders } from '@/contexts/OrderContext';
import { mockProducts, mockUsers, categories } from '@/data/mockData';
import { OrderStatus } from '@/types';

const AdminDashboard: React.FC = () => {
  const { orders, updateOrderStatus, getAllOrders } = useOrders();
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'vendors' | 'products' | 'orders' | 'settings'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<OrderStatus | 'all'>('all');

  const allOrders = getAllOrders();
  const allUsers = mockUsers;
  const vendors = allUsers.filter(u => u.role === 'vendor');
  const customers = allUsers.filter(u => u.role === 'customer');

  const stats = {
    totalUsers: allUsers.length,
    totalVendors: vendors.length,
    totalProducts: mockProducts.length,
    totalOrders: allOrders.length,
    totalRevenue: allOrders.reduce((sum, o) => sum + o.total, 0),
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const filteredOrders = allOrders.filter(order => {
    if (orderStatusFilter !== 'all' && order.status !== orderStatusFilter) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return order.id.toLowerCase().includes(query) ||
        order.customerName.toLowerCase().includes(query) ||
        order.customerEmail.toLowerCase().includes(query);
    }
    return true;
  });

  const filteredProducts = mockProducts.filter(product => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return product.name.toLowerCase().includes(query) ||
        product.vendorName.toLowerCase().includes(query);
    }
    return true;
  });

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'users', label: 'Users' },
    { id: 'vendors', label: 'Vendors' },
    { id: 'products', label: 'Products' },
    { id: 'orders', label: 'Orders' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <div className="container py-6 animate-fade-in pb-24 md:pb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-display">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">JL Software Marketplace Control Center</p>
        </div>
      </div>

      {/* Tabs - Scrollable on mobile */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <StatCard title="Total Users" value={stats.totalUsers} icon={Users} />
            <StatCard title="Vendors" value={stats.totalVendors} icon={Store} />
            <StatCard title="Products" value={stats.totalProducts} icon={Package} />
            <StatCard title="Orders" value={stats.totalOrders} icon={ShoppingCart} />
            <StatCard title="Revenue" value={formatPrice(stats.totalRevenue)} icon={DollarSign} className="col-span-2 md:col-span-1" />
          </div>

          {/* Recent Orders */}
          <div>
            <h2 className="font-bold text-lg mb-4">Recent Orders</h2>
            <div className="space-y-4">
              {allOrders.slice(0, 5).map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  showVendorActions
                  onUpdateStatus={updateOrderStatus}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-3">
            {allUsers.map((user) => (
              <div key={user.id} className="flex items-center gap-4 bg-card rounded-lg border border-border p-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{user.name}</p>
                  <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                </div>
                <Badge variant={user.role === 'admin' ? 'destructive' : user.role === 'vendor' ? 'secondary' : 'outline'}>
                  {user.role}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Ban className="h-4 w-4 mr-2" />
                      Disable User
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Vendors Tab */}
      {activeTab === 'vendors' && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">{vendors.length} registered vendors</p>
          
          <div className="space-y-3">
            {vendors.map((vendor) => (
              <div key={vendor.id} className="flex items-center gap-4 bg-card rounded-lg border border-border p-4">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Store className="h-5 w-5 text-secondary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{vendor.name}</p>
                  <p className="text-sm text-muted-foreground truncate">{vendor.email}</p>
                </div>
                <Badge className="bg-success">Active</Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" />
                      View Store
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve Vendor
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Ban className="h-4 w-4 mr-2" />
                      Disable Vendor
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <p className="text-sm text-muted-foreground">{filteredProducts.length} products</p>

          <div className="grid gap-3">
            {filteredProducts.slice(0, 20).map((product) => (
              <div key={product.id} className="flex gap-4 bg-card rounded-lg border border-border p-4">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.vendorName}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-bold text-sm">{formatPrice(product.price)}</span>
                    <Badge variant="outline" className="text-xs">
                      Stock: {product.stock}
                    </Badge>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" />
                      View Product
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Ban className="h-4 w-4 mr-2" />
                      Remove Product
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={orderStatusFilter} onValueChange={(v) => setOrderStatusFilter(v as typeof orderStatusFilter)}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <p className="text-sm text-muted-foreground">{filteredOrders.length} orders</p>

          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                showVendorActions
                onUpdateStatus={updateOrderStatus}
              />
            ))}
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="h-6 w-6 text-primary" />
              <h2 className="font-bold text-lg">Platform Settings</h2>
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              Configure marketplace settings, commission rates, and more.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">Platform Commission</p>
                  <p className="text-sm text-muted-foreground">Commission rate for all sales</p>
                </div>
                <Badge>10%</Badge>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">Vendor Approval</p>
                  <p className="text-sm text-muted-foreground">Require admin approval for new vendors</p>
                </div>
                <Badge variant="outline">Enabled</Badge>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">Demo Mode</p>
                  <p className="text-sm text-muted-foreground">This is a demonstration marketplace</p>
                </div>
                <Badge className="bg-secondary">Active</Badge>
              </div>
            </div>
          </div>

          <div className="bg-secondary/10 rounded-lg p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Demo Marketplace App built by <strong>JL Software</strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
