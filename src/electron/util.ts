// isDev returns true if development environment, false otherwise
// import { loadEnvFile } from 'process';

import { ipcMain, WebContents, WebFrameMain } from "electron";
import { getUIPath } from "./pathResolver.js";
import { pathToFileURL } from "url";

export function isDev() {
  // TODO: make it so the env is loaded on its own
  // loadEnvFile(".development.env");
  // https://stackoverflow.com/questions/25112510/how-to-set-environment-variables-from-within-package-json#comment58812038_27090755

  return process.env.NODE_ENV == "development";
}

export function ipcHandle<Key extends keyof EventPayloadMapping>(
  key: Key,
  handler: () => EventPayloadMapping[Key],
) {
  ipcMain.handle(key, (event) => {
    if (!event.senderFrame) return;

    validateEventFrame(event.senderFrame!);

    return handler();
  });
}

export function ipcWebContentsSend<Key extends keyof EventPayloadMapping>(
  key: Key,
  webContents: WebContents,
  payload: EventPayloadMapping[Key],
) {
  webContents.send(key, payload);
}

/**
 * Throw error if frame is not loaded from the UI Path it's supposed to load from.
 */
export function validateEventFrame(frame: WebFrameMain) {
  console.log(frame.url);

  if (isDev() && new URL(frame.url).host === "localhost:5123") {
    return;
  }

  if (frame.url !== pathToFileURL(getUIPath()).toString()) {
    throw new Error("Malicious Event");
  }
}
