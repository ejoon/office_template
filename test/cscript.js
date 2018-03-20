
'use strict';

const fs       = require('fs');
const expect   = require('chai').expect;
const TempFile = require('./../lib/temp_file');
const cscript  = require('./../lib/cscript');

describe('function cscript', ()=>{
  
  it('function cscript', (done)=>{
    
    const js = new TempFile('js');
    js.copyFromContent('WScript.Echo("{{key=值}}");');
    cscript(js.getPath(), (obj)=>{
        expect(obj['key']).equal('值');
        done();
    });
    js.remove(10);
  });
  
  it('function cscript.use', ()=>{
      const obj = cscript.use('WScript.Echo("{{key=值}}");');
      expect(obj['key']).equal('值');
  });
});