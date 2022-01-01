import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const userRouter = Router();
userRouter.get("/greet", UserController.greetUser);
userRouter.get("/auth", UserController.authenticateUser);

export { userRouter };