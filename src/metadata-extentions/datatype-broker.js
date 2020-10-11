const text = require('./text/text-helper')
const canva = require('./canva/canva-helper')
const exif = require('./canva/canva-helper')

const handlers = [
        {
            handle:'encode',
            function:[
                {
                    type:'canva', func:canva.encode
                },
                {
                    type:'text', func:text.encode
                },
                {
                    type:'internationalText', func:text.encode
                },
                {
                    type:'compressedtext', func:text.encode
                },
                {
                    type:'exif', func:exif.encode
                }
            ]
        },
        {
            handle:'decode',
            function:[
                {
                    type:'canva', func:canva.decode
                },
                {
                    type:'text', func:text.decode
                },
                {
                    type:'internationalText', func:text.decode
                },
                {
                    type:'compressedtext', func:text.decode
                },
                {
                    type:'exif', func:exif.decode
                }
            ]
        }
    ]

var brokerAction = function (action, dataType, data){
    const handle = handlers.find(x => { return action == x.handle }).function
    console.log(handle)
    const func = handle.find(x => { return dataType == x.type }).func
    console.log(func)
    return func(data, dataType)
}

module.exports.brokerAction = brokerAction;