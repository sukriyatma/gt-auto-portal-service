module.exports = {
    apps: [
        {
            name: 'gt-auto-portal-service',
            script: 'node_modules/.bin/ts-node',
            args: 'src/main.ts',
            cwd: '.',
            watch: true,
            ignore_watch: ['node_modules', 'dist']
        }
    ]
}