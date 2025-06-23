import mongoose from "mongoose";

const BeneficiarySchema = new mongoose.Schema({
  address: { type: String, required: true },
  nativeShare: { type: Number, required: true },
  usdcShare: { type: Number, required: true }
});

const PolygonWillSchema = new mongoose.Schema({
  testator: { type: String, required: true },
  chain: { type: String, default: "Polygon" },
  beneficiaries: [BeneficiarySchema],
  createdAt: { type: Date, default: Date.now }
});

const PolygonWill = mongoose.model("PolygonWill", PolygonWillSchema);
export default PolygonWill;