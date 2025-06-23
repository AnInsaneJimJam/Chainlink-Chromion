import mongoose from "mongoose";

const BeneficiarySchema = new mongoose.Schema({
  address: { type: String, required: true },
  nativeShare: { type: Number, required: true },
  usdcShare: { type: Number, required: true }
});

const AvalancheWillSchema = new mongoose.Schema({
  testator: { type: String, required: true },
  chain: { type: String, default: "Avalanche" },
  beneficiaries: [BeneficiarySchema],
}, { timestamps: true });

const AvalancheWill = mongoose.model("AvalancheWill", AvalancheWillSchema);
export default AvalancheWill;