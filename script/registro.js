// Recuperar los registros desde localStorage o inicializar vacío
let registros = JSON.parse(localStorage.getItem('registros')) || [];

// Función para registrar un nuevo usuario
function registrarUsuario() {
    const nombre = document.getElementById('nombre').value;
    const cedula = document.getElementById('cedula').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;

    if (nombre && cedula && telefono && email) {
        // Crear un nuevo objeto usuario
        let nuevoUsuario = {
            nombre: nombre,
            cedula: cedula,
            telefono: telefono,
            email: email,
            horasEntrada: [],  // Inicializa el arreglo de horas de entrada
            horasSalida: []    // Inicializa el arreglo de horas de salida
        };

        // Agregar el nuevo usuario al array de registros
        registros.push(nuevoUsuario);

        // Guardar los registros en localStorage
        localStorage.setItem('registros', JSON.stringify(registros));

        // Limpiar los campos del formulario
        document.getElementById('nombre').value = '';
        document.getElementById('cedula').value = '';
        document.getElementById('telefono').value = '';
        document.getElementById('email').value = '';

        alert('Usuario registrado exitosamente.');

        // Mostrar usuarios registrados o actualizar la lista
        mostrarUsuarios();
    } else {
        alert('Por favor, complete todos los campos.');
    }
}

// Función para mostrar la lista de usuarios registrados
function mostrarUsuarios() {
    const listaUsuarios = document.getElementById('listaUsuarios');
    listaUsuarios.innerHTML = '';  // Limpiar la lista

    registros.forEach(usuario => {
        let li = document.createElement('li');
        li.textContent = `Nombre: ${usuario.nombre}, Cédula: ${usuario.cedula}, Teléfono: ${usuario.telefono}, Email: ${usuario.email}`;
        listaUsuarios.appendChild(li);
    });
}

// Mostrar los usuarios registrados al cargar la página
window.onload = mostrarUsuarios;
