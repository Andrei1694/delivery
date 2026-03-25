import axios, { type AxiosInstance } from 'axios';
import type {
  PageResponse,
  RestaurantRequestDto,
  RestaurantResponseDto,
} from './types';

const ABSOLUTE_URL_PATTERN = /^[a-z][a-z\d+\-.]*:/i;

export const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const baseURL = apiBaseUrl;

const api: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

  search: (query: string) =>
    api.get<RestaurantResponseDto[]>('/restaurants/search', { params: { query } }),

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
