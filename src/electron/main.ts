import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { ipcHandle, isDev } from "./util.js";
import { getStaticData, pollResources } from "./ResourceManager.js";
import { fileURLToPath } from "url";
import { getPreloadPath } from "./pathResolver.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createWindow = () => {
	const mainWindow = new BrowserWindow({
		icon: path.join(app.getAppPath(), "desktopIcon.png"),
		webPreferences: {
			preload: getPreloadPath(),
		},
	});
	if (isDev()) {
		mainWindow.loadURL("http://localhost:5123");
	} else {
		mainWindow.loadFile(
			path.join(app.getAppPath(), "/dist-react/index.html"),
		);
	}

	return mainWindow;
};

app.whenReady().then(() => {
	const mainWindow = createWindow();

	pollResources(mainWindow);

	ipcHandle('getStaticData', () => {
		return getStaticData();
	});

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});
