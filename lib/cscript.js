

'use strict';

const TempFile = require('./temp_file');
const exec     = require('child_process').execSync;

const cscript = (path, callback)=>{
    
    
    
    const obj = {};
    const str = exec('cscript ' + path).toString();
    str.replace(/\{\{(.+?)\=(.+?)\}\}/g, (_str, key, val)=>{
        obj[key] = val;
    });
    'function' === typeof callback && callback(obj);
    if(undefined === callback){ return obj; }
}


const cscript2 = content=>{
    const script_file = new TempFile('js');
    script_file.copyFromContent(content);
    const obj = cscript(script_file.getPath());
    script_file.remove();
    return obj;
}


cscript.use = cscript2;
module.exports = cscript;