import { Carrito } from "./carrito.js";

//-----USO DE LA CLASE----

// new: crea un carrito nuevo a partir del molde Carrito.
// Cada carrito es una INSTANCIA independiente, con su propio items vacío.
// Es como dos clientes en la tienda, cada uno con su carrito.
const carrito1 = new Carrito();
const carrito2 = new Carrito();

// Cada carrito usa SU método agregarProducto con un id del catálogo.
// Lo que se agrega a uno NO aparece en el otro.

carrito1.agregarProducto(1); // este es el error
carrito2.agregarProducto(2); // carrito2 -> Pntalon ancho deportivo

// Cada carrito muestra solo SUS productos y SU total.

carrito1.mostrarCarrito(); // -> Buzo manga larga - Talla: M - $95000 / Total: $95000
carrito2.mostrarCarrito(); // -> Pantalón ancho deportivo - Talla: M - $150000 / Total: $150000

// try/catch: qué es -> una estructura para manejar errores.
// Para qué sirve -> que un error no detenga el programa.

try {
  // try: intenta ejecutar el código que puede fallar
  carrito1.agregarProducto(99);
} catch (error) {
  // error: variable (como un parámetro) que recibe el error ATRAPADO.
  // catch: se ejecuta SOLO si hubo un error. error = el error atrapado
  console.log(error.message); // .messsage = el texto que se puso en new Error
}

console.log("¿LLegue aqui?");

// Cuando algo no funcione y no sepa donde se detiene usar las siguientes herramientas:

//console.log("1. antes del for");
//console.log("2. dentro del if");
//console.log("3. después del for");

//-----JSON-----
// Que és: un formato de texto para guardar o enviar datos con la misma forma que los objetos y arrays de JavaScript
// Para que sirve: los datos de JavaScript viven en memoria y se borran al cerrar. Para guardarlos (localStorage, un archivo) o enviarlos (a un servidor), hay que convertirlos en texto.

// -----FUNCIONES-----

const carritoTexto = JSON.stringify(carrito1.items);
// JSON.stringify(dato) - Objeto o array --> texto - Empacar la caja para enviarla

console.log(typeof carritoTexto);
console.log(carritoTexto);

const carritoRecuperado = JSON.parse(carritoTexto);
// JSON.parse(texto) - Texto --> objeto o array - Desempacarla al llegar

console.log(typeof carritoRecuperado);
console.log(carritoRecuperado);
