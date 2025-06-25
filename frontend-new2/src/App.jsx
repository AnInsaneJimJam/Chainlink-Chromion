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
import Ethereumfundme from "./pages/Ethereumfundme";
import Basefundme from "./pages/Basefundme";
import Polygonfundme from "./pages/Polygonfundme";
import Solanafundme from "./pages/Solanafundme";
import Avalanchefundme from "./pages/Avalanchefundme";
import Withdraw from "./pages/Withdraw";
import SmartWallets from "./pages/smartwallets";
import useWalletStore from "./EtherJs/walletStore.js";
import { useState } from 'react'

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
          <Route path="/" element={<Index />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-will" element={<CreateWill />} />
          <Route path="/edit-will" element={<EditWill />} />
          <Route path="/Deploysmartwallet" element={<Deploysmartwallet/>}/>
          <Route path="/Ethereumfundme" element ={<Ethereumfundme/>}/>
          <Route path="/Basefundme" element ={<Basefundme/>}/>
          <Route path="/Polygonfundme" element ={<Polygonfundme/>}/>
          <Route path="/Solanafundme" element ={<Solanafundme/>}/>
          <Route path="/Avalanchefundme" element={<Avalanchefundme/>}/>
         <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/smart-wallets" element={<SmartWallets/>}/>
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
