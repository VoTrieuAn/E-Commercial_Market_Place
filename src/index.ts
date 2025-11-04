import "dotenv/config";
import express from "express";
import apiV1Router from "./routes/index.route";
import { connectDB } from "./configs/database.config";
import cookieParser from "cookie-parser";
import compression from "compression";

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(compression());

// Cho phép gửi data lên dạng json
app.use(express.json());

app.use(cookieParser());

app.use("/api", apiV1Router);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
