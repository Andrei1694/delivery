import axios, { type AxiosInstance } from 'axios';
import type {
  PageResponse,
  RestaurantRequestDto,
  RestaurantResponseDto,
} from './types';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    me: '/auth/me',
  },
} as const;

export const restaurantApi = {
  getAll: (page = 0, size = 50) =>
    api.get<PageResponse<RestaurantResponseDto>>('/restaurants', { params: { page, size } }),

  getById: (id: number) =>
    api.get<RestaurantResponseDto>(`/restaurants/${id}`),

  create: (data: RestaurantRequestDto) =>
    api.post<RestaurantResponseDto>('/restaurants', data),

  update: (id: number, data: RestaurantRequestDto) =>
    api.put<RestaurantResponseDto>(`/restaurants/${id}`, data),

  delete: (id: number) =>
    api.delete(`/restaurants/${id}`),
};

export default api;
