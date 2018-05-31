'use strict';

const electron = require('electron');
// Module to control application life.
const { app } = electron;
// Module to create native browser window.
const { BrowserWindow, Menu, dialog } = electron;
const autoUpdater = require('electron-updater').autoUpdater;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let I18n = require('./electron-i18n/i18n');
const i18n = new I18n();

autoUpdater.checkForUpdates();
autoUpdater.on('update-available', (error) => {
    dialog.showMessageBox({
        type: 'info',
        buttons: [i18n.translate('ACCEPT')],
        title: i18n.translate('UPDATEAVAILABLE'),
        message: i18n.translate('AVAILABLEMESSAGE')
    });
});
autoUpdater.on('update-downloaded', (error) => {
    dialog.showMessageBox({
        type: 'info',
        buttons: [i18n.translate('LATER'), i18n.translate('ACCEPT')],
        title: i18n.translate('UPDATEDOWNLOADED'),
        message: i18n.translate('DOWNLOADEDMESSAGE')
    }, function(choice) {
        if (choice === 1) {
            autoUpdater.quitAndInstall();
        }
    });
    
});

function createWindow() {
    // Create the browser window.
    let size = electron.screen.getPrimaryDisplay().workAreaSize;
    win = new BrowserWindow({
        width: size.width,
        height: size.height,
        backgroundColor: '#fff'
            // webPreferences: {
            //     devTools: false
            // }
    });
    // and load the index.html of the app.
    win.loadURL(`file://${__dirname}/index.html`);
    // Emitted when the window is closed.
    // win.webContents.openDevTools();

    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    var template = [{
        label: i18n.translate('APPLICATION'),
        submenu: [
            { label: i18n.translate('QUIT'), accelerator: 'Command+Q', click: function() { app.quit(); } }
        ]
    }, {
        label: i18n.translate('EDIT'),
        submenu: [
            { label: i18n.translate('UNDO'), accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
            { label: i18n.translate('REDO'), accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
            { type: 'separator' },
            { label: i18n.translate('CUT'), accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
            { label: i18n.translate('COPY'), accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
            { label: i18n.translate('PASTE'), accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
            { label: i18n.translate('SELECTALL'), accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' }
        ]
    }];
    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
    createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
