import { Router } from "express";
import * as cartController from "../../controllers/cart.controller";

const router = Router();

// -------------------------------- ARTICLE ROUTE GET --------------------------------//
// [GET] /users/me
router.get("/me", cartController.cart);

// ------------------------------ END ARTICLE ROUTE GET ------------------------------//

export default router;
