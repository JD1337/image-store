const assert = require('chai').use(require('chai-bytes')).assert;
const cropperjs = require('./../app.js');

const testbson = [31, 32, 33, 34, 35, 36, 37, 38, 39, 30];
const testjson = '1234567890';

describe('Test Encoding', function(){
    it('Test Encoding JSON', function(){
        let result = cropperjs.encode(testjson);
        assert.typeOf(Uint8Array);
        assert.equalBytes(result, testbson, 'Bytes are not equal');
    });
    it('Test Decoding BSON', function(){
        let result = cropperjs.decode(testbson);
        assert.typeOf(String);
        assert.equal(testjson);
    });
});
