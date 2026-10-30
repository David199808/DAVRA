import { Carrito } from "./carrito.js";

const carritoNuevo = new Carrito(); // Un solo carrito aqui arriba

console.log("¡tienda.js conectado"); // Conectado a hombre.html antes del cierre del body

const contador = document.querySelector(".menu__contador");

const botones = document.querySelectorAll(".producto__boton"); // Selecciona todo los botones de la pagina web

console.log(botones.length); // total

botones.forEach((boton) => {
  // capa 1: para cada botón
  boton.addEventListener("click", () => {
    // capa 2: cuando le hagan click
    const id = Number(boton.dataset.id); // "3" (texto) -> 3 (número)
    carritoNuevo.agregarProducto(id); // tu carrito, no el molde
    console.log(carritoNuevo.items); // ver que tiene
    contador.textContent = carritoNuevo.items.length;
  }); // Cierra el callback del clic y del addEventListener
}); // cierra el callback del forEach y el forEach
