import React from 'react';
import { categories } from '@/data/mockData';
import CategoryCard from '@/components/products/CategoryCard';

const CategoriesPage: React.FC = () => {
  return (
    <div className="container py-6 animate-fade-in pb-24 md:pb-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 font-display">Shop by Category</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {categories.map((category) => (
          <CategoryCard 
            key={category.id} 
            category={category}
            className="aspect-square flex flex-col items-center justify-center"
          />
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
