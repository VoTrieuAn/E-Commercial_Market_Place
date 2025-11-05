import { Router } from "express";
import * as cartController from "../../controllers/cart.controller";
import { accessTokenMiddleware } from "../../middlewares/access-token.middleware";

const router = Router();

// -------------------------------- ARTICLE ROUTE GET --------------------------------//
// [GET] /admin/product/
router.get("/", accessTokenMiddleware, cartController.cart);

// ------------------------------ END ARTICLE ROUTE GET ------------------------------//

// [GET] /admin/product/categories
router.post("/add", accessTokenMiddleware, cartController.cartPost);
// [GET] /admin/product/attributes
router.patch("/update", accessTokenMiddleware, cartController.cartPatch);

router.post("/delete", accessTokenMiddleware, cartController.cartDelete);

export default router;
