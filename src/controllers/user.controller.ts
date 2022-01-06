import { Request, Response } from "express";
import UserModel from "../model/userRegis.model";
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

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

            let { fName, lName, email, phone, password } = req.body;
            const doc = new UserModel({
                fName: fName,
                lname: lName,
                email: email,
                phone: phone,
                password: password
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

    static loginUser(req: Request, res: Response) {
        let { email, password } = req.body;
        UserModel.findOne({ email: email }, (err: any, user: any) => {
            if (err) {
                return res.send({
                    authenticated: false,
                    data: "invalid user"
                })
            }
            if (!user) {
                return res.send({
                    authenticated: false,
                    data: "invalid user"
                })
            }
            bcrypt.compare(password, user.password, (err: any, result: boolean) => {
                if (err) {
                    return res.send({
                        authenticated: false,
                        data: "invalid user"
                    })
                }
                if (!result) {
                    return res.send({
                        authenticated: false,
                        data: "invalid user"
                    })
                }
                const newUser = user["_id"];
                const accessToken = jwt.sign(newUser.toString(), "3bcda4579473bdc24a5fb7a737ac4a70a8443fca8131dd779edace2e8a7fe28a3875882543a91c40a037079c77dda56378f492767bfafcb0bc7d506e99a09544")
                return res.send({
                    authenticated: true,
                    data: "user authenticated",
                    token: accessToken
                })
            })
        })
    }

}