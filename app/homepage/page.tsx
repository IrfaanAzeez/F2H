'use client';

import Link from 'next/link';
import Header from '../components/Header';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to F2H</h1>
          <p className="text-lg text-gray-600">
            Discover the latest trends in fashion for Men, Women, and Kids
          </p>
        </div>

        {/* Featured Categories */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link href="/men_fashion" className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Men's Fashion</h2>
            <p className="text-gray-600">Explore our collection for men</p>
          </Link>
          <Link href="/women_fashion" className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Women's Fashion</h2>
            <p className="text-gray-600">Discover trending styles for women</p>
          </Link>
          <Link href="/kids_fashion" className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Kids' Fashion</h2>
            <p className="text-gray-600">Shop the best for your little ones</p>
          </Link>
        </div>
      </main>
    </div>
  );
} 