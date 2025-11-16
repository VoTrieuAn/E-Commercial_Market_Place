import { Router } from "express";
import { accessTokenMiddleware } from "../../middlewares/access-token.middleware";
import { asyncHandler } from "../../helpers/async-handler.helper";
import * as mediaController from "../../controllers/media.controller";

const router = Router();

/**
 * @swagger
 * /api/v1/medias/upload-image:
 *   post:
 *     summary: Upload an image file
 *     tags: [Media]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file to upload (JPEG, PNG, GIF, WebP)
 *               folder:
 *                 type: string
 *                 description: Optional folder name to organize uploads
 *                 example: products
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Image uploaded successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                       example: https://example.com/uploads/image.jpg
 *                     filename:
 *                       type: string
 *                     size:
 *                       type: number
 *                     mimeType:
 *                       type: string
 *       400:
 *         description: Invalid file or file too large
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/upload-image",
  accessTokenMiddleware,
  asyncHandler(mediaController.uploadImage)
);

/**
 * @swagger
 * /api/v1/medias/upload-video:
 *   post:
 *     summary: Upload a video file
 *     tags: [Media]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - video
 *             properties:
 *               video:
 *                 type: string
 *                 format: binary
 *                 description: Video file to upload (MP4, AVI, MOV, WebM)
 *               folder:
 *                 type: string
 *                 description: Optional folder name to organize uploads
 *                 example: product-demos
 *     responses:
 *       200:
 *         description: Video uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Video uploaded successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                       example: https://example.com/uploads/video.mp4
 *                     filename:
 *                       type: string
 *                     size:
 *                       type: number
 *                     mimeType:
 *                       type: string
 *                     duration:
 *                       type: number
 *                       description: Video duration in seconds
 *       400:
 *         description: Invalid file or file too large
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/upload-video",
  accessTokenMiddleware,
  asyncHandler(mediaController.uploadVideo)
);

export default router;
