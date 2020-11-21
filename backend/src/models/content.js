const {model , Schema} = require('mongoose')

const contentSchema = new Schema({
    articleName: String,
    lang: String,
    contentmaximumSenteces: Number,
    sourceContentOriginal: String,
    sentences: [{
        text: String,
    }],
    sourceContentSanitized: String,
    images: [String]
})


module.exports = new model('Content' , contentSchema)