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
import { Search, Filter, Plus, X } from 'lucide-react';
import Link from 'next/link';

export default function PetsPage() {
  const router = useRouter();
  const pets = useAppSelector((state: RootState) => state.pets.pets);
  const { isInitialized, isAuthenticated } = useAuthInit();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<PetType | 'all'>('all');
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    type: 'dog' as PetType,
    breed: '',
    age: 0,
    weight: 0,
    description: ''
  });

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.push('/');
    }
  }, [isInitialized, isAuthenticated, router]);

  if (!isInitialized || !isAuthenticated) {
    return <LoadingSpinner />;
  }

  const handleEditPet = (pet: Pet) => {
    setEditingPet(pet);
    setEditForm({
      name: pet.name,
      type: pet.type,
      breed: pet.breed,
      age: pet.age,
      weight: pet.weight,
      description: pet.description || ''
    });
  };

  const handleSaveEdit = () => {
    if (editingPet) {
      // Тут має бути логіка збереження через Redux
      setEditingPet(null);
      setEditForm({
        name: '',
        type: 'dog',
        breed: '',
        age: 0,
        weight: 0,
        description: ''
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingPet(null);
    setEditForm({
      name: '',
      type: 'dog',
      breed: '',
      age: 0,
      weight: 0,
      description: ''
    });
  };

  const filteredPets = pets.filter((pet) => {
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
      
      <main className="container-responsive py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="heading-responsive text-gray-900 mb-2">Мої тварини</h1>
          <p className="text-responsive text-gray-600">
            Управляйте інформацією про ваших домашніх улюбленців
          </p>
        </div>

        {/* Search and Filter */}
        <div className="grid-responsive gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              placeholder="Пошук за ім&apos;ям або породою..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as PetType | 'all')}
            >
              {petTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Add Pet Button */}
        <div className="mb-8">
          <Link
            href="/pets/add"
            className="btn-responsive inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Додати тварину
          </Link>
        </div>

        {/* Edit Modal */}
        {editingPet && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Редагувати тварину</h3>
                <button
                  onClick={handleCancelEdit}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ім&apos;я
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Тип
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={editForm.type}
                    onChange={(e) => setEditForm({...editForm, type: e.target.value as PetType})}
                  >
                    <option value="dog">Собака</option>
                    <option value="cat">Кіт</option>
                    <option value="bird">Птах</option>
                    <option value="fish">Риба</option>
                    <option value="other">Інше</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Порода
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={editForm.breed}
                    onChange={(e) => setEditForm({...editForm, breed: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Вік
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={editForm.age}
                      onChange={(e) => setEditForm({...editForm, age: parseInt(e.target.value)})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Вага (кг)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={editForm.weight}
                      onChange={(e) => setEditForm({...editForm, weight: parseFloat(e.target.value)})}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Опис
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={editForm.description}
                    onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Скасувати
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Зберегти
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pets Grid */}
        {filteredPets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Тварин не знайдено</p>
            <p className="text-gray-400 mt-2">
              {searchTerm || filterType !== 'all' 
                ? 'Спробуйте змінити пошуковий запит або фільтр'
                : 'Додайте свою першу тварину'
              }
            </p>
          </div>
        ) : (
          <div className="grid-responsive gap-6">
            {filteredPets.map((pet) => (
              <PetCard 
                key={pet.id} 
                pet={pet} 
                onEdit={() => handleEditPet(pet)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
