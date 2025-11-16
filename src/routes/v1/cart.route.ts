import { Router } from "express";
import * as cartController from "../../controllers/cart.controller";
import { accessTokenMiddleware } from "../../middlewares/access-token.middleware";
import { asyncHandler } from "../../helpers/async-handler.helper";

const router = Router();

// -------------------------------- ARTICLE ROUTE GET --------------------------------//

/**
 * @swagger
 * /api/v1/carts:
 *   get:
 *     summary: Get user's shopping cart
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User's cart retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   $ref: '#/components/schemas/Cart'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", accessTokenMiddleware, asyncHandler(cartController.cart));

// ------------------------------ END ARTICLE ROUTE GET ------------------------------//

/**
 * @swagger
 * /api/v1/carts/add:
 *   post:
 *     summary: Add item to cart
 *     tags: [Cart]
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
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439011
 *               quantity:
 *                 type: number
 *                 example: 1
 *               attributes:
 *                 type: object
 *                 description: Product attributes (color, size, etc.)
 *     responses:
 *       200:
 *         description: Item added to cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/add",
  accessTokenMiddleware,
  asyncHandler(cartController.cartPost)
);

/**
 * @swagger
 * /api/v1/carts/delete:
 *   post:
 *     summary: Remove item from cart
 *     tags: [Cart]
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
 *         description: Item removed from cart
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/delete",
  accessTokenMiddleware,
  asyncHandler(cartController.cartDelete)
);

/**
 * @swagger
 * /api/v1/carts/update:
 *   patch:
 *     summary: Update cart item quantity
 *     tags: [Cart]
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
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439011
 *               quantity:
 *                 type: number
 *                 example: 2
 *     responses:
 *       200:
 *         description: Cart item updated
 *       401:
 *         description: Unauthorized
 */
router.patch(
  "/update",
  accessTokenMiddleware,
  asyncHandler(cartController.cartPatch)
);

/**
 * @swagger
 * /api/v1/carts/clear:
 *   patch:
 *     summary: Clear all items from cart
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Cart cleared successfully
 *       401:
 *         description: Unauthorized
 */
router.patch(
  "/clear",
  accessTokenMiddleware,
  asyncHandler(cartController.cartClearPatch)
);

export default router;
