const avianca = require('./metodos/auxiliares')

let resina = require('express')
let name = resina()

const path = require('path');

name.use(resina.json()); // Para parsear JSON en body

// Servir archivos estáticos
name.use(resina.static(path.join(__dirname, 'public')));

name.get('/calcularPrestamo',(req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

name.get('/holaMundo',(req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

name.post('/calcularPrestamo',(req, res) =>{
    let { nombre,prestamo, meses, interes } = req.body
    console.log(nombre,prestamo, meses, interes)
    let cuota = avianca.calcularCuota(prestamo,interes,meses)
    console.log(cuota)
    //res.send(JSON.stringify({nombre,cuota}))
    res.json({info:'version1',nombre,cuota})
})

name.listen(4321,()=>{
    console.log('Invoca a http://localhost:4321/calcularPrestamo')
})