'use client';

import Header from '../components/Header';
import { BsHeart, BsHeartFill, BsStar, BsStarFill } from 'react-icons/bs';
import { useWishlist } from '../context/WishlistContext';

// Product Card Component
function ProductCard({ product }: { product: any }) {
  const { removeFromWishlist, isInWishlist } = useWishlist();

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
          onClick={() => removeFromWishlist(product.id)}
          className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
        >
          <BsHeartFill className="w-5 h-5 text-red-500" />
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

export default function Wishlist() {
  const { wishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">My Wishlist</h1>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-12">
            <BsHeart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600">Add items to your wishlist to see them here</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
} 