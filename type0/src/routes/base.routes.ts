import { Router } from "express";
const baseRouter = Router();

baseRouter.get("/home", (req, res) => {
    res.send("Home ");
})

baseRouter.get("/user", (req, res) => {
    res.send("Base User!");
})

export { baseRouter };