
import axios from "axios";

// Create axios instance with default config
const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include auth token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

// API endpoints for authentication
export const authAPI = {
  login: (username: string, password: string) => 
    api.post("/auth/login/", { username, password }),
  logout: () => api.post("/auth/logout/"),
  getCurrentUser: () => api.get("/auth/user/"),
};

// API endpoints for search functionality
export const searchAPI = {
  search: (query: string) => api.get(`/search/?q=${encodeURIComponent(query)}`),
  getResults: (resultId: string) => api.get(`/results/${resultId}/`),
};

// API endpoints for portfolio data
export const portfolioAPI = {
  getPortfolios: () => api.get("/portfolios/"),
  getPortfolio: (id: string) => api.get(`/portfolios/${id}/`),
  createPortfolio: (data: any) => api.post("/portfolios/", data),
  updatePortfolio: (id: string, data: any) => api.put(`/portfolios/${id}/`, data),
  deletePortfolio: (id: string) => api.delete(`/portfolios/${id}/`),
};

export default api;
