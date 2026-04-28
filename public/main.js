const form = document.getElementById('losDatos');
const btn = document.getElementById('btnCalcular');
const resultCard = document.getElementById('resultCard');
const valorCuota = document.getElementById('valorCuota');
const nombreCliente = document.getElementById('nombreCliente');

// Agrega un listener al formulario que se activa cuando se envía (submit)
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita que el formulario recargue la página por defecto

    let nombre = form.elNombre.value;
    let prestamo = parseInt(form.elPrestamo.value);
    let meses = parseInt(form.losMeses.value);
    let interes = parseFloat(form.losIntereses.value);

    // Estado visual
    resultCard.classList.add('hidden');
    btn.disabled = true;

    try {
        const resp = await fetch('/calcularPrestamo', {
            method: 'POST', // Método HTTP
            headers: { 'Content-Type': 'application/json' }, // Indica que enviamos JSON
            body: JSON.stringify({ nombre,prestamo, meses, interes }) // Convierte los datos a formato JSON
        });


        // Si la respuesta del servidor no es exitosa (status distinto de 200-299)
        if (!resp.ok) {
            console.log('NO valido')
            alert("Error al procesar los datos");
            return;
        }
        
        let datos = await resp.json()
        console.log('Respuesta recibida:', datos)

        // Formatear moneda de forma elegante
        const formatter = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
        });

        // Mostrar resultados con estilo
        valorCuota.textContent = formatter.format(datos.cuota);
        nombreCliente.textContent = `Preparado para: ${datos.nombre}`;
        resultCard.classList.remove('hidden');
  
    } catch (error) {
        alert('Hubo un error en la conexión con el servidor.');
    } finally {
        btn.disabled = false;
    }
})