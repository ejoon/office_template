


'use strict';

const fs   = require('fs');
const path = require('path');
const uuid = require('uuid/V1');

const TempFile = class{
    
    constructor(ext){
        const TEMP_DIR = path.join(path.dirname(__dirname), '_temp');
        try{
            fs.mkdirSync(TEMP_DIR);
        }catch(e){}
        
        this._TEMP_DIR = TEMP_DIR;
        this._uuid = uuid();
        this._ext = ext;
        this._path = path.normalize(path.join(TEMP_DIR, this._uuid + '.' + ext));
    }
    
    getPath(){ return this._path; }
    copyFromFile(path){ const file = fs.readFileSync(path); fs.writeFileSync(this._path, file); }
    copyFromContent(content){ fs.writeFileSync(this._path, content); };
    remove(_time){ const time = _time || 1000; setTimeout(()=>fs.unlink(this._path), time); };
}

module.exports = TempFile;