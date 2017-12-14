const builder = require('electron-builder');

builder.build({
    config: {
        directories: {
            output: 'dist-electron',
            app: 'dist'
        },
        win: {
            target: [
                'portable'
            ]
        }
    }
})
    .then(console.log)