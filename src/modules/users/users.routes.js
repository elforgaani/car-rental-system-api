import { Router } from "express";
import * as UsersController from "./users.controller.js";
import { signUpRequestInputVaildatorMiddleware, signInRequestInputVlidationMiddleware } from "../../middlewares/validators.middleware.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";


const router = Router();

router.post("/sign-up", signUpRequestInputVaildatorMiddleware, UsersController.signUp);
router.post("/sign-in", signInRequestInputVlidationMiddleware, UsersController.signIn);
router.get("/:email", UsersController.getSpecificUser);
router.get("/", UsersController.getAllUsers);
router.put("/", authMiddleware, UsersController.updateUser);
router.delete("/", authMiddleware, UsersController.deleteUser);

export default router;
