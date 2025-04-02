import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
  Link,
} from "react-router-dom";
import { ThemeProvider } from "./components/ui/theme-provider";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "./components/ui/button";

// pages import
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgetPassword from "./pages/Forget_password";
import ResetPassword from "./pages/Reset_password";
import VerifyEmail from "./pages/Verify_email";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import About from "./pages/About";
import BookDetails from "./pages/BookDetails";
import BookCategory from "./pages/Book_category";
import BookView from "./pages/Book_view";
import PopularBooks from "./components/PopularBooks";

// app components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const { checkAuth, checkingAuth } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
      <Toaster />
    </ThemeProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const { user } = useUserStore();

  const hideNavbarFooterRoutes = [
    "/verify-email",
    "/login",
    "/signup",
    "/forget-password",
    "/reset-password",
    "/dashboard",
  ];

  const shouldHideNavbarFooter = hideNavbarFooterRoutes.some(
    (route) =>
      route === location.pathname ||
      (route.includes(":") && location.pathname.startsWith(route.split(":")[0]))
  );

  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-800 transition-colors duration-300">
      {!shouldHideNavbarFooter && <Navbar />}
      <main className="flex-grow">
        {user?.is_verified === 0 && location.pathname !== "/verify-email" && (
          <div className="max-w-screen-lg mx-auto my-4">
            <Alert>
              <AlertTitle>Email Verification Required</AlertTitle>
              <AlertDescription>
                Please verify your email to access all features. Check your
                inbox for the verification email.
                <Link to={"/verify-email"} className="mt-5">
                  <Button>Verify</Button>
                </Link>
              </AlertDescription>
            </Alert>
          </div>
        )}
        <Routes>
          {/* Authentication Routes */}
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" replace />}
          />
          <Route
            path="/signup"
            element={!user ? <SignUp /> : <Navigate to="/" replace />}
          />
          <Route
            path="/forget-password"
            element={!user ? <ForgetPassword /> : <Navigate to="/" replace />}
          />
          <Route
            path="/reset-password/:token"
            element={!user ? <ResetPassword /> : <Navigate to="/" replace />}
          />

          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/books" element={<PopularBooks />} />
          <Route path="/book/:bookId" element={<BookDetails />} />
          <Route path="/book-category/:categoryName" element={<BookCategory />} />

          {/* Previously Protected Routes - Now Public */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />

          {/* 404 Route */}
          <Route
            path="*"
            element={
              <h1 className="text-center text-2xl text-red-500">
                404 - Page Not Found
              </h1>
            }
          />
        </Routes>
      </main>
      {!shouldHideNavbarFooter && <Footer />}
    </div>
  );
}

export default App;