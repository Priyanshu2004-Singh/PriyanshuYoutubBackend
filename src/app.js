import express from 'express';
import cors from 'cors';
// import bodyParser, { urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js';

const app = express();

//Middlewares
app.use(cors({
    origin : process.env.CORS_ORIGIN,
    optionsSuccessStatus:200,
    credentials:true,

}));
//Middleware for form 
app.use(express.json({limit:"16kb"}));
// for url data:
app.use(express.urlencoded({extended:true,limit:"100kb"}));
// Making our public folder static
app.use(express.static("public"))
//Accessing Cokkies and managing cookies:
app.use(cookieParser())
app.use("/api/v1/users",userRoutes);


export default app;