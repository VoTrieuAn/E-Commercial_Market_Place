import { Router } from "express";
import * as articleController from "../../controllers/article.controller";

const router = Router();

// -------------------------------- ARTICLE ROUTE GET --------------------------------//

// [GET] /article
router.get("/", articleController.article);

// [GET] /article/categories
router.get("/categories", articleController.category);

// [GET] /article/:id
router.get("/:id", articleController.articleDetail);

// [GET] /article/categories/:id
router.get("/categories/:id", articleController.categoryDetail);

// ------------------------------ END ARTICLE ROUTE GET ------------------------------//

export default router;
