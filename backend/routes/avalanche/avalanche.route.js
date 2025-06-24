import express from "express";
import AvalancheWill from "../../models/avalanche/avalanche.model.js";
const router = express.Router();

// CREATE a will for a testator
router.post("/", async (req, res) => {
  try {
    const will = await AvalancheWill.create(req.body);
    res.status(201).json(will);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET a will by testator address
router.get("/:testator", async (req, res) => {
  try {
    const will = await AvalancheWill.findOne({ testator: req.params.testator });
    if (!will) return res.status(404).json({ error: "Will not found" });
    res.json(will);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE a beneficiary’s share
router.put("/:testator/:beneficiary", async (req, res) => {
  try {
    const { nativeShare, usdcShare } = req.body;
    const will = await AvalancheWill.findOne({ testator: req.params.testator });

    if (!will) return res.status(404).json({ error: "Will not found" });

    const ben = will.beneficiaries.find(b => b.address === req.params.beneficiary);
    if (!ben) return res.status(404).json({ error: "Beneficiary not found" });

    ben.nativeShare = nativeShare ?? ben.nativeShare;
    ben.usdcShare = usdcShare ?? ben.usdcShare;

    await will.save();
    res.json(will);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ADD a beneficiary to the will
router.post("/:testator/beneficiaries", async (req, res) => {
  try {
    const { address, nativeShare, usdcShare} = req.body;
    const will = await AvalancheWill.findOne({ testator: req.params.testator });

    if (!will) return res.status(404).json({ error: "Will not found" });

    // Check if already exists
    const exists = will.beneficiaries.some(b => b.address === address);
    if (exists) return res.status(400).json({ error: "Beneficiary already exists" });

    // Push beneficiary
    will.beneficiaries.push({ address, nativeShare, usdcShare });

    await will.save();
    res.status(201).json({ message: "Beneficiary added", will });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a beneficiary from a will
router.delete("/:testator/:beneficiary", async (req, res) => {
  try {
    const will = await AvalancheWill.findOne({ testator: req.params.testator });
    if (!will) return res.status(404).json({ error: "Will not found" });

    will.beneficiaries = will.beneficiaries.filter(b => b.address !== req.params.beneficiary);

    await will.save();
    res.json({ message: "Beneficiary removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router