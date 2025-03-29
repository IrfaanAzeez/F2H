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

// Product Card Component
function ProductCard({ product }: { product: Product }) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Product Image with Wishlist */}
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <button 
          onClick={() => isInWishlist(product.id) ? removeFromWishlist(product.id) : addToWishlist(product)}
          className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
        >
          {isInWishlist(product.id) ? (
            <BsHeartFill className="w-5 h-5 text-red-500" />
          ) : (
            <BsHeart className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{product.description}</p>
        
        {/* Rating */}
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, index) => (
            index < product.rating ? (
              <BsStarFill key={index} className="w-4 h-4 text-yellow-400" />
            ) : (
              <BsStar key={index} className="w-4 h-4 text-gray-300" />
            )
          ))}
          <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">${product.price}</span>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default function WomenFashion() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState({
    colors: [] as string[],
    priceRange: { min: 0, max: 1000 },
    productTypes: [] as string[],
    rating: 0,
    seller: ''
  });
  const productsPerPage = 20;

  // Sample product data - 100 products
  const allProducts = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`,
    description: "Elegant and stylish design",
    price: Math.floor(Math.random() * 100) + 20,
    rating: Math.floor(Math.random() * 2) + 4, // Random rating between 4-5
    reviews: Math.floor(Math.random() * 200) + 100, // Random reviews between 100-300
    image: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000)}?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80`,
    color: ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Pink', 'Gray', 'Brown'][Math.floor(Math.random() * 10)],
    type: ['T-Shirts', 'Jeans', 'Dresses', 'Shoes', 'Accessories', 'Outerwear', 'Activewear', 'Formal'][Math.floor(Math.random() * 8)],
    seller: ['Top Rated', 'New Arrivals', 'Best Deals'][Math.floor(Math.random() * 3)]
  }));

  // Apply filters
  const filteredProducts = allProducts.filter(product => {
    // Color filter
    if (activeFilters.colors.length > 0 && !activeFilters.colors.includes(product.color)) {
      return false;
    }

    // Price filter
    if (product.price < activeFilters.priceRange.min || product.price > activeFilters.priceRange.max) {
      return false;
    }

    // Product type filter
    if (activeFilters.productTypes.length > 0 && !activeFilters.productTypes.includes(product.type)) {
      return false;
    }

    // Rating filter
    if (activeFilters.rating > 0 && product.rating < activeFilters.rating) {
      return false;
    }

    // Seller filter
    if (activeFilters.seller && activeFilters.seller !== 'All Sellers' && product.seller !== activeFilters.seller) {
      return false;
    }

    return true;
  });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handleFilterChange = (filters: any) => {
    setActiveFilters(filters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Women's Fashion</h1>
        </div>

        {/* Main Content with Filter */}
        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <div className="hidden md:block">
            <Filter 
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange} 
            />
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </main>
    </div>
  );
} 