import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDb = async ()=>{
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log(`MongoDB connected. DB HOST: ${connection.connection.host}`)

    } catch (error) {
        console.error("Error while Connecting to database: ", error);
        process.exit(1);
    }
}

export default connectDb;