
'use strict';


const expect = require('chai').expect;
const client = require('./../lib/converter').getInstance();

describe('class converter-client', function(){
  
  this.timeout(60000);
  
  it('method isUsage', ()=>{
      const isUsage = client.isUsage();
      expect(isUsage).equal(true);
  });
  
  it('class Excel2Xml', ()=>{
      const convert = client.excel2xml();
      convert('test/123.xlsx', 'test/1234.xml').convert();
  });
  
});

