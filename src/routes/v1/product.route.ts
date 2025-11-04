import { Router } from "express";
import * as productController from "../../controllers/product.controller";

const router = Router();

// -------------------------------- ARTICLE ROUTE GET --------------------------------//
// [GET] /admin/product/
router.get("/", productController.product);
// [GET] /admin/product/categories
router.get("/categories", productController.category);
// [GET] /admin/product/attributes
router.get("/attributes", productController.attribute);
// ------------------------------ END ARTICLE ROUTE GET ------------------------------//
export default router;
