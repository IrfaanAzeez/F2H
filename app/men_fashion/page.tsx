'use client';

import Header from '../components/Header';
import Pagination from '../components/Pagination';
import Filter from '../components/Filter';
import { BsHeart, BsHeartFill, BsStar, BsStarFill } from 'react-icons/bs';
import { useState } from 'react';
import { useWishlist } from '../context/WishlistContext';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  color: string;
  type: string;
  seller: string;
}

const ProductCard = ({ product }: { product: Product }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={() => isInWishlist(product.id) ? removeFromWishlist(product.id) : addToWishlist(product)}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
        >
          {isInWishlist(product.id) ? (
            <BsHeartFill className="w-5 h-5 text-red-500" />
          ) : (
            <BsHeart className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{product.description}</p>
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < product.rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-900">${product.price}</span>
          <button className="px-3 py-1 text-sm bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default function MenFashion() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState({
    colors: [] as string[],
    priceRange: { min: 0, max: 1000 },
    types: [] as string[],
    rating: 0,
    sellers: [] as string[],
  });

  // Sample product data
  const products: Product[] = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    description: 'This is a sample product description.',
    price: Math.floor(Math.random() * 100) + 10,
    rating: Math.floor(Math.random() * 5) + 1,
    reviews: Math.floor(Math.random() * 100),
    image: `https://picsum.photos/seed/${i + 1}/400/300`,
    color: ['Red', 'Blue', 'Green', 'Black'][Math.floor(Math.random() * 4)],
    type: ['T-Shirt', 'Jeans', 'Jacket', 'Shoes'][Math.floor(Math.random() * 4)],
    seller: ['Seller A', 'Seller B', 'Seller C'][Math.floor(Math.random() * 3)],
  }));

  // Filter products based on active filters
  const filteredProducts = products.filter(product => {
    if (activeFilters.colors.length > 0 && !activeFilters.colors.includes(product.color)) {
      return false;
    }
    if (product.price < activeFilters.priceRange.min || product.price > activeFilters.priceRange.max) {
      return false;
    }
    if (activeFilters.types.length > 0 && !activeFilters.types.includes(product.type)) {
      return false;
    }
    if (product.rating < activeFilters.rating) {
      return false;
    }
    if (activeFilters.sellers.length > 0 && !activeFilters.sellers.includes(product.seller)) {
      return false;
    }
    return true;
  });

  const productsPerPage = 20;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Men's Fashion</h1>
        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <Filter
              activeFilters={activeFilters}
              onFilterChange={setActiveFilters}
            />
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 