'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { RootState } from '@/store/types';
import { useAuthInit } from '@/hooks/useAuthInit';
import { updateUser } from '@/store/slices/userSlice';
import { Navigation } from '@/components/Navigation';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Toggle } from '@/components/Toggle';
import { User, Mail, Phone, MapPin, Camera, Save, Edit3 } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user.user);
  const { isInitialized, isAuthenticated } = useAuthInit();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      dispatch(updateUser(formData));
      setIsEditing(false);
      setIsLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
    });
    setIsEditing(false);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Профіль користувача</h1>
            <p className="mt-2 text-gray-600">
              Управляйте своїми особистими даними та налаштуваннями
            </p>
          </div>

          <div className="bg-white shadow rounded-lg overflow-hidden">
            {/* Profile Header */}
            <div className="px-6 py-8 bg-gradient-to-r from-blue-600 to-purple-600">
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="relative">
                  <div className="h-20 w-20 sm:h-24 sm:w-24 bg-white rounded-full flex items-center justify-center">
                    <User className="h-10 w-10 sm:h-12 sm:w-12 text-blue-600" />
                  </div>
                  <button className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 sm:p-2 shadow-lg hover:shadow-xl transition-shadow">
                    <Camera className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                  </button>
                </div>
                <div className="text-white text-center sm:text-left">
                  <h2 className="text-xl sm:text-2xl font-bold">{user.name}</h2>
                  <p className="text-blue-100 text-sm sm:text-base">{user.email}</p>
                </div>
              </div>
            </div>

            {/* Profile Form */}
            <div className="px-4 sm:px-6 py-6 sm:py-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
                <h3 className="text-lg font-medium text-gray-900">Особиста інформація</h3>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn-responsive inline-flex items-center justify-center border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Редагувати</span>
                    <span className="sm:hidden">Змінити</span>
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Повне ім&apos;я
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                             <input
                         type="text"
                         id="name"
                         name="name"
                         required
                         disabled={!isEditing}
                         value={formData.name}
                         onChange={handleInputChange}
                         className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                           isEditing 
                             ? 'border-gray-300 bg-white text-gray-900' 
                             : 'border-gray-200 bg-gray-50 text-gray-700'
                         }`}
                       />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email адреса
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                             <input
                         type="email"
                         id="email"
                         name="email"
                         required
                         disabled={!isEditing}
                         value={formData.email}
                         onChange={handleInputChange}
                         className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                           isEditing 
                             ? 'border-gray-300 bg-white text-gray-900' 
                             : 'border-gray-200 bg-gray-50 text-gray-700'
                         }`}
                       />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Номер телефону
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                             <input
                         type="tel"
                         id="phone"
                         name="phone"
                         disabled={!isEditing}
                         value={formData.phone}
                         onChange={handleInputChange}
                         className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                           isEditing 
                             ? 'border-gray-300 bg-white text-gray-900' 
                             : 'border-gray-200 bg-gray-50 text-gray-700'
                         }`}
                         placeholder="+380991234567"
                       />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                      Адреса
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                             <input
                         type="text"
                         id="address"
                         name="address"
                         disabled={!isEditing}
                         value={formData.address}
                         onChange={handleInputChange}
                         className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                           isEditing 
                             ? 'border-gray-300 bg-white text-gray-900' 
                             : 'border-gray-200 bg-gray-50 text-gray-700'
                         }`}
                         placeholder="Введіть адресу"
                       />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                {isEditing && (
                  <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 pt-6 border-t">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="btn-responsive inline-flex items-center justify-center border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                      Скасувати
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn-responsive inline-flex items-center justify-center border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isLoading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      ) : (
                        <Save className="h-4 w-4 mr-2" />
                      )}
                      <span className="hidden sm:inline">Зберегти зміни</span>
                      <span className="sm:hidden">Зберегти</span>
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Additional Settings */}
          <div className="mt-6 sm:mt-8 bg-white shadow rounded-lg">
            <div className="px-4 sm:px-6 py-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Додаткові налаштування</h3>
              <div className="space-y-4">
                <Toggle
                  enabled={notifications.email}
                  onToggle={(enabled) => setNotifications(prev => ({ ...prev, email: enabled }))}
                  label="Email сповіщення"
                  description="Отримувати сповіщення про важливі події"
                />
                
                <Toggle
                  enabled={notifications.sms}
                  onToggle={(enabled) => setNotifications(prev => ({ ...prev, sms: enabled }))}
                  label="SMS сповіщення"
                  description="Отримувати SMS про термінові події"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
