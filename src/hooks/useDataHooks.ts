import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchCourses, fetchMyCourses, fetchEnrollments, fetchTeachers, fetchStudents,
  createCourse, createEnrollment, deleteEnrollment, fetchCourseStudents,
  fetchMe, fetchMyStudents,
} from '@/lib/api';
import type { Course, Enrollment, Teacher, Student, User } from '@/types';

export const useFetchMe = () =>
  useQuery<User>({
    queryKey: ['me'],
    queryFn: async () => (await fetchMe()).data,
  });

export const useFetchMyStudents = () =>
  useQuery<Student[]>({
    queryKey: ['myStudents'],
    queryFn: async () => (await fetchMyStudents()).data,
  });

export const useFetchCourses = () =>
  useQuery<Course[]>({
    queryKey: ['courses'],
    queryFn: async () => (await fetchCourses()).data,
  });

export const useFetchMyCourses = () =>
  useQuery<Course[]>({
    queryKey: ['myCourses'],
    queryFn: async () => (await fetchMyCourses()).data,
  });

export const useFetchEnrollments = () =>
  useQuery<Enrollment[]>({
    queryKey: ['enrollments'],
    queryFn: async () => (await fetchEnrollments()).data,
  });

export const useFetchTeachers = () =>
  useQuery<Teacher[]>({
    queryKey: ['teachers'],
    queryFn: async () => (await fetchTeachers()).data,
  });

export const useFetchStudents = () =>
  useQuery<Student[]>({
    queryKey: ['students'],
    queryFn: async () => (await fetchStudents()).data,
  });

export const useFetchCourseStudents = (courseId: number) =>
  useQuery<Student[]>({
    queryKey: ['courseStudents', courseId],
    queryFn: async () => (await fetchCourseStudents(courseId)).data,
    enabled: !!courseId,
  });

export const useCreateCourse = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { title: string; description?: string }) => createCourse(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['courses'] }),
  });
};

export const useEnroll = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { course: number }) => createEnrollment(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['enrollments'] });
      qc.invalidateQueries({ queryKey: ['courses'] });
    },
  });
};

export const useDropEnrollment = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteEnrollment(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['enrollments'] }),
  });
};
