

'use strict';

const fs       = require('fs');
const expect   = require('chai').expect;
const TempFile = require('./../lib/temp_file');

describe('class TempFile', ()=>{
  
  let tempFile;
  const CONTENT = 'print 0;';
  it('method constructor', ()=>{
      tempFile = new TempFile('js');
  });
  it('method copyFromContent', ()=>{
      tempFile.copyFromContent(CONTENT);
  });
  it('method others', ()=>{
      const path = tempFile.getPath();
      const content = fs.readFileSync(path, 'utf-8');
      expect(content).equal(CONTENT);
      tempFile.remove();
  });
});