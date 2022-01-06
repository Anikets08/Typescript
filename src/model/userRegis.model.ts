import { Schema, model, CallbackError } from "mongoose";
const bcrypt = require("bcryptjs")

interface User {
    fName: string,
    lname: string,
    email: string,
    password: string,
    phone: number
}

const schema = new Schema<User>({
    fName: { type: String, required: true },
    lname: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true }
}, { timestamps: true })


schema.pre("save", function (next) {
    const user = this
    if (this.isModified("password") || this.isNew) {
        bcrypt.genSalt(10, function (saltError: CallbackError | undefined, salt: any) {
            if (saltError) {
                return next(saltError)
            } else {
                bcrypt.hash(user.password, salt, function (hashError: CallbackError | undefined, hash: any) {
                    if (hashError) {
                        return next(hashError)
                    }
                    user.password = hash
                    next()
                })
            }
        })
    } else {
        return next()
    }
})

const UserModel = model<User>('User', schema);

export default UserModel;