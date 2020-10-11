const assert = require('chai').use(require('chai-bytes')).assert;

const exif = require('./../exif-helper.js');

const exifbytes = [];
const exifjson = '';

describe('Test Encoding', function(){
    it('Test Encoding exif', function(){
        let result = exif.encode(exifjson);
        assert.typeOf(Uint8Array);
        assert.equalBytes(result, exifbytes, 'Bytes are not equal');
    });
    it('Test Decoding exif', function(){
        let result = exif.deccode(exifbytes);
        assert.typeOf(String);
        assert.equal(exifjson);
    });
});
