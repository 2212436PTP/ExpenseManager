// API configuration  
export const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api';

export function getApiUrl(path: string): string {
  // Remove leading /api from path since base URL already includes it
  const cleanPath = path.startsWith('/api') ? path.substring(4) : path;
  return `${API_BASE_URL}${cleanPath}`;
}

export function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem('accessToken');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

export function getAvatarUrl(avatarPath: string | null): string | null {
  if (!avatarPath) return null;
  
  console.log('getAvatarUrl input:', avatarPath);
  console.log('API_BASE_URL:', API_BASE_URL);
  
  // If it's already a full URL, return as is
  if (avatarPath.startsWith('http')) {
    console.log('Already full URL, returning:', avatarPath);
    return avatarPath;
  }
  
  // If it's a relative path like '/uploads/filename.jpg'
  const baseUrl = API_BASE_URL.replace('/api', ''); // Remove /api suffix
  const fullUrl = `${baseUrl}${avatarPath}`;
  
  console.log('Generated avatar URL:', fullUrl);
  return fullUrl;
}