/**
 * Code copied from: https://github.com/oscmejia/os-utils
 * 
 * License:

(The MIT License)

Copyright (c) 2012 Oscar Mejia <osmejia@vovsolutions.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

import os from 'os';

/**
 * Apply callback on `% cpu free` value
 * @param {function(number)} callback 
 */
export function cpuFree(callback) {
    getCPUUsage(callback, true);
}

/**
 * Apply callback on `% cpu used` value
 * @param {function(number)} callback 
 */
export function cpuUsage(callback) {
    getCPUUsage(callback, false);
}

/**
 * @param {function(number)} callback function to apply on either `perc` or `(1 - perc)`
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
        user += cpu.times.user;
        nice += cpu.times.nice;
        sys += cpu.times.sys;
        irq += cpu.times.irq;
        idle += cpu.times.idle;
    }

    total = user + nice + sys + idle + irq;
    return {
        'idle': idle,
        'total': total
    };
}