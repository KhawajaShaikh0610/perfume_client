import apiClient from './apiClient';

export const getPerfumes = (params) => apiClient.get('/perfumes', { params });
export const getPerfumeById = (id) => apiClient.get(`/perfumes/${id}`);
export const createPerfume = (data) => apiClient.post('/perfumes', data);
export const updatePerfume = (id, data) => apiClient.put(`/perfumes/${id}`, data);
export const deletePerfume = (id) => apiClient.delete(`/perfumes/${id}`);
