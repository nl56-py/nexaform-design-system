import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import About from "./pages/About";
import Contact from "./pages/Contact";
import DigitalFairnessCampaign from "./pages/DigitalFairnessCampaign";
import FreeAudit from "./pages/FreeAudit";
import Careers from "./pages/Careers";
import CareerDetail from "./pages/CareerDetail";
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
import AdminSeoCampaignPage from "./pages/admin/SeoCampaign";
import AdminCareersPage from "./pages/admin/Careers";

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
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route
              path="/admin"
              element={
                <RequireAdmin>
                  <AdminLayoutPage />
                </RequireAdmin>
              }
            >
              <Route index element={<AdminDashboardPage />} />
              <Route path="seo-campaign" element={<AdminSeoCampaignPage />} />
              <Route path="projects" element={<AdminProjectsPage />} />
              <Route path="blogs" element={<AdminBlogsPage />} />
              <Route path="contacts" element={<AdminContactsPage />} />
              <Route path="careers" element={<AdminCareersPage />} />
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Route>

            <Route element={<PublicLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="/case-studies" element={<Navigate to="/projects" replace />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/digital-fairness-campaign" element={<DigitalFairnessCampaign />} />
              <Route path="/free-audit" element={<FreeAudit />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/careers/:slug" element={<CareerDetail />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AdminAuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
