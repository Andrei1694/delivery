import axios from 'axios';
import type {
  MealDto,
  PageResponse,
  RestaurantRequestDto,
  RestaurantResponseDto,
  SectionRequestDto,
  SectionResponseDto,
} from './types';

const ABSOLUTE_URL_PATTERN = /^[a-z][a-z\d+\-.]*:/i;

export const apiBaseUrl = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: apiBaseUrl,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  if (config.data instanceof FormData && config.headers) {
    delete config.headers['Content-Type'];
  }

  const token = localStorage.getItem('admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 || err.response?.status === 403) {
      localStorage.removeItem('admin_token');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  },
);

export function resolveApiAssetUrl(value?: string | null) {
  if (!value?.trim()) {
    return '';
  }

  const normalizedValue = value.trim();
  if (
    ABSOLUTE_URL_PATTERN.test(normalizedValue) ||
    normalizedValue.startsWith('//')
  ) {
    return normalizedValue;
  }

  const apiOrigin = new URL(apiBaseUrl, window.location.origin).origin;
  return new URL(
    normalizedValue.startsWith('/') ? normalizedValue : `/${normalizedValue}`,
    apiOrigin,
  ).toString();
}

export const restaurantApi = {
  getAll: (page = 0, size = 50) =>
    api.get<PageResponse<RestaurantResponseDto>>('/restaurants', { params: { page, size } }),

  getById: (id: number) =>
    api.get<RestaurantResponseDto>(`/restaurants/${id}`),

  create: (data: RestaurantRequestDto) =>
    api.post<RestaurantResponseDto>('/restaurants', data),

  createMultipart: (data: FormData) =>
    api.post<RestaurantResponseDto>('/restaurants', data),

  update: (id: number, data: RestaurantRequestDto) =>
    api.put<RestaurantResponseDto>(`/restaurants/${id}`, data),

  updateMultipart: (id: number, data: FormData) =>
    api.put<RestaurantResponseDto>(`/restaurants/${id}`, data),

  delete: (id: number) =>
    api.delete(`/restaurants/${id}`),
};

export const mealApi = {
  getAllByRestaurant: (restaurantId: number) =>
    api.get<MealDto[]>(`/meals/${restaurantId}`),

  create: (restaurantId: number, data: MealDto) =>
    api.post<MealDto[]>(`/meals/${restaurantId}`, [data]),

  createMultipart: (restaurantId: number, data: MealDto, cardImageFile: File) => {
    const formData = new FormData();
    formData.append('meal', new Blob([JSON.stringify(data)], { type: 'application/json' }));
    formData.append('cardImageFile', cardImageFile);
    return api.post<MealDto[]>(`/meals/${restaurantId}`, formData);
  },

  update: (restaurantId: number, mealId: number, data: MealDto) =>
    api.put<MealDto>(`/meals/${restaurantId}/${mealId}`, data),

  updateMultipart: (restaurantId: number, mealId: number, data: MealDto, cardImageFile: File) => {
    const formData = new FormData();
    formData.append('meal', new Blob([JSON.stringify(data)], { type: 'application/json' }));
    formData.append('cardImageFile', cardImageFile);
    return api.put<MealDto>(`/meals/${restaurantId}/${mealId}`, formData);
  },

  delete: (restaurantId: number, mealId: number) =>
    api.delete(`/meals/${restaurantId}/${mealId}`),
};

export const sectionsApi = {
  getAll: () =>
    api.get<SectionResponseDto[]>('/sections'),

  getById: (id: number) =>
    api.get<SectionResponseDto>(`/sections/${id}`),

  create: (data: SectionRequestDto) =>
    api.post<SectionResponseDto>('/sections', data),

  update: (id: number, data: SectionRequestDto) =>
    api.put<SectionResponseDto>(`/sections/${id}`, data),

  delete: (id: number) =>
    api.delete(`/sections/${id}`),
};

export default api;
