import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { createServer } from "http";
import dotenv from "dotenv";
import  websiteRouter  from "./routes/websiteRouter";
import { errorMiddleware } from "./middleware/errorHandler";
import { connectDB } from "./config/db";
import { startMonitoring } from "./utils/isAlive";

dotenv.config();
 
connectDB(); 
const app = express();

const httpServer = createServer(app);

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    // origin: "https:localhost:5173", 
    origin: true, 
    credentials: true, 
  })
);

app.get("/isAlive", (req, res) => {
  res.status(200).json('alive');
});

app.use("/websites", websiteRouter);
startMonitoring();

app.use(errorMiddleware);

httpServer.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
