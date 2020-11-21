const fs = require('fs')
const Content = require('../models/content')

async function create() {
    // const content = await Content.create({
    //     articleName: 'teste',
    //     lang: 'pt'
    // })
    // return content
    await Content.delete
}

async function save(content){
    await Content.findOneAndUpdate({_id: '5fb84dc17ea431b6434c04e5'}, content)
}

async function load(){
    const content = await Content.findOne({_id:'5fb84dc17ea431b6434c04e5'})
    return content
}

module.exports = {
    save, 
    load,
    create
}