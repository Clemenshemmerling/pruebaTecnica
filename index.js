import express from 'express';
import config from './config/config.js';
import getDemographicData from './controllers/demographic.controller.js';

const app = express();

app.get("/demographic-summary/:result", getDemographicData);

app.listen(config.port, () => {
    console.log(`Server running at ${config.host}:${config.port}`);
});