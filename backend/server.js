import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import ethereumRoutes from "./routes/ethereum/ethereum.route.js";
import avalancheRoutes from "./routes/avalanche/avalanche.route.js";
import solanaRoutes from "./routes/solana/solana.route.js";
import baseRoutes from "./routes/base/base.route.js";
import polygonRoutes from "./routes/polygon/polygon.route.js";
import fullWillRoutes from "./routes/fullwill.route.js";
import walletRoutes from "./routes/wallet.route.js"
import willRoutes from "./routes/willRoute.js"
dotenv.config();

const app = express();
//GET--get info, PUT--update info, POST--give info, DELETE--delete info
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(
  cors({
    origin: "http://localhost:8080",
  })
);

//routes
app.use("/api/ethereum", ethereumRoutes);
app.use("/api/avalanche", avalancheRoutes);
app.use("/api/solana", solanaRoutes);
app.use("/api/polygon", polygonRoutes);
app.use("/api/base", baseRoutes);
app.use("/api", fullWillRoutes);
app.use("/api/wallets", walletRoutes);
app.use("/api/wills", willRoutes); 

//connect db
mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(5000, () => {
    console.log("Connected to db and Listening on port 5000");
  });
});
