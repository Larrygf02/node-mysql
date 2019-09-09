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

app.get('/person/:id/', (req, res) => {
    let id = req.params.id;
    con.query('SELECT * FROM persons WHERE ID = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'Error en consulta'
                }
            })
        }else if (results.length == 0){
            res.json({
                ok: true,
                data: results,
                message:  `No existe usuario con id ${id}`
            })
        }else{
            res.json({
                ok: true,
                data: results
            })
        }
    })
})

app.put('/person/:id/', (req,res) => {
    let body = req.body;
    let id = req.params.id;
    //verificar si existe
    con.query('SELECT * FROM persons WHERE id = ?', [id], (err, results) => {
        if (results.length == 0) {
            return res.json({
                ok: true,
                message: 'No existe usuario'
            })
        }else{
            const { name, surname, telefono } = results[0]
            let this_name = (body.name === undefined ? name: body.name);
            let this_surname = (body.surname === undefined ? surname: body.surname);
            let this_telefono = (body.telefono === undefined ? telefono: body.telefono);

            con.query('UPDATE persons SET name = ?, surname = ?, telefono = ? WHERE id = ?', [this_name, this_surname, this_telefono, id], (err, results) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err: {
                            message: 'Error en consulta'
                        }
                    })
                }else{
                    res.json({
                        ok: true,
                        message: 'Persona actualizada correctamente'
                    })
                }
            })
        }
    })
})

module.exports = app;