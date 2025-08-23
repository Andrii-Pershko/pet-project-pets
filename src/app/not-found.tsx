'use client';

import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Home, Search, AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-4xl mx-auto py-12 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0 text-center">
          {/* 404 Icon */}
          <div className="mx-auto h-24 w-24 flex items-center justify-center rounded-full bg-red-100 mb-8">
            <AlertTriangle className="h-12 w-12 text-red-600" />
          </div>

          {/* 404 Text */}
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Сторінку не знайдено
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Вибачте, сторінка, яку ви шукаєте, не існує або була переміщена. 
            Перевірте правильність URL або поверніться на головну сторінку.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              <Home className="h-5 w-5 mr-2" />
              На головну
            </Link>
            
            <Link
              href="/pets"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <Search className="h-5 w-5 mr-2" />
              Переглянути тварин
            </Link>
          </div>

          {/* Helpful Links */}
          <div className="mt-12">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Популярні сторінки
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <Link
                href="/pets"
                className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="text-blue-600 mb-2">
                  <svg className="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-900">Мої тварини</p>
              </Link>
              
              <Link
                href="/pets/add"
                className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="text-green-600 mb-2">
                  <svg className="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-900">Додати тварину</p>
              </Link>
              
              <Link
                href="/profile"
                className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="text-purple-600 mb-2">
                  <svg className="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-900">Профіль</p>
              </Link>
              
              <Link
                href="/appointments"
                className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="text-orange-600 mb-2">
                  <svg className="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-900">Записи</p>
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-12 p-6 bg-white rounded-lg shadow-sm max-w-md mx-auto">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Потрібна допомога?
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Якщо ви вважаєте, що це помилка, зверніться до служби підтримки
            </p>
            <div className="text-sm text-gray-500">
              <p>Email: support@petcare.com</p>
              <p>Телефон: +380 44 123 45 67</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
