


'use strict';

const fs       = require('fs');
const TempFile = require('./temp_file');
const cscript  = require('./cscript');

const fmt = (str, map)=>{
    return str.replace(/\<\<(.+?)\>\>/g, (_, key)=>map[key]);
}

const FormatConverterClient = class{
    constructor(){
    }
    excel2Xml(){ return (from, to)=>new Excel2Xml(from, to); }
    word2xml(){ return (from, to)=>new Word2Xml(from, to); }
    xml2excel(){ return (from, to)=>new Xml2Excel(from, to); }
    excel2xml(){ return (from, to)=>new Xml2Excel(from, to); }
    isUsage(){
        const content =
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
        const obj = cscript.use(content);
        return 'NO_ENGINE' !== obj.error;
    }
}

class Converter{
    constructor(from, to){
        this.from = from;
        this.to = to;
    }
    convert(){
        console.log(this.outputExt);
        let inputExt;
        this.from.replace(/\.(.+)$/, (str, ext)=>{
            inputExt = ext;
        });
        
        let source_copy = new TempFile(inputExt);
        source_copy.copyFromFile(this.from);
        
        console.log(this.outputExt);
        let output = new TempFile(this.outputExt);
        
        
        
        console.log(source_copy.getPath(), output.getPath());
        
        let content = fmt(this.content, {FROM : source_copy.getPath(), TO : output.getPath()});
        cscript.use(content);
        source_copy.remove();
        
        let success = fs.readFileSync(output.getPath());
        
        if('string' === typeof this.to) fs.writeFileSync(this.to, success);
        
        output.remove();
        source_copy.remove();
        
        return success;
    }
    convertUTF8(){
        return iconv.encode(this.convert(), 'utf-8');
    }
}

class Excel2Xml extends Converter{
    constructor(from, to){
        super.outputExt = 'xml';
        super(from, to);       
        
        
        super.content = `
            try
            var obj = new ActiveXObject("Excel.Application");
            obj.DisplayAlerts = false;
            obj.Visible = false;
            var book = obj.Workbooks.Open("<<FROM>>");
            book.SaveAs("<<TO>>", 46);
            book.Close();
            obj.Quit();
            book = null;
            obj = null;            
        `;
    }
}

class Xml2Excel extends Converter{}

let instance;
module.exports = { getInstance : ()=>instance || (instance = new FormatConverterClient()) }

