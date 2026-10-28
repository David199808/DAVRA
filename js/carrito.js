// CARRITO V1

// ------CLASES-------
// CARRITO V1.1 Class
// -----CARRITO V1.3 Modulos-----

import { productos } from "./productos.js";

// Carrito: clase (molde) para crear carritos.
// Datos: items.
// Acciones: agregar, quitar, total, mostrar.

export class Carrito {
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
