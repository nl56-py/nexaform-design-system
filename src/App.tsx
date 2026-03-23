import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ScrollToTop from "@/components/ScrollToTop";
import { AdminAuthProvider } from "@/components/admin/AdminAuthProvider";
import RequireAdmin from "@/components/admin/RequireAdmin";
import AdminBlogsPage from "./pages/admin/Blogs";
import AdminContactsPage from "./pages/admin/Contacts";
import AdminDashboardPage from "./pages/admin/Dashboard";
import AdminLayoutPage from "./pages/admin/Layout";
import AdminLoginPage from "./pages/admin/Login";
import AdminProjectsPage from "./pages/admin/Projects";
import AdminRegisterPage from "./pages/admin/Register";

const queryClient = new QueryClient();

const PublicLayout = () => (
  <>
    <Navbar />
    <main className="min-h-screen overflow-x-hidden">
      <Outlet />
    </main>
    <Footer />
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <AdminAuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/case-studies" element={<Navigate to="/projects" replace />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin/register" element={<AdminRegisterPage />} />
            <Route
              path="/admin"
              element={
                <RequireAdmin>
                  <AdminLayoutPage />
                </RequireAdmin>
              }
            >
              <Route index element={<AdminDashboardPage />} />
              <Route path="projects" element={<AdminProjectsPage />} />
              <Route path="blogs" element={<AdminBlogsPage />} />
              <Route path="contacts" element={<AdminContactsPage />} />
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AdminAuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
