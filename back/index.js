import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import "./config/db.js";
import { Router } from "./routes/routes.js";

dotenv.config({ path: "./config/.env" });

const app = express();

const corsOptions = {
  origin: "https://contact-ms-client.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/contactMS", Router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
