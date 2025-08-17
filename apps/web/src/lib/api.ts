/**
 * API utility for making HTTP requests
 * Handles base URL configuration for different environments
 */

export const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export interface ApiError extends Error {
  status?: number;
  details?: unknown;
}

export async function fetchAPI<T = unknown>(
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

    const data: unknown = await response.json().catch(() => ({}));

    if (!response.ok) {
      const message = (typeof data === 'object' && data !== null && 'message' in data)
        ? String((data as { message?: unknown }).message)
        : 'Something went wrong';
      const error: ApiError = new Error(message);
      error.status = response.status;
      error.details = data;
      throw error;
    }

    return data as T;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Helper methods for common HTTP methods
export const api = {
  get: <T = unknown>(endpoint: string, options: Omit<RequestInit, 'method'> = {}) => 
    fetchAPI<T>(endpoint, { ...options, method: 'GET' }),
    
  post: <T = unknown>(
    endpoint: string, 
    body: unknown, 
    options: Omit<RequestInit, 'method' | 'body'> = {}
  ) => 
    fetchAPI<T>(endpoint, { 
      ...options, 
      method: 'POST', 
      body: JSON.stringify(body) 
    }),
    
  put: <T = unknown>(
    endpoint: string, 
    body: unknown, 
    options: Omit<RequestInit, 'method' | 'body'> = {}
  ) => 
    fetchAPI<T>(endpoint, { 
      ...options, 
      method: 'PUT', 
      body: JSON.stringify(body) 
    }),
    
  delete: <T = unknown>(endpoint: string, options: Omit<RequestInit, 'method'> = {}) => 
    fetchAPI<T>(endpoint, { ...options, method: 'DELETE' }),
};
