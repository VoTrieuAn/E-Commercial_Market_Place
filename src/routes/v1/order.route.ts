import { Router } from "express";
import * as orderController from "../../controllers/order.controller";
import { accessTokenMiddleware } from "../../middlewares/access-token.middleware";

const router = Router();

// [POST] /orders/
router.post(
  "/",
  accessTokenMiddleware,
  //validate
  orderController.createOrder
);

// [GET] /orders/
router.get("/", accessTokenMiddleware, orderController.listOrders);

// [GET] /orders/:id
router.get("/:id", accessTokenMiddleware, orderController.getOrder);

// [PATCH] /orders/:id/status
router.patch(
  "/:id/status",
  accessTokenMiddleware,
  // validate
  orderController.updateOrderStatus
);

router.patch("/:id/cancel", accessTokenMiddleware, orderController.cancelOrder);

export default router;
