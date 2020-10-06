const text = require('./text-helper')
const canva = require('./canva-helper')


module.exports.brokerAction = brokerAction;

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
                    type:'exif', func:text.encode
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
                    type:'exif', func:text.decode
                }
            ]
        }
    ]

function brokerAction (action, dataType, data){
    const handle = handlers.find(x => { return action == x.handle }).function
    console.log(handle)
    const func = handle.find(x => { return dataType == x.type }).func
    console.log(func)
    return func(data, dataType)
}