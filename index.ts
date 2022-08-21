//const express = require('express')
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose, { ConnectOptions } from 'mongoose';
import { userRoute } from './routes/users.route'


dotenv.config();

let mongo_url: string = process.env.MONGO_LOCAL_URL?.toString() || 'mongodb://localhost:27017/test';

const app: Express = express();
const port = process.env.PORT;

// MiddleWare
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());


// API Routes
app.use('/api', userRoute);



// Connect to MongoDB
mongoose.connect(mongo_url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
} as ConnectOptions ).then(()=> console.log('Database Connected'));




app.get('/', (req: Request, res: Response)=>{
    res.send('Express + Typescript server');
})

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });