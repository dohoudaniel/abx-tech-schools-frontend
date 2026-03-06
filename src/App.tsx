import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/auth";
import { lazy, Suspense } from "react";

import ProtectedRoute from "@/components/ProtectedRoute";
import AppLayout from "@/components/AppLayout";

// Lazy loaded pages
const Landing = lazy(() => import("@/pages/Landing"));
const Login = lazy(() => import("@/pages/auth/Login"));
const AppIndex = lazy(() => import("@/pages/app/AppIndex"));
const TeacherDashboard = lazy(() => import("@/pages/app/teacher/TeacherDashboard"));
const TeacherCourses = lazy(() => import("@/pages/app/teacher/TeacherCourses"));
const CourseDetail = lazy(() => import("@/pages/app/teacher/CourseDetail"));
const TeacherStudents = lazy(() => import("@/pages/app/teacher/TeacherStudents"));
const StudentDashboard = lazy(() => import("@/pages/app/student/StudentDashboard"));
const StudentCourses = lazy(() => import("@/pages/app/student/StudentCourses"));
const StudentEnrollments = lazy(() => import("@/pages/app/student/StudentEnrollments"));
const TeachersPage = lazy(() => import("@/pages/app/teachers/TeachersPage"));
const StudentsPage = lazy(() => import("@/pages/app/students/StudentsPage"));
const ParentsPage = lazy(() => import("@/pages/app/parents/ParentsPage"));
const SettingsPage = lazy(() => import("@/pages/app/SettingsPage"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 30_000 },
  },
});

const Loader = () => (
  <div className="flex items-center justify-center min-h-screen bg-background">
    <div className="animate-spin rounded-full h-8 w-8 border-2 border-accent border-t-transparent" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/auth/login" element={<Login />} />

              {/* Protected app routes */}
              <Route element={<ProtectedRoute />}>
                <Route element={<AppLayout />}>
                  <Route path="/app" element={<AppIndex />} />

                  {/* Teacher - Restricted */}
                  <Route element={<ProtectedRoute allowedRoles={['teacher', 'admin']} />}>
                    <Route path="/app/teacher" element={<TeacherDashboard />} />
                    <Route path="/app/teacher/courses" element={<TeacherCourses />} />
                    <Route path="/app/teacher/courses/:id" element={<CourseDetail />} />
                    <Route path="/app/teacher/students" element={<TeacherStudents />} />
                  </Route>

                  {/* Student - Restricted */}
                  <Route element={<ProtectedRoute allowedRoles={['student', 'admin']} />}>
                    <Route path="/app/student" element={<StudentDashboard />} />
                    <Route path="/app/student/courses" element={<StudentCourses />} />
                    <Route path="/app/student/enrollments" element={<StudentEnrollments />} />
                  </Route>

                  {/* Shared */}
                  <Route path="/app/teachers" element={<TeachersPage />} />
                  <Route path="/app/students" element={<StudentsPage />} />
                  <Route path="/app/parents" element={<ParentsPage />} />
                  <Route path="/app/settings" element={<SettingsPage />} />
                </Route>
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
