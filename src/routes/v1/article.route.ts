import { Router } from "express";
import * as articleController from "../../controllers/article.controller";

const router = Router();

// -------------------------------- ARTICLE ROUTE GET --------------------------------//

// [GET] /admin/article
router.get("/", articleController.article);

// [GET] /admin/article/category
router.get("/category", articleController.category);

// ------------------------------ END ARTICLE ROUTE GET ------------------------------//

export default router;
