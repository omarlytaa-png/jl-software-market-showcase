import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, isLoading } = useAuth();
  const { toast } = useToast();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const redirect = searchParams.get('redirect') || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await login(email, password);
    
    if (success) {
      toast({
        title: 'Welcome back!',
        description: 'You have successfully logged in.',
      });
      navigate(redirect);
    } else {
      toast({
        title: 'Login failed',
        description: 'Invalid email or password. Try demo accounts below.',
        variant: 'destructive',
      });
    }
  };

  const demoAccounts = [
    { email: 'customer@example.com', role: 'Customer', desc: 'Browse & buy products' },
    { email: 'vendor@techhub.com', role: 'Vendor', desc: 'Manage products & orders' },
    { email: 'admin@jlsoftware.com', role: 'Admin', desc: 'Full platform access' },
  ];

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center py-12 animate-fade-in">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <img 
            src="/jl-software-logo.png" 
            alt="JL Software" 
            className="h-12 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold font-display">Welcome Back</h1>
          <p className="text-muted-foreground mt-1">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full btn-bounce" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>

        {/* Demo Accounts */}
        <div className="bg-muted rounded-lg p-4 mb-6">
          <p className="text-sm font-medium mb-3">Demo Accounts (any password):</p>
          <div className="space-y-2">
            {demoAccounts.map((account) => (
              <button
                key={account.email}
                type="button"
                onClick={() => setEmail(account.email)}
                className="w-full text-left p-2 rounded-lg hover:bg-background transition-colors text-sm"
              >
                <span className="font-medium text-primary">{account.role}:</span>{' '}
                <span className="text-muted-foreground">{account.email}</span>
                <span className="block text-xs text-muted-foreground mt-0.5">{account.desc}</span>
              </button>
            ))}
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary font-medium hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
