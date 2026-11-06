//----- DOM ----- //

/*-----IMPORT-----*/
import { Carrito } from "./carrito.js";
import { productos } from "./catalogo.js";
/*-----IMPORT END-----*/

/*-----VARIABLES-----*/
const carritoNuevo = new Carrito(); // Un solo carrito aqui arriba

const contador = document.querySelector(".menu__contador"); // selecciona el contador (<span> del html)

const buscador = document.querySelector(".buscador");

const vitrina = document.querySelector(".catalogo");

const formatoPesos = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });

/*-----VARIABLES END-----*/

/*-----FUNCIONES-----*/

// actualizarContador: escribe en el menu cuantos productos tiene el carrito
function actualizarContador() {
  // Es una función para no repetir la linea (DRY): se usa al cargar y en cada click
  contador.textContent = carritoNuevo.contarUnidades(); // Cantidad de prodcutos -> texto del contador.
}

actualizarContador(); // al cargar: muestra lo que quedo guardado en el localStorage.

//----- Catalogo: FABRICA HTML -----//
function crearTarjeta(producto) {
  const tarjeta = document.createElement("article");
  tarjeta.classList.add("producto");
  const foto = document.createElement("img");
  foto.classList.add("producto__imagen");
  foto.src = producto.imagen;
  foto.alt = producto.nombre;
  const nombre = document.createElement("h2");
  nombre.classList.add("producto__titulo");
  nombre.textContent = producto.nombre;
  const precio = document.createElement("p");
  precio.classList.add("producto__precio");
  precio.textContent = formatoPesos.format(producto.precio);
  const talla = document.createElement("p");
  talla.classList.add("producto__talla");
  talla.textContent = "Talla " + producto.talla;
  // ------ Crear el boton ----- //

  const boton = document.createElement("button");

  // ----- Vestir y llenar ----- //
  boton.classList.add("producto__boton");
  boton.dataset.id = producto.id;
  boton.textContent = "Agregar al carrito";

  // ------ Conectar ------ //
  boton.addEventListener("click", () => {
    // Cuando le hagan click.
    carritoNuevo.agregarProducto(producto.id); // .... agrega a tu carrito, no el molde
    actualizarContador(); // Mantiene el contador 1+1+1
    boton.textContent = "✓ Agregado"; // Cambia el texto del boton a "✓ Agregado"
    boton.classList.add("producto__boton--agregado"); // Agregar la clase que pinta el boton de "agregado".
    // setTimeout: espera 1000 ms (1 segundo) y despues ejecuta el callback
    setTimeout(() => {
      boton.textContent = "Agregar al carrito"; // Cuando se agote el tiempo vuelve y excribe este texto
      boton.classList.remove("producto__boton--agregado"); // Cuando se agote el tiempo remueve esta clase
    }, 1000); // Cuanto esperar en milisegundos
  }); // Cierra el callback del clic y del addEventListener

  tarjeta.append(foto, nombre, precio, talla, boton);
  return tarjeta;
}

//----- Catalogo: FABRICA HTML -----//

// ----- Dibujar el catalogo ----- //

function cargarProductos() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(productos);
    }, 1000);
  });
}

async function dibujarCatalogo() {
  vitrina.textContent = "Cargando productos...";
  try {
    const productosCargados = await cargarProductos();
    const categoria = vitrina.dataset.categoria;
    const productosCategoria = productosCargados.filter((producto) => producto.categoria === categoria);
    vitrina.innerHTML = "";
    productosCategoria.forEach((producto) => {
      const nuevaTarjeta = crearTarjeta(producto);
      vitrina.append(nuevaTarjeta);
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    vitrina.textContent = "No pudimos cargar los productos, Intenta recargar la página";
  }
}

dibujarCatalogo();

// ----- Dibujar el catalogo end ----- //

/*-----FUNCIONES END-----*/

/*-----EVENTO BUSCADOR-----*/

// Cuando el cliente escriba o borre en el buscador.
buscador.addEventListener("input", () => {
  const tarjetas = document.querySelectorAll(".producto");
  const texto = buscador.value.toLowerCase(); // Lee lo que esta escrito siempre en minuscula
  tarjetas.forEach((tarjeta) => {
    // Para cada tarjeta de las tarjetas...
    const titulo = tarjeta.querySelector(".producto__titulo").textContent.toLowerCase(); //...busca el nombre del titulo y convierte todo a minuscula para que se pueda comparar
    if (titulo.includes(texto)) {
      // SI el titulo CONTIENE lo escrito en el buscador
      tarjeta.hidden = false; // No esta escondida: la tarjeta se ve.
    } else {
      tarjeta.hidden = true; // SI NO, esconde esta tarjeta.
    }
  });
});

/*-----EVENTO BUSCADOR END-----*/
