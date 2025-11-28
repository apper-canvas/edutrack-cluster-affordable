import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "@/components/organisms/Layout";

// Lazy load components
const Login = lazy(() => import("@/components/pages/Login"));
const TeacherDashboard = lazy(() => import("@/components/pages/TeacherDashboard"));
const StudentDashboard = lazy(() => import("@/components/pages/StudentDashboard"));
const Profile = lazy(() => import("@/components/pages/Profile"));
const NotFound = lazy(() => import("@/components/pages/NotFound"));

// Suspense wrapper component
const SuspenseWrapper = ({ children }) => (
  <Suspense fallback={
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center space-y-4">
        <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
    </div>
  }>
    {children}
  </Suspense>
);

// Dashboard component that renders based on user role
const Dashboard = lazy(() => {
  const DashboardComponent = () => {
    const user = JSON.parse(localStorage.getItem("userData") || "{}");
    
    if (user.role === "teacher") {
      return <TeacherDashboard />;
    } else if (user.role === "student") {
      return <StudentDashboard />;
    } else if (user.role === "admin") {
      return <TeacherDashboard />; // Admin uses teacher dashboard for now
    } else {
      return <StudentDashboard />; // Default fallback
    }
  };
  
  return Promise.resolve({ default: DashboardComponent });
});

// Main routes for authenticated users
const mainRoutes = [
  {
    path: "",
    index: true,
    element: <SuspenseWrapper><Dashboard /></SuspenseWrapper>
  },
  {
    path: "students",
    element: <SuspenseWrapper><TeacherDashboard /></SuspenseWrapper>
  },
  {
    path: "assignments",
    element: <SuspenseWrapper><TeacherDashboard /></SuspenseWrapper>
  },
  {
    path: "attendance",
    element: <SuspenseWrapper><TeacherDashboard /></SuspenseWrapper>
  },
  {
    path: "my-assignments",
    element: <SuspenseWrapper><StudentDashboard /></SuspenseWrapper>
  },
  {
    path: "my-records",
    element: <SuspenseWrapper><StudentDashboard /></SuspenseWrapper>
  },
  {
    path: "users",
    element: <SuspenseWrapper><TeacherDashboard /></SuspenseWrapper>
  },
  {
    path: "reports",
    element: <SuspenseWrapper><TeacherDashboard /></SuspenseWrapper>
  },
  {
    path: "settings",
    element: <SuspenseWrapper><Profile /></SuspenseWrapper>
  },
  {
    path: "profile",
    element: <SuspenseWrapper><Profile /></SuspenseWrapper>
  },
  {
    path: "*",
    element: <SuspenseWrapper><NotFound /></SuspenseWrapper>
  }
];

// Router configuration
const routes = [
  {
    path: "/login",
    element: <SuspenseWrapper><Login /></SuspenseWrapper>
  },
  {
    path: "/",
    element: <Layout />,
    children: [...mainRoutes]
  }
];

export const router = createBrowserRouter(routes);