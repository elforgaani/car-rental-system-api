import { Router } from "express";
import * as UsersController from "./users.controller.js";
import { signUpRequestInputVaildator } from "../../middlewares/validators.middleware.js";

const router = Router();

router.post("/sign-up", signUpRequestInputVaildator, UsersController.signUp);
router.post("/sign-in", UsersController.signIn);
router.get("/:id", UsersController.getSpecificUser);
router.get("/", UsersController.getAllUsers);
router.put("/", UsersController.updateUser);
router.delete("/", UsersController.deleteUser);

export default router;
