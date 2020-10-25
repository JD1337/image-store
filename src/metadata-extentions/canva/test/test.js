const assert = require('chai').use(require('chai-bytes')).assert;

const canva = require('./../app.js');

const testbytes = [31, 32, 33, 34, 35, 36, 37, 38, 39, 30];
const testdesignid = '1234567890';

describe('Test Encoding', function(){
    it('Test Encoding DesignId', function(){
        let result = canva.encode(testdesignid);
        assert.typeOf(Uint8Array);
        assert.equalBytes(result, testbytes, 'Bytes are not equal');
    });
    it('Test Decoding DesignId', function(){
        let result = canva.deccode(testbytes);
        assert.typeOf(String);
        assert.equal(testdesignid);
    });
});
