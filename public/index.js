let resina = require('express')
let name = resina()

name.get('/calcularPrestamo', (req, res) => {
    res.send('Alumnos vamos bien')

})

name.listen(4321,()=>{
    console.log('Invoca a http://localhost:4321/calcularPrestamo')

})