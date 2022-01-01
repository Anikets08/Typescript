import express, { Request, Response } from "express";

export class UserController {
    static greetUser(req: Request, res: Response) {
        let { username } = req.body;
        res.send('Hello ' + username);
    }

    static authenticateUser(req: Request, res: Response) {
        let token = req.headers.authorization as string;
        if (token === "password") {
            return res.send({
                authenticated: true,
                data: "user authenticated"
            })
        }
        return res.send({
            authenticated: false,
            data: "invalid user"
        })

    }
}