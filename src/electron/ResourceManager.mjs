import { cpuUsage, freemempercentage } from "./osutils.mjs";


const POLLING_INTERVAL = 500; // in ms

export function pollResources() {
    setInterval(async () => {
        const cpuUsage = await getCpuUsage();
        const ramUsage = getRamUsage();
        console.log({cpuUsage, ramUsage});
    }, POLLING_INTERVAL);
}

/**
 * Apply `resolve` on `% cpu used`. Basically return the `% cpu used` if
 * promise resolves successfully.
 * @returns {Promise<number>}
 */
function getCpuUsage() {
    return new Promise(resolve => {
        cpuUsage(resolve);
    });
}

/**
 * Return `% ram used`
 * @returns {number}
 */
function getRamUsage() {
    return 1 - freemempercentage();
}