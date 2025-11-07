import { Router } from "express";
import * as feedbackController from "../../controllers/feedback.controller";
import { accessTokenMiddleware } from "../../middlewares/access-token.middleware";
import { asyncHandler } from "../../helpers/async-handler.helper";

const router = Router();

router.get(
  "/",
  accessTokenMiddleware,
  asyncHandler(feedbackController.feedbackByProduct)
);

router.get(
  "/user",
  accessTokenMiddleware,
  asyncHandler(feedbackController.feedbackByUser)
);

router.post(
  "/",
  accessTokenMiddleware,
  asyncHandler(feedbackController.feedbackPost)
);

router.patch(
  "/",
  accessTokenMiddleware,
  asyncHandler(feedbackController.feedbackPatch)
);

export default router;
