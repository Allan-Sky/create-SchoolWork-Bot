const express = require('express')
const start = require('./index')
const state = require('./robots/state')
const app = express()


app.get('/', async (req, res) => {
    return res.json(state.load())
})

app.listen(8080 , () => console.log('server running in port 8080'))