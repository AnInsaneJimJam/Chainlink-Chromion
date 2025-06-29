import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Connect from "./pages/Connect";
// import BeneficiaryDashboard from "./pages/BeneficiaryDashboard";
import EditWill from "./pages/EditWill";
import CreateWill from "./pages/CreateWill";
import NotFound from "./pages/NotFound";
import Deploysmartwallet from "./pages/Deploysmartwallet.jsx";
import SmartWalletManager from "./pages/smartwalletmanager.jsx";
import AppLayout from "./AppLayout";
import BeneficiaryDashboard from "./pages/BeneficiaryDashboard2.jsx";

const queryClient = new QueryClient();

const App = () => {


  return(
    <>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}/>
          <Route path="/" element={<Index />} />
          <Route path="/deploysw" element={<Deploysmartwallet />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-will" element={<CreateWill />} />
          <Route path="/edit-will" element={<EditWill />} />
          <Route path="/smartWalletManager" element={<SmartWalletManager/>}/>
         <Route   path="/beneficiary-dashboard"
            element={<BeneficiaryDashboard />}
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
    </>
  )
};

export default App;
