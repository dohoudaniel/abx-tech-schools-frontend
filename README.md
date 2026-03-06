# ABX Tech Schools - Frontend

A modern, high-performance School Management System frontend built for students and teachers. Featuring a premium design, role-based access control, and seamless integration with the ABX Schools Backend.

## 🚀 Features

### 🎓 For Students
- **Personalized Dashboard**: Time-based greetings and overview of learning progress.
- **Course Catalog**: Browse courses with advanced search, filtering, and subject categories.
- **Learning Journey**: Track enrollments, progress, and continue learning from where you left off.
- **Premium UI**: Smooth animations, glassmorphism effects, and an engaging interface.

### 👨‍🏫 For Teachers
- **Insightful Dashboard**: Monitor total courses, students, and engagement metrics.
- **Classroom Management**: Manage course content and track student performance.
- **Student Overview**: View detailed information about enrolled students.

### 🛠️ Core Functionality
- **Role-Based Routing**: Secure access ensures students and teachers only see relevant pages.
- **Auto-Redirects**: Authenticated users are automatically redirected from the landing page to their respective dashboards.
- **Persistent State**: User profile information (including full name and preferences) is persisted across sessions.
- **Custom 404 Experience**: An immersive, animated error page with a 10-second automatic teleportation back to safety.

## 🛠️ Technology Stack

- **Framework**: React 18 with Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Animations**: Framer Motion
- **Data Fetching**: TanStack Query (React Query)
- **Icons**: Lucide React

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/dohoudaniel/abx-tech-schools-frontend.git
   cd abx-tech-schools-frontend
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and point it to your backend:
   ```env
   VITE_API_BASE=http://localhost:8000
   ```

4. **Start the development server**:
   ```sh
   npm run dev
   ```

### Building for Production

To create an optimized production build:
```sh
npm run build
```

## 🤝 Integration

This frontend is designed to work perfectly with the [ABX Schools Backend](https://github.com/dohoudaniel/abx-tech-schools-backend). ensure the backend is running and the `VITE_API_BASE` is correctly configured to enable live data fetching for profile settings and academic metrics.

---

Developed with ❤️ for **ABX Technologies**.
