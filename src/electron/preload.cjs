const electron = require('electron');

/**
 * (callback: (statistics: any) => void) => callback({})
 */

electron.contextBridge.exposeInMainWorld("electron", {
    subscribeStatistics: (callback) => {
        electron.ipcRenderer.on("statistics", (_, data) => {
            callback(data);
        });
    },
    getStaticData: () => electron.ipcRenderer.invoke("getStaticData"),
});