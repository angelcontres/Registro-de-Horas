document.getElementById('Registro').onclick = function() {
    window.location.href = 'registro.html'; // Reemplaza con la ruta de tu página de registro
};

document.getElementById('Hora').onclick = function() {
    window.location.href = 'horas.html'; // Reemplaza con la ruta de tu página de registro de horas
};

document.getElementById('Reporte').onclick = function() {
    window.location.href = 'reporte.html'; // Reemplaza con la ruta de tu página de reporte
};

// Nueva funcionalidad para eliminar todos los datos
document.getElementById('EliminarDatos').onclick = function() {
    if (confirm('¿Estás seguro de que deseas eliminar todos los registros? Esta acción no se puede deshacer.')) {
        localStorage.removeItem('registros'); // Eliminar todos los registros de localStorage
        alert('Todos los registros han sido eliminados correctamente.');
    }
};
