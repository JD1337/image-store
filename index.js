const fs = require('fs')

const broker = require('./filetype-broker').brokerAction

const canva = require('./canva-helper')
const text = require('./text-helper')


const buffer = fs.readFileSync('./test/PNG_EXIF.png')

const designid = '1234567890'

const newImage = broker('insertmeta', buffer, [canva.encode(designid)])

const newMeta = broker('getmeta', newImage.data)

console.log(newMeta)
