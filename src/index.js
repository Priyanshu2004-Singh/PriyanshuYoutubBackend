// import express from 'express';
// Load .env before importing other modules so environment variables are available at module-evaluation time
import './loadEnv.js';
import connectDb from './db/db.js';
import path from 'path';
import { fileURLToPath } from 'url';
// import { debug } from 'console';
import app from './app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// dotenv is loaded via the side-effect import above

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