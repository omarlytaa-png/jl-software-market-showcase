import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, HeadphonesIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { categories, mockProducts } from '@/data/mockData';
import ProductCard from '@/components/products/ProductCard';
import CategoryCard from '@/components/products/CategoryCard';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const featuredProducts = mockProducts.slice(0, 8);
  const topRatedProducts = [...mockProducts].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="gradient-hero text-white py-12 md:py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center md:text-left md:mx-0">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 font-display">
              Your Multi-Vendor
              <span className="text-gradient-primary block">Marketplace Demo</span>
            </h1>
            <p className="text-base md:text-lg text-white/80 mb-6 md:mb-8">
              Discover thousands of products from trusted vendors. Fast delivery, secure payments, and amazing deals.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Button 
                size="lg" 
                className="btn-bounce"
                onClick={() => navigate('/products')}
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                onClick={() => navigate('/register')}
              >
                Become a Vendor
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-8 bg-card border-b border-border">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Truck, title: 'Fast Delivery', desc: 'Nationwide shipping' },
              { icon: Shield, title: 'Secure Payment', desc: 'M-Pesa & Card' },
              { icon: Star, title: 'Top Quality', desc: 'Verified vendors' },
              { icon: HeadphonesIcon, title: '24/7 Support', desc: 'Always here to help' },
            ].map((feature) => (
              <div key={feature.title} className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-3 text-center md:text-left">
                <div className="p-2 rounded-lg bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">{feature.title}</p>
                  <p className="text-xs text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 md:py-12">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold font-display">Shop by Category</h2>
            <Link to="/categories" className="text-sm text-primary font-medium flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-8 md:py-12 bg-muted/50">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold font-display">Featured Products</h2>
            <Link to="/products" className="text-sm text-primary font-medium flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Rated */}
      <section className="py-8 md:py-12">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold font-display">Top Rated</h2>
            <Link to="/products?sort=rating" className="text-sm text-primary font-medium flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {topRatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-12 md:py-16 gradient-primary">
        <div className="container">
          <div className="text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 font-display">Ready to Start Selling?</h2>
            <p className="text-white/80 mb-6 max-w-md mx-auto">
              Join our marketplace and reach thousands of customers. Easy setup, powerful tools, zero hassle.
            </p>
            <Button 
              size="lg" 
              variant="secondary" 
              className="btn-bounce"
              onClick={() => navigate('/register')}
            >
              Register as Vendor
            </Button>
          </div>
        </div>
      </section>

      {/* Demo Notice */}
      <section className="py-6 bg-secondary/10 border-t border-border">
        <div className="container">
          <p className="text-center text-sm text-muted-foreground">
            <strong>Demo Notice:</strong> This is a demonstration marketplace. No real payments are processed and all data is mock.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
