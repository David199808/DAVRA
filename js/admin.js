import { guardarProductos, obtenerProductos, siguienteId } from "./catalogo.js";

// Convierte 150000 en "$150.000"
const formatoPesos = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });

const formulario = document.querySelector(".admin__formulario");

function crearFila(producto) {
  const fila = document.createElement("tr");
  fila.classList.add("admin__fila");

  const celdaId = document.createElement("td");
  celdaId.textContent = producto.id;

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

  const celdaAcciones = document.createElement("td");
  const cajitaBotones = document.createElement("div");
  cajitaBotones.classList.add("admin__acciones");

  const botonEditar = document.createElement("button");
  botonEditar.textContent = "Editar";
  botonEditar.classList.add("admin__editar");
  botonEditar.dataset.id = producto.id;

  const botonBorrar = document.createElement("button");
  botonBorrar.textContent = "Borrar";
  botonBorrar.classList.add("admin__borrar");
  botonBorrar.dataset.id = producto.id;

  botonBorrar.addEventListener("click", () => {
    if (!confirm(`¿Seguro que quieres borrar "${producto.nombre}"?`)) {
      return;
    }
    const productos = obtenerProductos();
    const productosActualizados = productos.filter((item) => item.id !== producto.id);
    guardarProductos(productosActualizados);
    dibujarTabla();
  });

  cajitaBotones.append(botonEditar, botonBorrar);
  celdaAcciones.append(cajitaBotones);

  fila.append(celdaId, celdaFoto, celdaNombre, celdaCategoria, celdaTalla, celdaPrecio, celdaAcciones);

  return fila;
}

const tablaCuerpo = document.querySelector(".admin__lista");

function dibujarTabla() {
  const productos = obtenerProductos();
  tablaCuerpo.innerHTML = "";
  productos.forEach((producto) => {
    const nuevaFila = crearFila(producto);
    tablaCuerpo.append(nuevaFila);
  });
}

dibujarTabla();

const campoNombre = document.querySelector("#nombre");
const campoPrecio = document.querySelector("#precio");
const campoTalla = document.querySelector("#talla");
const campoCategoria = document.querySelector("#categoria");
const campoImagen = document.querySelector("#imagen");

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const productos = obtenerProductos();
  const nombre = campoNombre.value;
  const precio = Number(campoPrecio.value);
  const talla = campoTalla.value;
  const categoria = campoCategoria.value;
  const imagen = campoImagen.value;
  const nuevoId = siguienteId();
  const productoNuevo = { id: nuevoId, nombre, precio, talla, categoria, imagen };
  productos.push(productoNuevo);
  guardarProductos(productos);
  dibujarTabla();
  formulario.reset();
});
