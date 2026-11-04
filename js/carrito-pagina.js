import { Carrito } from "./carrito.js";

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

//----- VATIABLES END -----//

//----- FUNCIONES ----//

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
    carritoNuevo.items.forEach(({ id, nombre, talla, precio }) => {
      //recorre el carrito desestructurando los 3 datos de cada producto.
      const li = document.createElement("li"); // crea un li por CADA producto del carrito.
      const boton = document.createElement("button"); // Crea un boton por cada producto del carrito.
      boton.textContent = "Quitar"; // escribe "quitar" en ese boton
      boton.addEventListener("click", () => {
        // Cuando haga click en el boton:
        carritoNuevo.quitarProducto(id); // Quita el producto coon ese id (el boton recuerda su id gracias al closure)
        mostrarCarrito(); // Redibuja la pagina con los productos que quedan.
      });
      li.textContent = `${nombre} - Talla: ${talla} - ${formatoPesos.format(precio)}`; // y le escribe los datos del producto.
      li.append(boton); // mete el boton dentro del li asi cada boton aparece en cada li
      lista.append(li); // Mete el "li" en la lista (aquí aparece en la página)
    });
  }
  // El total lo calcula la clase (calcularTotal) y se escribe en el parrafo.
  total.textContent = `Total: ${formatoPesos.format(carritoNuevo.calcularTotal())}`;

  const cantidadTotal = carritoNuevo.items.length;
  if (cantidadTotal === 1) {
    totalProductos.textContent = `Tienes ${cantidadTotal} producto`;
  } else {
    totalProductos.textContent = `Tienes ${cantidadTotal} productos`;
  }
}

mostrarCarrito(); // Al cargar la página: dibuja el carrito por primera vez.

//----- FUNCIONES END ----//
