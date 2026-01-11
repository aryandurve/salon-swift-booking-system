import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Customer Pages
import Index from "./pages/Index";
import Services from "./pages/Services";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import CallLogs from "./pages/admin/CallLogs";
import BookingRequests from "./pages/admin/BookingRequests";
import Appointments from "./pages/admin/Appointments";
import AdminSettings from "./pages/admin/AdminSettings";

// Components
import VoiceAssistantButton from "./components/customer/VoiceAssistantButton";
import WhatsAppChatButton from "./components/customer/WhatsAppChatButton";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Customer Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/calls" element={<CallLogs />} />
          <Route path="/admin/bookings" element={<BookingRequests />} />
          <Route path="/admin/appointments" element={<Appointments />} />
          <Route path="/admin/settings" element={<AdminSettings />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <VoiceAssistantButton />
        <WhatsAppChatButton />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
