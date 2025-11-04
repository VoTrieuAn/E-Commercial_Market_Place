import { Router } from "express";
import * as productController from "../../controllers/product.controller";

const router = Router();

// -------------------------------- ARTICLE ROUTE GET --------------------------------//
// [GET] /products
router.get("/", productController.product);

// [GET] /products/categories
router.get("/categories", productController.category);

// [GET] /products/attributes
router.get("/attributes", productController.attribute);

// [GET] /products/:id
router.get("/:id", productController.productDetail);

// [GET] /products/categories/:id
router.get("/categories/:id", productController.categoryDetail);

// ------------------------------ END ARTICLE ROUTE GET ------------------------------//
export default router;
