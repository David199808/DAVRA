//----- DOM ----- //

import { Carrito } from "./carrito.js";

const carritoNuevo = new Carrito(); // Un solo carrito aqui arriba

const contador = document.querySelector(".menu__contador"); // selecciona el contador (<span> del html)

const botones = document.querySelectorAll(".producto__boton"); // Selecciona todo los botones de la pagina web

// actualizarContador: escribe en el menu cuantos productos tiene el carrito
function actualizarContador() {
  // Es una función para no repetir la linea (DRY): se usa al cargar y en cada click
  contador.textContent = carritoNuevo.items.length; // Cantidad de prodcutos -> texto del contador.
}

actualizarContador(); // al cargar: muestra lo que quedo guardado en el localStorage.

botones.forEach((boton) => {
  // capa 1: para cada botón
  boton.addEventListener("click", () => {
    // capa 2: cuando le hagan click
    const id = Number(boton.dataset.id); // "3" (texto) -> 3 (número)
    carritoNuevo.agregarProducto(id); // tu carrito, no el molde
    console.log(carritoNuevo.items); // ver que tiene
    actualizarContador(); // Mantiene el contador 1+1+1
    boton.textContent = "✓ Agregado"; // Cambia el texto del boton a "✓ Agregado"
    boton.classList.add("producto__boton--agregado"); // Agregar la clase que pinta el boton de "agregado".
    // setTimeout: espera 1000 ms (1 segundo) y despues ejecuta el callback
    setTimeout(() => {
      boton.textContent = "Agregar al carrito"; // Cuando se agote el tiempo vuelve y excribe este texto
      boton.classList.remove("producto__boton--agregado"); // Cuando se agote el tiempo remueve esta clase
    }, 1000); // Cuanto esperar en milisegundos
  }); // Cierra el callback del clic y del addEventListener
}); // cierra el callback del forEach y el forEach
