import { Carrito } from "./carrito.js";
import { productos } from "./productos.js";

//----- VATIABLES -----//

const carritoNuevo = new Carrito();

export const formatoPesos = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

const lista = document.querySelector(".carrito__lista");

const total = document.querySelector(".carrito__total");

const mensajeVacio = document.querySelector(".carrito__vacio");

const totalProductos = document.querySelector(".carrito__cantidad");

const pedido = document.querySelector(".carrito__pedido");

//----- VATIABLES END -----//

//----- FUNCIONES ----//

//----- función: dibujar lista de elementos del carrito, total, total productos y boton quitar -----//

// mostrarCarrito: dibuja en la pagina los productos del carrito y el total.
// Esta es una funcion porque se usa 2 veces: al cargar la pagina y despues de cada "Quitar".

function mostrarCarrito() {
  lista.innerHTML = ""; // Vacia la lista: borra los <li> viejos antes de dibujar.
  if (carritoNuevo.items.length === 0) {
    // Si el carrito esta vacio...
    mensajeVacio.hidden = false; // ...deja visible el mensaje, que ya esta escrito en el HTML ("tu carrito esta vacio")
  } else {
    // Si no...
    mensajeVacio.hidden = true; // ...esconde el mensaje porque hay productos.
    carritoNuevo.items.forEach(({ id, nombre, talla, precio, cantidad }) => {
      //recorre el carrito desestructurando los 3 datos de cada producto.
      const li = document.createElement("li"); // crea un li por CADA producto del carrito.
      const boton = document.createElement("button"); // Crea un boton por cada producto del carrito.
      boton.textContent = "Quitar"; // escribe "quitar" en ese boton
      boton.addEventListener("click", () => {
        // Cuando haga click en el boton:
        carritoNuevo.quitarProducto(id); // Quita el producto coon ese id (el boton recuerda su id gracias al closure)
        mostrarCarrito(); // Redibuja la pagina con los productos que quedan.
      });
      const subtotal = precio * cantidad;
      li.textContent = `${nombre} - Talla: ${talla} - ${formatoPesos.format(precio)} x ${cantidad} = ${formatoPesos.format(subtotal)}`; // y le escribe los datos del producto.
      li.append(boton); // mete el boton dentro del li asi cada boton aparece en cada li
      lista.append(li); // Mete el "li" en la lista (aquí aparece en la página)
    });
  }
  // El total lo calcula la clase (calcularTotal) y se escribe en el parrafo.
  total.textContent = `Total: ${formatoPesos.format(carritoNuevo.calcularTotal())}`;

  const cantidadTotal = carritoNuevo.contarUnidades();
  if (cantidadTotal === 1) {
    totalProductos.textContent = `Tienes ${cantidadTotal} producto`;
  } else {
    totalProductos.textContent = `Tienes ${cantidadTotal} productos`;
  }
}

mostrarCarrito(); // Al cargar la página: dibuja el carrito por primera vez.

//----- función pedido por whatsapp -----//

pedido.addEventListener("click", () => {
  if (carritoNuevo.contarUnidades() === 0) {
    return;
  }
  const lineas = carritoNuevo.items.map(({ nombre, talla, precio, cantidad }) => {
    const subtotal = precio * cantidad;
    return `-${nombre} - (${talla}) x ${cantidad} = ${formatoPesos.format(precio)}`;
  });
  const mensaje = `¡Hola DAVRA! Quiero hacer este pedido:\n${lineas.join("\n")}\nTotal: ${formatoPesos.format(carritoNuevo.calcularTotal())}`;

  const link = `https://wa.me/573001234567?text=${encodeURIComponent(mensaje)}`;
  window.open(link, "_blank");
});

//----- FUNCIONES END ----//
