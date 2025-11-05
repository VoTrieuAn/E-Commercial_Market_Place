import { Router } from "express";
import * as favoriteController from "../../controllers/favorite.controller";
import { accessTokenMiddleware } from "../../middlewares/access-token.middleware";
import { asyncHandler } from "../../helpers/async-handler.helper";
import { validateDTO } from "../../validates/dto.validate";
import { updateUserDTO } from "../../models/dto/user.dto";
import { favoriteDTO, unFavoriteDTO } from "../../models/dto/favorite.dto";

const router = Router();

// -------------------------------- ARTICLE ROUTE GET --------------------------------//
// [GET] /favorites
router.get(
  "/",
  accessTokenMiddleware,
  asyncHandler(favoriteController.favorite)
);

// ------------------------------ END ARTICLE ROUTE GET ------------------------------//

// -------------------------------- ARTICLE ROUTE POST --------------------------------//

// [POST] /favorites
router.post(
  "/",
  accessTokenMiddleware,
  validateDTO(favoriteDTO),
  asyncHandler(favoriteController.favoritePost)
);

// [POST] /un-favorites
router.post(
  "/un-favorites",
  accessTokenMiddleware,
  validateDTO(unFavoriteDTO),
  asyncHandler(favoriteController.unFavoritePost)
);

// ------------------------------ END ARTICLE ROUTE POST ------------------------------//

export default router;
