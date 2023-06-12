const productos = [
    {
        id: 1,
        nombre: "Collar medallon",
        precio: 800,
        img: (src = "./imagenes/medallon circulo.png"),
        cantidad: 1,
    },
    {
        id: 2,
        nombre: "Pulsera brazalete dorada",
        precio: 500,
        img: (src = "./imagenes/pulsera brazalete.png"),
        cantidad: 1,
    },
    {
        id: 3,
        nombre: "Anillo",
        precio: 400,
        img: (src = "./imagenes/anillo-ring-with-ornament.webp"),
        cantidad: 1,
    },
    {
        id: 4,
        nombre: "Aros de bodas",
        precio: 800,
        img: (src = "./imagenes/aro-bodas-diamante.png"),
        cantidad: 1,
    },
];

// Función para generar y renderizar los productos en el DOM
function renderizarProductos() {
    const shopContent = document.getElementById("shopContent");

    productos.forEach((producto) => {
        const content = document.createElement("div");
        content.className = "card";
        content.innerHTML = `
      <img src="${producto.img}">
      <h3>${producto.nombre}</h3>
      <p class="precio"> $${producto.precio} </p>
    `;

        const comprar = document.createElement("button");
        comprar.innerText = "comprar";
        comprar.className = "comprar";

        content.append(comprar);
        shopContent.append(content);

        comprar.addEventListener("click", () => {
            agregarAlCarrito(producto);
        });
    });
}
//NUEVO
// Función para agregar un producto al carrito
function agregarAlCarrito(producto) {
    carrito.push(producto);
    guardarLocal();
    actualizarContadorCarrito();
}
//NUEVO
// Función para actualizar el contador de productos en el icono del carrito
function actualizarContadorCarrito() {
    const cantidadCarrito = document.getElementById("cantidadCarrito");
    cantidadCarrito.textContent = carrito.length.toString();
}

// Función para abrir el modal del carrito
function abrirModalCarrito() {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";

    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
    <h1 class="modal-header-title">El carrito contiene:</h1>
  `;
    modalContainer.append(modalHeader);

    const modalButton = document.createElement("h1");
    modalButton.innerText = "X";
    modalButton.className = "modal-header-button";
    modalButton.addEventListener("click", cerrarModalCarrito);
    modalHeader.append(modalButton);

    renderizarProductosModal();
    calcularTotalCarrito();
}

// Función para cerrar el modal del carrito
function cerrarModalCarrito() {
    modalContainer.style.display = "none";
}

// Función para renderizar los productos en el modal del carrito
function renderizarProductosModal() {
    carrito.forEach((producto) => {
        const carritoContent = document.createElement("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
      <img src="${producto.img}">
      <h3>${producto.nombre}</h3>
      <p>$ ${producto.precio}</p>
    `;

        modalContainer.append(carritoContent);
    });
}

// Función para calcular el total a pagar en el carrito
function calcularTotalCarrito() {
    const total = carrito.reduce((acc, el) => acc + el.precio, 0);
    const totalCompra = document.createElement("div");
    totalCompra.className = "total-content";
    totalCompra.innerHTML = `Total a cancelar: $ ${total}`;
    modalContainer.append(totalCompra);
}

// Local storage
function guardarLocal() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function obtenerCarritoDelLocalStorage() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

// Variables y eventos
const modalContainer = document.getElementById("modal-container");

const carrito = obtenerCarritoDelLocalStorage();

renderizarProductos();
actualizarContadorCarrito();

verCarrito.addEventListener("click", abrirModalCarrito);
