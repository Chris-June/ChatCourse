/**
 * API utility for making HTTP requests
 * Handles base URL configuration for different environments
 */

export const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export interface ApiError extends Error {
  status?: number;
  details?: any;
}

export async function fetchAPI<T = any>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  // Ensure endpoint starts with a slash
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${API_BASE_URL}${normalizedEndpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const error: ApiError = new Error(data.message || 'Something went wrong');
      error.status = response.status;
      error.details = data;
      throw error;
    }

    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Helper methods for common HTTP methods
export const api = {
  get: <T = any>(endpoint: string, options: Omit<RequestInit, 'method'> = {}) => 
    fetchAPI<T>(endpoint, { ...options, method: 'GET' }),
    
  post: <T = any>(
    endpoint: string, 
    body: any, 
    options: Omit<RequestInit, 'method' | 'body'> = {}
  ) => 
    fetchAPI<T>(endpoint, { 
      ...options, 
      method: 'POST', 
      body: JSON.stringify(body) 
    }),
    
  put: <T = any>(
    endpoint: string, 
    body: any, 
    options: Omit<RequestInit, 'method' | 'body'> = {}
  ) => 
    fetchAPI<T>(endpoint, { 
      ...options, 
      method: 'PUT', 
      body: JSON.stringify(body) 
    }),
    
  delete: <T = any>(endpoint: string, options: Omit<RequestInit, 'method'> = {}) => 
    fetchAPI<T>(endpoint, { ...options, method: 'DELETE' }),
};
