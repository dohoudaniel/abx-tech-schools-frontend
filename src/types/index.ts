export interface User {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  role?: 'teacher' | 'student' | 'admin' | 'parent';
  profile_data?: {
    gender?: string;
    date_of_birth?: string;
  };
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
  title: string;
  description?: string;
  teacher?: number;
  teacher_details?: Teacher;
  created_at?: string;
}

export interface Enrollment {
  id: number;
  student: number;
  student_details?: Student;
  course: number;
  course_details?: Course;
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
export interface Parent {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender?: string;
  family_last_name?: string;
  created_at: string;
  students_details?: Student[];
  student_links?: ParentStudent[];
}

export interface ParentStudent {
  id: number;
  parent: number;
  student: number;
  student_details?: Student;
  relationship?: string;
  linked_at: string;
}
