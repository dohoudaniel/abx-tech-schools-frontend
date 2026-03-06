// Integration hook for Parents API
// When the backend adds /api/parents/, update this file to fetch from the actual endpoint.

import apiClient from '@/lib/api';

// Placeholder: will call /api/parents/ when available
export const fetchParents = () => apiClient.get('/api/parents/');
export const fetchParent = (id: number) => apiClient.get(`/api/parents/${id}/`);

// Currently, parent data is derived from student records.
// See ParentsPage.tsx for the fallback UI implementation.
