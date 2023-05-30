
const productos = [
    {
      id: 1,
      nombre: "Collar medallon",
      precio: 800,
      img:
       src= "./imagenes/medallon circulo.png",
      cantidad: 1,
    },
    {
      id: 2,
      nombre: "Pulsera brazalete dorada",
      precio: 500,
      img:
       src= "./imagenes/pulsera brazalete.png",
      cantidad: 1,
    },
    {
      id: 3,
      nombre: "Anillo",
      precio: 400,
      img:
       src="./imagenes/anillo-ring-with-ornament.webp",
      cantidad: 1,
    },
    {
      id: 4,
      nombre: "Aros de bodas",
      precio: 800,
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
   let comprar = document.createElement("button");
   comprar.innerText = "comprar";
   comprar.className = "comprar";

   content.append(comprar);

   comprar.addEventListener("click", () => {
     carrito.push({
       id: producto.id,
       img: producto.img,
       nombre: producto.nombre,
       precio: producto.precio,

     });
     //verifico que los productos se agreguen al carrito
     console.log(carrito);
     guardarLocal();
   });
  });

   //agrego evento al icono carrito,creo un div modal para el carrito
   verCarrito.addEventListener("click", () => {

    //ojo
   modalContainer.innerHTML = "";
   modalContainer.style.display = "flex";

    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
    <h1 class= "modal-header-title">El carrito contiene :</h1>
    `;
    modalContainer.append(modalHeader);

    //creo boton modal
    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "X";
    modalbutton.className = "modal-header-button";

    //cerrar modal
    modalbutton.addEventListener("click", () => {
      modalContainer.style.display = "none";
    });

    //agrego como hijo al buton
    modalHeader.append(modalbutton);
    
    //recorremos el carrito content
    carrito.forEach((producto) => {
      let carritoContent = document.createElement("div");
      carritoContent.className = "modal-content";
      carritoContent.innerHTML = `
      <img src="${producto.img}">
      <h3>${producto.nombre}</h3>
      <p>$ ${producto.precio}</p>
      `;
    
     modalContainer.append(carritoContent);
   });


   const total = carrito.reduce((acc, el) => acc + el.precio, 0);

   const totalCompra = document.createElement("div");
   totalCompra.className = " total-content";
   totalCompra.innerHTML = `total a pagar: $ ${total}`;

   modalContainer.append(totalCompra);
   
   
  });

  //local storage
  //set item  lo manda como string: stringify
const guardarLocal = () => {
  localStorage.setItem("carrito",JSON.stringify(carrito));
};
  //get item recupero los datos de local storage
  JSON.parse(localStorage.getItem("carrito"));
