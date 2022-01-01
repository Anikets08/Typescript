import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const userRouter = Router();
userRouter.get("/greet", UserController.greetUser);
userRouter.get("/auth", UserController.authenticateUser);
userRouter.post("/regis", UserController.registerUser);
userRouter.get("/regis", UserController.getRegis);
userRouter.get("/regis/:email", UserController.getRegisbyEmail);

export { userRouter };