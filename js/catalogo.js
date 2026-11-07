// Catálogo: array de objetos. Cada objeto es un producto con sus datos.

const productos = [
  // ------ PRODUCTOS HOMBRE ------ //
  {
    id: 1,
    nombre: "Buzo manga larga",
    precio: 95000,
    talla: "M",
    categoria: "hombre",
    imagen: "../imagenes/buzo-manga-larga.jpg",
  },
  {
    id: 2,
    nombre: "Pantalón ancho deportivo",
    precio: 150000,
    talla: "M",
    categoria: "hombre",
    imagen: "../imagenes/pantalon-ancho-deportivo.jpg",
  },
  {
    id: 3,
    nombre: "Jean Cargo Y2K",
    precio: 200000,
    talla: "L",
    categoria: "hombre",
    imagen: "../imagenes/jean-cargo.jpg",
  },
  {
    id: 4,
    nombre: "Hoodie Ribete",
    precio: 170000,
    talla: "L",
    categoria: "hombre",
    imagen: "../imagenes/hoodie-ribete.jpg",
  },
  {
    id: 5,
    nombre: "Camiseta negra cruz roja",
    precio: 120000,
    talla: "L",
    categoria: "hombre",
    imagen: "../imagenes/camisa-negra-estampado.jpg",
  },
  {
    id: 6,
    nombre: "Polo Los Ángeles",
    precio: 99000,
    talla: "L",
    categoria: "hombre",
    imagen: "../imagenes/polo-los-angeles.jpg",
  },
  //------ PRODUCTOS MUJER ------ //
  {
    id: 7,
    nombre: "Top rojo cuello tortuga",
    precio: 80000,
    talla: "S",
    categoria: "mujer",
    imagen: "../imagenes/mujer/top-cuello-tortuga.jpeg",
  },
  {
    id: 8,
    nombre: "Saco blanco tejido",
    precio: 120000,
    talla: "M",
    categoria: "mujer",
    imagen: "../imagenes/mujer/saco-tejido.jpeg",
  },
  {
    id: 9,
    nombre: "Blusa cuello tortuga negro",
    precio: 90000,
    talla: "M",
    categoria: "mujer",
    imagen: "../imagenes/mujer/blusa-cuello-tortuga-negra.jpeg",
  },
  {
    id: 10,
    nombre: "Body asimétrico azul",
    precio: 65000,
    talla: "S",
    categoria: "mujer",
    imagen: "../imagenes/mujer/body-asimetrico.jpeg",
  },
  {
    id: 11,
    nombre: "Buzo amarillo rayas",
    precio: 75000,
    talla: "M",
    categoria: "mujer",
    imagen: "../imagenes/mujer/buso-manga-corta-rayas.jpeg",
  },
  {
    id: 12,
    nombre: "Body x2 piezas",
    precio: 140000,
    talla: "M",
    categoria: "mujer",
    imagen: "../imagenes/mujer/conjunto-de-2-piezas.jpeg",
  },
  {
    id: 13,
    nombre: "Corset de malla blanco",
    precio: 80000,
    talla: "M",
    categoria: "mujer",
    imagen: "../imagenes/mujer/corset-de-malla.jpeg",
  },
];

// ----- FUNCIONES ----- //

export function guardarProductos(lista) {
  localStorage.setItem("catalogo", JSON.stringify(lista));
}

export function obtenerProductos() {
  const guardado = localStorage.getItem("catalogo");
  if (guardado) {
    return JSON.parse(guardado);
  } else {
    guardarProductos(productos);
    return productos;
  }
}

export function siguienteId() {
  const guardado = localStorage.getItem("ultimoId");
  let ultimo;
  if (guardado) {
    ultimo = Number(guardado);
  } else {
    const ids = obtenerProductos().map((item) => item.id);
    ultimo = Math.max(...ids);
  }
  const nuevo = ultimo + 1;
  localStorage.setItem("ultimoId", nuevo);
  return nuevo;
}
