//Array Carrito//
let carrito = [];
let total = 0;
const DOMtotal = document.getElementById("total");
const DOMcarrito = document.getElementById("listaCarrito");
const DOMCards = document.getElementById("allCards");

if (localStorage.getItem("carritoLs")) {
  carrito = JSON.parse(localStorage.getItem("carritoLs"));
  mostrarCarrito();
}

//Declaro variables
let nombreCliente = "";
let apellidoCliente = "";
let mail = "";
let edad;
let pago;

//Función agregarAlCarrito//
function agregarAlCarrito(e) {
  carrito.push(e.target.getAttribute("idCard"));
  localStorage.setItem("carritoLs", JSON.stringify(carrito));
  mostrarCarrito();
  calcularTotal();
}

// Funcion para mostrar el carrito de compras
function mostrarCarrito() {
  DOMcarrito.textContent = "";
  const quitamosDuplicados = [...new Set(carrito)];

  quitamosDuplicados.forEach((productoCarro) => {
    const miItem = productsAvailable.filter((itemProducto) => {
      return itemProducto.id === parseInt(productoCarro);
    });
    const numeroUnidadesItem = carrito.reduce((total, itemId) => {
      return itemId === productoCarro ? (total += 1) : total;
    }, 0);
    const nuevoItem = document.createElement("li");
    const botonEliminar = document.createElement("button");
    nuevoItem.classList.add("itemCarrito", "list-group-item");
    nuevoItem.textContent = `Producto: ${miItem[0].productName} ${
      miItem[0].brand
    } Precio x ${numeroUnidadesItem} UNIDADES = $${
      miItem[0].price * numeroUnidadesItem
    }`;
    botonEliminar.classList.add(
      "btn",
      "btn-secundary",
      "boton-eliminar",
      "btn-outline-dark"
    );
    botonEliminar.setAttribute("type", "button");
    botonEliminar.textContent = "x";
    botonEliminar.setAttribute("productoId", productoCarro.id);
    botonEliminar.dataset.productoCarro = productoCarro;
    botonEliminar.addEventListener("click", eliminarDelCarrito);
    nuevoItem.appendChild(botonEliminar);
    DOMcarrito.appendChild(nuevoItem);
    calcularTotal();
  });
}

//Función VACIAR CARRITO
$("#boton-vaciar").on("click", vaciarCarrito);

function vaciarCarrito() {
  if (carrito != undefined) {
    //vacío el carrito
    carrito.splice(0, carrito.length);
    // llamo by id a la lista
    $("#listaCarrito");
    //saco elementos del dom
    $("#listaCarrito").html("");
    $("#total").html("");
    localStorage.clear();
    total = 0;
    calcularTotal();
  } else {
    console.log("algo falló");
  }
}

// Elimino productos del carrito y vuelvo a mostrar el contenido y el total
function eliminarDelCarrito(e) {
  const idEliminado = e.target.dataset.productoCarro;
  carrito = carrito.filter((carritoId) => {
    return carritoId !== idEliminado;
  });
  localStorage.setItem("carritoLs", JSON.stringify(carrito));
  mostrarCarrito();
  calcularTotal();
}

//Función para Calcular el total//
function calcularTotal() {
  JSON.parse(localStorage.getItem("carritoLs"));
  if (carrito.length == 0) {
    DOMtotal.textContent = "0";
  } else {
    total = 0;
    carrito.forEach((productItem) => {
      const subtotal = productsAvailable.filter((itemsCards) => {
        return itemsCards.id === parseInt(productItem);
      });
      total = total + subtotal[0].price;
      DOMtotal.textContent = total.toFixed(2);
    });
  }
}

// Creación array clientes
const listaClientes = [];

class Cliente {
  constructor(nombre, apellido, mail, pago) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.mail = mail;
    this.pago = pago;
  }
}

const miCliente1 = new Cliente(nombreCliente, apellidoCliente, mail, pago);


// Creación de las cards con los productos disponibles

let newCards = "";

