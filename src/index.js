import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDb from './db/db.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

//Initiaslising App:
const app = express();

//Middlewares
app.use(cors());
app.use(bodyParser.json());

//Important Variables: 
const PORT = process.env.PORT || 3000;

connectDb()

/*
//database connection Using IIFE: ()() first one contain an arrow function:
const app = express();
(async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        app.on('error',(error)=>{
            console.log("Can't talk to the database:");
            throw error;
        })
        app.listen(PORT, () => {
    console.log(`Port is running on ${PORT}`)
});
    } catch (error) {
        console.error("Error is : ",error);
        throw error;
    }
})()
*/

//Get route
app.get("/",(req,res)=>{
    res.send("Welcome to MongoDb Connection Server:")
})

app.listen(PORT,()=>{
    console.log(`App is Running on port ${PORT}`)
})