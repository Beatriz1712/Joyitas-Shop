const productos = [
    {
      id: 1,
      nombre: "Collar medallon",
      precio: 500,
      img:
       src= "./imagenes/medallon circulo.png",
      cantidad: 1,
    },
    {
      id: 2,
      nombre: "Pulsera dorada",
      precio: 500,
      img:
       src= "./imagenes/pulsera brazalete.png",
      cantidad: 1,
    },
    {
      id: 3,
      nombre: "Anillo",
      precio: 500,
      img:
       src="./imagenes/anillo-ring-with-ornament.webp",
      cantidad: 1,
    },
    {
      id: 4,
      nombre: "Aros de bodas",
      precio: 500,
      img:
       src="./imagenes/aro-bodas-diamante.png",
      cantidad: 1,
    },
  ];

//me traigo el Id del content del html
const shopContent = document.getElementById("shopContent");

//me traigo el ID de verCarrito del html
const verCarrito = document.getElementById("verCarrito");

//modal
const modalContainer = document.getElementById("modal-container");

//new
const cantidadCarrito = document.getElementById("cantidadCarrito");
const showAlert = document.getElementById("showAlert");
  
//recoorro productos
 let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
 
 productos.forEach((producto)=> {
   let content = document.createElement("div");
   content.className = "card";
   //creando etiquetas html
   content.innerHTML = `
  <img src="${producto.img}">
  <h3>${producto.nombre}</h3>
  <p class="precio"> $${producto.precio} </p>
  `;

   // a shopcontent le agrego content como hijo 
   shopContent.append(content);

   //creo y agrego boton comprar
   const comprar = document.createElement("button");
   comprar.innerText = "comprar";
   comprar.className = "comprar";

   content.append(comprar);

   comprar.addEventListener("click", () => {
    const repeat =carrito.some((repeatProduct) => repeatProduct.id === producto.id);
     
    if (repeat) {
      carrito.map((prod) => {
        if (prod.id === producto.id) {
          prod.cantidad++;
        }
      });
    } else {
    carrito.push({
       id: producto.id,
       img: producto.img,
       nombre: producto.nombre,
       precio: producto.precio,
       cantidad: producto.cantidad,
     });
     //verifico que los productos se agreguen al carrito
     console.log(carrito);
     //new
     console.log(carrito.length);
     carritoCounter();
     guardarLocal();
   }
  });
 });


 //set item NEW
const guardarLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};
 //CARRITO
   //agrego evento al icono carrito,creo un div modal para el carrito
//    verCarrito.addEventListener("click", () => {

  
//    modalContainer.innerHTML = "";
//    modalContainer.style.display = "flex";

//     const modalHeader = document.createElement("div");
//     modalHeader.className = "modal-header";
//     modalHeader.innerHTML = `
//     <h1 class= "modal-header-title">El carrito contiene :</h1>
//     `;
//     modalContainer.append(modalHeader);

//     //creo boton modal
//     const modalbutton = document.createElement("h1");
//     modalbutton.innerText = "X";
//     modalbutton.className = "modal-header-button";

//     //cerrar modal
//     modalbutton.addEventListener("click", () => {
//       modalContainer.style.display = "none";
//     });

//     //agrego como hijo al buton
//     modalHeader.append(modalbutton);
    
//     //recorremos el carrito content
//     carrito.forEach((producto) => {
//       let carritoContent = document.createElement("div");
//       carritoContent.className = "modal-content";
//       carritoContent.innerHTML = `
//       <img src="${producto.img}">
//       <h3>${producto.nombre}</h3>
//       <p>$ ${producto.precio}</p>
//       `;
    
//      modalContainer.append(carritoContent);

     
//    });

   

//    const total = carrito.reduce((acc, el) => acc + el.precio, 0);

//    const totalCompra = document.createElement("div");
//    totalCompra.className = " total-content";
//    totalCompra.innerHTML = `total a pagar: $ ${total}`;

//    modalContainer.append(totalCompra);
   
   
//   });

//   //local storage
//   //set item  lo manda como string: stringify
// const guardarLocal = () => {
//   localStorage.setItem("carrito",JSON.stringify(carrito));
// };
//   //get item recupero los datos de local storage
//   JSON.parse(localStorage.getItem("carrito"));


const pintarCarrito = () => {
  modalContainer.innerHTML = "";
  modalContainer.style.display = "flex";
  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";
  modalHeader.innerHTML = `
      <h1 class="modal-header-title">El carrito contiene :</h1>
    `;
  modalContainer.append(modalHeader);

  const modalbutton = document.createElement("h1");
  modalbutton.innerText = "x";
  modalbutton.className = "modal-header-button";

  modalbutton.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });

  modalHeader.append(modalbutton);

  carrito.forEach((producto) => {
    let carritoContent = document.createElement("div");
    carritoContent.className = "modal-content";
    carritoContent.innerHTML = `
        <img src="${producto.img}">
        <h3>${producto.nombre}</h3>
        <p> $ ${producto.precio}</p>
        <span class="restar"> - </span>
        <p>${producto.cantidad}</p>
        <span class="sumar"> + </span>
        <p>Total: $${producto.cantidad * producto.precio} </p>
        <span class="delete-product"> ❌ </span>
      `;

    modalContainer.append(carritoContent);

    let restar = carritoContent.querySelector(".restar");

    restar.addEventListener("click", () => {
      if (producto.cantidad !== 1) {
        producto.cantidad--;
      }
      guardarLocal();
      pintarCarrito();
    });

    let sumar = carritoContent.querySelector(".sumar");
    sumar.addEventListener("click", () => {
      producto.cantidad++;
      guardarLocal();
      pintarCarrito();
    });

    let eliminar = carritoContent.querySelector(".delete-product");

    eliminar.addEventListener("click", () => {
      eliminarProducto(producto.id);
    });

  });

  const total = carrito.reduce((acc, el) => acc + el.precio*el.cantidad, 0);

  const totalCompra = document.createElement("div");
  totalCompra.className = "total-content";
  totalCompra.innerHTML = `Total a pagar: $ ${total}`;
  modalContainer.append(totalCompra);
};

verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = (id) => {
  const foundId = carrito.find((element) => element.id === id);

  console.log(foundId);

  carrito = carrito.filter((carritoId) => {
    return carritoId !== foundId;
  });

  carritoCounter();
  guardarLocal();
  pintarCarrito();
};

const carritoCounter = () => {
  cantidadCarrito.style.display = "block";

  const carritoLength = carrito.length;

  localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

  cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};

carritoCounter();

