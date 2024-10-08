// Recuperar los registros desde localStorage o inicializar vacío
let registros = JSON.parse(localStorage.getItem('registros')) || [];

// Variables temporales para manejar el estado actual del usuario
let usuarioActual = null; 
let ultimaEntradaTemporal = null;

// Función para buscar usuario y mostrar opciones de registro
function buscarUsuario() {
    const nombre = document.getElementById('nombreBuscar').value.trim();
    usuarioActual = registros.find(registro => registro.nombre.toLowerCase() === nombre.toLowerCase());

    if (!usuarioActual) {
        alert('Usuario no encontrado.');
        return;
    }

    // Mostrar las opciones de registro si se encuentra el usuario
    document.getElementById('registroHoras').style.display = 'block';

    // Cargar la última entrada del usuario desde los registros
    ultimaEntradaTemporal = usuarioActual.horasEntrada[usuarioActual.horasEntrada.length - 1] || null;

    // Mostrar el estado actual (última entrada y salida)
    const registro = document.getElementById('registro');
    if (ultimaEntradaTemporal) {
        let mensaje = `Última entrada: ${ultimaEntradaTemporal.fecha} a las ${ultimaEntradaTemporal.hora}`;
        if (ultimaEntradaTemporal.jornadaFinalizada === false) {
            mensaje += ', Salida: Aún no se ha registrado la salida';
        } else {
            mensaje += `, Salida: ${ultimaEntradaTemporal.horaSalida}`;
        }
        registro.textContent = mensaje;
    } else {
        registro.textContent = 'Sin registros previos.';
    }
}

// Función para registrar la hora de entrada
function registrarEntrada() {
    if (!usuarioActual) {
        alert('Primero busca un usuario.');
        return;
    }

    // Verificar si la última jornada no ha sido finalizada
    if (ultimaEntradaTemporal && ultimaEntradaTemporal.jornadaFinalizada === false) {
        alert('No se puede registrar una nueva entrada sin haber finalizado la jornada anterior.');
        return; // Evitar el registro de una nueva entrada
    }

    // Obtener la hora y fecha actual
    const fecha = new Date();
    const horaActual = fecha.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    const fechaActual = `${fecha.getDate().toString().padStart(2, '0')}/${(fecha.getMonth() + 1).toString().padStart(2, '0')}/${fecha.getFullYear()}`;

    // Crear un nuevo registro de entrada con la jornada no finalizada
    const nuevaEntrada = {
        fecha: fechaActual,
        hora: horaActual,
        jornadaFinalizada: false // La jornada no está finalizada aún
    };

    // Guardar la hora de entrada en el registro del usuario actual
    usuarioActual.horasEntrada.push(nuevaEntrada);

    // Actualizar la variable temporal de entrada
    ultimaEntradaTemporal = nuevaEntrada;

    // Guardar los cambios en localStorage
    localStorage.setItem('registros', JSON.stringify(registros));

    // Mostrar la última entrada registrada y el estado de la salida
    const registro = document.getElementById('registro');
    registro.textContent = `Última entrada: ${fechaActual} a las ${horaActual}, Salida: Aún no se ha registrado la salida`;
    alert('Hora de entrada registrada correctamente.');
}

// Función para registrar la hora de salida
function registrarSalida() {
    if (!usuarioActual) {
        alert('Primero busca un usuario.');
        return;
    }

    // Verificar si hay una entrada sin salida registrada
    if (!ultimaEntradaTemporal || ultimaEntradaTemporal.jornadaFinalizada === true) {
        alert('No se puede registrar una salida sin entrada o ya has registrado la salida.');
        return;
    }

    // Obtener la hora actual
    const fecha = new Date();
    const horaActual = fecha.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

    // Actualizar la jornada como finalizada
    ultimaEntradaTemporal.horaSalida = horaActual;
    ultimaEntradaTemporal.jornadaFinalizada = true; // Marcar la jornada como finalizada

    // Guardar los cambios en localStorage
    localStorage.setItem('registros', JSON.stringify(registros));

    // Mostrar la hora de salida registrada
    const registro = document.getElementById('registro');
    registro.textContent += `, Salida: ${horaActual}`;
    alert('Hora de salida registrada correctamente.');
}

// Al cargar la página, limpiar el estado temporal
window.onload = () => {
    usuarioActual = null;
    ultimaEntradaTemporal = null;
};
