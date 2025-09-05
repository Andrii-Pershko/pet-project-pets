'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthInit } from '@/hooks/useAuthInit';
import { Navigation } from '@/components/Navigation';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ArrowLeft, AlertTriangle, CheckCircle, Clock, Trash2, Plus } from 'lucide-react';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { RootState } from '@/store/types';
import { Vaccination, VaccinationType, VaccinationStatus, addVaccination, deleteVaccination, setVaccinations, updateVaccinationStatus } from '@/store/slices/vaccinationSlice';
import { Pet } from '@/store/slices/petsSlice';

export default function VaccinationPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isInitialized, isAuthenticated } = useAuthInit();
  const pets = useAppSelector((state: RootState) => state.pets.pets);
  const vaccinations = useAppSelector((state: RootState) => state.vaccination.vaccinations);

  const [formData, setFormData] = useState({
    petId: '',
    type: '' as VaccinationType,
    vaccinationDate: '',
    nextVaccinationDate: '',
    status: 'scheduled' as VaccinationStatus,
    notes: ''
  });
  const [showAddForm, setShowAddForm] = useState(false);

  // Перенаправляємо неавторизованих користувачів
  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.push('/');
    }
  }, [isInitialized, isAuthenticated, router]);

  // Завантажуємо вакцинації з localStorage
  useEffect(() => {
    if (isInitialized && isAuthenticated && vaccinations.length === 0) {
      const savedVaccinations = localStorage.getItem('vaccinations');
      if (savedVaccinations) {
        try {
          const vaccinationsData = JSON.parse(savedVaccinations);
          dispatch(setVaccinations(vaccinationsData));
        } catch (error) {
          localStorage.removeItem('vaccinations');
        }
      }
    }
  }, [isInitialized, isAuthenticated, vaccinations.length, dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData(prev => {
      const newFormData = {
        ...prev,
        [name]: value
      };

      // Автоматично заповнюємо наступну дату вакцинації при зміні типу або дати
      if ((name === 'type' || name === 'vaccinationDate') &&
        newFormData.type &&
        newFormData.vaccinationDate) {
        newFormData.nextVaccinationDate = getNextVaccinationDate(
          newFormData.type as VaccinationType,
          newFormData.vaccinationDate
        );
      }

      return newFormData;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.petId || !formData.type || !formData.vaccinationDate) {
      alert('Будь ласка, заповніть обов\'язкові поля');
      return;
    }

    const selectedPet = pets.find(pet => pet.id === formData.petId);
    if (!selectedPet) {
      alert('Тварина не знайдена');
      return;
    }

    // Автоматично розраховуємо наступну дату вакцинації, якщо не вказано вручну
    const nextVaccinationDate = formData.nextVaccinationDate ||
      getNextVaccinationDate(formData.type, formData.vaccinationDate);

    const newVaccination: Vaccination = {
      id: Date.now().toString(),
      petId: formData.petId,
      petName: selectedPet.name,
      petType: selectedPet.type,
      type: formData.type,
      vaccinationDate: formData.vaccinationDate,
      nextVaccinationDate: nextVaccinationDate,
      status: formData.status,
      notes: formData.notes || undefined,
      createdAt: new Date().toISOString()
    };

    dispatch(addVaccination(newVaccination));

    // Скидаємо форму
    setFormData({
      petId: '',
      type: '' as VaccinationType,
      vaccinationDate: '',
      nextVaccinationDate: '',
      status: 'scheduled' as VaccinationStatus,
      notes: ''
    });
    setShowAddForm(false);
  };

  const handleDeleteVaccination = (vaccinationId: string) => {
    if (confirm('Ви впевнені, що хочете видалити цю вакцинацію?')) {
      dispatch(deleteVaccination(vaccinationId));
    }
  };

  const handleStatusChange = (vaccinationId: string, newStatus: VaccinationStatus) => {
    dispatch(updateVaccinationStatus({ id: vaccinationId, status: newStatus }));
  };

  const getVaccinationTypeLabel = (type: VaccinationType) => {
    switch (type) {
      case 'complex':
        return 'Комплексна вакцинація';
      case 'rabies':
        return 'Щеплення від сказу';
      case 'parasites':
        return 'Від паразитів';
      case 'diseases':
        return 'Від хвороб';
      case 'other':
        return 'Інше';
      default:
        return 'Невідомо';
    }
  };

  const getNextVaccinationDate = (type: VaccinationType, vaccinationDate: string) => {
    const date = new Date(vaccinationDate);

    switch (type) {
      case 'complex':
        // Комплексна вакцинація - щорічно
        date.setFullYear(date.getFullYear() + 1);
        break;
      case 'rabies':
        // Від сказу - щорічно
        date.setFullYear(date.getFullYear() + 1);
        break;
      case 'parasites':
        // Від паразитів - кожні 3 місяці
        date.setMonth(date.getMonth() + 3);
        break;
      case 'diseases':
        // Від хвороб - кожні 6 місяців
        date.setMonth(date.getMonth() + 6);
        break;
      case 'other':
        // Інше - щорічно
        date.setFullYear(date.getFullYear() + 1);
        break;
      default:
        // За замовчуванням - щорічно
        date.setFullYear(date.getFullYear() + 1);
    }

    return date.toISOString().split('T')[0];
  };

  const getVaccinationStatus = (vaccination: Vaccination) => {
    const today = new Date();
    const vaccinationDate = new Date(vaccination.vaccinationDate);
    const nextDate = vaccination.nextVaccinationDate ? new Date(vaccination.nextVaccinationDate) : null;

    if (nextDate) {
      if (nextDate < today) {
        return { status: 'overdue', color: 'red', icon: AlertTriangle, text: 'Протерміновано' };
      } else if (nextDate.getTime() - today.getTime() < 7 * 24 * 60 * 60 * 1000) { // 7 днів
        return { status: 'upcoming', color: 'yellow', icon: Clock, text: 'Наступна вакцинація' };
      } else {
        return { status: 'completed', color: 'green', icon: CheckCircle, text: 'Остання вакцинація' };
      }
    } else {
      return { status: 'completed', color: 'green', icon: CheckCircle, text: 'Остання вакцинація' };
    }
  };

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
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Графік вакцинації</h3>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                Додати вакцинацію
              </button>
            </div>

            {vaccinations.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">Вакцинацій не знайдено</p>
                <p className="text-gray-400 mt-2">Додайте першу вакцинацію для вашої тварини</p>
              </div>
            ) : (
              <div className="space-y-4">
                {vaccinations.map((vaccination) => {
                  const isCompleted = vaccination.status === 'completed';
                  const StatusIcon = isCompleted ? CheckCircle : Clock;
                  const dateToShow = vaccination.nextVaccinationDate || vaccination.vaccinationDate;

                  return (
                    <div
                      key={vaccination.id}
                      className={`flex items-center justify-between p-4 border rounded-lg ${isCompleted
                        ? 'border-green-200 bg-green-50'
                        : 'border-blue-200 bg-blue-50'
                        }`}
                    >
                      <div className="flex items-center space-x-3">
                        <StatusIcon className={`h-5 w-5 ${isCompleted
                          ? 'text-green-500'
                          : 'text-blue-500'
                          }`} />
                        <div>
                          <p className="font-medium text-gray-900">
                            {vaccination.petName} ({vaccination.petType === 'dog' ? 'Собака' :
                              vaccination.petType === 'cat' ? 'Кіт' :
                                vaccination.petType === 'bird' ? 'Птах' :
                                  vaccination.petType === 'fish' ? 'Риба' : 'Тварина'})
                          </p>
                          <p className="text-sm text-gray-600">
                            {getVaccinationTypeLabel(vaccination.type)}
                          </p>
                          {vaccination.notes && (
                            <p className="text-xs text-gray-500 mt-1">{vaccination.notes}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <p className={`text-sm ${isCompleted
                            ? 'text-green-600'
                            : 'text-blue-600'
                            }`}>
                            {isCompleted ? 'Зроблена вакцинація' : 'Запланована вакцинація'}
                          </p>
                          <p className={`font-medium ${isCompleted
                            ? 'text-green-800'
                            : 'text-blue-800'
                            }`}>
                            {new Date(dateToShow).toLocaleDateString('uk-UA')}
                          </p>
                        </div>
                        <div className="flex flex-col space-y-1">

                          <button
                            onClick={() => handleDeleteVaccination(vaccination.id)}
                            className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 className="h-5 w-5 cursor-pointer" />

                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Add New Vaccination */}
          {showAddForm && (
            <div className="bg-white shadow rounded-lg p-6 mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Додати нову вакцинацію</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Оберіть тварину *
                    </label>
                    <select
                      name="petId"
                      value={formData.petId}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      required
                    >
                      <option value="">Оберіть тварину</option>
                      {pets.map((pet) => (
                        <option key={pet.id} value={pet.id}>
                          {pet.name} ({pet.type === 'dog' ? 'Собака' :
                            pet.type === 'cat' ? 'Кіт' :
                              pet.type === 'bird' ? 'Птах' :
                                pet.type === 'fish' ? 'Риба' : 'Тварина'})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Тип вакцинації *
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      required
                    >
                      <option value="">Оберіть тип вакцинації</option>
                      <option value="complex">Комплексна вакцинація</option>
                      <option value="rabies">Щеплення від сказу</option>
                      <option value="parasites">Від паразитів</option>
                      <option value="diseases">Від хвороб</option>
                      <option value="other">Інше</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Дата вакцинації *
                    </label>
                    <input
                      type="date"
                      name="vaccinationDate"
                      value={formData.vaccinationDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Статус вакцинації
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    >
                      <option value="scheduled">Запланована вакцинація</option>
                      <option value="completed">Зроблена вакцинація</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Нотатки
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    placeholder="Додаткові нотатки про вакцинацію..."
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Скасувати
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Додати вакцинацію
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Vaccination Info */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Інформація про вакцинацію</h3>
            <div className="prose prose-sm text-gray-600">
              <p className="mb-3">
                Регулярна вакцинація - це важливий крок для захисту здоров&apos;я ваших домашніх улюбленців.
                Вона допомагає запобігти серйозним захворюванням та забезпечує довге та здорове життя.
              </p>
              <p className="mb-3">
                <strong>Рекомендована частота вакцинації:</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Комплексна вакцинація:</strong> щорічно</li>
                <li><strong>Щеплення від сказу:</strong> щорічно</li>
                <li><strong>Від паразитів:</strong> кожні 3 місяці</li>
                <li><strong>Від хвороб:</strong> кожні 6 місяців</li>
                <li><strong>Інше:</strong> щорічно</li>
              </ul>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
