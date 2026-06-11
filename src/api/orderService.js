import apiClient from './apiClient';

export const getOrders = () => apiClient.get('/orders');
export const getOrderById = (id) => apiClient.get(`/orders/${id}`);
export const getMyOrders = () => apiClient.get('/orders/myorders');
export const createOrder = (data) => apiClient.post('/orders', data);
export const updateOrderStatus = (id, data) => apiClient.put(`/orders/${id}/status`, data);
export const deleteOrder = (id) => apiClient.delete(`/orders/${id}`);
