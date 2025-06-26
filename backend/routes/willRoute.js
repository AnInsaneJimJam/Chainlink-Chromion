import express from "express"
const router = express.Router();
import Will from "../models/will.js"

// POST /api/wills
router.post("/", async (req, res) => {
  try {
    const { testator, beneficiaries } = req.body;

    if (!testator || !Array.isArray(beneficiaries) || beneficiaries.length === 0) {
      return res.status(400).json({ error: "Invalid will structure" });
    }

    const newWill = new Will({ testator, beneficiaries });

    const saved = await newWill.save();

    res.status(201).json({ message: "Will saved successfully", will: saved });
  } catch (error) {
    console.error("Error saving will:", error);
    res.status(500).json({ error: "Failed to save will" });
  }
});

router.get("/:testator", async (req, res) => {
  try {
    const testator = req.params.testator; // normalize address
    const will = await Will.findOne({ testator });

    if (!will) {
      return res.status(404).json({ message: "Will not found" });
    }

    res.status(200).json(will);
  } catch (error) {
    console.error("Error fetching will:", error);
    res.status(500).json({ error: "Failed to fetch will" });
  }
});

export default router
