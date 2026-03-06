import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(token!);
  });
  failedQueue = [];
};

export const getAccessToken = (): string | null =>
  localStorage.getItem('abx_access');

export const getRefreshToken = (): string | null =>
  localStorage.getItem('abx_refresh');

export const setTokens = (access: string, refresh: string) => {
  localStorage.setItem('abx_access', access);
  localStorage.setItem('abx_refresh', refresh);
};

export const clearTokens = () => {
  localStorage.removeItem('abx_access');
  localStorage.removeItem('abx_refresh');
};

// Attach access token
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 with refresh
apiClient.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(apiClient(originalRequest));
            },
            reject,
          });
        });
      }
      originalRequest._retry = true;
      isRefreshing = true;
      const refresh = getRefreshToken();
      if (!refresh) {
        clearTokens();
        window.location.href = '/auth/login';
        return Promise.reject(error);
      }
      try {
        const { data } = await axios.post(`${API_BASE}/api/auth/token/refresh/`, { refresh });
        setTokens(data.access, refresh);
        processQueue(null, data.access);
        originalRequest.headers.Authorization = `Bearer ${data.access}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        clearTokens();
        window.location.href = '/auth/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;

// Auth
export const loginApi = (email: string, password: string) =>
  apiClient.post('/api/auth/login/', { email, password });

// Courses
export const fetchCourses = () => apiClient.get('/api/courses/');
export const createCourse = (data: { name: string; description?: string }) =>
  apiClient.post('/api/courses/', data);
export const patchCourse = (id: number, data: Partial<{ name: string; description: string }>) =>
  apiClient.patch(`/api/courses/${id}/`, data);
export const fetchCourseStudents = (id: number) =>
  apiClient.get(`/api/courses/${id}/students/`);

// Enrollments
export const fetchEnrollments = () => apiClient.get('/api/enrollments/');
export const createEnrollment = (data: { student: number; course: number }) =>
  apiClient.post('/api/enrollments/', data);
export const deleteEnrollment = (id: number) =>
  apiClient.delete(`/api/enrollments/${id}/`);

// Teachers & Students
export const fetchTeachers = () => apiClient.get('/api/teachers/');
export const fetchTeacher = (id: number) => apiClient.get(`/api/teachers/${id}/`);
export const fetchStudents = () => apiClient.get('/api/students/');
export const fetchStudent = (id: number) => apiClient.get(`/api/students/${id}/`);
