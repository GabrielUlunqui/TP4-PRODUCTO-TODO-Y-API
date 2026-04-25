const productos = [
    {id: 1, nombre: "Monitores", precio :240.0, categoria : "Perifericos", enStock : true},
    {id: 2, nombre: "Auriculares", precio : 88.0, categoria: "Perifericos", enStock : true},
    {id: 3, nombre: "teclado", precio : 47.5, categoria: "Perifericos", enStock: false },
    {id: 4, nombre: "Memoria RAM", precio: 125.7, categoria: "Memorias", enStock : true},
    {id: 5, nombre: "Almacenamiento", precio: 92.4, categoria: "Memorias", enStock: false},
    {id: 6, nombre: "Procesador", precio: 198.8, categoria: "Procesadores", enStock : true},
    {id: 7, nombre: "Placa madre", precio: 78.5, categoria: "Placa madre", enStock :false},
    {id: 8, nombre: "Gabinete", precio : 74.6, categoria: "Gabinetes", enStock: true},
];

const contenedor = document.getElementById("contenedor");
const selectCategoria = document.getElementById("selectCategoria");
const rangePrecio = document.getElementById("rangePrecio");
const valorPrecio = document.getElementById("valorPrecio");
const checkStock = document.getElementById("checkStock");
const inputBusqueda = document.getElementById("inputBusqueda");
const btnReset = document.getElementById("btn-reset"); // 🔥 acá afuera

const mostrarProductos = () => {
    const categoria = selectCategoria.value;
    const precioMax = Number(rangePrecio.value);
    const soloStock = checkStock.checked;
    const busqueda  = inputBusqueda.value.toLowerCase();

    const filtrados = productos.filter(p => {
        const porCategoria = categoria === "todas" || p.categoria === categoria;
        const porPrecio = p.precio <= precioMax;
        const porStock = !soloStock || p.enStock;
        const porNombre = p.nombre.toLowerCase().includes(busqueda);
        return porCategoria && porPrecio && porStock && porNombre;
    });

    contenedor.innerHTML = filtrados.map(p => `
        <div class="card ${p.enStock ? "" : "sin-stock"}">
            <h3>${p.nombre}</h3>
            <p>Precio: $${p.precio}</p>
            <p>Categoría: ${p.categoria}</p>
            <p>${p.enStock ? "En stock" : "Sin stock"}</p>
        </div>
    `).join("");
};

btnReset.addEventListener("click", () => {
    selectCategoria.value = "todas";
    rangePrecio.value = 300;
    valorPrecio.textContent = "300";
    checkStock.checked = false;
    inputBusqueda.value = "";

    mostrarProductos();
});

selectCategoria.addEventListener("change", mostrarProductos);
rangePrecio.addEventListener("input", () => {
    valorPrecio.textContent = rangePrecio.value;
    mostrarProductos();
});
checkStock.addEventListener("change", mostrarProductos);
inputBusqueda.addEventListener("input", mostrarProductos);

mostrarProductos();