import { Router } from "express";
import * as voucherController from "../../controllers/voucher.controller";
import { accessTokenMiddleware } from "../../middlewares/access-token.middleware";
import { asyncHandler } from "../../helpers/async-handler.helper";

const router = Router();

router.get("/", accessTokenMiddleware, voucherController.voucher);

// routerDiscount.get(
//   "/product-code",
//   asyncHandler(getAllDiscountCodeWithProductsController)
// );

// routerDiscount.post("/amount", asyncHandler(getDiscountAmountController));

router.get("/", accessTokenMiddleware, asyncHandler(voucherController.voucher));

router.post(
  "/",
  accessTokenMiddleware,
  asyncHandler(voucherController.voucherPost)
);

export default router;
