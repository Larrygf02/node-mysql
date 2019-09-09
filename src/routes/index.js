const express = require('express')
const app = express()

app.post('/persons', (req,res) => {
    let body  = req.body;
    console.log(body);
    res.json({
        ok: true,
        data: '2'
    })
})

module.exports = app;