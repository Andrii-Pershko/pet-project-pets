'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthInit } from '@/hooks/useAuthInit';
import { Navigation } from '@/components/Navigation';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ArrowLeft, Calendar, Clock, MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

export default function AppointmentsPage() {
  const router = useRouter();
  const { isInitialized, isAuthenticated } = useAuthInit();

  // Перенаправляємо неавторизованих користувачів
  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.push('/');
    }
  }, [isInitialized, isAuthenticated, router]);

  // Показуємо лоадер під час ініціалізації
  if (!isInitialized) {
    return <LoadingSpinner message="Завантаження..." />;
  }

  // Якщо користувач не аутентифікований, показуємо лоадер під час перенаправлення
  if (!isAuthenticated) {
    return <LoadingSpinner message="Перенаправлення..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Назад на головну
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Запис до ветеринара</h1>
            <p className="mt-2 text-gray-600">
              Заплануйте візит до ветеринара для ваших домашніх улюбленців
            </p>
          </div>

          {/* Appointment Form */}
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Записатися на прийом</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Оберіть тварину *
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900">
                    <option value="">Оберіть тварину</option>
                    <option value="1">Барсік (Кіт)</option>
                    <option value="2">Рекс (Собака)</option>
                    <option value="3">Кеша (Птах)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Тип прийому *
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900">
                    <option value="">Оберіть тип прийому</option>
                    <option value="consultation">Консультація</option>
                    <option value="vaccination">Вакцинація</option>
                    <option value="treatment">Лікування</option>
                    <option value="checkup">Профілактичний огляд</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Дата прийому *
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Час прийому *
                  </label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Опис проблеми або причини візиту
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  placeholder="Опишіть симптоми або причину візиту..."
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Записатися
                </button>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Контактна інформація</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Адреса клініки</p>
                  <p className="text-sm text-gray-600">Київ, вул. Ветеринарна, 15</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Телефон</p>
                  <p className="text-sm text-gray-600">+380 44 123 45 67</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Email</p>
                  <p className="text-sm text-gray-600">vet@petcare.com</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Години роботи</p>
                  <p className="text-sm text-gray-600">Пн-Пт: 9:00-18:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
