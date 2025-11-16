import { Router } from "express";
import * as articleController from "../../controllers/article.controller";

const router = Router();

// -------------------------------- ARTICLE ROUTE GET --------------------------------//

/**
 * @swagger
 * /api/v1/articles:
 *   get:
 *     summary: Get all articles/blog posts
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category ID
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by title or content
 *     responses:
 *       200:
 *         description: List of articles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     articles:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Article'
 *                     pagination:
 *                       $ref: '#/components/schemas/PaginationMeta'
 */
router.get("/", articleController.article);

/**
 * @swagger
 * /api/v1/articles/categories:
 *   get:
 *     summary: Get all article categories
 *     tags: [Articles]
 *     responses:
 *       200:
 *         description: List of article categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Category'
 */
router.get("/categories", articleController.category);

/**
 * @swagger
 * /api/v1/articles/{id}:
 *   get:
 *     summary: Get article details by ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Article ID
 *     responses:
 *       200:
 *         description: Article details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   $ref: '#/components/schemas/Article'
 *       404:
 *         description: Article not found
 */
router.get("/:id", articleController.articleDetail);

/**
 * @swagger
 * /api/v1/articles/categories/{id}:
 *   get:
 *     summary: Get article category details by ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found
 */
router.get("/categories/:id", articleController.categoryDetail);

// ------------------------------ END ARTICLE ROUTE GET ------------------------------//

export default router;
