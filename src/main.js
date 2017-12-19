const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');

const isDev = (process.env.NODE_ENV === 'development');

let appWindow;
let geneticAlgorithmResolver;

app.on('ready', () => {

    const url = isDev
    ? 'http://localhost:8080'
    : `file://${__dirname}/index.html`;

    appWindow = new BrowserWindow({ width: 800, height: 800 });
    // geneticAlgorithmResolver = new BrowserWindow({ width: 800, height: 800, show: isDev });

    // ipcMain.on('execute-resolver-method', (event, data) => {
    //     geneticAlgorithmResolver.webContents.send('execute-resolver-method', data);
    // });

    // ipcMain.on('resolver-reply', (event, reply) => {
    //     appWindow.webContents.send(`${reply.senderId}-reply`, reply);
    // });

    // ipcMain.on('solve-update', (event, data) => {
    //     appWindow.webContents.send('solve-update', data);
    // });

    appWindow.loadURL(url);
    // geneticAlgorithmResolver.loadURL(url.format({
    //     pathname: path.join(__dirname, 'resolver.html'),
    //     protocol: 'file:',
    //     slashes: true
    // }))

    if (isDev) {
        appWindow.webContents.openDevTools();
        // geneticAlgorithmResolver.webContents.openDevTools();
    }

    if (!isDev){
        appWindow.webContents.on('devtools-opened', (e) => {
            e.preventDefault();
        });
    }
});
