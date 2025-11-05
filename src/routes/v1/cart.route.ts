import { Router } from "express";
import * as cartController from "../../controllers/cart.controller";
import { accessTokenMiddleware } from "../../middlewares/access-token.middleware";
import { asyncHandler } from "../../helpers/async-handler.helper";

const router = Router();

// -------------------------------- ARTICLE ROUTE GET --------------------------------//
// [GET] /admin/product/
router.get("/", accessTokenMiddleware, asyncHandler(cartController.cart));

// ------------------------------ END ARTICLE ROUTE GET ------------------------------//

// [GET] /admin/product/categories
router.post(
  "/add",
  accessTokenMiddleware,
  asyncHandler(cartController.cartPost)
);
// [GET] /admin/product/attributes
router.patch(
  "/update",
  accessTokenMiddleware,
  asyncHandler(cartController.cartPatch)
);

router.post(
  "/delete",
  accessTokenMiddleware,
  asyncHandler(cartController.cartDelete)
);

export default router;
