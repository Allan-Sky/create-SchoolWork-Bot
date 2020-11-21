const express = require('express')
const cors = require('cors')

const start = require('./index')
const state = require('./robots/state')
const app = express()

app.use(cors())

app.use(express.json())


app.get('/', async (req, res) => {
    return res.json(await state.load())
})

app.get('/:articleName/:lang', async (req, res) => {
    const content = {}
    content.articleName = req.params.articleName
    content.lang = req.params.lang

    await state.save(content)
    await start()

    return res.json({ok:true})
})

app.listen(8080 , () => console.log('server running in port 8080'))