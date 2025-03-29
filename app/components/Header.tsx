'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { BsCart3, BsHeart, BsPerson } from 'react-icons/bs';
import { useState, useRef, useEffect } from 'react';
import { useWishlist } from '../context/WishlistContext';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { wishlist } = useWishlist();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Clear login state
    localStorage.removeItem('isLoggedIn');
    // Clear wishlist
    localStorage.removeItem('wishlist');
    // Redirect to login page
    router.push('/login_page');
  };

  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/homepage" className="text-2xl font-bold text-primary-600">
                F2H
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/men_fashion"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/men_fashion')
                    ? 'border-primary-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Men's Fashion
              </Link>
              <Link
                href="/women_fashion"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/women_fashion')
                    ? 'border-primary-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Women's Fashion
              </Link>
              <Link
                href="/kids_fashion"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/kids_fashion')
                    ? 'border-primary-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Kids' Fashion
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/wishlist"
              className="relative p-2 text-gray-500 hover:text-gray-700"
            >
              <BsHeart className="w-6 h-6" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <BsCart3 className="w-6 h-6" />
            </button>
            <div className="relative" ref={dropdownRef}>
              <button 
                className="p-2 text-gray-500 hover:text-gray-700"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <BsPerson className="w-6 h-6" />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                  <button
                    onClick={() => router.push('/account')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Account
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
} 