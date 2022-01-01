import { Schema, model, connect } from "mongoose";

interface User {
    fName: string,
    lname: string,
    email: string,
    phone: number
}

const schema = new Schema<User>({
    fName: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true }
}, { timestamps: true })

const UserModel = model<User>('User', schema);

export default UserModel;