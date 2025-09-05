'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { RootState } from '@/store/types';
import { login } from '@/store/slices/userSlice';
import { setPets } from '@/store/slices/petsSlice';

export function useAuthInit() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state: RootState) => state.user.isAuthenticated);
  const pets = useAppSelector((state: RootState) => state.pets.pets);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Ініціалізуємо користувача
      const savedUser = localStorage.getItem('user');
      if (savedUser && !isAuthenticated) {
        try {
          const user = JSON.parse(savedUser);
          dispatch(login(user));
        } catch (error) {
          localStorage.removeItem('user');
        }
      }

      // Ініціалізуємо тварин
      const savedPets = localStorage.getItem('pets');
      if (savedPets && pets.length === 0) {
        try {
          const petsData = JSON.parse(savedPets);
          if (petsData.length > 0) {
            dispatch(setPets(petsData));
          }
        } catch (error) {
          localStorage.removeItem('pets');
        }
      } else if (pets.length === 0 && isAuthenticated) {
        // Якщо користувач залогінений, але немає тварин, додаємо дефолтні
        const mockPets = [
          {
            id: '1',
            name: 'Барсік',
            type: 'cat' as const,
            breed: 'Британська короткошерста',
            age: 3,
            weight: 4.5,
            ownerId: '1',
            imageUrl: '/api/placeholder/300/200',
            description: 'Спокійний та ласкавий кіт',
            createdAt: new Date().toISOString(),
            favorite: false,
          },
          {
            id: '2',
            name: 'Рекс',
            type: 'dog' as const,
            breed: 'Німецька вівчарка',
            age: 2,
            weight: 28,
            ownerId: '1',
            imageUrl: '/api/placeholder/300/200',
            description: 'Активний та розумний пес',
            createdAt: new Date().toISOString(),
            favorite: true,
          },
          {
            id: '3',
            name: 'Кеша',
            type: 'bird' as const,
            breed: 'Папуга',
            age: 1,
            weight: 0.3,
            ownerId: '1',
            imageUrl: '/api/placeholder/300/200',
            description: 'Говорливий папуга',
            createdAt: new Date().toISOString(),
            favorite: false,
          },
        ];
        dispatch(setPets(mockPets));
      }

      // Позначаємо як ініціалізовано
      setIsInitialized(true);
    }
  }, [dispatch, isAuthenticated, pets.length]);

  return { isInitialized, isAuthenticated };
}
