'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store/types';
import { useAuthInit } from '@/hooks/useAuthInit';
import { Navigation } from '@/components/Navigation';
import { PetCard } from '@/components/PetCard';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Pet, PetType } from '@/store/slices/petsSlice';
import { Search, Filter, Plus } from 'lucide-react';
import Link from 'next/link';

export default function PetsPage() {
  const router = useRouter();
  const pets = useAppSelector((state: RootState) => state.pets.pets);
  const { isInitialized, isAuthenticated } = useAuthInit();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<PetType | 'all'>('all');

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

  const filteredPets = pets.filter((pet: Pet) => {
    const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || pet.type === filterType;
    return matchesSearch && matchesType;
  });

  const petTypes = [
    { value: 'all', label: 'Всі тварини' },
    { value: 'dog', label: 'Собаки' },
    { value: 'cat', label: 'Коти' },
    { value: 'bird', label: 'Птахи' },
    { value: 'fish', label: 'Риби' },
    { value: 'other', label: 'Інші' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="container-responsive py-6 sm:py-8">
        <div className="px-4 sm:px-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
            <div>
              <h1 className="heading-responsive text-gray-900">Мої тварини</h1>
              <p className="mt-2 text-responsive text-gray-600">
                Управляйте інформацією про ваших домашніх улюбленців
              </p>
            </div>
            <Link
              href="/pets/add"
              className="mt-4 sm:mt-0 inline-flex items-center btn-responsive border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors w-fit sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Додати тварину</span>
              <span className="sm:hidden">Додати</span>
            </Link>
          </div>

          {/* Search and Filter */}
          <div className="bg-white shadow rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Пошук за ім&apos;ям або породою..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full input-responsive !pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as PetType | 'all')}
                  className="!pl-10 w-full input-responsive border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                >
                  {petTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Pets Grid */}
          {filteredPets.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto h-12 w-12 text-gray-400">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Тварин не знайдено</h3>
              <p className="mt-1 text-sm text-gray-500">
                Спробуйте змінити параметри пошуку або додати нову тварину.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredPets.map((pet: Pet) => (
                <PetCard key={pet.id} pet={pet} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
