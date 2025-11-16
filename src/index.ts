import "dotenv/config";
import express from "express";
import cors from "cors";
import apiV1Router from "./routes/index.route";
import { connectDB } from "./configs/database.config";
import cookieParser from "cookie-parser";
import compression from "compression";
import defaultErrorRequestHandler from "./middlewares/error-handler.helper";
import { initFolder } from "./utils/file";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./configs/swagger.config";

const app = express();
const port = process.env.PORT || 3000;

initFolder();

connectDB();

// Enable CORS for all routes
app.use(
  cors({
    origin: true, // Allow all origins in development
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

app.use(compression());

// Cho phép gửi data lên dạng json
app.use(express.json());

app.use(cookieParser());

// Swagger Documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "E-Commerce API Documentation",
  })
);

app.use("/api", apiV1Router);

app.use(defaultErrorRequestHandler);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
  console.log(
    `API Documentation available at http://localhost:${port}/api-docs`
  );
});
