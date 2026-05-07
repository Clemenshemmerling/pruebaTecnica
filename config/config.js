import dotenv from 'dotenv';

dotenv.config();

const config = {
    host: process.env.HOST || 'http://localhost',
    port: process.env.PORT || 3000,
    apiURL: process.env.API_URL
}

export default config;