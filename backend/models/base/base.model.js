import mongoose from "mongoose";

const BeneficiarySchema = new mongoose.Schema({
  address: { type: String, required: true },
  nativeShare: { type: Number, required: true },
  usdcShare: { type: Number, required: true }
});

const BaseWillSchema = new mongoose.Schema({
  testator: { type: String, required: true },
  chain: { type: String, default: "Base" },
  beneficiaries: [BeneficiarySchema],
}, { timestamps: true });

const BaseWill = mongoose.model("BaseWill", BaseWillSchema);
export default BaseWill;