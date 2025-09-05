'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { RootState } from '@/store/types';
import { logout } from '@/store/slices/userSlice';
import { Home, PawPrint, User, LogOut, Plus, Menu, X } from 'lucide-react';

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state: RootState) => state.user.isAuthenticated);
  const user = useAppSelector((state: RootState) => state.user.user);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);



  const handleLogout = () => {
    dispatch(logout());

    // Додаємо невелику затримку для оновлення стану
    setTimeout(() => {
      router.push('/');
    }, 100);
  };

  const navItems = [
    { href: '/', label: 'Головна', icon: Home },
    { href: '/pets', label: 'Мої тварини', icon: PawPrint },
    { href: '/profile', label: 'Профіль', icon: User },
  ];

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="container-responsive">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="cursor-pointer flex-shrink-0 flex items-center" onClick={() => router.push('/')}>
              <PawPrint className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-lg sm:text-xl font-bold text-gray-900">
                PET Project
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-4" style={{ display: 'none' }}>
            <style jsx>{`
              @media (min-width: 1100px) {
                div {
                  display: flex !important;
                }
              }
            `}</style>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Link>
              );
            })}

            <Link
              href="/pets/add"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Додати тварину
            </Link>

            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-700">
                Привіт, {user?.name}!
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Вийти
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center" style={{ display: 'none' }}>
            <style jsx>{`
              @media (max-width: 1099px) {
                div {
                  display: flex !important;
                }
              }
            `}</style>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="border-t border-gray-200 py-4" style={{ display: 'block' }}>
            <style jsx>{`
              @media (min-width: 1100px) {
                div {
                  display: none !important;
                }
              }
            `}</style>
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </Link>
                );
              })}

              <Link
                href="/pets/add"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md text-base font-medium hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-5 w-5 mr-3" />
                Додати тварину
              </Link>

              <div className="pt-4 border-t border-gray-200">
                <div className="px-3 py-2 text-sm text-gray-700">
                  Привіт, {user?.name}!
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Вийти
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
