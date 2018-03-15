
'use strict';


const expect = require('chai').expect;
const client = require('./../lib/converter').getInstance();

describe('class converter-client', ()=>{
    
  it('method isUsage', ()=>{
      const isUsage = client.isUsage();
      expect(isUsage).equal(true);
  });
  
});

