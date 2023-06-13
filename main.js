
//me traigo el Id del content del html
const shopContent = document.getElementById("shopContent");

//me traigo el ID de verCarrito del html
const verCarrito = document.getElementById("verCarrito");

//modal
const modalContainer = document.getElementById("modal-container");

//
const cantidadCarrito = document.getElementById("cantidadCarrito");
const showAlert = document.getElementById("showAlert");
  
//recoorro productos
 let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

 //asincronía
  const getProducto = async () => {
  const response = await fetch("data.json");
  const data = await response.json();
  console.log(data);

  //ya no recorro el array producto,ahora recorro data de data.json
  data.forEach((producto)=> {
    let content = document.createElement("div");
    content.className = "card";
 
    //creando etiquetas html
    content.innerHTML = `
   <img src="${producto.img}">
   <h3>${producto.nombre}</h3>
   <p class="precio"> $${producto.precio} </p>
   `;
 
    // a shopcontent le asigno padre de content 
    shopContent.append(content);
 
    //creo y agrego boton comprar
    const comprar = document.createElement("button");
    comprar.innerText = "comprar";
    comprar.className = "comprar";
 
    content.append(comprar);
 
    comprar.addEventListener("click", () => {
      //
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'El producto se agregó al carrito',
        showConfirmButton: false,
        timer: 1500
    })
    
      
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
      //
      console.log(carrito.length);
      carritoCounter();
      guardarLocal();
    }
   });
  });
 };

 //llamar a la funcion para pintar los productos
 getProducto();
  
 
 //set item NEW
const guardarLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};
 

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
      //alert
      Swal.fire({
        title: 'Está seguro de eliminar el producto?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, seguro',
        cancelButtonText: 'No, no quiero'
    }).then((result) => {

        if (result.isConfirmed) {
            Swal.fire({
                title: 'Borrado!',
                icon: 'success',
                text: 'El producto ha sido eliminado'
            })
            eliminarProducto(producto.id);
        }
    })
     
    });

  });

  const total = carrito.reduce((acc, el) => acc + el.precio*el.cantidad, 0);

  const totalCompra = document.createElement("div");
  totalCompra.className = "total-content";
  totalCompra.innerHTML = `Total a pagar: $ ${total}`;
  modalContainer.append(totalCompra);

  //Implementando botón Compra Final
  const compraFinal = document.createElement("button");
  compraFinal.innerText = " COMPRA FINAL";
  compraFinal.className =  "compraFinal";
  
  modalContainer.append(compraFinal);
 
  compraFinal.addEventListener("click", () => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Compra realizada',
      showConfirmButton: false,
      timer: 1500
  })
   // Cerrar el modal
   modalContainer.style.display = 'none';
  })
};

verCarrito.addEventListener("click", pintarCarrito);

//Eliminando producto
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

//Contador de productos
const carritoCounter = () => {
  cantidadCarrito.style.display = "block";

  const carritoLength = carrito.length;

  localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

  cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};

carritoCounter();

