function calcularCuota(prestamo, i, n){
    i = i/100
    let aux =Math.pow(1+i,n)
    let cuota = prestamo * ((aux * i) / (aux - 1))
    return cuota 
}

module.exports = {calcularCuota}