import express from "express";
import EthereumWill from "../models/ethereum/ethereum.model.js";
import PolygonWill from "../models/polygon/polygon.model.js";
import SolanaWill from "../models/solana/solana.model.js";
import AvalancheWill from "../models/avalanche/avalanche.model.js";
import BaseWill from "../models/base/base.model.js";

const router = express.Router();

// GET /fullwill/:testator - Get the full will for a testator across all chains
router.get("/:testator", async (req, res) => {
    const testator = req.params.testator;
    try {
        const [eth, poly, sol, avax, base] = await Promise.all([
            EthereumWill.findOne({ testator }),
            PolygonWill.findOne({ testator }),
            SolanaWill.findOne({ testator }),
            AvalancheWill.findOne({ testator }),
            BaseWill.findOne({ testator })
        ]);

        if (!eth && !poly && !sol && !avax && !base) {
            return res.status(404).json({ error: "No will found for this testator on any chain." });
        }

        res.json({
            testator,
            wills: [eth, poly, sol, avax, base].filter(Boolean)
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router; 