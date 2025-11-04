import { Router } from "express";
import productRouter from "./product.route";
import articleRouter from "./article.route";
import accountRouter from "./account.route";

const router = Router();

router.use("/products", productRouter);

router.use("/articles", articleRouter);

router.use("/accounts", accountRouter);

export default router;
