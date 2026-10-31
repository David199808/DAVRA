const botones = document.querySelectorAll(".pruducto__botones");
const contador = document.querySelector(".menu__contador");
const carritoNuevo = new Carrito();

botones.forEach((boton) => {
  boton.addEventListener("click", () => {
    const id = Number(boton.dataset.id);
    carritoNuevo.agregarCarrito(id);
    contador.textContent += carritoNuevo.item.length;
  });
});
