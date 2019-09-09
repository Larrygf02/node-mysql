const express = require('express')
const app = express()


const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
//para las rutas
app.use(require('./routes/index'))

app.get('/', function(req, res) {
    res.json('Hola mundo')
})

app.listen(3000, () => {
    console.log('Escuchando el puerto 3000');
})