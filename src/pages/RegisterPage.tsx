import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, User, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { UserRole } from '@/types';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();
  const { toast } = useToast();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('customer');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await register(email, password, name, role);
    
    if (success) {
      toast({
        title: 'Account created!',
        description: `Welcome to JL Software Marketplace as a ${role}.`,
      });
      
      if (role === 'vendor') {
        navigate('/vendor');
      } else {
        navigate('/');
      }
    } else {
      toast({
        title: 'Registration failed',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center py-12 animate-fade-in">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <img 
            src="/jl-software-logo.png" 
            alt="JL Software" 
            className="h-12 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold font-display">Create Account</h1>
          <p className="text-muted-foreground mt-1">Join the marketplace today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
                minLength={6}
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

          {/* Role Selection */}
          <div>
            <Label className="mb-3 block">I want to</Label>
            <RadioGroup
              value={role}
              onValueChange={(v) => setRole(v as UserRole)}
              className="grid grid-cols-2 gap-3"
            >
              <div className="relative">
                <RadioGroupItem
                  value="customer"
                  id="customer"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="customer"
                  className="flex flex-col items-center gap-2 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                >
                  <User className="h-6 w-6 text-primary" />
                  <span className="font-medium">Shop Products</span>
                  <span className="text-xs text-muted-foreground">Customer Account</span>
                </Label>
              </div>

              <div className="relative">
                <RadioGroupItem
                  value="vendor"
                  id="vendor"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="vendor"
                  className="flex flex-col items-center gap-2 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                >
                  <Store className="h-6 w-6 text-secondary" />
                  <span className="font-medium">Sell Products</span>
                  <span className="text-xs text-muted-foreground">Vendor Account</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Button type="submit" className="w-full btn-bounce" disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Create Account'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
