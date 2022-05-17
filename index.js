const express = require('express');
const app = express()
const cors = require("cors")
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())


const functions = require("./funciones/functions");


app.listen(3002, () => {
    console.log('server run por 3002 pa')
})

app.get('/adduser/:name/:lastName', async(req, res) => {  //params    /lista/:1
    let { name, lastName } = req.params
    if (name && lastName) {
        return res.json(await functions.adduser(name, lastName))
    }
    else {
        res.send("fallo")
    }
})
app.post('/adduser', async (req, res) => {
    let { name, lastName } = req.body
    console.log(name, lastName)
    if (name && lastName) {
        res.json(await functions.adduser(name, lastName))
    }
    else {
        res.json("No se cargo falta dato")
    }
})
app.get('/userlist/:all', async (req, res) => {
    let name = req.params.all
    const usuarios = await functions.listuser()
    let filtrado = (usuarios.filter(e => e.name == name))
    if (name == "all") {
        return res.json(usuarios)
    }
    if (filtrado.length > 0) {
        res.send(filtrado)
    }
    else {
        res.status(404).json({ error: "no se encontro usuario especifico" })
    }
})
app.get('/userlist', async (req, res) => {
    const usuarios = await functions.listuser()
    res.json(usuarios)
    console.log(usuarios)
})
app.post('/deleteUser', async (req, res) => {
    let { id } = req.body
    try {
        res.json(await functions.deleteUserId(id))
    }
    catch (err) {
        console.log(err)
        res.status(404).json({ error: err })
    }
})
app.post('/updateUser', async (req, res) => {
    let { id, name, lastName } = req.body
    res.json(await functions.updateNameLastName(id, name, lastName))
})


