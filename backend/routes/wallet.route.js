import express from "express";
import Wallet from "../models/wallet.model.js";

const router = express.Router();

// POST /api/wallets
router.post("/", async (req, res) => {
  const { userAddress, chain, walletAddress } = req.body;

  try {
    const updated = await Wallet.findOneAndUpdate(
      { userAddress },
      { $set: { [`wallets.${chain}`]: walletAddress } },
      { upsert: true, new: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save wallet." });
  }
});

// GET /api/wallets/:userAddress
router.get("/:userAddress", async (req, res) => {
  try {
    console.log("Looking for:", req.params.userAddress);
    const wallets = await Wallet.findOne({ userAddress: req.params.userAddress });
    if (!wallets) return res.status(404).json({ error: "User not found" });
    res.json({ wallets: wallets.wallets });
  } catch (err) {
    console.error("Error in GET /api/wallets/:userAddress:", err);
    res.status(500).json({ error: "Failed to fetch wallets." });
  }
});


export default router;
