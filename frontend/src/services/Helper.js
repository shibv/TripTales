import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export const login = async (email, password) => {
  const response = await api.post('/auth/signin', { email, password });
  return response.data;
};

export const signup = async (username, email, password) => {
  const response = await api.post('/auth/signup', { username, email, password });
  return response.data;
};
export const logout = () => api.get('/auth/signout"');
export const getProfile = () => api.get('/user/profile');
export const updateProfile = (userData) => api.put('/user/profile', userData);
export const createItinerary = (itineraryData) => api.post('/itinerary', itineraryData);
export const getItineraries = () => api.get('/itinerary');
export const getItinerary = (id) => api.get(`/itinerary/${id}`);