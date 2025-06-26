import mongoose from "mongoose"

const allocationSchema = new mongoose.Schema({
  chain: {
    type: String, // e.g. 'polygon', 'ethereum'
    required: true,
  },
  percentage: {
    type: Number, // percentage allocation (0–100)
    required: true,
  },
});

const beneficiarySchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  allocations: [allocationSchema], // per-chain allocation
});

const willSchema = new mongoose.Schema(
  {
    testator: {
      type: String, // MetaMask address of testator
      required: true,
    },
    beneficiaries: [beneficiarySchema],
  },
  { timestamps: true }
);


const Will = mongoose.model("Will", willSchema);

export default Will;