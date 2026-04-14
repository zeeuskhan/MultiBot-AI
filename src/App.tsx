import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from './components/ui/sonner';
import { TooltipProvider } from './components/ui/tooltip';
import SEO from './components/SEO';
import ChatPage from './pages/ChatPage';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import AuthPage from './pages/AuthPage';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <HelmetProvider>
      <SEO />
      <TooltipProvider>
        <Router>
          <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/auth" element={<AuthPage />} />
              </Routes>
            </main>
            <Toaster position="top-center" />
          </div>
        </Router>
      </TooltipProvider>
    </HelmetProvider>
  );
}
