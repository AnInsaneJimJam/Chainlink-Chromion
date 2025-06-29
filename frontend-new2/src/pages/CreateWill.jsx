// export default CreateWill;
import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ethers } from "ethers";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import	{CONTRACT_ADDRESS, CONTRACT_ABI} from "../EtherJs/constants.js"; 



const chainToSymbol = {
	polygon: "MATIC",
	ethereum: "ETH",
	binancesmartchain: "BNB",
	avalanche: "AVAX",
};

const CreateWill = () => {
	const [wallets, setWallets] = useState({});
	const [balances, setBalances] = useState({});
	const [walletAddress, setWalletAddress] = useState("");
	const [status, setStatus] = useState("Fetching wallets...");
	const [beneficiaries, setBeneficiaries] = useState([]);
	const [testatorName, setTestatorName] = useState("");
	const [yearOfBirth, setYearOfBirth] = useState("");
  const [prices, setPrices] = useState({});

	const fetchWallets = useCallback(async (address) => {
		setStatus("Fetching deployed wallets...");
		try {
			const res = await fetch(`http://localhost:5000/api/wallets/${address}`);
			if (res.ok) {
				const data = await res.json();
				setWallets(data.wallets || {});
				setStatus("");
			} else {
				setStatus("No existing smart wallets found.");
			}
		} catch (err) {
			console.error("Fetch error:", err);
			setStatus("Could not fetch wallets. Using local state.");
		}
	}, []);
  const RPC_URLS = {
    sepolia: "https://sepolia.infura.io/v3/YOUR_INFURA_ID", // optional, in case needed
    polygon: "https://rpc-amoy.polygon.technology/",
    avalanche: "https://api.avax-test.network/ext/bc/C/rpc"
  };
	const updateBalance = useCallback(async (chainKey, walletAddress) => {
		try {
      const rpcUrl = RPC_URLS[chainKey];
          if (!rpcUrl) throw new Error(`Unsupported chain: ${chain}`);
      
          const chainProvider = new ethers.JsonRpcProvider(rpcUrl);
          const walletBalance = await chainProvider.getBalance(walletAddress);
			setBalances((prev) => ({
				...prev,
				[chainKey]: ethers.formatEther(walletBalance),
			}));
		} catch (err) {
			console.error(`Failed to fetch balance for ${chainKey}:`, err);
		}
	}, []);

	useEffect(() => {
		const getConnectedAddress = async () => {
			if (window.ethereum) {
				try {
					const provider = new ethers.BrowserProvider(window.ethereum);
					const signer = await provider.getSigner();
					const address = await signer.getAddress();
					setWalletAddress(address);
					fetchWallets(address);
				} catch (error) {
					console.error("Error fetching wallet:", error);
				}
			} else {
				console.error("MetaMask not detected");
			}
		};

		getConnectedAddress();
	}, [fetchWallets]);
  const fetchTokenPrices = useCallback(async () => {
    try {
      const newPrices = {};

      for (const chainKey of Object.keys(wallets)) {
        const feed = PRICE_FEEDS[chainKey];
        const rpcUrl = RPC_URLS[chainKey];
        if (!feed || !rpcUrl) continue;

        const provider = new ethers.JsonRpcProvider(rpcUrl);
        const aggregator = new ethers.Contract(
          feed.address,
          [
            "function latestRoundData() view returns (uint80, int256, uint256, uint256, uint80)"
          ],
          provider
        );

        const [, answer] = await aggregator.latestRoundData();
        newPrices[chainKey] = Number(answer) / 10 ** feed.decimals;
      }

      setPrices(newPrices);
    } catch (err) {
      console.error("Failed to fetch price feeds:", err);
    }
  }, [wallets]);
	useEffect(() => {
	if (Object.keys(wallets).length > 0) {
		Object.entries(wallets).forEach(([chainKey, walletAddress]) => {
			if (walletAddress) {
				updateBalance(chainKey, walletAddress);
			}
		});
		fetchTokenPrices();
	}
}, [wallets, updateBalance, fetchTokenPrices]);

	const addBeneficiary = () => {
		const newBeneficiary = {
			id: Date.now(),
			address: "",
			allocations: Object.fromEntries(
				Object.keys(wallets).map((chainKey) => [chainKey, ""]),
			),
		};
		setBeneficiaries((prev) => [...prev, newBeneficiary]);
	};

	const removeBeneficiary = (id) => {
		setBeneficiaries((prev) => prev.filter((b) => b.id !== id));
	};
  const PRICE_FEEDS = {
    polygon: {
      address: "0xdDe6F6F53d1B1c18F31D7857d86eE3B38d58eDd4", // MATIC/USD on Amoy
      decimals: 8
    },
    avalanche: {
      address: "0x0A77230d17318075983913bC2145DB16C7366156", // AVAX/USD on Fuji
      decimals: 8
    }
  };

	const updateBeneficiary = (id, field, value, chainKey = null) => {
		setBeneficiaries((prev) =>
			prev.map((b) => {
				if (b.id !== id) return b;
				if (field === "address") return { ...b, address: value };
				if (field === "allocation" && chainKey)
					return {
						...b,
						allocations: {
							...b.allocations,
							[chainKey]: value,
						},
					};
				return b;
			}),
		);
	};

	const getTotalAllocations = (chainKey) => {
		return beneficiaries.reduce(
			(sum, b) => sum + Number(b.allocations[chainKey] || 0),
			0,
		);
	};

	const validateAllocations = () => {
		const errors = [];

		// Check if all beneficiaries have addresses
		const missingAddresses = beneficiaries.some(b => !b.address.trim());
		if (missingAddresses) {
			errors.push("All beneficiaries must have wallet addresses.");
		}

		// Check if total allocations for each chain don't exceed 100%
		Object.keys(wallets).forEach(chainKey => {
			const total = getTotalAllocations(chainKey);
			if (total > 100) {
				errors.push(`Total allocation for ${chainToSymbol[chainKey]} exceeds 100% (current: ${total}%)`);
			}
		});

		return errors;
	};
  
	const createWill = async (_beneficiaries, _testatorAddr) => {
		try {
			const provider = new ethers.BrowserProvider(window.ethereum);
			const signer = await provider.getSigner();
			const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

			const newBeneficiaries = _beneficiaries.map((b) => b.address);

			const res = await fetch(`http://localhost:5000/api/wills/${_testatorAddr}`, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();
			const jsonStr = JSON.stringify(data);
			const bytes = ethers.toUtf8Bytes(jsonStr);
			const createdWillHash = ethers.keccak256(bytes);
			console.log("Will hash:", createdWillHash);
			console.log("Beneficiaries:", newBeneficiaries);
			const tx = await contract.createWill(newBeneficiaries, createdWillHash);
			await tx.wait();

			console.log("Will created on-chain successfully");
		} catch (error) {
			console.error("Error saving to smart contract:", error);
		}
	};

	const handleSaveWill = async () => {
		// Validate allocations before saving
		const validationErrors = validateAllocations();
		if (validationErrors.length > 0) {
			alert("Please fix the following errors:\n\n" + validationErrors.join("\n"));
			return;
		}

		// Validate testator info
		if (!testatorName.trim() || !yearOfBirth.trim()) {
			alert("Please provide both testator name and year of birth.");
			return;
		}

		const willObject = {
			testator: walletAddress,
			beneficiaries: beneficiaries.map((b) => ({
				address: b.address,
				allocations: Object.entries(b.allocations).map(
					([chain, percentage]) => ({
						chain,
						percentage: Number(percentage),
					}),
				),
			})),
		};

		try {
			const res = await fetch("http://localhost:5000/api/wills", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(willObject),
			});

			console.log("willObject", willObject);

			if (!res.ok) {
				const errorText = await res.text();
				console.error("Backend error:", errorText);
				alert("Failed to save will to backend.");
				return;
			}

			await createWill(beneficiaries, walletAddress);

			const provider = new ethers.BrowserProvider(window.ethereum);
			const signer = await provider.getSigner();
			const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

			const tx = await contract.setTestatorInfo(testatorName, yearOfBirth);
			await tx.wait();

			console.log("Testator info updated");
			alert("Will & Testator info saved successfully!");
		} catch (error) {
			console.error("Error saving will:", error);
			alert("Request failed.");
		}
	};

	return (
		<div className="min-h-screen relative font-inter overflow-x-hidden" style={{ background: '#EAF6FF' }}>
			{/* Fixed Background Layers */}
			<div className="fixed w-full h-full top-0 left-0 z-0 overflow-hidden"
				style={{
					background: 'radial-gradient(182.23% 114.29% at 93.19% 88.28%, #CDEFFF 0%, #FFF 47.28%, #CDEFFF 96.18%)'
				}}
			>
				<div
					className="absolute w-[150vmax] h-[150vmax] top-1/2 left-1/2"
					style={{
						transform: 'translate(-50%, -50%) rotate(-9.478deg)',
						background: '#CDEFFF',
						mixBlendMode: 'hue'
					}}
				/>
				<div
					className="absolute w-[150vmax] h-[150vmax] top-1/2 left-1/2 opacity-25"
					style={{
						transform: 'translate(-50%, -50%) rotate(-30.74deg)',
						background: "url('https://i.pinimg.com/736x/ed/a1/9c/eda19c7ecf1dfd77f407ab1ed4dfecfa.jpg') lightgray 50% / cover no-repeat",
						boxShadow: '0px 0px 114.717px 0px #CDEFFF'
					}}
				/>
			</div>
			<div className="main-content relative z-10 min-h-screen">
				<Header showDisconnect onDisconnect={() => window.location.href = '/'} walletAddress={walletAddress} />
				<div className="pt-32 pb-12 px-4 lg:px-12 max-w-5xl mx-auto">
					<div className="text-center">
						<h1 className="font-clash text-[48px] font-semibold text-[#2D2D2D]">Create Your Will</h1>
						<p className="font-inter text-[22px] text-[#767676] font-medium mt-1">Define your beneficiaries and how your assets will be distributed.</p>
					</div>
					<div className="space-y-6 mt-8">
						{/* Testator Info Section */}
						<div className="form-section bg-[rgba(234,246,255,0.5)] border border-[rgba(4,105,171,0.3)] rounded-[15px] backdrop-blur-[10px] p-6">
							<h3 className="font-clash text-2xl font-semibold mb-4">Testator Information</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label className="form-label text-[#25292A] font-semibold">Name</label>
									<input
										type="text"
										className="form-input w-full border border-[#CBD5E1] bg-white/70 rounded-lg px-3 py-2 mt-1"
										placeholder="Full Name"
										value={testatorName}
										onChange={e => setTestatorName(e.target.value)}
									/>
								</div>
								<div>
									<label className="form-label text-[#25292A] font-semibold">Year of Birth</label>
									<input
										type="number"
										className="form-input w-full border border-[#CBD5E1] bg-white/70 rounded-lg px-3 py-2 mt-1"
										placeholder="e.g. 1975"
										value={yearOfBirth}
										onChange={e => setYearOfBirth(e.target.value)}
									/>
								</div>
							</div>
						</div>
						{/* Beneficiaries & Asset Distribution Section */}
						<div className="form-section bg-[rgba(234,246,255,0.5)] border border-[rgba(4,105,171,0.3)] rounded-[15px] backdrop-blur-[10px] p-6">
							<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
								<h3 className="font-clash text-2xl font-semibold">Beneficiaries & Asset Distribution</h3>
								<button
									type="button"
									onClick={addBeneficiary}
									className="btn-add-beneficiary bg-[#07AAF4] text-white rounded-full px-6 py-2 font-semibold text-base mt-4 md:mt-0"
								>
									+ Add Beneficiary
								</button>
							</div>
							<div className="space-y-6 mt-4">
								{/* Beneficiary Cards */}
								{beneficiaries.map((b, idx) => (
									<div key={b.id} className="beneficiary-card border-t border-gray-300 pt-4">
										<div className="flex justify-between items-center mb-4">
											<h4 className="font-clash text-xl font-semibold">Beneficiary {idx + 1}</h4>
											<button
												type="button"
												className="bg-transparent border border-[#EF4444] text-[#EF4444] text-lg"
												onClick={() => removeBeneficiary(b.id)}
											>
												<Trash2 className="w-6 h-6" />
											</button>
										</div>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div>
												<label className="form-label text-[#25292A] font-semibold">Wallet Address</label>
												<input
													type="text"
													className="form-input w-full border border-[#CBD5E1] bg-white/70 rounded-lg px-3 py-2 mt-1"
													placeholder="0x..."
													value={b.address}
													onChange={e => updateBeneficiary(b.id, 'address', e.target.value)}
												/>
											</div>
										</div>
										<div className="mt-4">
											<p className="form-label mb-2 text-[#25292A] font-semibold">Asset Allocation (%)</p>
											<div className="flex gap-4 flex-wrap">
												{Object.keys(wallets).map(chainKey => (
													<div className="flex-1 min-w-[120px]" key={chainKey}>
														<label className="form-label text-sm">{chainToSymbol[chainKey]} <span className="text-gray-400">Total: 100%</span></label>
														<input
															type="number"
															className="form-input w-full border border-[#CBD5E1] bg-white/70 rounded-lg px-3 py-2 mt-1"
															min="0"
															max="100"
															value={b.allocations[chainKey] || ""}
															onChange={e => updateBeneficiary(b.id, 'allocation', e.target.value, chainKey)}
														/>
													</div>
												))}
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
						{/* Allocation Summary Section */}
              <div className="form-section bg-[rgba(234,246,255,0.5)] border border-[rgba(4,105,171,0.3)] rounded-[15px] backdrop-blur-[10px] p-6">
                <h3 className="font-clash text-2xl font-semibold">Allocation Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  {Object.keys(wallets).map(chainKey => {
                    const total = getTotalAllocations(chainKey);
                    const isValid = total === 100;
                    const tokenBalance = balances[chainKey];
                    const tokenPrice = prices[chainKey];

                    const usdValue =
                      tokenBalance && tokenPrice
                        ? (Number(tokenBalance) * tokenPrice).toFixed(2)
                        : null;

                    return (
                      <div
                        key={chainKey}
                        className={`allocation-summary-box rounded-lg p-4 text-center ${
                          isValid
                            ? 'summary-green bg-[#D5FFE6] text-[#12703D] border border-[#12703D]'
                            : 'summary-red bg-[#FEE2E2] text-[#B91C1C] border border-[#DC2626]'
                        }`}
                      >
                        <p className="font-semibold">{chainToSymbol[chainKey]}</p>
                        <p className="text-xl font-bold">{total}% Allocated {isValid ? '✔' : '⊗'}</p>
                        <p className="text-sm font-medium mt-1">
                          Balance: {tokenBalance ? `${Number(tokenBalance).toFixed(4)} ${chainToSymbol[chainKey]}` : "Loading..."}
                        </p>
                        <p className="text-sm text-gray-700">
                          {usdValue ? `≈ $${usdValue}` : ""}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

						{/* Save/Cancel Buttons */}
						<div className="flex justify-end items-center pt-6 gap-4">
							<button
								type="button"
								className="header-btn bg-white border border-[#0469AB] text-[#0469AB] font-semibold rounded-[25px] px-6 py-2 transition-all hover:bg-[#0469AB1A]"
								onClick={() => window.location.href = '/dashboard'}
							>
								Cancel
							</button>
							<button
								type="button"
								className="btn-primary header-btn text-white rounded-full px-8 py-3 text-xl bg-[#0167AF] hover:bg-[#0469AB] font-inter font-semibold shadow"
								onClick={handleSaveWill}
							>
								Save Will
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateWill