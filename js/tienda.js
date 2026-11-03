//----- DOM ----- //

//-----IMPORT-----//
import { Carrito } from "./carrito.js";
//-----IMPORT END-----//

//-----VARIABLES-----//
const carritoNuevo = new Carrito(); // Un solo carrito aqui arriba

const contador = document.querySelector(".menu__contador"); // selecciona el contador (<span> del html)

const botones = document.querySelectorAll(".producto__boton"); // Selecciona todo los botones de la pagina web

const buscador = document.querySelector(".buscador");

const tarjetas = document.querySelectorAll(".producto");
//-----VARIABLES END-----//

//-----FUNCIONES-----//
// actualizarContador: escribe en el menu cuantos productos tiene el carrito
function actualizarContador() {
  // Es una función para no repetir la linea (DRY): se usa al cargar y en cada click
  contador.textContent = carritoNuevo.items.length; // Cantidad de prodcutos -> texto del contador.
}

actualizarContador(); // al cargar: muestra lo que quedo guardado en el localStorage.
//-----FUNCIONES END-----//

//-----EVENTO BOTONES-----//

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

//-----EVENTO BOTONES END-----//

//-----EVENTO BUSCADOR-----//

// Cuando el cliente escriba o borre en el buscador.
buscador.addEventListener("input", () => {
  const texto = buscador.value.toLowerCase(); // Lee lo que esta escrito siempre en minuscula
  tarjetas.forEach((tarjeta) => {
    // Para cada tarjeta de las tarjetas...
    const titulo = tarjeta.querySelector(".producto__titulo").textContent.toLowerCase(); //...busca el nombre del titulo y convierte todo a minuscula para que se pueda comparar
    if (titulo.includes(texto)) {
      // SI el titulo CONTIENE lo escrito en el buscador
      tarjeta.hidden = false; // No esta escondida: la tarjeta se ve.
    } else {
      tarjeta.hidden = true; // SI NO, esconde esta tarjeta.
    }
  });
});

//-----EVENTO BUSCADOR END-----//
