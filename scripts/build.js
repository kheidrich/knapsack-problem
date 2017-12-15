const builder = require('electron-builder');

builder.build({
    config: {
        directories: {
            output: 'dist-electron',
            app: 'dist'
        },
        win: {
            target: [
                {
                    target: 'portable',
                    arch: ['x64', 'ia32']
                }
            ],
            icon: 'build/knapsack-icon.ico'
        },
        nsis: {
            installerIcon: 'build/knapsack-icon.ico'
        }
    }
})
    .then(console.log)