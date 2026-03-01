import { app, BrowserWindow } from 'electron';
import path from 'path';


const createWindow = () => {
    const mainWindow = new BrowserWindow({});
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});