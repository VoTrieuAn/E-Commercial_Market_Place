import { Router } from "express";
import * as cartController from "../../controllers/cart.controller";
import { accessTokenMiddleware } from "../../middlewares/access-token.middleware";
import { asyncHandler } from "../../helpers/async-handler.helper";

const router = Router();

// -------------------------------- ARTICLE ROUTE GET --------------------------------//

router.get("/", accessTokenMiddleware, asyncHandler(cartController.cart));

// ------------------------------ END ARTICLE ROUTE GET ------------------------------//

router.post(
  "/add",
  accessTokenMiddleware,
  asyncHandler(cartController.cartPost)
);

router.post(
  "/delete",
  accessTokenMiddleware,
  asyncHandler(cartController.cartDelete)
);

router.patch(
  "/update",
  accessTokenMiddleware,
  asyncHandler(cartController.cartPatch)
);

router.patch(
  "/clear",
  accessTokenMiddleware,
  asyncHandler(cartController.cartClearPatch)
);

export default router;
