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
// [GET] /users/me
router.get("/me", accessTokenMiddleware, asyncHandler(userController.getMe));

router.get(
  "/address",
  accessTokenMiddleware,
  asyncHandler(userController.address)
);

// ------------------------------ END ARTICLE ROUTE GET ------------------------------//

// -------------------------------- ARTICLE ROUTE POST --------------------------------//

// [POST] /users/me
router.post(
  "/me",
  accessTokenMiddleware,
  validateDTO(updateUserDTO),
  asyncHandler(userController.updateMe)
);

router.post(
  "/address",
  accessTokenMiddleware,
  validateDTO(createUserAddressDTO),
  asyncHandler(userController.addressPost)
);
// ------------------------------ END ARTICLE ROUTE POST ------------------------------//
// -------------------------------- ARTICLE ROUTE PATCH --------------------------------//

router.patch(
  "/address",
  accessTokenMiddleware,
  validateDTO(updateUserAddressDTO),
  asyncHandler(userController.addressPatch)
);

// ------------------------------ END ARTICLE ROUTE PATCH ------------------------------//

export default router;
