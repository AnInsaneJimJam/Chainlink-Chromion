// testator => beneficiary => 1. native currency (%) and 2. usdc (%)

// {
//     "testatorAddress": "0xABCD.....",
//     "beneficiaries": [
//         {
//             address: ".....",
//             nativeCurrency: "...%",
//             usdc: "...%"
//         }

//         {
//             address: ".....",
//             nativeCurrency: "...%",
//             usdc: "...%"
//         }
    
//             .... many more beneficiaries
//     ]
// }

import mongoose from "mongoose";

const BeneficiarySchema = new mongoose.Schema({
  address: { type: String, required: true },
  nativeShare: { type: Number, required: true },
  usdcShare: { type: Number, required: true }
});

const EthereumWillSchema = new mongoose.Schema({
  testator: { type: String, required: true },
  chain: { type: String, default: "Ethereum" },
  beneficiaries: [BeneficiarySchema],
  createdAt: { type: Date, default: Date.now }
});

const EthereumWill = mongoose.model("EthereumWill", EthereumWillSchema);
export default EthereumWill;