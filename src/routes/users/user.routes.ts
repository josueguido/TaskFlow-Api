import { Router } from "express";
import * as userController from "../../controllers/users/user.controller";
import { validateRegister } from "../../validators/users/user.validator";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router = Router();

router.post("/register", validateRegister, userController.register);
router.get("/", authMiddleware, userController.getUsers); // solo admins

export default router;
