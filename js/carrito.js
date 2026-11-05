import { productos } from "./productos.js";

// Carrito: clase (molde) para crear carritos.
// Datos: items.
// Acciones: agregar, quitar, total, mostrar, guardar, contar unidades.

//----- CLASE PARA EL CARRITO -----//

//----- CONSTRUCTOR -----//

export class Carrito {
  constructor() {
    this.items = []; // Por defecto carrito vacío.
    const guardado = localStorage.getItem("carrito"); // saca el texto del casillero (o null).
    if (guardado) {
      // si había algo guardado...
      const guardados = JSON.parse(guardado); // Convierte el texto guardado en un array de objetos(los recibos viejos).
      // Deja solo los items que todavia existen en el catalogo y quita los que ya no existen.
      const existentes = guardados.filter((item) => productos.find((producto) => producto.id === item.id));
      // para los items que quedaron en existentes TRANSFORMA cada item que quedó en un producto actualizado.
      this.items = existentes.map((item) => {
        // Busca en el catalogo el producto actual con el mismo id.
        const actual = productos.find((producto) => producto.id === item.id);
        // retorna esos ultimos items con todo lo que ya trae en el catalogo datos actuales y solo la cantidad del recibo o 1
        return { ...actual, cantidad: item.cantidad ?? 1 };
      });
      this.guardar();
      //guarda en localStorage el carrito ya limpio.
    }
  }
  //----- CONSTRUCTOR END -----//

  //---------- METODOS ----------//

  //----- GUARDAR EN LOCALSTORAGE -----//
  guardar() {
    localStorage.setItem("carrito", JSON.stringify(this.items));
  }
  //----- GUARDAR EN LOCALSTORAGE END-----//

  //----- CONTAR TOTAL DE UNIDADES ------//
  contarUnidades() {
    return this.items.reduce((unidades, producto) => unidades + producto.cantidad, 0);
  }
  //----- CONTAR TOTAL DE UNIDADES END ------//

  //----- AGREGAR PRODUCTOS -----//
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
  //----- AGREGAR PRODUCTOS END -----//

  //----- CALCULAR EL TOTAL -----//
  calcularTotal() {
    return this.items.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
  }
  //----- CALCULAR EL TOTAL END -----//

  //----- QUITAR EL PRODUCTO -----//
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
  //----- QUITAR EL PRODUCTO END-----//

  //----- MOSTRAR CONTENIDO CARRITO -----//
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
  //----- MOSTRAR CONTENIDO CARRITO END-----//
}
//---------- METODOS ----------//
//----- CLASE END -----//
