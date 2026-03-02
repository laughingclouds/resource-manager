import os from 'os';

/**
 * Apply callback on `% cpu free` value
 * @param {*} callback 
 */
exports.cpuFree = function(callback) {
    getCPUUsage(callback, true);
}

/**
 * Apply callback on `% cpu used` value
 * @param {function} callback 
 */
exports.cpuUsage = function(callback) {
    getCPUUsage(callback, false);
}

/**
 * @param {function} callback function to apply on either `perc` or `(1 - perc)`
 * @param {boolean} free if true use `perc` else use `(1 - perc)`
 */
function getCPUUsage(callback, free) {
    /*
    * If free === true | (perc) is % cpu free
    * If free === false | (1 - perc) is % cpu used
    */
    const stats1 = getCPUInfo();
    const startIdle = stats1.idle;
    const startTotal = stats1.total; 

    setTimeout(function() {
        const stats2 = getCPUInfo();
        const endIdle = stats2.idle;
        const endTotal = stats2.total;

        const idle = endIdle - startIdle;
        const total = endTotal - startTotal;
        const perc = idle / total;

        if (free === true)
            callback(perc);
        else
            callback((1 - perc));
    }, 1000);
}

function getCPUInfo(callback) {
    const cpus = os.cpus();

    let user = 0;
    let nice = 0;
    let sys = 0;
    let idle = 0;
    let irq = 0;
    let total = 0;

    for (const cpu of cpus) {
        user += cpus[cpu].times.user;
        nice += cpus[cpu].times.nice;
        sys += cpus[cpu].times.sys;
        irq += cpus[cpu].times.irq;
        idle += cpus[cpu].times.idle;
    }

    total = user + nice + sys + idle + irq;

    return {
        'idle': idle,
        'total': total
    };
}