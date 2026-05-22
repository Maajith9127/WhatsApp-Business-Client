import express from 'express';
const app = express();
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';

// const errorMiddleware=require('./middleware/error');
import path from 'path';
import { fileURLToPath } from 'url';

import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);  // Get the file URL and convert it to path
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname,'public')));
 
// To serve uploaded PDF is served statically
app.use('/uploads', express.static('uploads'));

app.use(cors({
    origin:[process.env.FRONTEND_URL,'*'],
    methods:['GET','POST','PUT','DELETE'],
    credentials:true
}));



app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));

import invoiceRoute from './routes/invoiceRoute.js';
import userRoute from "./routes/userRoute.js";
import credentialRoute from "./routes/credentialRoute.js";
import templateRoute from "./routes/templateRoute.js";
import mediaRoute from "./routes/mediaRoute.js";
import webhookRoute from "./routes/webhookRoute.js";
import authRoute from './routes/authRoute.js';

app.use('/auth', authRoute);
app.use('/invoice', invoiceRoute);
app.use('/user', userRoute);
app.use('/credential', credentialRoute);
app.use('/template', templateRoute);
app.use('/media', mediaRoute);
app.use('/webhook', webhookRoute);

// app.use('/api/v1',route);

// app.use(errorMiddleware);
export default app;