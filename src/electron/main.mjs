import { app, BrowserWindow } from 'electron';
import path from 'path';
import { isDev } from './util.mjs';
import { pollResources } from './ResourceManager.mjs';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const createWindow = () => {
    const mainWindow = new BrowserWindow({});
    if (isDev()) {
        mainWindow.loadURL("http://localhost:5123");
    } else {
        mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
    }
}

app.whenReady().then(() => {
    createWindow();

    pollResources();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});