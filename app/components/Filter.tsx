'use client';

import { useState } from 'react';

interface FilterProps {
  activeFilters: {
    colors: string[];
    priceRange: { min: number; max: number };
    types: string[];
    rating: number;
    sellers: string[];
  };
  onFilterChange: (filters: any) => void;
}

export default function Filter({ activeFilters, onFilterChange }: FilterProps) {
  const [priceRange, setPriceRange] = useState(activeFilters.priceRange);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    setPriceRange(prev => ({ ...prev, max: newValue }));
    onFilterChange({ ...activeFilters, priceRange: { ...priceRange, max: newValue } });
  };

  const handleColorChange = (color: string) => {
    const newColors = activeFilters.colors.includes(color)
      ? activeFilters.colors.filter(c => c !== color)
      : [...activeFilters.colors, color];
    onFilterChange({ ...activeFilters, colors: newColors });
  };

  const handleTypeChange = (type: string) => {
    const newTypes = activeFilters.types.includes(type)
      ? activeFilters.types.filter(t => t !== type)
      : [...activeFilters.types, type];
    onFilterChange({ ...activeFilters, types: newTypes });
  };

  const handleRatingChange = (rating: number) => {
    onFilterChange({ ...activeFilters, rating });
  };

  const handleSellerChange = (seller: string) => {
    const newSellers = activeFilters.sellers.includes(seller)
      ? activeFilters.sellers.filter(s => s !== seller)
      : [...activeFilters.sellers, seller];
    onFilterChange({ ...activeFilters, sellers: newSellers });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      
      {/* Price Range */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Price Range</h3>
        <input
          type="range"
          min="0"
          max="1000"
          value={priceRange.max}
          onChange={handlePriceChange}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>${priceRange.min}</span>
          <span>${priceRange.max}</span>
        </div>
      </div>

      {/* Colors */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Colors</h3>
        <div className="space-y-2">
          {['Red', 'Blue', 'Green', 'Black'].map(color => (
            <label key={color} className="flex items-center">
              <input
                type="checkbox"
                checked={activeFilters.colors.includes(color)}
                onChange={() => handleColorChange(color)}
                className="rounded text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-700">{color}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Product Types */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Product Types</h3>
        <div className="space-y-2">
          {['T-Shirt', 'Jeans', 'Jacket', 'Shoes'].map(type => (
            <label key={type} className="flex items-center">
              <input
                type="checkbox"
                checked={activeFilters.types.includes(type)}
                onChange={() => handleTypeChange(type)}
                className="rounded text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Minimum Rating</h3>
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5].map(rating => (
            <button
              key={rating}
              onClick={() => handleRatingChange(rating)}
              className={`p-1 rounded ${
                activeFilters.rating === rating
                  ? 'bg-primary-100 text-primary-600'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      {/* Sellers */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Sellers</h3>
        <div className="space-y-2">
          {['Seller A', 'Seller B', 'Seller C'].map(seller => (
            <label key={seller} className="flex items-center">
              <input
                type="checkbox"
                checked={activeFilters.sellers.includes(seller)}
                onChange={() => handleSellerChange(seller)}
                className="rounded text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-700">{seller}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
} 