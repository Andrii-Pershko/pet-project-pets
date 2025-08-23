'use client';

import { Pet } from '@/store/slices/petsSlice';
import { Edit, Trash2, Heart, Calendar, Weight } from 'lucide-react';
import Link from 'next/link';
import { useAppDispatch } from '@/store/hooks';
import { deletePet } from '@/store/slices/petsSlice';

interface PetCardProps {
  pet: Pet;
}

export function PetCard({ pet }: PetCardProps) {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    if (confirm('Ви впевнені, що хочете видалити цю тварину?')) {
      console.log('Видаляю тварину:', pet.id);
      dispatch(deletePet(pet.id));
      console.log('Тварину видалено з Redux store');
    }
  };

  const getPetTypeIcon = (type: string) => {
    switch (type) {
      case 'dog':
        return '🐕';
      case 'cat':
        return '🐱';
      case 'bird':
        return '🐦';
      case 'fish':
        return '🐠';
      default:
        return '🐾';
    }
  };

  const getPetTypeLabel = (type: string) => {
    switch (type) {
      case 'dog':
        return 'Собака';
      case 'cat':
        return 'Кіт';
      case 'bird':
        return 'Птах';
      case 'fish':
        return 'Риба';
      default:
        return 'Тварина';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Pet Image */}
      <div className="h-32 sm:h-40 lg:h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
        <div className="text-4xl sm:text-5xl lg:text-6xl">{getPetTypeIcon(pet.type)}</div>
      </div>

      {/* Pet Info */}
      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">{pet.name}</h3>
            <p className="text-sm text-gray-600">{pet.breed}</p>
          </div>
          <span className="inline-flex items-center px-2 py-0.5 sm:px-2.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {getPetTypeLabel(pet.type)}
          </span>
        </div>

        {/* Pet Details */}
        <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
            <span>{pet.age} {pet.age === 1 ? 'рік' : pet.age < 5 ? 'роки' : 'років'}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Weight className="h-4 w-4 mr-2 text-gray-400" />
            <span>{pet.weight} кг</span>
          </div>
          {pet.description && (
            <p className="text-sm text-gray-600 line-clamp-2">{pet.description}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/pets/${pet.id}/edit`}
              className="w-full inline-flex items-center justify-center px-2 py-2 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <Edit className="h-3 w-3 mr-1" />
              <span className="hidden sm:inline">Редагувати</span>
              <span className="sm:hidden">Змінити</span>
            </Link>
            <button 
              onClick={handleDelete}
              className="w-full inline-flex items-center justify-center px-2 py-2 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
              <Trash2 className="h-3 w-3 mr-1" />
              <span className="hidden sm:inline">Видалити</span>
              <span className="sm:hidden">Видалити</span>
            </button>
          </div>
          
          <button className="w-full inline-flex items-center justify-center p-2 border border-transparent rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors">
            <Heart className="h-4 w-4 mr-2" />
            <span className="text-xs font-medium">Улюблена</span>
          </button>
        </div>
      </div>
    </div>
  );
}
