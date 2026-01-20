import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '@/types';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  category: Category;
  className?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, className }) => {
  return (
    <Link
      to={`/products?category=${category.id}`}
      className={cn(
        "flex flex-col items-center justify-center p-4 bg-card rounded-lg border border-border card-hover text-center",
        className
      )}
    >
      <span className="text-3xl md:text-4xl mb-2">{category.icon}</span>
      <h3 className="font-medium text-sm md:text-base">{category.name}</h3>
      <p className="text-xs text-muted-foreground mt-1">{category.productCount} items</p>
    </Link>
  );
};

export default CategoryCard;
