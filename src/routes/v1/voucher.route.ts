import { Router } from "express";
import * as voucherController from "../../controllers/voucher.controller";
import { accessTokenMiddleware } from "../../middlewares/access-token.middleware";
import { asyncHandler } from "../../helpers/async-handler.helper";

const router = Router();

/**
 * @swagger
 * /api/v1/vouchers:
 *   get:
 *     summary: Get all available vouchers
 *     tags: [Vouchers]
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
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Filter by active status
 *     responses:
 *       200:
 *         description: List of vouchers
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
 *                     vouchers:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Voucher'
 *                     pagination:
 *                       $ref: '#/components/schemas/PaginationMeta'
 *       401:
 *         description: Unauthorized
 */
router.get("/", accessTokenMiddleware, voucherController.voucher);

/**
 * @swagger
 * /api/v1/vouchers/user:
 *   get:
 *     summary: Get vouchers available for current user
 *     tags: [Vouchers]
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
 *         description: List of user's vouchers
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
 *                     $ref: '#/components/schemas/Voucher'
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/user",
  accessTokenMiddleware,
  asyncHandler(voucherController.voucherByUser)
);

/**
 * @swagger
 * /api/v1/vouchers:
 *   post:
 *     summary: Apply a voucher code
 *     tags: [Vouchers]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *             properties:
 *               code:
 *                 type: string
 *                 example: SUMMER2024
 *               orderAmount:
 *                 type: number
 *                 example: 1000000
 *                 description: Total order amount to validate minimum order value
 *     responses:
 *       200:
 *         description: Voucher applied successfully
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
 *                     voucher:
 *                       $ref: '#/components/schemas/Voucher'
 *                     discountAmount:
 *                       type: number
 *       400:
 *         description: Invalid or expired voucher
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/",
  accessTokenMiddleware,
  asyncHandler(voucherController.voucherPost)
);

/**
 * @swagger
 * /api/v1/vouchers/amount:
 *   post:
 *     summary: Calculate discount amount for a voucher code
 *     tags: [Vouchers]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - orderAmount
 *             properties:
 *               code:
 *                 type: string
 *                 example: SUMMER2024
 *               orderAmount:
 *                 type: number
 *                 example: 1000000
 *     responses:
 *       200:
 *         description: Discount amount calculated
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
 *                     discountAmount:
 *                       type: number
 *                       example: 100000
 *                     finalAmount:
 *                       type: number
 *                       example: 900000
 *       400:
 *         description: Invalid voucher or amount
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/amount",
  accessTokenMiddleware,
  asyncHandler(voucherController.amountPost)
);

export default router;
