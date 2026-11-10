// ============================================================
// admin.js - Panel de administración (la trastienda)
// Qué hace: muestra TODO el inventario en una tabla y deja
//   agregar, editar y borrar productos (CRUD) con su formulario.
// Los cambios se guardan en el cuaderno (localStorage), y por eso
//   aparecen solos en las páginas de hombre y mujer.
// Usa: el encargado del catalogo.js
// ============================================================

import { guardarProductos, obtenerProductos, siguienteId, Producto } from "./catalogo.js";

// ----- VARIABLES ----- //

// Convierte 150000 en "$150.000"
const formatoPesos = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });

const formulario = document.querySelector<HTMLFormElement>(".admin__formulario")!;

// Modo del formulario: null = agregar ' un número = estoy editando el prodcuto con ese id.
// let porque cambia según el botón que se presione.
let idEditando: number | null = null;
const botonFormulario = document.querySelector(".admin__agregar")!;

// Los 5 campos del formulario (se buscan una sola vez, aquí afuera)
const campoNombre = document.querySelector<HTMLInputElement>("#nombre")!;
const campoPrecio = document.querySelector<HTMLInputElement>("#precio")!;
const campoTalla = document.querySelector<HTMLInputElement>("#talla")!;
const campoCategoria = document.querySelector<HTMLInputElement>("#categoria")!;
const campoImagen = document.querySelector<HTMLInputElement>("#imagen")!;

// ----- FUNCIONES ----- //

// Molde: fabrica la fila de la tabla de UN producto y la entrega (no la dibuja).
// Una celda <td> por columna, en el mismo orden que los <th> del HTML
function crearFila(producto: Producto) {
  const fila = document.createElement("tr");
  fila.classList.add("admin__fila");

  const celdaId = document.createElement("td");
  celdaId.textContent = String(producto.id);

  // Caja dentro de caja: la celda CONTIENE una imagen.
  const celdaFoto = document.createElement("td");
  const foto = document.createElement("img");
  foto.classList.add("admin__foto");
  foto.src = producto.imagen;
  foto.alt = producto.nombre;
  celdaFoto.append(foto);

  const celdaNombre = document.createElement("td");
  celdaNombre.textContent = producto.nombre;

  const celdaCategoria = document.createElement("td");
  celdaCategoria.textContent = producto.categoria;

  const celdaTalla = document.createElement("td");
  celdaTalla.textContent = producto.talla;

  const celdaPrecio = document.createElement("td");
  celdaPrecio.textContent = formatoPesos.format(producto.precio);

  // Los botones van dentro de un <div> (y no directo en la celda) para darle
  // display: flex al div: a una <td> NO se le cambia el display.
  const celdaAcciones = document.createElement("td");
  const cajitaBotones = document.createElement("div");
  cajitaBotones.classList.add("admin__acciones");

  const botonEditar = document.createElement("button");
  botonEditar.textContent = "Editar";
  botonEditar.classList.add("admin__editar");
  botonEditar.dataset.id = String(producto.id);

  // EDITAR (momento 1): llena el formulario con los datos actuales y pasa a "modo editar."
  // El botón nace conectado y recuerda SU prodcuto (closure)
  botonEditar.addEventListener("click", () => {
    // Llenar es lo contrario de leer: del producto -> al campo
    campoNombre.value = producto.nombre;
    campoImagen.value = producto.imagen;
    campoPrecio.value = String(producto.precio);
    campoTalla.value = producto.talla;
    campoCategoria.value = producto.categoria;
    idEditando = producto.id; // recuerdo A QUIÉN estoy editando.
    botonFormulario.textContent = "Guardar"; // el dueño ves que está editando.
  });

  const botonBorrar = document.createElement("button");
  botonBorrar.textContent = "Borrar";
  botonBorrar.classList.add("admin__borrar");
  botonBorrar.dataset.id = String(producto.id);

  // BORRAR: pregunta, quita el producto de la lista, guarda y redibuja.
  botonBorrar.addEventListener("click", () => {
    // Borrar no se puede deshacer: si el dueño cancela, no hago nada (guard clause)
    if (!confirm(`¿Seguro que quieres borrar "${producto.nombre}"?`)) {
      return;
    }
    const productos = obtenerProductos();
    // Dos bolsas, dos nombres: "item" es cada uno del catálogo; "producto" es el de esta fila.
    // Me quedo con todos los que son DISTINTOS al que quiero borrar
    const productosActualizados = productos.filter((item) => item.id !== producto.id);
    guardarProductos(productosActualizados);
    dibujarTabla();
    // El carrito se cuida solo: su migración quita lo que ya no existe en el catálogo.
  });

  cajitaBotones.append(botonEditar, botonBorrar);
  celdaAcciones.append(cajitaBotones);

  fila.append(celdaId, celdaFoto, celdaNombre, celdaCategoria, celdaTalla, celdaPrecio, celdaAcciones);

  return fila;
}

// El <tbody> vacío del HTML: aquí se dibujan las filas.
const tablaCuerpo = document.querySelector(".admin__lista")!;

// Dibuja TODO el inventario (el admin no filtra por categoría).
function dibujarTabla() {
  const productos = obtenerProductos(); // los datos (la mercancía)
  tablaCuerpo.innerHTML = ""; // vacío el estante para que no salgan filas repetidas
  productos.forEach((producto) => {
    const nuevaFila = crearFila(producto);
    tablaCuerpo.append(nuevaFila);
  });
}

// ----- INICIO ----- //

dibujarTabla(); // al abrir la página

// Al enviar el formulario: AGREGA un producto nuevo o REEMPLAZA el que se está editando.
formulario.addEventListener("submit", (evento) => {
  evento.preventDefault(); // que la página no se recargue.

  const productos = obtenerProductos();

  // Leer los 5 campos. Todo lo que viene de un input es TEXTO: por eso Number() en el precio.
  const nombre = campoNombre.value;
  const precio = Number(campoPrecio.value);
  const talla = campoTalla.value;
  const categoria = campoCategoria.value;
  const imagen = campoImagen.value;

  if (idEditando === null) {
    // MODO AGREGAR: un producto nuevo con un turno nuevo de la máquina.
    const nuevoId = siguienteId();
    // Atajo de objeto { nombre } es lo mismo que { nombre: nombre }
    const productoNuevo = { id: nuevoId, nombre, precio, talla, categoria, imagen };
    productos.push(productoNuevo);
  } else {
    // MODO EDITAR: busco la posición de ese producto y reemplazo su linea, son su MISMO id.
    const posicion = productos.findIndex((item) => item.id === idEditando);
    productos[posicion] = { id: idEditando, nombre, precio, talla, categoria, imagen };
  }

  // Esto pasa en los dos modos:
  guardarProductos(productos); // la lista COMPLETA
  dibujarTabla();
  formulario.reset(); // limpia los campos

  // Salir del modo editar: si no, el siguiente producto reemplazaria al editado.
  idEditando = null;
  botonFormulario.textContent = "Agregar producto";
});
