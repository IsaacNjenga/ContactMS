import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./config/db.js";
import { Router } from "./routes/routes.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [`https://contact-ms-client.vercel.app`],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
dotenv.config({ path: "./config/.env" });
app.use("/contactMS", Router);

app.listen(process.env.PORT, () => {
  console.log(`Connected on ${process.env.PORT}`);
});
