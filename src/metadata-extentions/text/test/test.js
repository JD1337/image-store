const assert = require('chai').use(require('chai-bytes')).assert;

const exif = require('./../app.js');

const latin1bytes = [];
const latin1text = '';
const utf8bytes = [];
const utf8text = '';
const compressedbytes = [];
const compressedtext = '';

describe('Test Encoding', function(){
    it('Test Encoding Latin1 Text', function(){
        let result = exif.encode(latin1text);
        assert.typeOf(Uint8Array);
        assert.equalBytes(result, latin1bytes, 'Bytes are not equal');
    });
    it('Test Encoding UTF-8 Text', function(){
        let result = exif.encode(utf8text);
        assert.typeOf(Uint8Array);
        assert.equalBytes(result, utf8bytes, 'Bytes are not equal');
    });
    it('Test Encoding Compressed UTF-8 Text', function(){
        let result = exif.encode();
        assert.typeOf(Uint8Array);
        assert.equalBytes(result, compressedbytes, 'Bytes are not equal');
    });
    it('Test Decoding Latin1 Text', function(){
        let result = exif.deccode(latin1bytes);
        assert.typeOf(String);
        assert.equal(latin1text);
    });
    it('Test Decoding UTF-8 Text', function(){
        let result = exif.deccode(utf8bytes);
        assert.typeOf(String);
        assert.equal(utf8text);
    });
    it('Test Decoding Compressed UTF-8 Text', function(){
        let result = exif.deccode(compressedbytes);
        assert.typeOf(String);
        assert.equal(compressedtext);
    });
});
