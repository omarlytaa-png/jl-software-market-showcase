import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingCart, User, Package, Store, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

const MobileNavigation: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { totalItems } = useCart();

  const getNavItems = () => {
    const baseItems = [
      { to: '/', icon: Home, label: 'Home' },
      { to: '/products', icon: Search, label: 'Browse' },
    ];

    if (!user) {
      return [
        ...baseItems,
        { to: '/cart', icon: ShoppingCart, label: 'Cart', badge: totalItems },
        { to: '/login', icon: User, label: 'Login' },
      ];
    }

    if (user.role === 'customer') {
      return [
        ...baseItems,
        { to: '/cart', icon: ShoppingCart, label: 'Cart', badge: totalItems },
        { to: '/orders', icon: Package, label: 'Orders' },
        { to: '/profile', icon: User, label: 'Profile' },
      ];
    }

    if (user.role === 'vendor') {
      return [
        { to: '/vendor', icon: Store, label: 'Dashboard' },
        { to: '/vendor/products', icon: Package, label: 'Products' },
        { to: '/vendor/orders', icon: ShoppingCart, label: 'Orders' },
        { to: '/profile', icon: User, label: 'Profile' },
      ];
    }

    if (user.role === 'admin') {
      return [
        { to: '/admin', icon: Home, label: 'Dashboard' },
        { to: '/admin/users', icon: User, label: 'Users' },
        { to: '/admin/vendors', icon: Store, label: 'Vendors' },
        { to: '/admin/orders', icon: Package, label: 'Orders' },
        { to: '/admin/settings', icon: Settings, label: 'Settings' },
      ];
    }

    return baseItems;
  };

  const navItems = getNavItems();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border safe-bottom md:hidden">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to || 
            (item.to !== '/' && location.pathname.startsWith(item.to));
          const badge = 'badge' in item ? item.badge : undefined;
          
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                'mobile-nav-item relative flex-1',
                isActive && 'active'
              )}
            >
              <div className="relative">
                <item.icon className="h-5 w-5" />
                {badge !== undefined && badge > 0 && (
                  <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                    {badge > 9 ? '9+' : badge}
                  </span>
                )}
              </div>
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNavigation;
