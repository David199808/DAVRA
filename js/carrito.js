// CARRITO V1

// Carrito: array que guarda los productos elegidos
//1.
//const carrito = [];

// Esta función lo que hace es agregar elementos al carrito por su id
//function agregarProducto(id) {
//for (let producto of productos) {
// Recorre producto por producto de la lista
//if (id === producto.id) {
// Si el id que recibio la función es igual al id de este producto
//carrito.push(producto); // Entonces agrega ese producto (objeto completo) al carrito
//    }
//  }
//}

//agregarProducto(1); // Agrega el producto con id 1 (buzo manga larga)
//agregarProducto(3); // Agrega el producto con id 3 (jean cargo)
//console.log(carrito); // Muestra lo que hay en el carrito

// calcularTotal: recorre el carrito y devuelve la suma de los precios
//2.
//function calcularTotal() {
//  let total = 0;
//  for (const { precio } of carrito) {
// Recorre el precio de los elementos del carrito, aqui se esta utilizando desestructuracion por eso llama de una vez la propiedad
//    total += precio; // El total es la suma del precio de cada elemento
//  }
//  return total; // Devuelve el total cuando el bucle termina de recorrer el carrito
//}

//console.log(calcularTotal());

// quitarProducto: busca en el carrito el producto con ese id y lo elimina
//3.
//function quitarProducto(id) {
//  for (let i = 0; i < carrito.length; i++) {
// recorre el carrito, posición por posición
//    if (carrito[i].id === id) {
// si el producto en la posición i tiene ese id...
//      carrito.splice(i, 1); // ...quita 1 elemento desde la posición i
//      break; // y para: solo quitamos uno
//    }
//  }
//}

//quitarProducto(1); // Quita el producto con id 1 (Buzo manga larga)
//quitarProducto(3); // Quita el producto con identificacion 3 (jean cargo)
//console.log(carrito); // solo debería quedar el Jean Cargo
//console.log(calcularTotal()); // 200000

// IMPRIMIR cada elemento del carrito
//4.
//function mostrarCarrito() {
//  for (const { nombre, talla, precio } of carrito) {
//    console.log(`${nombre} - Talla: ${talla} - $${precio}`);
//  }
//  console.log(`Total: $${calcularTotal()}`);
//}

//agregarProducto(1); // Agrega el producto con id 1 (buzo manga larga)
//agregarProducto(3); // Agrega el producto con id 3 (jean cargo)
//mostrarCarrito(); // Muestra todo lo que hay en el carrito uno por uno con sus valores

// ------CLASES-------

// CARRITO V1.1

// Catálogo: array de objetos. Cada objeto es un producto con sus datos.

const productos = [
  { id: 1, nombre: "Buzo manga larga", precio: 95000, talla: "M" },
  { id: 2, nombre: "Pantalón ancho deportivo", precio: 150000, talla: "M" },
  { id: 3, nombre: "Jean Cargo Y2K", precio: 200000, talla: "L" },
  { id: 4, nombre: "Hoodie Ribete", precio: 170000, talla: "L" },
];

// Carrito: clase (molde) para crear carritos.
// Datos: items.
// Acciones: agregar, quitar, total, mostrar.

class Carrito {
  constructor() {
    this.items = [];
  }

  agregarProducto(id) {
    for (let producto of productos) {
      // Recorre producto por producto de la lista
      if (id === producto.id) {
        // Si el id que recibio la función es igual al id de este producto
        this.items.push(producto); // Entonces agrega ese producto (objeto completo) al carrito
        return; // sale de toda la función: ya se agregó, no hay que seguir.
      }
    }
    throw new Error(`El producto con id ${id} no existe`); // throw: lanza un error y detiene la función. new Error crea el error con su mensaje.
  }

  calcularTotal() {
    let total = 0;
    for (const { precio } of this.items) {
      // Recorre el precio de los elementos del carrito, aqui se esta utilizando desestructuracion por eso llama de una vez la propiedad
      total += precio; // El total es la suma del precio de cada elemento
    }
    return total; // Devuelve el total cuando el bucle termina de recorrer el carrito
  }

  quitarProducto(id) {
    for (let i = 0; i < this.items.length; i++) {
      // recorre el carrito, posición por posición
      if (this.items[i].id === id) {
        // si el producto en la posición i tiene ese id...
        this.items.splice(i, 1); // ...quita 1 elemento desde la posición i
        break; // y para: solo quitamos uno
      }
    }
  }

  mostrarCarrito() {
    for (const { nombre, talla, precio } of this.items) {
      console.log(`${nombre} - Talla: ${talla} - $${precio}`);
    }
    console.log(`Total: $${this.calcularTotal()}`);
  }
}

//-----USO DE LA CLASE----

// new: crea un carrito nuevo a partir del molde Carrito.
// Cada carrito es una INSTANCIA independiente, con su propio items vacío.
// Es como dos clientes en la tienda, cada uno con su carrito.
const carrito1 = new Carrito();
const carrito2 = new Carrito();

// Cada carrito usa SU método agregarProducto con un id del catálogo.
// Lo que se agrega a uno NO aparece en el otro.

//carrito1.agregarProducto(99); // este es el error
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
