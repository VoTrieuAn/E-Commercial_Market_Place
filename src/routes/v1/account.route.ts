import { Router } from "express";
import * as accountController from "../../controllers/account.controller";
import { verifyToken } from "../../middlewares/auth.middleware";

const router = Router();

// -------------------------------- ACCOUNT GET ROUTES ---------------------------//
// [GET] /admin/accounts/login
router.get("/login", accountController.login);

// [GET] /admin/accounts/logout
router.get("/logout", verifyToken, accountController.logout);
// -------------------------------- END ACCOUNT GET ROUTES -----------------------//

// -------------------------------- ACCOUNT POST ROUTES --------------------------//
// [POST] /admin/accounts/login
router.post("/login", accountController.loginPost);
// -------------------------------- END ACCOUNT POST ROUTES ----------------------//
export default router;
