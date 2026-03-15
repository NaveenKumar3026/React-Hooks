import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import HooksGrid from "./pages/HooksGrid.tsx";
import UseStatePage from "./pages/UseStatePage.tsx";
import UseEffectPage from "./pages/UseEffectPage.tsx";
import UseRefPage from "./pages/UseRefPage.tsx";
import UseContextPage from "./pages/UseContextPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/hooks" element={<HooksGrid />} />
          <Route path="/hooks/usestate" element={<UseStatePage />} />
          <Route path="/hooks/useeffect" element={<UseEffectPage />} />
          <Route path="/hooks/useref" element={<UseRefPage />} />
          <Route path="/hooks/usecontext" element={<UseContextPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
