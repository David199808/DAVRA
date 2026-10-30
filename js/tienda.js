//----- DOM ----- //

import { Carrito } from "./carrito.js";

const carritoNuevo = new Carrito(); // Un solo carrito aqui arriba

console.log("¡tienda.js conectado"); // Conectado a hombre.html antes del cierre del body

const contador = document.querySelector(".menu__contador"); // selecciona el contador (<span> del html)

const botones = document.querySelectorAll(".producto__boton"); // Selecciona todo los botones de la pagina web

console.log(botones.length); // total

botones.forEach((boton) => {
  // capa 1: para cada botón
  boton.addEventListener("click", () => {
    // capa 2: cuando le hagan click
    const id = Number(boton.dataset.id); // "3" (texto) -> 3 (número)
    carritoNuevo.agregarProducto(id); // tu carrito, no el molde
    console.log(carritoNuevo.items); // ver que tiene
    contador.textContent = carritoNuevo.items.length; // Se cuenta cuantos productos hay debtro del carrito, y el Numero se escribe en el menu visual (5) segun cuantos elementos se agregue al carrito (DOM: textContent)
    boton.textContent = "✓ Agregado"; // Cambia el texto del boton a "✓ Agregado"
    boton.classList.add("producto__boton--agregado"); // Agregar estilos de esta clase
    setTimeout(() => {
      // funcion que espera cierto tiempo y despues ejecuta un callback
      boton.textContent = "Agregar al carrito"; // Cuando se agote el tiempo vuelve y excribe este texto
      boton.classList.remove("producto__boton--agregado"); // Cuando se agote el tiempo remueve esta clase
    }, 1000); // Cuanto esperar en milisegundos
  }); // Cierra el callback del clic y del addEventListener
}); // cierra el callback del forEach y el forEach
