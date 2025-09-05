import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type PetType = 'dog' | 'cat' | 'bird' | 'fish' | 'other';

interface Pet {
  id: string;
  name: string;
  type: PetType;
  breed: string;
  age: number;
  weight: number;
  ownerId: string;
  imageUrl?: string;
  description?: string;
  createdAt: string;
  favorite?: boolean;
}

interface PetsState {
  pets: Pet[];
  loading: boolean;
  error: string | null;
}

const initialState: PetsState = {
  pets: [],
  loading: false,
  error: null,
};

const petsSlice = createSlice({
  name: 'pets',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    addPet: (state, action: PayloadAction<Pet>) => {
      state.pets.push(action.payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem('pets', JSON.stringify(state.pets));
      }
    },
    updatePet: (state, action: PayloadAction<Pet>) => {
      const index = state.pets.findIndex(pet => pet.id === action.payload.id);
      if (index !== -1) {
        state.pets[index] = action.payload;
        if (typeof window !== 'undefined') {
          localStorage.setItem('pets', JSON.stringify(state.pets));
        }
      }
    },
    deletePet: (state, action: PayloadAction<string>) => {
      state.pets = state.pets.filter(pet => pet.id !== action.payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem('pets', JSON.stringify(state.pets));
      }
    },
    setPets: (state, action: PayloadAction<Pet[]>) => {
      state.pets = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('pets', JSON.stringify(state.pets));
      }
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const pet = state.pets.find(pet => pet.id === action.payload);
      if (pet) {
        pet.favorite = !pet.favorite;
        if (typeof window !== 'undefined') {
          localStorage.setItem('pets', JSON.stringify(state.pets));
        }
      }
    },
  },
});

export const { setLoading, setError, addPet, updatePet, deletePet, setPets, toggleFavorite } = petsSlice.actions;
export type { PetsState, Pet, PetType };
export default petsSlice.reducer;
