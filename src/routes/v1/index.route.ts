import { Router } from "express";
import productRouter from "./product.route";
import articleRouter from "./article.route";
import cartRouter from "./cart.route";
import accessRouter from "./access.route";
import userRouter from "./user.route";

const router = Router();

router.use("/products", productRouter);

router.use("/articles", articleRouter);

router.use("/carts", cartRouter);

router.use("/access", accessRouter);

router.use("/users", userRouter);

export default router;
