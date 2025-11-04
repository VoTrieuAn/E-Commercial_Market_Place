import { Router } from "express";
import * as cartController from "../../controllers/cart.controller";

const router = Router();

// -------------------------------- ARTICLE ROUTE GET --------------------------------//
// [GET] /admin/product/
router.get("/", cartController.cart);

// ------------------------------ END ARTICLE ROUTE GET ------------------------------//

// [GET] /admin/product/categories
router.post("/add", cartController.cartPost);
// [GET] /admin/product/attributes
router.patch("/update", cartController.cartPatch);

router.delete("/delete", cartController.cartDelete);

export default router;
