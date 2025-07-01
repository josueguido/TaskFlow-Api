import { Router } from "express";
import * as userController from "../controllers/userController";
import { validateRegister } from "../validators/userValidator";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", validateRegister, userController.register);
router.get("/", authMiddleware, userController.getUsers); // solo admins

export default router;
