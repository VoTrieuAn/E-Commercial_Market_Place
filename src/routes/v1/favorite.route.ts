import { Router } from "express";
import * as favoriteController from "../../controllers/favorite.controller";
import { accessTokenMiddleware } from "../../middlewares/access-token.middleware";
import { asyncHandler } from "../../helpers/async-handler.helper";
import { validateDTO } from "../../validates/dto.validate";
import { updateUserDTO } from "../../models/dto/user.dto";
import { favoriteDTO, unFavoriteDTO } from "../../models/dto/favorite.dto";

const router = Router();

// -------------------------------- ARTICLE ROUTE GET --------------------------------//

/**
 * @swagger
 * /api/v1/favorites:
 *   get:
 *     summary: Get all user's favorite products
 *     tags: [Favorites]
 *     security:
 *       - BearerAuth: []
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
 *     responses:
 *       200:
 *         description: List of favorite products
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
 *                     favorites:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           product:
 *                             $ref: '#/components/schemas/Product'
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                     pagination:
 *                       $ref: '#/components/schemas/PaginationMeta'
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/",
  accessTokenMiddleware,
  asyncHandler(favoriteController.favorite)
);

// ------------------------------ END ARTICLE ROUTE GET ------------------------------//

// -------------------------------- ARTICLE ROUTE POST --------------------------------//

/**
 * @swagger
 * /api/v1/favorites:
 *   post:
 *     summary: Add product to favorites
 *     tags: [Favorites]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439011
 *     responses:
 *       200:
 *         description: Product added to favorites
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       400:
 *         description: Invalid input or product already in favorites
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/",
  accessTokenMiddleware,
  validateDTO(favoriteDTO),
  asyncHandler(favoriteController.favoritePost)
);

/**
 * @swagger
 * /api/v1/favorites/un-favorites:
 *   post:
 *     summary: Remove product from favorites
 *     tags: [Favorites]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439011
 *     responses:
 *       200:
 *         description: Product removed from favorites
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found in favorites
 */
router.post(
  "/un-favorites",
  accessTokenMiddleware,
  validateDTO(unFavoriteDTO),
  asyncHandler(favoriteController.unFavoritePost)
);

// ------------------------------ END ARTICLE ROUTE POST ------------------------------//

export default router;
