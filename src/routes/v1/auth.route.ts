import { Router } from "express";
import * as accountController from "../../controllers/account.controller";
import { verifyToken } from "../../middlewares/auth.middleware";

const router = Router();

// -------------------------------- ACCOUNT GET ROUTES ---------------------------//
// [GET] /admin/accounts/logout
router.post("/logout", verifyToken, accountController.logout);
// -------------------------------- END ACCOUNT GET ROUTES -----------------------//

// -------------------------------- ACCOUNT POST ROUTES --------------------------//
// router.post("/register", accountController.register);

// [POST] /admin/accounts/login
router.post("/login", accountController.loginPost);
// -------------------------------- END ACCOUNT POST ROUTES ----------------------//
export default router;
