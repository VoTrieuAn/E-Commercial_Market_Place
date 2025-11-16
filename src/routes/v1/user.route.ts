import { Router } from "express";
import * as userController from "../../controllers/user.controller";
import { accessTokenMiddleware } from "../../middlewares/access-token.middleware";
import { asyncHandler } from "../../helpers/async-handler.helper";
import { validateDTO } from "../../validates/dto.validate";
import { updateUserDTO } from "../../models/dto/user.dto";
import {
  createUserAddressDTO,
  updateUserAddressDTO,
} from "../../models/dto/user-address.dto";

const router = Router();

// -------------------------------- ARTICLE ROUTE GET --------------------------------//

/**
 * @swagger
 * /api/v1/users/me:
 *   get:
 *     summary: Get current user profile
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 */
router.get("/me", accessTokenMiddleware, asyncHandler(userController.getMe));

/**
 * @swagger
 * /api/v1/users/address:
 *   get:
 *     summary: Get all user addresses
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of user addresses
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
 *                     $ref: '#/components/schemas/UserAddress'
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/address",
  accessTokenMiddleware,
  asyncHandler(userController.address)
);

// ------------------------------ END ARTICLE ROUTE GET ------------------------------//

// -------------------------------- ARTICLE ROUTE POST --------------------------------//

/**
 * @swagger
 * /api/v1/users/me:
 *   post:
 *     summary: Update current user profile
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe Updated
 *               phone:
 *                 type: string
 *                 example: +84987654321
 *               avatar:
 *                 type: string
 *                 example: https://example.com/new-avatar.jpg
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *     responses:
 *       200:
 *         description: Profile updated successfully
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
  "/me",
  accessTokenMiddleware,
  validateDTO(updateUserDTO),
  asyncHandler(userController.updateMe)
);

/**
 * @swagger
 * /api/v1/users/address:
 *   post:
 *     summary: Create a new address
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - phone
 *               - address
 *               - ward
 *               - district
 *               - province
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: John Doe
 *               phone:
 *                 type: string
 *                 example: +84123456789
 *               address:
 *                 type: string
 *                 example: 123 Main Street
 *               ward:
 *                 type: string
 *                 example: Ward 1
 *               district:
 *                 type: string
 *                 example: District 1
 *               province:
 *                 type: string
 *                 example: Ho Chi Minh City
 *               isDefault:
 *                 type: boolean
 *                 default: false
 *     responses:
 *       201:
 *         description: Address created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/address",
  accessTokenMiddleware,
  validateDTO(createUserAddressDTO),
  asyncHandler(userController.addressPost)
);
// ------------------------------ END ARTICLE ROUTE POST ------------------------------//
// -------------------------------- ARTICLE ROUTE PATCH --------------------------------//

/**
 * @swagger
 * /api/v1/users/address:
 *   patch:
 *     summary: Update an existing address
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - addressId
 *             properties:
 *               addressId:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439011
 *               fullName:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               ward:
 *                 type: string
 *               district:
 *                 type: string
 *               province:
 *                 type: string
 *               isDefault:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Address updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Address not found
 */
router.patch(
  "/address",
  accessTokenMiddleware,
  validateDTO(updateUserAddressDTO),
  asyncHandler(userController.addressPatch)
);

// ------------------------------ END ARTICLE ROUTE PATCH ------------------------------//

export default router;
