//======================================================
// tienda.js - Páginas de hombre y mujer
// Dibuja el catálogo desde los datos, conecta los botones...
// ... del carrito y filtra las tarjetas con el buscador.
//======================================================

/* ----- IMPORTS -----*/
// Lo que traigo de otros archivos.
import { Carrito } from "./carrito.js";
import { obtenerProductos, Producto, Talla } from "./catalogo.js";
/* ----- IMPORTS END ----- */

/* ----- VARIABLES -----*/
// Un solo carrito para toda la página (lo comparten todos los botones)
const carritoNuevo = new Carrito(); // Un solo carrito aqui arriba

// Elementos del HTML que vamos a usar.
const contador = document.querySelector(".menu__contador"); // selecciona el contador (<span> del html)
const buscador = document.querySelector<HTMLInputElement>(".buscador");
const vitrina = document.querySelector<HTMLElement>(".catalogo");

// Convierte 150000 en "$150.000"
const formatoPesos = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });

/* ----- VARIABLES END -----*/

/* ----- FUNCIONES ----- */

// Escribe en el menú cuántas unidades hay en el carrito.
// Es una función para no repetir esta línea (DRY): se usa al cargar y en cada clic.
function actualizarContador() {
  if (contador) {
    contador.textContent = String(carritoNuevo.contarUnidades()); // Cantidad de prodcutos -> texto del contador.
  }
}

//----- Catalogo: FÁBRICA HTML -----//
// Molde: fabrica la tarjeta de UN producto y la entrega (no la dibuja).
// Orden: crear -> vestir -> llenar -> conectar -> armar y entregar.
function crearTarjeta(producto: Producto) {
  const tarjeta = document.createElement("article");
  tarjeta.classList.add("producto");

  const foto = document.createElement("img");
  foto.classList.add("producto__imagen");
  foto.src = producto.imagen;
  foto.alt = producto.nombre;
  foto.loading = "lazy";

  const nombre = document.createElement("h2");
  nombre.classList.add("producto__titulo");
  nombre.textContent = producto.nombre;

  const precio = document.createElement("p");
  precio.classList.add("producto__precio");
  precio.textContent = formatoPesos.format(producto.precio);

  const selecTalla = document.createElement("select");
  selecTalla.classList.add("producto__talla");
  producto.tallas.forEach((t) => {
    const opcion = document.createElement("option");
    opcion.value = t;
    opcion.textContent = t;
    selecTalla.append(opcion);
  });

  const boton = document.createElement("button");
  boton.classList.add("producto__boton");
  boton.dataset.id = String(producto.id);
  boton.textContent = "Agregar al carrito";

  // El botón nace ya conectado: así funciona sin importar cuándo se dibuje la tarjeta.
  boton.addEventListener("click", () => {
    // Cuando le hagan click.
    carritoNuevo.agregarProducto(producto.id, selecTalla.value as Talla); // .... agrega a tu carrito, no el molde
    actualizarContador(); // Mantiene el contador 1+1+1

    // Confirmacion visual: el cliente ve "✓ Agregado" durante 1 segundo.
    boton.textContent = "✓ Agregado";
    boton.classList.add("producto__boton--agregado"); // Agregar la clase que pinta el boton de "agregado".
    // setTimeout: espera 1000 ms (1 segundo) y despues ejecuta el callback
    setTimeout(() => {
      boton.textContent = "Agregar al carrito"; // Cuando se agote el tiempo vuelve y excribe este texto
      boton.classList.remove("producto__boton--agregado"); // Cuando se agote el tiempo remueve esta clase
    }, 1000); // Cuanto esperar en milisegundos
  }); // Cierra el callback del clic y del addEventListener

  tarjeta.append(foto, nombre, precio, selecTalla, boton);
  return tarjeta;
}

//----- Catalogo: FABRICA HTML end -----//

// Simula que los productos tardan 1 segundo en llegar.
// Mas adelante vendran del localStorage (módulo admin) o de un servidor.
function cargarProductos(): Promise<Producto[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(obtenerProductos());
    }, 1000);
  });
}

// Muestra "Cargando...", espera los productos y dibuja solo los de está página.

// la categoría la decide el HTML: <section class="catalogo" data-categoria="hombre">.
async function dibujarCatalogo() {
  if (!vitrina) return;
  vitrina.textContent = "Cargando productos...";
  try {
    const productosCargados = await cargarProductos();
    const categoria = vitrina.dataset.categoria;
    const productosCategoria = productosCargados.filter((producto) => producto.categoria === categoria);
    vitrina.innerHTML = ""; // quita el "Cargando..." antes de dibujar.
    productosCategoria.forEach((producto) => {
      const nuevaTarjeta = crearTarjeta(producto);
      vitrina.append(nuevaTarjeta);
    });
  } catch (error) {
    console.error(error); // para el programador: el error real y su linea.
    vitrina.textContent = "No pudimos cargar los productos, Intenta recargar la página"; // para el cliente.
  }
}

/* ----- FUNCIONES END ----- */

/* ----- EVENTOS ----- */

// Buscador: esconde las tarjetas cuyo nombre no contiene lo que se escribió.
if (buscador) {
  buscador.addEventListener("input", () => {
    // Se busca las tarjetas AQUÍ (en cada búsqueda) porque se dibujan despues de cargar la página.
    const tarjetas = document.querySelectorAll<HTMLElement>(".producto");
    const texto = buscador.value.toLowerCase(); // en minúscula para comparar sin importar mayúsculas

    tarjetas.forEach((tarjeta) => {
      //...busca el nombre del titulo y convierte todo a minuscula para que se pueda comparar
      const titulo = tarjeta.querySelector(".producto__titulo")!.textContent.toLowerCase();
      tarjeta.hidden = !titulo.includes(texto); // si NO contiene el texto -> se esconde
    });
  });
}

/*-----EVENTO END-----*/

// ----- INICIO ----- //

// Lo que se ejecuta al abrir la página.
actualizarContador(); // muestra lo que quedó guardado en el carrito
dibujarCatalogo();
