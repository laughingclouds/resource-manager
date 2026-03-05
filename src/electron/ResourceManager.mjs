import { cpuUsage } from "./osutils.mjs";


const POLLING_INTERVAL = 500; // in ms

export function pollResources() {
    setInterval(async () => {
        const cpuUsage = await getCpuUsage();
        console.log(cpuUsage);
    }, POLLING_INTERVAL);
}

/**
 * 
 * @returns {Promise<number>}
 */
function getCpuUsage() {
    return new Promise(resolve => {
        cpuUsage(resolve);
    });
}