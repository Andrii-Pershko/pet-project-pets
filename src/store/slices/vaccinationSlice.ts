import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type VaccinationType = 'complex' | 'rabies' | 'parasites' | 'diseases' | 'other';
export type VaccinationStatus = 'completed' | 'scheduled';

export interface Vaccination {
  id: string;
  petId: string;
  petName: string;
  petType: string;
  type: VaccinationType;
  vaccinationDate: string;
  nextVaccinationDate?: string;
  status: VaccinationStatus;
  notes?: string;
  createdAt: string;
}

interface VaccinationState {
  vaccinations: Vaccination[];
  loading: boolean;
  error: string | null;
}

const initialState: VaccinationState = {
  vaccinations: [],
  loading: false,
  error: null,
};

const vaccinationSlice = createSlice({
  name: 'vaccination',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    addVaccination: (state, action: PayloadAction<Vaccination>) => {
      state.vaccinations.push(action.payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem('vaccinations', JSON.stringify(state.vaccinations));
      }
    },
    updateVaccination: (state, action: PayloadAction<Vaccination>) => {
      const index = state.vaccinations.findIndex(vaccination => vaccination.id === action.payload.id);
      if (index !== -1) {
        state.vaccinations[index] = action.payload;
        if (typeof window !== 'undefined') {
          localStorage.setItem('vaccinations', JSON.stringify(state.vaccinations));
        }
      }
    },
    deleteVaccination: (state, action: PayloadAction<string>) => {
      state.vaccinations = state.vaccinations.filter(vaccination => vaccination.id !== action.payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem('vaccinations', JSON.stringify(state.vaccinations));
      }
    },
    setVaccinations: (state, action: PayloadAction<Vaccination[]>) => {
      state.vaccinations = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('vaccinations', JSON.stringify(state.vaccinations));
      }
    },
    updateVaccinationStatus: (state, action: PayloadAction<{ id: string; status: VaccinationStatus }>) => {
      const vaccination = state.vaccinations.find(v => v.id === action.payload.id);
      if (vaccination) {
        vaccination.status = action.payload.status;
        if (typeof window !== 'undefined') {
          localStorage.setItem('vaccinations', JSON.stringify(state.vaccinations));
        }
      }
    },
  },
});

export const { 
  setLoading, 
  setError, 
  addVaccination, 
  updateVaccination, 
  deleteVaccination, 
  setVaccinations,
  updateVaccinationStatus
} = vaccinationSlice.actions;

export type { VaccinationState, Vaccination, VaccinationType, VaccinationStatus };
export default vaccinationSlice.reducer;
