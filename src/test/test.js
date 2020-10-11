const assert = require('chai').assert;
const app = require('./../index.js');
const fs = require('fs');


const imagewithmeta = fs.readFileSync('./test/meta.png');
const imagenometa = fs.readFileSync('./test/nometa.png');


describe('App', function(){
    it('app should return hello', function(){
        assert.equal(app.getImageChunks, imagechunks)
    });
});