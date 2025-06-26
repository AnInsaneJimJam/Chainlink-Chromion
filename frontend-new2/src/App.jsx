import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Connect from "./pages/Connect";
import BeneficiaryDashboard from "./pages/BeneficiaryDashboard";
import EditWill from "./pages/EditWill";
import CreateWill from "./pages/CreateWill";
import NotFound from "./pages/NotFound";
import Deploysmartwallet from "./pages/Deploysmartwallet";
import useWalletStore from "./EtherJs/walletStore.js";
import SmartWalletManager from "./pages/smartwalletmanager.jsx";
import { useState } from 'react';
import AppLayout from "./AppLayout";

const queryClient = new QueryClient();

const App = () => {

  const [contract, setContract] = useState(null)
  const { provider, address, signer, isConnected } = useWalletStore()

  let count = 0;
  if (isConnected && count == 1) {
      
      const contractInstance = getContract(signer);
      setContract(contractInstance);
      count++;
      console.log("app if couunt", contract);
  } 


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
