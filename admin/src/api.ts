import axios from 'axios';
import type { PageResponse, RestaurantRequestDto, RestaurantResponseDto } from './types';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
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

export default api;
