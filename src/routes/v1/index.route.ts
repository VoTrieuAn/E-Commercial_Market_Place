import { Router } from "express";
import productRouter from "./product.route";
import articleRouter from "./article.route";
import cartRouter from "./cart.route";
import accessRouter from "./access.route";
import userRouter from "./user.route";
import favoriteRouter from "./favorite.route";
import orderRouter from "./order.route";
import feedbackRouter from "./feedback.route";
import mediaRouter from "./media.route";

import voucherRouter from "./voucher.route";

const router = Router();

router.use("/products", productRouter);

router.use("/articles", articleRouter);

router.use("/carts", cartRouter);

router.use("/access", accessRouter);

router.use("/users", userRouter);

router.use("/favorites", favoriteRouter);

router.use("/orders", orderRouter);

router.use("/feedbacks", feedbackRouter);

router.use("/medias", mediaRouter);

router.use("/vouchers", voucherRouter);

export default router;
