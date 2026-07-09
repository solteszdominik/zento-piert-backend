import { Router } from "express";
import { orderController } from "../controllers/orderController";

const router = Router();

router.post("/", orderController.createOrder);

export default router;
