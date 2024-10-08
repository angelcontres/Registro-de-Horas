// Variable para almacenar las horas de entrada y salida de una persona
let registro = {
    horaEntrada: null,
    horaSalida: null
};

// Función para registrar la hora de entrada
function registrarEntrada() {
    if (registro.horaEntrada === null) {
        registro.horaEntrada = new Date().toLocaleTimeString();
        mostrarRegistro();
        alert('Hora de entrada registrada: ' + registro.horaEntrada);
    } else {
        alert('La hora de entrada ya está registrada.');
    }
}

// Función para registrar la hora de salida
function registrarSalida() {
    if (registro.horaEntrada !== null && registro.horaSalida === null) {
        registro.horaSalida = new Date().toLocaleTimeString();
        mostrarRegistro();
        alert('Hora de salida registrada: ' + registro.horaSalida);
    } else if (registro.horaEntrada === null) {
        alert('Primero debe registrar la hora de entrada.');
    } else {
        alert('La hora de salida ya está registrada.');
    }
}

// Función para mostrar el registro actual
function mostrarRegistro() {
    document.getElementById('registro').innerText = `Entrada: ${registro.horaEntrada || 'No registrada'}, Salida: ${registro.horaSalida || 'No registrada'}`;
}

// Muestra el registro vacío al cargar la página
mostrarRegistro();
