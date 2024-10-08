// Recuperar los registros desde localStorage o inicializar vacío
let registros = JSON.parse(localStorage.getItem('registros')) || [];


// Función para buscar usuario y mostrar opciones de reporte
function buscarUsuario() {
    const nombre = document.getElementById('nombreBuscar').value.trim();
    const usuario = registros.find(registro => registro.nombre.toLowerCase() === nombre.toLowerCase());

    const reporteElement = document.getElementById('reporte');
    reporteElement.innerHTML = ''; // Limpiar el reporte actual

    if (!usuario) {
        reporteElement.innerHTML = '<p>Usuario no encontrado.</p>';
        return;
    }

    // Mostrar la sección de intervalo de fechas si se encuentra el usuario
    document.getElementById('registroHoras').style.display = 'block';
}

// Función para generar el reporte en vista previa
function generarReporte() {
    const nombre = document.getElementById('nombreBuscar').value.trim();
    const fechaInicio = document.getElementById('fechaInicio').value;
    const fechaFin = document.getElementById('fechaFin').value;

    const usuario = registros.find(registro => registro.nombre.toLowerCase() === nombre.toLowerCase());

    if (!usuario) {
        alert('Usuario no encontrado.');
        return;
    }

    // Limpiar el contenido actual del reporte
    const reporteElement = document.getElementById('reporte');
    reporteElement.innerHTML = ''; 

    // Filtrar las horas de entrada por fecha
    const horasFiltradas = usuario.horasEntrada.filter(entrada => {
        const fechaEntrada = entrada.fecha.split('/').reverse().join('-'); // Cambiar formato a YYYY-MM-DD
        const inicio = new Date(fechaInicio);
        const fin = new Date(fechaFin);
        const entradaFecha = new Date(fechaEntrada);

        return entradaFecha >= inicio && entradaFecha <= fin;
    });

    // Generar el reporte basado en las horas filtradas
    let reporteHTML = '<table style="width: 100%; border-collapse: collapse;">';
    reporteHTML += '<tr><th>Fecha</th><th>Hora Entrada</th><th>Hora Salida</th></tr>';
    
    horasFiltradas.forEach(entrada => {
        const salida = entrada.jornadaFinalizada ? entrada.horaSalida : 'Aún no registrada';
        reporteHTML += '<tr>';
        reporteHTML += `<td>${entrada.fecha}</td>`;
        reporteHTML += `<td>${entrada.hora}</td>`;
        reporteHTML += `<td>${salida}</td>`;
        reporteHTML += '</tr>';
    });

    reporteHTML += '</table>';

    // Mostrar el reporte en la vista previa
    reporteElement.innerHTML = reporteHTML;
}


// Función para exportar el reporte a Excel
// Función para exportar a Excel
function exportarExcel() {
    const nombre = document.getElementById('nombreBuscar').value.trim();
    const fechaInicio = document.getElementById('fechaInicio').value;
    const fechaFin = document.getElementById('fechaFin').value;

    const usuario = registros.find(registro => registro.nombre.toLowerCase() === nombre.toLowerCase());

    if (!usuario) {
        alert('Usuario no encontrado.');
        return;
    }

    // Filtrar las horas de entrada por fecha
    const horasFiltradas = usuario.horasEntrada.filter(entrada => {
        const fechaEntrada = entrada.fecha.split('/').reverse().join('-'); // Cambiar formato a YYYY-MM-DD
        const inicio = new Date(fechaInicio);
        const fin = new Date(fechaFin);
        const entradaFecha = new Date(fechaEntrada);

        return entradaFecha >= inicio && entradaFecha <= fin;
    });

    // Crear una hoja de trabajo con los registros filtrados
    const data = horasFiltradas.map(entrada => ({
        Fecha: entrada.fecha,
        "Hora Entrada": entrada.hora,
        "Hora Salida": entrada.jornadaFinalizada ? entrada.horaSalida : 'Aún no registrada'
    }));

    // Crear la hoja de trabajo para el Excel
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Registros Filtrados');

    // Generar un archivo Excel y descargarlo
    XLSX.writeFile(wb, `reporte_horas_${nombre}.xlsx`);
}


// Mostrar los usuarios registrados al cargar la página
window.onload = () => {
    document.getElementById('reporte').innerHTML = ''; // Limpiar el reporte al cargar
};
