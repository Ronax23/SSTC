import express from 'express'
import {configDotenv} from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import appRoute from './approuting/common/approute.mjs'
configDotenv();
const app=express();
const PORT = process.env.PORT || 8000;

app.use(express.json({limit:"10mb"}));
app.use(cors(
    {
        origin: process.env.FRONTEND_URL,
        credentials: true
    }
));
app.use(cookieParser());

// Render health check — must respond before heavy route handlers
app.get('/health', (_req, res) => res.status(200).send('ok'));

app.use(appRoute);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
});