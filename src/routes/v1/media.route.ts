import { Router } from "express";
import { accessTokenMiddleware } from "../../middlewares/access-token.middleware";
import { asyncHandler } from "../../helpers/async-handler.helper";
import * as mediaController from "../../controllers/media.controller";

const router = Router();

router.post(
  "/upload-image",
  accessTokenMiddleware,
  asyncHandler(mediaController.uploadImage)
);

export default router;
