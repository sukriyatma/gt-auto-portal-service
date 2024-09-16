module.exports = {
    apps: [
        {
            name: 'gaportal-service', // The name of your PM2 application
            script: 'dist/main.js', // The entry point of your NestJS application
    
            // General Options
            // instances: 'max', // Run the app in cluster mode, max will auto-scale based on the number of CPU cores
            exec_mode: 'cluster', // Enables cluster mode to take advantage of multi-core systems
            watch: false, // Disable watch in production for performance reasons
            max_memory_restart: '1G', // Restart the app if it exceeds 1GB memory usage
            autorestart: true, // Automatically restart the app if it crashes
            shutdown_with_message: true, // Ensure smooth shutdown with NestJS
    
            // Log configuration
            output: './logs/app.log', // Path to standard output logs
            error: './logs/err.log', // Path to error logs
            log_date_format: 'YYYY-MM-DD HH:mm Z', // Format for log timestamps
    
            // Environment Variables
            env: {
                NODE_ENV: 'development',
                PORT: 3000, // Default port for development
            },
            env_production: {
                NODE_ENV: 'production',
                PORT: 3001, // Port for production environment
            },
    
            // Advanced Options
            exp_backoff_restart_delay: 100, // Time (ms) to wait before restarting a crashed instance (for exponential backoff)
            max_restarts: 10, // Number of allowed restarts within a timeframe before stopping the process
            kill_timeout: 5000, // Time (ms) to wait before forcefully killing the app during shutdown
        },
    ],
  
    // Deployment Configuration
    // deploy: {
    //     production: {
    //         user: 'gaportal', // SSH username for server
    //         host: '159.65.10.143', // Server IP
    //         ref: 'origin/main', // Git branch to pull
    //         repo: 'git@github.com:your-repo/nestjs-app.git', // Git repository URL
    //         path: '/var/www/nestjs-app', // Path where the app will be deployed
    //         "post-deploy":'npm install && npm run build && pm2 reload pm2.config.js --env production', // Post-deployment actions: install dependencies, build app, and reload PM2
    //         env: {
    //             NODE_ENV: 'production',
    //         },
    //     },
    // },
};