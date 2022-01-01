import mongoose from "mongoose";
import config from "../config";

function connect() {
    const dbUri = config.dbUri as string
    return mongoose.connect(dbUri).then(() => {
        console.log("Database connected");
    }).catch(() => {
        console.log("There's some issue in connecting with the database");
    })
}


export default connect;