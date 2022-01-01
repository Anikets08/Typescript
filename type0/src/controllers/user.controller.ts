import express, { Request, Response } from "express";
import UserModel from "../model/userRegis.model";

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

    static async registerUser(req: Request, res: Response) {
        try {
            console.log("started");

            let { fName, lName, email, phone } = req.body;
            const doc = new UserModel({
                fName: fName,
                lname: lName,
                email: email,
                phone: phone
            })
            const resUser = await doc.save();
            res.send({
                "userData": resUser
            })
        } catch (error: unknown) {
            const { message } = error as Error
            res.send({
                "error": message,
            })
        }


    }

    static getRegis(req: Request, res: Response) {
        console.log("WORKING");
        UserModel.find().exec(function (err, users) {
            try {
                console.log('users : ', users);
                return res.send(users);
            } catch (_) {
                console.log('err', err);
                return res.send(err);
            }

        });
    }

    static getRegisbyEmail(req: Request, res: Response) {
        let { email } = req.params;
        UserModel.find({ email: email }).exec(function (err, users) {
            try {
                console.log('users : ', users);
                if (users.length > 0) {
                    return res.send({
                        "data": users,
                    })
                } return res.send({
                    "data": 0,
                })
            } catch (_) {
                console.log('err', err);
                return res.send(err);
            }
        });
    }
}