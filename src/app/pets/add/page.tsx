'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/hooks';
import { useAuthInit } from '@/hooks/useAuthInit';
import { addPet } from '@/store/slices/petsSlice';
import { Navigation } from '@/components/Navigation';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Pet, PetType } from '@/store/slices/petsSlice';
import { ArrowLeft, Save, Camera } from 'lucide-react';
import Link from 'next/link';

export default function AddPetPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isInitialized, isAuthenticated } = useAuthInit();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    type: 'dog' as PetType,
    breed: '',
    age: '',
    weight: '',
    description: '',
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Симуляція збереження
    setTimeout(() => {
      const newPet: Pet = {
        id: Date.now().toString(),
        name: formData.name,
        type: formData.type,
        breed: formData.breed,
        age: parseInt(formData.age),
        weight: parseFloat(formData.weight),
        ownerId: '1',
        description: formData.description,
        createdAt: new Date().toISOString(),
      };

      dispatch(addPet(newPet));
      router.push('/pets');
    }, 1000);
  };

  const petTypes = [
    { value: 'dog', label: 'Собака' },
    { value: 'cat', label: 'Кіт' },
    { value: 'bird', label: 'Птах' },
    { value: 'fish', label: 'Риба' },
    { value: 'other', label: 'Інша тварина' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/pets"
              className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Назад до списку
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Додати нову тварину</h1>
            <p className="mt-2 text-gray-600">
              Заповніть інформацію про вашу домашню тварину
            </p>
          </div>

          {/* Form */}
          <div className="bg-white shadow rounded-lg">
            <form onSubmit={handleSubmit} className="p-6 space-y-6">

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Ім'я тварини *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    placeholder="Введіть ім'я"
                  />
                </div>

                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                    Тип тварини *
                  </label>
                  <select
                    id="type"
                    name="type"
                    required
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  >
                    {petTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="breed" className="block text-sm font-medium text-gray-700 mb-2">
                    Порода *
                  </label>
                  <input
                    type="text"
                    id="breed"
                    name="breed"
                    required
                    value={formData.breed}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    placeholder="Введіть породу"
                  />
                </div>

                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                    Вік (років) *
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    required
                    min="0"
                    max="30"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
                    Вага (кг) *
                  </label>
                  <input
                    type="number"
                    id="weight"
                    name="weight"
                    required
                    min="0"
                    step="0.1"
                    value={formData.weight}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    placeholder="0.0"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Опис
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  placeholder="Опишіть особливості вашої тварини..."
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <Link
                  href="/pets"
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Скасувати
                </Link>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Зберегти тварину
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
