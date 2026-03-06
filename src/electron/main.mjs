import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { isDev } from './util.mjs';
import { getStaticData, pollResources } from './ResourceManager.mjs';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const createWindow = () => {
    const mainWindow = new BrowserWindow({
        icon: path.join(__dirname, "../../desktopIcon.png"),
        webPreferences: {
            preload: path.join(__dirname, "preload.cjs")
        }
    });
    if (isDev()) {
        mainWindow.loadURL("http://localhost:5123");
    } else {
        mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
    }

    return mainWindow;
}

app.whenReady().then(() => {
    const mainWindow = createWindow();

    pollResources(mainWindow);

    ipcMain.handle("getStaticData", () => {
        return getStaticData();
    });

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});