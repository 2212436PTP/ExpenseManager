// API configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

export function getApiUrl(path: string): string {
  return `${API_BASE_URL}${path}`;
}

export function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem('accessToken');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}