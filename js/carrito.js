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

  // Guardar en localStorage.
  guardar() {
    localStorage.setItem("carrito", JSON.stringify(this.items));
  }

  // Contar total de unidades de la prenda
  contarUnidades() {
    return this.items.reduce((unidades, producto) => unidades + producto.cantidad, 0);
  }

  agregarProducto(id) {
    // find: busca en el catalogo el producto con ese id (si no existe, prenda queda undefined)
    const prenda = productos.find((producto) => producto.id === id);
    if (!prenda) {
      // SI NO existe / no hay nada
      throw new Error(`El producto con id ${id} no existe`); // lanza el error y detiene la función
    }

    // Busca en el CARRITO si este producto ya fue agregado (undefined si es nuevo)
    const enCarrito = this.items.find((producto) => producto.id === id);

    if (enCarrito) {
      // ya está: le suma 1 a su cantidad (cambia el obejto que esta dentro de items)
      enCarrito.cantidad += 1;
    } else {
      // es nuevo: mete una COPIA de la prenda con cantidad 1
      // (copia con spread para no modificar el catálogo original)
      this.items.push({ ...prenda, cantidad: 1 });
    }
    this.guardar(); // en los dos casos, guarda el carrito en localStorage.
  }

  // calcularTotal con (reduce)
  calcularTotal() {
    return this.items.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
  }

  quitarProducto(id) {
    // findIndex busca en el carrito la posicion del producto con ese id (-1 si no está).
    const posicion = this.items.findIndex((producto) => producto.id === id);
    if (posicion === -1) {
      // -1 = no está en el carrito. Se compara con === -1 y no con !posicion (0 es falsy).
      return; // no hay nada que quitar: sale sin hacer nada.
    }
    const articulo = this.items[posicion];
    if (articulo.cantidad > 1) {
      articulo.cantidad -= 1;
    } else {
      this.items.splice(posicion, 1); // Quita 1 elemento desde la posicion
    }

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
