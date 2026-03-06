export interface User {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  role?: 'teacher' | 'student';
}

export interface Teacher {
  id: number;
  user: User;
  subject?: string;
  bio?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
}

export interface Student {
  id: number;
  user: User;
  first_name?: string;
  last_name?: string;
  email?: string;
  gender?: string;
  date_of_birth?: string;
  parent_name?: string;
  parent_email?: string;
  parent_phone?: string;
}

export interface Course {
  id: number;
  name: string;
  description?: string;
  teacher?: Teacher | number;
  teacher_name?: string;
  created_at?: string;
}

export interface Enrollment {
  id: number;
  student: number | Student;
  course: number | Course;
  course_name?: string;
  enrolled_at?: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface ApiError {
  detail?: string;
  message?: string;
  [key: string]: unknown;
}
