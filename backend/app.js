import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(cors({ credentials: true, origin: process.env.CORS_ORIGIN }));

export default app;
