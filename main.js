const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');

let appWindow;
let geneticAlgorithmResolver;

app.on('ready', () => {

    appWindow = new BrowserWindow({ width: 800, height: 800 });
    geneticAlgorithmResolver = new BrowserWindow({ width: 800, height: 800 });
    
    ipcMain.on('execute-resolver-method', (event, data) => {
        geneticAlgorithmResolver.webContents.send('execute-resolver-method', data);
    });
    
    ipcMain.on('resolver-reply', (event, reply) => {
        appWindow.webContents.send(`${reply.senderId}-reply`, reply);
    });

    appWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'app.html'),
        protocol: 'file:',
        slashes: true
    }));
    geneticAlgorithmResolver.loadURL(url.format({
        pathname: path.join(__dirname, 'resolver.html'),
        protocol: 'file:',
        slashes: true
    }))

    appWindow.on('close', () => app.exit());

    appWindow.webContents.openDevTools();
    geneticAlgorithmResolver.webContents.openDevTools();
});