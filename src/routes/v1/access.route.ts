import { Router } from "express";
import * as accessController from "../../controllers/access.controller";
import { validateDTO } from "../../validates/dto.validate";
import {
  loginDTO,
  refreshTokenDTO,
  registerDTO,
} from "../../models/dto/access.dto";
import { asyncHandler } from "../../helpers/async-handler.helper";
import { accessTokenMiddleware } from "../../middlewares/access-token.middleware";
import { refreshTokenMiddleware } from "../../middlewares/refresh-token.middleware";
const router = Router();

// -------------------------------- ACCOUNT GET ROUTES ---------------------------//

// -------------------------------- END ACCOUNT GET ROUTES -----------------------//

// -------------------------------- ACCOUNT POST ROUTES --------------------------//

// [POST] /access/logout
router.post("/logout", accessTokenMiddleware, accessController.logout);

// [POST] /access/register
router.post(
  "/register",
  validateDTO(registerDTO),
  asyncHandler(accessController.registerPost)
);

// [POST] /access/login
router.post(
  "/login",
  validateDTO(loginDTO),
  asyncHandler(accessController.loginPost)
);

// [POST] /access/refresh-token
router.post(
  "/refresh-token",
  validateDTO(refreshTokenDTO),
  refreshTokenMiddleware,
  asyncHandler(accessController.refreshToken)
);
// -------------------------------- END ACCOUNT POST ROUTES ----------------------//

export default router;
