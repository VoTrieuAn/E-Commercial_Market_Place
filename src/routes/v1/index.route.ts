import { Router } from "express";
import productRouter from "./product.route";
import articleRouter from "./article.route";
import cartRouter from "./cart.route";
import accessRouter from "./access.route";

const router = Router();

router.use("/products", productRouter);

router.use("/articles", articleRouter);

router.use("/carts", cartRouter);

router.use("/access", accessRouter);

export default router;
