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

router.get("/", accessTokenMiddleware, asyncHandler(voucherController.voucher));

router.get(
  "/user",
  accessTokenMiddleware,
  asyncHandler(voucherController.voucherByUser)
);

router.post(
  "/",
  accessTokenMiddleware,
  asyncHandler(voucherController.voucherPost)
);

// [POST]
router.post(
  "/amount",
  accessTokenMiddleware,
  asyncHandler(voucherController.amountPost)
);

export default router;
