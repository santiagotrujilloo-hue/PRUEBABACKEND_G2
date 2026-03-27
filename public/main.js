const form = document.getElementById('losDatos');

const salida = document.getElementById('resultadoPrestamo');

// Agrega un listener al formulario que se activa cuando se envía (submit)
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita que el formulario recargue la página por defecto

    let nombre = form.elNombre.value;
    let prestamo = parseInt(form.elPrestamo.value);
    let meses = parseInt(form.losMeses.value);
    let interes = parseFloat(form.losIntereses.value);

    try {
        const resp = await fetch('/calcularPrestamo', {
            method: 'POST', // Método HTTP
            headers: { 'Content-Type': 'application/json' }, // Indica que enviamos JSON
            body: JSON.stringify({ nombre,prestamo, meses, interes }) // Convierte los datos a formato JSON
        });


        // Si la respuesta del servidor no es exitosa (status distinto de 200-299)
        if (!resp.ok) {
            console.log('NO valido')
            const error = await resp.json(); // Convierte la respuesta de error a JSON
            salida.value = `Error: ${error.error}`; // Muestra el mensaje de error
            return; // Sale de la función
        }
        
        let datos = await resp.json()
        console.log(datos)
        salida.value =`Nombre:${datos.nombre}:  Cuota $${datos.cuota.toFixed(2)}`
  
    } catch (error) {
        salida.value ='Tuvimos problemas'
    }


})