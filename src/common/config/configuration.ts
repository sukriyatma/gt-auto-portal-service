import 'dotenv/config';

export default () => ({
    port: parseInt(process.env.PORT, 10) || 3001,
    database: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        databaseName: process.env.DATABASE_NAME
    },
    discord: {
        discordClientId: process.env.DISCORD_CLIENT_ID,
        discordClientSecret: process.env.DISCORD_CLIENT_SECRET
    },
    firebase: {
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL
    },
    frontendUrl: process.env.FRONTEND_URL || 3000
})