import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { config } from 'dotenv';
import cloudinary from 'cloudinary';
import mongoose from 'mongoose';

import './firebaseConfig.js';
import 'dotenv/config';

import { openAIRoute, userRoute, postRoute } from './routes/index.js';
import { authorizationJWT } from './middleware/index.js';

config();

const app = express();

const PORT = process.env.PORT || 7000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(), bodyParser.json({ limit: '10mb' }));

app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.all('/', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
});

cloudinary.config({
    cloud_name: process.env.CLOUND_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

mongoose.set('strictQuery', false);
mongoose
    .connect(process.env.URL_MONGODB)
    .then(() => {
        console.log('MongoDB Connected!');
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log('err', err);
    });

userRoute.use(authorizationJWT);

app.use('/api/openAI', openAIRoute);
app.use('/api/user', userRoute);
app.use('/api/post', postRoute);

app.get('/', async (req, res) => {
    res.status(200).json({
        message: 'Server is running',
    });
});
