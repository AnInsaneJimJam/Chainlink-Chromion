import mongoose from "mongoose";

const BeneficiarySchema = new mongoose.Schema({
  address: { type: String, required: true },
  nativeShare: { type: Number, required: true },
  usdcShare: { type: Number, required: true }
});

const SolanaWillSchema = new mongoose.Schema({
  testator: { type: String, required: true },
  chain: { type: String, default: "Solana" },
  beneficiaries: [BeneficiarySchema],
  createdAt: { type: Date, default: Date.now }
});

const SolanaWill = mongoose.model("SolanaWill", SolanaWillSchema);
export default SolanaWill;