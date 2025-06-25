
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { automationabi } from "../abi/automation";
import { automationaddress } from "../abi/automation";
import { ethers } from "ethers";

const useAutomationListener = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const listen = async () => {
      if (!window.ethereum) return;

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_accounts", []);
      if (accounts.length === 0) {
        await provider.send("eth_requestAccounts", []);
      }

      const signer = await provider.getSigner();
      const contract = new ethers.Contract(automationaddress, automationabi, signer);

      contract.on("depositintervalhascome", () => {
        localStorage.setItem("eventTriggered", "true");
        navigate("/smart-wallets");
      });
    };

    listen();
  }, [navigate]);
};

export default useAutomationListener;
