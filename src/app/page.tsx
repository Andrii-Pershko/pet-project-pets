'use client';

import { useRouter } from 'next/navigation';
import { useAuthInit } from '@/hooks/useAuthInit';
import { Navigation } from '@/components/Navigation';
import { LoginForm } from '@/components/LoginForm';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { PawPrint, Heart, Shield, Users } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { isInitialized, isAuthenticated } = useAuthInit();


  // Показуємо лоадер під час ініціалізації
  if (!isInitialized) {
    return <LoadingSpinner message="Завантаження..." />;
  }

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'add-pet':
        router.push('/pets/add');
        break;
      case 'vet-appointment':
        router.push('/appointments');
        break;
      case 'vaccination':
        router.push('/vaccination');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="container-responsive py-6 sm:py-8 lg:py-12">
        {/* Hero Section */}
        <div className="px-4 py-8 sm:py-12 lg:py-16 xl:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="heading-responsive text-gray-900">
              Ласкаво просимо до{' '}
              <span className="text-blue-600">PET Project</span>
            </h1>
            <p className="mt-4 sm:mt-6 text-responsive-lg leading-8 text-gray-600">
              Ваша надійна система управління домашніми тваринами.
              Відстежуйте здоров'я, плануйте візити до ветеринара та
              зберігайте всю важливу інформацію в одному місці.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">
              Функції
            </h2>
            <p className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
              Все що потрібно для догляду за тваринами
            </p>
          </div>

          <div className="mx-auto mt-12 sm:mt-16 lg:mt-20 max-w-2xl lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-6 gap-y-12 sm:gap-x-8 sm:gap-y-16 lg:max-w-none lg:grid-cols-2">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <PawPrint className="h-5 w-5 flex-none text-blue-600" />
                  Управління тваринами
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Додавайте, редагуйте та видаляйте інформацію про ваших домашніх улюбленців.
                    Зберігайте фотографії, опис та особливості кожної тварини.
                  </p>
                </dd>
              </div>

              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <Heart className="h-5 w-5 flex-none text-blue-600" />
                  Здоров'я та догляд
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Відстежуйте вагу, вік та стан здоров'я ваших тварин.
                    Плануйте регулярні візити до ветеринара та вакцинації.
                  </p>
                </dd>
              </div>

            </dl>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
          <div className="bg-white shadow rounded-lg p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-4 text-center">
              Швидкі дії
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <button
                onClick={() => handleQuickAction('add-pet')}
                className="btn-responsive cursor-pointer flex items-center justify-center border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-blue-50 transition-colors"
              >
                <PawPrint className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Додати тварину</span>
                <span className="sm:hidden">Додати</span>
              </button>
              <button
                onClick={() => handleQuickAction('appointments')}
                className="btn-responsive cursor-pointer flex items-center justify-center border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-blue-50 transition-colors"
              >
                <Heart className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Записати до ветеринара</span>
                <span className="sm:hidden">Ветеринар</span>
              </button>
              <button
                onClick={() => handleQuickAction('vaccination')}
                className="btn-responsive cursor-pointer flex items-center justify-center border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-blue-50 transition-colors"
              >
                <Shield className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Планувати вакцинацію</span>
                <span className="sm:hidden">Вакцинація</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
