import { Router } from "express";
import * as userController from "../../controllers/user.controller";
import { accessTokenMiddleware } from "../../middlewares/access-token.middleware";
import { asyncHandler } from "../../helpers/async-handler.helper";
import { validateDTO } from "../../validates/dto.validate";
import { updateUserDTO } from "../../models/dto/user.dto";

const router = Router();

// -------------------------------- ARTICLE ROUTE GET --------------------------------//
// [GET] /users/me
router.get("/me", accessTokenMiddleware, asyncHandler(userController.getMe));

// ------------------------------ END ARTICLE ROUTE GET ------------------------------//

// -------------------------------- ARTICLE ROUTE POST --------------------------------//

// [POST] /users/me
router.post(
  "/me",
  accessTokenMiddleware,
  validateDTO(updateUserDTO),
  asyncHandler(userController.updateMe)
);

// ------------------------------ END ARTICLE ROUTE POST ------------------------------//

export default router;
