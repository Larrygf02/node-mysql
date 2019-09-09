const express = require('express')
const app = express()
const con  = require('../db/connection.js')

app.post('/persons', (req,res) => {
    let body  = req.body;
    if (body.name === undefined || body.surname === undefined || body.dni === undefined) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Faltan completar datos'
            }
        })
    }else{
        con.query('INSERT INTO persons (name, surname, dni) VALUES (?,?,?)', [body.name, body.surname, body.dni], (err, result) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err: {
                        message: 'Error al agregar la persona'
                    }
                })
            }else{
                res.json({
                    ok: true,
                    message: 'Agregado Correctamente'
                })
            }
        })
    }
})

app.get('/persons', (req, res) => {
    con.query('SELECT * FROM persons', (err, results) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'Error en la consulta'
                }
            })
        }else{
            res.json({
                ok: true,
                data: results
            })
        }
    })
})

module.exports = app;