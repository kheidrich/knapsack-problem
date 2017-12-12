const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');

let appWindow;
let geneticAlgorithmResolver;

app.on('ready', () => {

    appWindow = new BrowserWindow({ width: 800, height: 800 });
    geneticAlgorithmResolver = new BrowserWindow({ width: 800, height: 800 });
    
    ipcMain.on('ui-message', (event, arg) => {
        geneticAlgorithmResolver.webContents.send('ui-messages', arg);
    });
    
    ipcMain.on('genetic-algorithm-resolver-message', (event, arg) => {
        console.log(arg);
    })

    appWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'dist/app.html'),
        protocol: 'file:',
        slashes: true
    }));
    geneticAlgorithmResolver.loadURL(url.format({
        pathname: path.join(__dirname, 'dist/resolver.html'),
        protocol: 'file:',
        slashes: true
    }))

    appWindow.on('close', () => app.exit());

    appWindow.webContents.openDevTools();
    geneticAlgorithmResolver.webContents.openDevTools();
});