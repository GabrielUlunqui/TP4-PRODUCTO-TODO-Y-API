const form = document.getElementById('form-tareas');
const input = document.getElementById('inputTarea');
const lista = document.getElementById('lista-tareas');
const contador = document.getElementById('contador');
const contadorCompletadas = document.getElementById('contador-completadas');

/* AGREGAR TAREA */
form.addEventListener('submit', function(e){
    e.preventDefault();
    const texto = input.value.trim();

    if (texto === '') return;

    agregarTarea(texto);
    input.value = '';
});

/* CREAR TAREA */
function agregarTarea(texto) {
    const li = document.createElement('li');

    // contenedor izquierdo (checkbox + texto)
    const contenedor = document.createElement('div');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const span = document.createElement('span');
    span.textContent = texto;

    // evento checkbox
    checkbox.addEventListener('change', function() {
        li.classList.toggle('completada');
        actualizarContador();
    });

    contenedor.appendChild(checkbox);
    contenedor.appendChild(span);

    // botón eliminar
    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';

    botonEliminar.addEventListener('click', function(e) {
        e.stopPropagation();
        li.remove();
        actualizarContador();
    });

    li.appendChild(contenedor);
    li.appendChild(botonEliminar);

    lista.appendChild(li);

    actualizarContador();
}

/* ACTUALIZAR CONTADORES */
function actualizarContador() {
    const pendientes = lista.querySelectorAll('li:not(.completada)').length;
    const completadas = lista.querySelectorAll('li.completada').length;

    contador.textContent = 'Tareas pendientes: ' + pendientes;
    contadorCompletadas.textContent = 'Tareas completadas: ' + completadas;
}