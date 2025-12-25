import api from './api';

export interface Resource {
  id: number;
  name: string;
  type: 'testing_center' | 'support_service' | 'counseling' | 'ngo';
  description: string;
  location: string;
  phone: string;
  email?: string;
  website?: string;
  address: string;
  hours: string;
  services: string[];
}

export const resourceService = {
  // Get all resources
  getResources: async (type?: string): Promise<Resource[]> => {
    const params = type ? { type } : {};
    const response = await api.get('/resources', { params });
    return response.data;
  },

  // Get resource by ID
  getResource: async (id: number): Promise<Resource> => {
    const response = await api.get(`/resources/${id}`);
    return response.data;
  },

  // Get resources by location
  getResourcesByLocation: async (location: string): Promise<Resource[]> => {
    const response = await api.get('/resources', { params: { location } });
    return response.data;
  }
};