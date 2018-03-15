


'use strict';

const fs       = require('fs');
const TempFile = require('./temp_file');
const cscript  = require('./cscript');

const fmt = (str, map)=>{
    return str.replace(/\{\{(.+?)\}\}/g, (_, key)=>map[key]);
}

const FormatConverterClient = class{
    constructor(){
    }
    excel2Xml(){
        return (from, to)=>new Excel2Xml(from, to);
    }
    word2xml(){
        return (from, to)=>new Word2Xml(from, to);
    }
    xml2excel(){
        return (from, to)=>new Xml2Excel(from, to);
    }
    excel2xml(){
        return (from, to)=>new Xml2Excel(from, to);
    }
    isUsage(){
        const script =
        `
            var excel, word;
            try{
                excel = new ActiveXObject("Excel.Application");
                excel.DisplayAlerts = false;
                excel.Visible = false;
                word = new ActiveXObject("Word.Application");
                word.DisplayAlerts = false;
                word.Visible = false;
            }catch(e){
                WScript.Echo("{{error=NO_ENGINE}}");
            }finally{
                excel.Quit();
                word.Quit();
                excel = null;
                word = null;
            }
        `;
        const tempFile = new TempFile('js');
        tempFile.copyFromContent(script);
        const obj = cscript(tempFile.getPath());
        return 'NO_ENGINE' !== obj.error;
    }
}

class Converter{
    constructor(from, to){
        this.from = from;
        this.to = to;
    }
    convert(){
         
        let inputExt;
        this.from.replace(/\.(.+)$/, ext=>{
            inputExt = ext;
        });
        
        let source_copy = new TempFile(inputExt);
        source_copy.copyFromFile(this.from);
        
        let to = new TempFile(this.outputExt);
        
        let FROM = source_copy.getPath();
        let TO = to.getPath();
        
        let content = fmt(this._content, {FROM : FROM, TO : TO});
        let script = new TempFile('js');
        script.copyFromContent(content);
        
        cscript(script.getPath());
        return fs.readFileSync(TO);
    }
    convertUTF8(){
        return iconv.encode(this.convert(), 'utf-8');
    }
}

const Excel2Xml = class{
    
}

let instance;
module.exports = { getInstance : ()=>instance || (instance = new FormatConverterClient()) }

