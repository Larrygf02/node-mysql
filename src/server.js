const express = require('express')
const app = express()
var mysql = require('mysql');

//para las rutas
app.use(require('./routes/index'))


const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.get('/', function(req, res) {
    res.json('Hola mundo')
})


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "node-mysql"
});

app.listen(3000, () => {
    console.log('Escuchando el puerto 3000');
})