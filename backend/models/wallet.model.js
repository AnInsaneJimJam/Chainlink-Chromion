import mongoose from "mongoose";

const WalletSchema = new mongoose.Schema({
  userAddress: { type: String, required: true, unique: true },
  wallets: {
    type: Map,
    of: String, // chainName => walletAddress
    default: {}
  }
});

export default mongoose.model("Wallet", WalletSchema);
