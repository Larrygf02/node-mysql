var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "node-mysql"
});

con.connect(function(err) {
    if (err) throw err;
    console.log('Conectado');
})

//Creando tabla
var sql = `
CREATE TABLE persons(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    dni VARCHAR(10) NOT NULL,
    telefono VARCHAR(10),
    UNIQUE(dni)
)
`
con.query(sql, function(err, result) {
    if(err) throw err;
    console.log('Tabla creada correctamente');
})
