import { Router } from "express";
import productRouter from "./product.route";
import articleRouter from "./article.route";
import cartRouter from "./cart.route";
import accessRouter from "./access.route";
import userRouter from "./user.route";
import favoriteRouter from "./favorite.route";
import orderRouter from "./order.route";
import feedbackRouter from "./feedback.route";

const router = Router();

router.use("/products", productRouter);

router.use("/articles", articleRouter);

router.use("/carts", cartRouter);

router.use("/access", accessRouter);

router.use("/users", userRouter);

router.use("/favorites", favoriteRouter);

router.use("/orders", orderRouter);

router.use("/feedbacks", feedbackRouter);

export default router;
