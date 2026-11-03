// CARRITO V1

// ------CLASES-------
// CARRITO V1.1 Class
// -----CARRITO V1.3 Modulos-----
//-----CARRITO V1.4 (mostrarCarrito con forEach y callback)

import { productos } from "./productos.js";

// Carrito: clase (molde) para crear carritos.
// Datos: items.
// Acciones: agregar, quitar, total, mostrar.

export class Carrito {
  constructor() {
    this.items = []; // Por defecto carrito vacío.
    const guardado = localStorage.getItem("carrito"); // saca el texto del casillero (o null).
    if (guardado) {
      // si había algo guardado...
      this.items = JSON.parse(guardado); //...desempácalo y usalo como items.
    }
  }

  guardar() {
    localStorage.setItem("carrito", JSON.stringify(this.items));
  }

  agregarProducto(id) {
    // find: busca en el catalogo el producto con ese id (si no existe, prenda queda undefined)
    const prenda = productos.find((producto) => producto.id === id);
    if (!prenda) {
      // SI NO existe / no hay nada
      throw new Error(`El producto con id ${id} no existe`); // lanza el error y detiene la función
    }

    // SI EXISTE agregala y guarda
    this.items.push(prenda);
    this.guardar();
  }

  calcularTotal() {
    let total = 0;
    for (const { precio } of this.items) {
      // Recorre el precio de los elementos del carrito, aqui se esta utilizando desestructuracion por eso llama de una vez la propiedad
      total += precio; // El total es la suma del precio de cada elemento
    }
    return total; // Devuelve el total cuando el bucle termina de recorrer el carrito
  }

  //quitarProducto(id) {
  //for (let i = 0; i < this.items.length; i++) {
  // recorre el carrito, posición por posición
  //if (this.items[i].id === id) {
  // si el producto en la posición i tiene ese id...
  //this.items.splice(i, 1); // ...quita 1 elemento desde la posición i
  //this.guardar(); // cada cambio se guarda en localStorage para que no se pierda al recargar.
  //break; // y para: solo quitamos uno
  //}
  //}
  //}

  quitarProducto(id) {
    // findIndex busca en el carrito la posicion del producto con ese id (-1 si no está).
    const posicion = this.items.findIndex((producto) => producto.id === id);
    if (posicion === -1) {
      // -1 = no está en el carrito. Se compara con === -1 y no con !posicion (0 es falsy).
      return; // no hay nada que quitar: sale sin hacer nada.
    }
    this.items.splice(posicion, 1); // Quita 1 elemento desde la posicion
    this.guardar(); // Guarda los cambios en localStorage.
  }

  mostrarCarrito() {
    // forEach recorre el array de productos del carrito (this.items).
    // El callback (la arrow function) lo ejecuta forEach, una vez por cada producto.
    // { nombre, talla, precio }:→ desestructuracion, saca esos 3 valores de cada producto.
    this.items.forEach(({ nombre, talla, precio }) => {
      console.log(`${nombre} - Talla: ${talla} - $${precio}`); // Una linea por producto.
    });
    // El total va a afuera del forEach para imprimirse UNA sola vez, al final.
    console.log(`Total: $${this.calcularTotal()}`);
  }
}
