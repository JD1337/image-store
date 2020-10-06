const fs = require('fs')

const ftbroker = require('./filetype-broker').brokerAction
const databroker = require('./datatype-broker').brokerAction

const buffer = fs.readFileSync('./test/sampleWithExifData.png')

const designid = '1234567890'
const encodeddata = databroker('encode', 'canva', designid)
const newImage = ftbroker('insertmeta', buffer, [encodeddata])
const newMeta = ftbroker('getmeta', newImage.data)


decodeAllMeta(newMeta)
console.log(newMeta)


function decodeAllMeta(meta){
    newMeta.data.forEach(x => {
        const newData = databroker('decode', x.type, x.data)
        console.log('newData')
        console.log(newData)
        x.data = newData
    });
}