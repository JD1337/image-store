const { expect, assert } = require('chai').use(require('chai-bytes'));
//const API = require('.././src/index.js');
const ImageHandler = require('.././src/image-extentions/filetype-broker.js');
const MetaDataHandler = require('.././src/metadata-extentions/datatype-broker.js');
//const PNG = require('./src/image-extentions/png/app.js');

const png = require('./data/png.js');
const cropper = require('./data/cropper.js');

//const imagewithmeta = fs.readFileSync('./test/meta.png');
//const imagenometa = fs.readFileSync('./test/nometa.png');


describe('API', function(){
    it('API Should be able to take an input consisting of an Image File and determine if the filetype is supported', function(){
        expect(function () {
            ImageHandler('getmeta', png.jpg, null);
        }).to.throw();
    });

     it('API Should be able to take an input consisting of a supported Image File and direct the processing to the applicable module', function(){
        expect(function () {
            ImageHandler('getmeta', png.png, null);
        }).to.not.throw();
     });

     it('API Should be able to take an input of An Action to determine if the action is supported', function(){
        expect(function () {
            ImageHandler('unsupportedaction', png.png, null);
        }).to.throw();
     });

     it('API Should be able to take an input of Non-Image Data and determine if that data is supported', function(){
        expect(function () {
            ImageHandler('insertmeta', png.png, JSON.parse('{"unsupported": "data"}'));
        }).to.throw();
     });

     it('API Should be able to take an input of Supported Non-Image Data and direct the processing to the applicable module', function(){
        expect(function () {
            ImageHandler('insertmeta', png.png, [JSON.parse('[{"type":"cropper","data":{"originalurl":"","imagedata":{"rotate":0,"scaleX":1,"scaleY":1,"naturalWidth":32,"naturalHeight":32,"aspectRatio":1,"width":400,"height":400,"left":0,"top":0},"cropboxdata":{"left":40,"top":40,"width":320,"height":320},"canvasdata":{"left":0,"top":0,"width":400,"height":400,"naturalWidth":32,"naturalHeight":32},"data":{"x":3,"y":3,"width":26,"height":26,"rotate":0,"scaleX":1,"scaleY":1},"containerdata":{"width":400,"height":400}}}]')]);
        }).to.not.throw();
     });

});

describe('PNG Module', function(){

     it('Module should be able to take an input of an Image and insert new non-image data into the image', function(){
        expect(function () {
            ImageHandler('insertmeta', png.png, [JSON.parse('[{"type":"cropper","data":{"originalurl":"","imagedata":{"rotate":0,"scaleX":1,"scaleY":1,"naturalWidth":32,"naturalHeight":32,"aspectRatio":1,"width":400,"height":400,"left":0,"top":0},"cropboxdata":{"left":40,"top":40,"width":320,"height":320},"canvasdata":{"left":0,"top":0,"width":400,"height":400,"naturalWidth":32,"naturalHeight":32},"data":{"x":3,"y":3,"width":26,"height":26,"rotate":0,"scaleX":1,"scaleY":1},"containerdata":{"width":400,"height":400}}}]')]);
        }).to.not.throw();
     });

     it('Module should be able to take an input of an image and return all the non-image data from an image', function(){
        var meta = [];
        expect(function () {
            meta = ImageHandler('getmeta', png.png, null).data;
        }).to.not.throw(); 
        assert.equal(meta.length, 6);
     });

});

 describe('CropperJS Module', function(){
     it('Module should be able take an input of a JavaScript Object and be able to binary encode it', function(){
        expect(function () {
            MetaDataHandler('encode', 'cropper', cropper.decoded);
        }).to.not.throw();
        assert.equalBytes(MetaDataHandler('encode', 'cropper', cropper.decoded).data, cropper.encoded);
     });

     it('Module should be able to take an input of a binary object and be able to decode it into a JavaScript Object', function(){
        expect(function () {
            MetaDataHandler('decode', 'cropper', cropper.encoded);
        }).to.not.throw();
        assert.deepEqual(MetaDataHandler('decode', 'cropper', cropper.encoded).data, cropper.decoded);
     });

     it('Module should be able take an input of a JavaScript Object and determine that it is valid CropperJS Format', function(){
        expect(function () {
            MetaDataHandler('encode', 'cropper', cropper.decoded);
        }).to.not.throw();
        expect(function () {
            MetaDataHandler('encode', 'cropper', null);
        }).to.throw();
     });

 });