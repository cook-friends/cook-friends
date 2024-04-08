import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(morgan("dev"));
app.use(cors({ credentials: true, origin: process.env.CORS_ORIGIN }));
app.use(express.json());
app.use(cookieParser());
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "./tmp",
    })
);

app.use("/api/v1", authRoutes);
app.use("/api/v1", userRoutes);

export default app;
