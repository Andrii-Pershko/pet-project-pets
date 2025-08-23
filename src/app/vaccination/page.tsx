'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthInit } from '@/hooks/useAuthInit';
import { Navigation } from '@/components/Navigation';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ArrowLeft, Calendar, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';

export default function VaccinationPage() {
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
            <h1 className="text-3xl font-bold text-gray-900">Планування вакцинації</h1>
            <p className="mt-2 text-gray-600">
              Відстежуйте та плануйте вакцинацію ваших домашніх улюбленців
            </p>
          </div>

          {/* Vaccination Schedule */}
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Графік вакцинації</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium text-gray-900">Барсік (Кіт)</p>
                    <p className="text-sm text-gray-600">Комплексна вакцинація</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Остання вакцинація</p>
                  <p className="font-medium text-gray-900">15.08.2024</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border border-yellow-200 rounded-lg bg-yellow-50">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="font-medium text-gray-900">Рекс (Собака)</p>
                    <p className="text-sm text-gray-600">Щеплення від сказу</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-yellow-600">Наступна вакцинація</p>
                  <p className="font-medium text-yellow-800">01.09.2024</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="font-medium text-gray-900">Кеша (Птах)</p>
                    <p className="text-sm text-gray-600">Вакцинація від хвороб</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-red-600">Протерміновано</p>
                  <p className="font-medium text-red-800">20.07.2024</p>
                </div>
              </div>
            </div>
          </div>

          {/* Add New Vaccination */}
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Додати нову вакцинацію</h3>
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
                    Тип вакцинації *
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900">
                    <option value="">Оберіть тип вакцинації</option>
                    <option value="complex">Комплексна вакцинація</option>
                    <option value="rabies">Щеплення від сказу</option>
                    <option value="parasites">Від паразитів</option>
                    <option value="diseases">Від хвороб</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Дата вакцинації *
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Наступна вакцинація
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Нотатки
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  placeholder="Додаткові нотатки про вакцинацію..."
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Додати вакцинацію
                </button>
              </div>
            </form>
          </div>

          {/* Vaccination Info */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Інформація про вакцинацію</h3>
            <div className="prose prose-sm text-gray-600">
              <p className="mb-3">
                Регулярна вакцинація - це важливий крок для захисту здоров'я ваших домашніх улюбленців. 
                Вона допомагає запобігти серйозним захворюванням та забезпечує довге та здорове життя.
              </p>
              <p className="mb-3">
                <strong>Рекомендована частота вакцинації:</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Коти: щорічно (комплексна вакцинація)</li>
                <li>Собаки: щорічно (комплексна + від сказу)</li>
                <li>Птахи: кожні 6-12 місяців</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
