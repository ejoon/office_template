

'use strict';

const exec = require('child_process').execSync;
const cscript = (path, callback)=>{
    const obj = {};
    const str = exec('cscript ' + path).toString();
    str.replace(/\{\{(.+?)\=(.+?)\}\}/g, (_str, key, val)=>{
        obj[key] = val;
    });
    'function' === typeof callback && callback(obj);
    if(undefined === callback){ return obj; }
}
module.exports = cscript;