function createCards(filtro = "default") {
  let newCards =
    filtro !== "default" ?
    productsAvailable.filter(
      (productsAvailable) => productsAvailable.type == filtro
    ) :
    productsAvailable;

  DOMCards.textContent = "";
  newCards.forEach((productsAvailable) => {
    const nodoPadre = document.createElement("div");
    nodoPadre.classList.add("card", "col-lg-3", "misCards");
    // Body
    const miNodoCardBody = document.createElement("div");
    miNodoCardBody.classList.add("card-body");
    // Titulo
    const miNodoTitle = document.createElement("h5");
    miNodoTitle.classList.add("card-title");
    miNodoTitle.textContent = `${productsAvailable.productName} - ${productsAvailable.description}`;
    // Imagen
    const miNodoImagen = document.createElement("img");
    miNodoImagen.classList.add("img-fluid", "imgProducts");
    miNodoImagen.setAttribute("src", productsAvailable.imgSrc);
    // Precio
    const miNodoPrecio = document.createElement("p");
    miNodoPrecio.classList.add("card-text");
    miNodoPrecio.textContent = "Precio ARS$ " + productsAvailable.price;
    // Precio dolar
    const miNodoPrecioDolar = document.createElement("p");
    miNodoPrecioDolar.classList.add("card-text");
    miNodoPrecioDolar.textContent =
      "Precio USD " + (productsAvailable.price / dolarHoy).toFixed(2);
    // Boton
    const miNodoBoton = document.createElement("button");
    miNodoBoton.classList.add("btn", "btn-outline-dark", "mt-auto");
    miNodoBoton.textContent = "Agregar al Carrito";
    miNodoBoton.setAttribute("idCard", productsAvailable.id);
    miNodoBoton.addEventListener("click", agregarAlCarrito);
    // Insertamos
    miNodoCardBody.appendChild(miNodoImagen);
    miNodoCardBody.appendChild(miNodoTitle);
    miNodoCardBody.appendChild(miNodoPrecio);
    miNodoCardBody.appendChild(miNodoPrecioDolar);
    miNodoCardBody.appendChild(miNodoBoton);
    nodoPadre.appendChild(miNodoCardBody);
    DOMCards.appendChild(nodoPadre);
  });
}


//Variables para el input del formulario
let inputName = $("#inputName").val();
let imputLastName = $("#inputLastName").val();
let inputEmail = $("#inputLastName").val();
let inputPaymentMethod = $("#inputPaymentMethod").val();

let form = $("#buttonForm").on("click", function (e) {


  inputName = $("#inputName").val();

  imputLastName = $("#inputLastName").val();

  inputEmail = $("#inputEmail").val();

  inputPaymentMethod = $("#inputPaymentMethod").val();



  listaClientes.push(
    new Cliente(inputName, imputLastName, inputEmail, inputPaymentMethod)


  );

  addProduct();

  $(".btn-close").on("click", vaciarCarrito);
  return listaClientes;
});

// Función para mostrar el modal correspondiente en caso de tener un carrito vacio o un carrito con 1 producto al menos
function carritoModal(e) {
  if (carrito.length == 0) {
    $("#ModalError").modal("show");
  } else if (carrito.length != 0) {
    $("#staticBackdrop").modal("show");
  }
}
$("#btn-comprar").on("click", carritoModal);


//función para formulario
function addProduct() {
  event.preventDefault();
  if (
    inputName == "" ||
    imputLastName == "" ||
    inputEmail == "" ||
    inputPaymentMethod == ""
  ) {
    //si esta vacio sale y muestra un alert
    alert("Por favor completa los campos vacios");
    return false;
  }
  //Validamos que nombre no este vacio
  if (inputName == "") {
    //si esta vacio sale y muestra un alert
    alert("Por favor completa tu nombre");
    return false;
  }

  if (imputLastName == "") {
    //si esta vacio sale y muestra un alert
    alert("Por favor completa tu apellido");
    return false;
  }

  if (inputEmail == "") {
    //si esta vacio sale y muestra un alert
    alert("Por favor completa tu mail");
    return false;
  }

  if (inputPaymentMethod == "") {
    //si esta vacio sale y muestra un alert
    alert("Por favor completa tu metodo de pago");
    return false;
  }

  // Si el formulario se completa correctamente, ocultar form y botón "Seguir comprando", agregar confirmación de compra
  $("#form").fadeOut(1000);
  $("#boton-seguir").hide();
  $("#confirmacionDatos").append(`
    <div>
    <p>${inputName} ${imputLastName} Muchas gracias por tu compra!</p>
    <p>Vas a estar recibiendo un mail en: ${inputEmail} para coordinar el envío</p>
    <p>Método de pago elegido: ${inputPaymentMethod}</p>
    </div>
    `);
}



// Acordeon del header con animación

$(function () {
  $("#textHowToBuy,#textHowToPay").hide();

  $("#howToBuy").on("click", function () {
    $("#textHowToBuy").toggle().css("color", "rgb(40, 105, 245)");
  });
  $("#howToPay").on("click", function () {
    $("#textHowToPay").toggle().css("color", "rgb(40, 105, 245)");
  });
});

// Interactuar con API para obtener el valor del dolar hoy, guardarlo en el localStorage, mostrarlo en el dom y utilizarlo para calular el valor de los productos en esa moneda

const urlApi =
  "https://openexchangerates.org/api/latest.json?app_id=e82d0e43d7a545ba923feba46e1ec1d8";


function traerDolar() {
  $.get(urlApi, function (respuesta, estado) {
    if (estado === "success") {
      valorDolar = respuesta;
      $("#cotizacion").append(`<div>
                           <p>Dólar hoy: ${valorDolar.rates.ARS}</p>
                          </div>`);
    }

    let dolarHoy = valorDolar.rates.ARS;

    localStorage.setItem("miDolar", JSON.stringify(dolarHoy));
  });
}
let dolarHoy = JSON.parse(localStorage.getItem("miDolar"));
traerDolar();

createCards();