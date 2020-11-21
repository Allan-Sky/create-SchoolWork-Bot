const robots = {
    
    text:require('./robots/text'),
    state:require('./robots/state'),
    image: require('./robots/image')
}
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://admin:admin@cluster0.lxh0d.mongodb.net/50-fact?retryWrites=true&w=majority', {
    useNewUrlParser:true,
    useUnifiedTopology:true
})


async function start() {
    await robots.text()
    await robots.image()
}


module.exports = start