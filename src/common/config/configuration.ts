import { config } from 'dotenv';

const environment = process.env.NODE_ENV || 'development';
config({
    path: `.env.${environment}.local`
})

export default () => ({
    port: parseInt(process.env.PORT, 10) || 3001,
    database: {
        host: process.env.DATABASE_HOST || 'localhost',
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
        username: process.env.DATABASE_USERNAME || 'user',
        password: process.env.DATABASE_PASSWORD || 'password',
        databaseName: process.env.DATABASE_NAME || 'database'
    },
    discord: {
        discordClientId: process.env.DISCORD_CLIENT_ID || '',
        discordClientSecret: process.env.DISCORD_CLIENT_SECRET || ''
    },
    firebase: {
        projectId: process.env.FIREBASE_PROJECT_ID || '',
        privateKey: process.env.FIREBASE_PRIVATE_KEY || '',
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL || ''
    },
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000'
})

console.log(`Loaded .env.${environment}.local`)