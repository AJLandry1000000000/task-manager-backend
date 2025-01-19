require('dotenv').config();

import express from 'express'; 
import bodyParser from 'body-parser';
import cors from 'cors';
import { router } from './router/index';

const PORT = process.env.PORT || 9999;

const app = express(); 

app.use(bodyParser.json());
app.use(cors());
app.use('/api/v1', router)

app.listen(PORT, async () => {
    console.log(`The task application server is running on port: ${PORT} `);
});