import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Calendar, LogOut, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-KE', {
      dateStyle: 'long',
    }).format(new Date(date));
  };

  const getRoleBadge = () => {
    switch (user.role) {
      case 'admin':
        return <Badge className="bg-destructive">Admin</Badge>;
      case 'vendor':
        return <Badge className="bg-secondary">Vendor</Badge>;
      default:
        return <Badge variant="outline">Customer</Badge>;
    }
  };

  return (
    <div className="container py-6 animate-fade-in pb-24 md:pb-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 font-display">My Profile</h1>

      <div className="max-w-md mx-auto">
        {/* Profile Card */}
        <div className="bg-card rounded-lg border border-border p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h2 className="font-bold text-xl">{user.name}</h2>
              {getRoleBadge()}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Role</p>
                <p className="font-medium capitalize">{user.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Member Since</p>
                <p className="font-medium">{formatDate(user.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-card rounded-lg border border-border p-6 mb-6">
          <h3 className="font-bold mb-4">Quick Links</h3>
          <div className="space-y-2">
            {user.role === 'customer' && (
              <>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/orders')}>
                  My Orders
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/cart')}>
                  My Cart
                </Button>
              </>
            )}
            {user.role === 'vendor' && (
              <>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/vendor')}>
                  Vendor Dashboard
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/vendor/products')}>
                  My Products
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/vendor/orders')}>
                  Manage Orders
                </Button>
              </>
            )}
            {user.role === 'admin' && (
              <>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/admin')}>
                  Admin Dashboard
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/admin/users')}>
                  Manage Users
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/admin/vendors')}>
                  Manage Vendors
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Logout */}
        <Button 
          variant="destructive" 
          className="w-full" 
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;
