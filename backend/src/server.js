import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();
const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*" || process.env.CLIENT_URL,
    credentials: true,
  })
);

const PORT = 2222;

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`server is listening on http://localhost:${PORT}`);
  connectDB();
});
