const contenedor = document.getElementById('contenedor-pokemon');
const estado = document.getElementById('estado');
const inputBusqueda = document.getElementById('inputBusqueda');

let todosLosPokemon = [];
let timeout;

/* 🔥 CARGAR TODOS UNA SOLA VEZ */
async function cargarPokemon() {
    try {
        estado.textContent = 'Cargando...';

        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
        if (!response.ok) throw new Error('Error al obtener datos');

        const data = await response.json();
        todosLosPokemon = data.results;

        estado.textContent = '';
        mostrarPokemon(todosLosPokemon.slice(0, 20));

    } catch (error) {
        estado.textContent = 'Error: ' + error.message;
        estado.style.color = 'red';
    }
}

/* 🎯 MOSTRAR */
function mostrarPokemon(lista) {
    contenedor.innerHTML = lista.map(p => {
        const id = p.url.split('/').filter(Boolean).pop();

        return `
            <div class="card">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png">
                <h3>${p.name}</h3>
                <span>#${id}</span>
            </div>
        `;
    }).join('');
}

/* 🔍 BUSCAR */
function buscarPokemon(texto) {
    const filtrados = todosLosPokemon.filter(p => {
        const id = p.url.split('/').filter(Boolean).pop();
        return p.name.includes(texto) || id === texto;
    });

    if (filtrados.length === 0) {
        contenedor.innerHTML = '<p>No se encontraron resultados</p>';
        return;
    }

    mostrarPokemon(filtrados);
}

/* ⚡ INPUT CON DEBOUNCE */
inputBusqueda.addEventListener('input', () => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
        const texto = inputBusqueda.value.toLowerCase().trim();

        if (texto === '') {
            mostrarPokemon(todosLosPokemon.slice(0, 20));
        } else {
            buscarPokemon(texto);
        }
    }, 300); // espera 300ms
});

/* 🚀 INICIO */
cargarPokemon();