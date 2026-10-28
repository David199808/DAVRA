// CARRITO V1

// Catálogo: array de objetos. Cada objeto es un producto con sus datos.

const productos = [
  { id: 1, nombre: "Buzo manga larga", precio: 95000, talla: "M" },
  { id: 2, nombre: "Pantalón ancho deportivo", precio: 150000, talla: "M" },
  { id: 3, nombre: "Jean Cargo Y2K", precio: 200000, talla: "L" },
  { id: 4, nombre: "Hoodie Ribete", precio: 170000, talla: "L" },
];

// Carrito: array que guarda los productos elegidos
//1.
const carrito = [];

// Esta función lo que hace es agregar elementos al carrito por su id
function agregarProducto(id) {
  for (let producto of productos) {
    // Recorre producto por producto de la lista
    if (id === producto.id) {
      // Si el id que recibio la función es igual al id de este producto
      carrito.push(producto); // Entonces agrega ese producto (objeto completo) al carrito
    }
  }
}

agregarProducto(1); // Agrega el producto con id 1 (buzo manga larga)
agregarProducto(3); // Agrega el producto con id 3 (jean cargo)
console.log(carrito); // Muestra lo que hay en el carrito

// calcularTotal: recorre el carrito y devuelve la suma de los precios
//2.
function calcularTotal() {
  let total = 0;
  for (const { precio } of carrito) {
    // Recorre el precio de los elementos del carrito, aqui se esta utilizando desestructuracion por eso llama de una vez la propiedad
    total += precio; // El total es la suma del precio de cada elemento
  }
  return total; // Devuelve el total cuando el bucle termina de recorrer el carrito
}

console.log(calcularTotal());

// quitarProducto: busca en el carrito el producto con ese id y lo elimina
//3.
function quitarProducto(id) {
  for (let i = 0; i < carrito.length; i++) {
    // recorre el carrito, posición por posición
    if (carrito[i].id === id) {
      // si el producto en la posición i tiene ese id...
      carrito.splice(i, 1); // ...quita 1 elemento desde la posición i
      break; // y para: solo quitamos uno
    }
  }
}

quitarProducto(1); // Quita el producto con id 1 (Buzo manga larga)
quitarProducto(3); // Quita el producto con identificacion 3 (jean cargo)
console.log(carrito); // solo debería quedar el Jean Cargo
console.log(calcularTotal()); // 200000

// IMPRIMIR cada elemento del carrito
//4.
function mostrarCarrito() {
  for (const { nombre, talla, precio } of carrito) {
    console.log(`${nombre} - Talla: ${talla} - $${precio}`);
  }
  console.log(`Total: $${calcularTotal()}`);
}

agregarProducto(1); // Agrega el producto con id 1 (buzo manga larga)
agregarProducto(3); // Agrega el producto con id 3 (jean cargo)
mostrarCarrito(); // Muestra todo lo que hay en el carrito uno por uno con sus valores
