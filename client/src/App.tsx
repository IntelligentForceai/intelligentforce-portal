import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Alex from "./pages/Alex";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import HealthCheck from "./pages/HealthCheck";
import Investors from "./pages/Investors";
import BackgroundCanvas from "./components/BackgroundCanvas";

// Scroll to top on every route change (except hash-anchor navigation)
function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    // Don't reset scroll if the URL contains a hash anchor (e.g. /alex#chat)
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [location]);
  return null;
}

// Admin routes render without the public Navbar/Footer
function AdminRouter() {
  return (
    <Switch>
      <Route path="/admin" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
    </Switch>
  );
}

// Public portal routes with Navbar + Footer
function PublicRouter() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/features" component={Features} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/about" component={About} />
      <Route path="/blog" component={Blog} />
      <Route path="/contact" component={Contact} />
      <Route path="/alex" component={Alex} />
      <Route path="/health-check" component={HealthCheck} />
      <Route path="/investors" component={Investors} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Determine if we're on an admin route
  const isAdminRoute =
    typeof window !== "undefined" &&
    window.location.pathname.startsWith("/admin");

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            {isAdminRoute ? (
              <AdminRouter />
            ) : (
              <div className="min-h-screen flex flex-col bg-background">
                {/* Reset scroll position on every route change */}
                <ScrollToTop />
                {/* Global watermark – AI team image, very subtle behind all pages */}
                <div
                  style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 0,
                    backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663514335084/37gsm9ZJmAXwwkBHHCppPv/hero-new-PBvKy65j8D37XDeAUauevf.webp')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    opacity: 0.07,
                    pointerEvents: "none",
                  }}
                />
                <BackgroundCanvas />
                <Navbar />
                <main className="flex-1">
                  <PublicRouter />
                </main>
                <Footer />
              </div>
            )}
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
