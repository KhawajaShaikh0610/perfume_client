import apiClient from './apiClient';

export const login = (data) => apiClient.post('/auth/login', data);
export const register = (data) => apiClient.post('/auth/register', data);
export const adminLogin = (data) => apiClient.post('/auth/admin-login', data);
export const getProfile = () => apiClient.get('/auth/profile');
export const updateProfile = (data) => apiClient.put('/auth/profile', data);
export const deleteUser = (id) => apiClient.delete(`/auth/${id}`);
