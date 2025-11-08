import { Router } from "express";
import * as otpController from "../../controllers/otp.controller";
import { asyncHandler } from "../../helpers/async-handler.helper";

const router = Router();

router.post("/send", asyncHandler(otpController.sendOtp));

router.post("/verify", asyncHandler(otpController.verifyOtp));

export default router;
