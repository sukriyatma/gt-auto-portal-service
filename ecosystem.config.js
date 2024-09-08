module.exports = {
    apps: [
        {
            name: 'gt-auto-portal-service',
            script: 'dist/main.js',
            instance: 1,
            exec_mode: 'fork',
                watch: true,
                ignore_watch: ['node_modules', 'dist'],
            env: {
                NODE_ENV: 'production'
            },
        },
    ],
};