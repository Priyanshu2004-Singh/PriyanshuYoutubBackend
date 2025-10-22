import express from 'express';
import dotenv from 'dotenv';
import connectDb from './db/db.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { debug } from 'console';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') },{debug:true});

//Initiaslising App:
const app = express();

//Important Variables: 
const PORT = process.env.PORT || 3000;

//! Connecting DataBase and Starting Server:
connectDb()
.then(()=>{
    // If having err on server Side:
    app.on("error",(err)=>{
        console.error("Server Side err while connecting to db : ",err);
        process.exit(1);
    })
    app.listen(PORT,()=>{
        console.log(`Port is running on : ${PORT}`);
    })
})
.catch((err)=>{
    console.error(`Error Found : ${err}`);
})

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