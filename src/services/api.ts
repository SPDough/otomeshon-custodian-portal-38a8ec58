
// This file will serve as the API service layer for communicating with the Django backend

// Base API URL - will be configured to point to Django backend
const API_BASE_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:8000/api'  // Django dev server
  : '/api';  // Production - relative URL

// Reusable fetch function with error handling
async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  try {
    const response = await fetch(url, { ...options, headers });
    
    if (!response.ok) {
      // Handle different error status codes
      if (response.status === 401) {
        // Unauthorized - could trigger logout or auth refresh
        throw new Error('Unauthorized. Please login again.');
      } else if (response.status === 404) {
        throw new Error('Resource not found.');
      } else {
        // Try to get error details from response
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.detail || `API error: ${response.status}`);
      }
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Authentication service
export const authService = {
  login: async (username: string, password: string) => {
    return fetchApi<{ token: string; user: any }>('/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  },
  
  logout: async () => {
    return fetchApi<{ success: boolean }>('/auth/logout/', {
      method: 'POST',
    });
  },
  
  getCurrentUser: async () => {
    return fetchApi<{ user: any }>('/auth/user/');
  },
};

// Search service
export const searchService = {
  performSearch: async (query: string) => {
    return fetchApi<any[]>(`/search/?q=${encodeURIComponent(query)}`);
  },
  
  getRecentSearches: async () => {
    return fetchApi<any[]>('/search/history/');
  },
};

// Results service
export const resultsService = {
  getResults: async (id: string) => {
    return fetchApi<any[]>(`/results/${id}/`);
  },
};

// Export all services
export default {
  auth: authService,
  search: searchService,
  results: resultsService,
};
