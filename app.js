const express = require('express')
const config = require('config')
const mongo = require('mongoose')
const path = require('path')

const PORT = config.get('port') || 5000

const app = express()
app.use(express.json({'extended': true}))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t/', require('./routes/redirect.routes'))

if(process.env.NODE_ENV === 'production'){
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))
    app.get('*', (request, response) => {
        response.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

async function start() {
    try {
        await mongo.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => { console.log(`App started ${PORT}`)})
    } catch (e) {
        console.log(`Connect error ${e.message}`)
        process.exit(1)
    }
}

start()
