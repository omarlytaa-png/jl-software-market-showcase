import { Product, Category, User, Order } from '@/types';

export const categories: Category[] = [
  { id: 'electronics', name: 'Electronics', icon: '📱', productCount: 24 },
  { id: 'phones', name: 'Phones', icon: '📞', productCount: 18 },
  { id: 'fashion', name: 'Fashion', icon: '👗', productCount: 42 },
  { id: 'home-kitchen', name: 'Home & Kitchen', icon: '🏠', productCount: 35 },
  { id: 'beauty', name: 'Beauty', icon: '💄', productCount: 28 },
  { id: 'computing', name: 'Computing', icon: '💻', productCount: 21 },
];

const productImages = {
  electronics: [
    'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
  ],
  phones: [
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
    'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400',
    'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400',
  ],
  fashion: [
    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400',
  ],
  'home-kitchen': [
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
    'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400',
  ],
  beauty: [
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400',
    'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400',
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400',
  ],
  computing: [
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
    'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400',
  ],
};

const productNames = {
  electronics: ['Wireless Earbuds Pro', 'Smart Watch Ultra', 'Bluetooth Speaker', 'Power Bank 20000mAh', 'LED Desk Lamp'],
  phones: ['Galaxy S24 Ultra', 'iPhone 15 Pro Max', 'Pixel 8 Pro', 'OnePlus 12', 'Xiaomi 14'],
  fashion: ['Designer Handbag', 'Men\'s Leather Jacket', 'Summer Dress', 'Running Shoes', 'Wool Sweater'],
  'home-kitchen': ['Air Fryer Pro', 'Coffee Maker Deluxe', 'Blender Set', 'Non-Stick Pan Set', 'Smart Thermos'],
  beauty: ['Skincare Set', 'Makeup Palette Pro', 'Hair Dryer', 'Perfume Collection', 'Face Serum'],
  computing: ['MacBook Air M3', 'Gaming Laptop', 'Mechanical Keyboard', 'Wireless Mouse', '4K Monitor'],
};

const vendors = [
  { id: 'vendor-1', name: 'TechHub Store' },
  { id: 'vendor-2', name: 'Fashion Forward' },
  { id: 'vendor-3', name: 'Home Essentials' },
  { id: 'vendor-4', name: 'Beauty Palace' },
  { id: 'vendor-5', name: 'Digital Dreams' },
];

export const generateProducts = (): Product[] => {
  const products: Product[] = [];
  let id = 1;

  categories.forEach((category) => {
    const names = productNames[category.id as keyof typeof productNames] || productNames.electronics;
    const images = productImages[category.id as keyof typeof productImages] || productImages.electronics;

    names.forEach((name, index) => {
      const vendor = vendors[Math.floor(Math.random() * vendors.length)];
      const basePrice = Math.floor(Math.random() * 50000) + 1000;
      const hasDiscount = Math.random() > 0.5;
      const discount = hasDiscount ? Math.floor(Math.random() * 30) + 5 : 0;

      products.push({
        id: `product-${id}`,
        name,
        description: `High-quality ${name.toLowerCase()} from ${vendor.name}. Premium materials and exceptional craftsmanship. Perfect for everyday use with modern design aesthetics.`,
        price: hasDiscount ? Math.floor(basePrice * (1 - discount / 100)) : basePrice,
        originalPrice: hasDiscount ? basePrice : undefined,
        discount: hasDiscount ? discount : undefined,
        images: [images[index % images.length]],
        category: category.id,
        vendorId: vendor.id,
        vendorName: vendor.name,
        stock: Math.floor(Math.random() * 100) + 1,
        rating: Number((Math.random() * 2 + 3).toFixed(1)),
        reviewCount: Math.floor(Math.random() * 500) + 10,
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      });
      id++;
    });
  });

  return products;
};

export const mockProducts = generateProducts();

export const mockUsers: User[] = [
  {
    id: 'admin-1',
    email: 'admin@jlsoftware.com',
    name: 'JL Admin',
    role: 'admin',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: 'vendor-1',
    email: 'vendor@techhub.com',
    name: 'TechHub Store',
    role: 'vendor',
    createdAt: new Date('2024-02-15'),
  },
  {
    id: 'vendor-2',
    email: 'vendor@fashion.com',
    name: 'Fashion Forward',
    role: 'vendor',
    createdAt: new Date('2024-03-10'),
  },
  {
    id: 'customer-1',
    email: 'customer@example.com',
    name: 'John Doe',
    role: 'customer',
    createdAt: new Date('2024-04-01'),
  },
];

export const generateMockOrders = (userId?: string): Order[] => {
  const statuses: Order['status'][] = ['pending', 'confirmed', 'shipped', 'delivered'];
  const orders: Order[] = [];

  for (let i = 1; i <= 10; i++) {
    const randomProducts = mockProducts.slice(0, Math.floor(Math.random() * 3) + 1);
    const vendor = vendors[Math.floor(Math.random() * vendors.length)];
    
    orders.push({
      id: `order-${i}`,
      customerId: userId || 'customer-1',
      customerName: 'John Doe',
      customerEmail: 'customer@example.com',
      items: randomProducts.map(p => ({ product: p, quantity: Math.floor(Math.random() * 3) + 1 })),
      total: randomProducts.reduce((sum, p) => sum + p.price, 0),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      deliveryLocation: {
        city: 'Nairobi',
        area: 'Westlands',
        streetLandmark: '123 Main Street, Near Shopping Mall',
      },
      paymentMethod: Math.random() > 0.5 ? 'mpesa' : 'card',
      vendorId: vendor.id,
      vendorName: vendor.name,
      createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
    });
  }

  return orders;
};
