import { Router } from "express";
import * as userController from "../../controllers/user.controller";
import { accessTokenMiddleware } from "../../middlewares/access-token.middleware";
import { asyncHandler } from "../../helpers/async-handler.helper";

const router = Router();

// -------------------------------- ARTICLE ROUTE GET --------------------------------//
// [GET] /users/me
router.get("/me", accessTokenMiddleware, asyncHandler(userController.getMe));

// ------------------------------ END ARTICLE ROUTE GET ------------------------------//

export default router;
