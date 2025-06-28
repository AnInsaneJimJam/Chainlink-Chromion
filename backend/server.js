import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
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
app.use("/api/wallets", walletRoutes);
app.use("/api/wills", willRoutes); 

//connect db
mongoose.connect(process.env.MONGO_URI2).then(() => {
  app.listen(5000, () => {
    console.log("Connected to db and Listening on port 5000");
  });
});
