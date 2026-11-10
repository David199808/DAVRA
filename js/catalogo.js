// ===================================================
// catalogo.js - El catálogo y su encargado
// Qué hace: guarda el inventario inicial de la tienda y las
//   funciones para leerlo y guardarlo en el localStorage.
// Regla: nadie usa el array directo; todos pasan por
//    el encargado (obtenerProductos() / guardarProductos()).
// Lo usan: tienda.js, carrito.js y admin.js
// ===================================================
const productos = [
    // ------ PRODUCTOS HOMBRE ------ //
    {
        id: 1,
        nombre: "Buzo manga larga",
        precio: 95000,
        tallas: ["S", "M", "L", "XL"],
        categoria: "hombre",
        imagen: "../imagenes/buzo-manga-larga.jpg",
    },
    {
        id: 2,
        nombre: "Pantalón ancho deportivo",
        precio: 150000,
        tallas: ["S", "M", "L", "XL"],
        categoria: "hombre",
        imagen: "../imagenes/pantalon-ancho-deportivo.jpg",
    },
    {
        id: 3,
        nombre: "Jean Cargo Y2K",
        precio: 200000,
        tallas: ["S", "M", "L", "XL"],
        categoria: "hombre",
        imagen: "../imagenes/jean-cargo.jpg",
    },
    {
        id: 4,
        nombre: "Hoodie Ribete",
        precio: 170000,
        tallas: ["S", "M", "L", "XL"],
        categoria: "hombre",
        imagen: "../imagenes/hoodie-ribete.jpg",
    },
    {
        id: 5,
        nombre: "Camiseta negra cruz roja",
        precio: 120000,
        tallas: ["S", "M", "L", "XL"],
        categoria: "hombre",
        imagen: "../imagenes/camisa-negra-estampado.jpg",
    },
    {
        id: 6,
        nombre: "Polo Los Ángeles",
        precio: 99000,
        tallas: ["S", "M", "L", "XL"],
        categoria: "hombre",
        imagen: "../imagenes/polo-los-angeles.jpg",
    },
    //------ PRODUCTOS MUJER ------ //
    {
        id: 7,
        nombre: "Top rojo cuello tortuga",
        precio: 80000,
        tallas: ["S", "M", "L", "XL"],
        categoria: "mujer",
        imagen: "../imagenes/mujer/top-cuello-tortuga.jpeg",
    },
    {
        id: 8,
        nombre: "Saco blanco tejido",
        precio: 120000,
        tallas: ["S", "M", "L", "XL"],
        categoria: "mujer",
        imagen: "../imagenes/mujer/saco-tejido.jpeg",
    },
    {
        id: 9,
        nombre: "Blusa cuello tortuga negro",
        precio: 90000,
        tallas: ["S", "M", "L", "XL"],
        categoria: "mujer",
        imagen: "../imagenes/mujer/blusa-cuello-tortuga-negra.jpeg",
    },
    {
        id: 10,
        nombre: "Body asimétrico azul",
        precio: 65000,
        tallas: ["S", "M", "L", "XL"],
        categoria: "mujer",
        imagen: "../imagenes/mujer/body-asimetrico.jpeg",
    },
    {
        id: 11,
        nombre: "Buzo amarillo rayas",
        precio: 75000,
        tallas: ["S", "M", "L", "XL"],
        categoria: "mujer",
        imagen: "../imagenes/mujer/buso-manga-corta-rayas.jpeg",
    },
    {
        id: 12,
        nombre: "Body x2 piezas",
        precio: 140000,
        tallas: ["S", "M", "L", "XL"],
        categoria: "mujer",
        imagen: "../imagenes/mujer/conjunto-de-2-piezas.jpeg",
    },
    {
        id: 13,
        nombre: "Corset de malla blanco",
        precio: 80000,
        tallas: ["S", "M", "L", "XL"],
        categoria: "mujer",
        imagen: "../imagenes/mujer/corset-de-malla.jpeg",
    },
];
// ----- FUNCIONES (el encargado)----- //
// Escribe en el cuaderno (localStorage) la lista COMPLETA de productos.
// Siempre la lista entera: si le das un solo producto, reemplaza todo el catálogo.
export function guardarProductos(lista) {
    localStorage.setItem("catalogo", JSON.stringify(lista)); // localStorage solo guarda texto -> stringify
}
// Lee el cuaderno y entrega la lista de productos.
// Si el cuaderno está vacío (primera visita), copia el inventario inicial y lo entrega.
export function obtenerProductos() {
    const guardado = localStorage.getItem("catalogo"); // texto guardado, o null si no hay nada.
    if (guardado) {
        return JSON.parse(guardado); // texto -> lista de objetos.
    }
    else {
        guardarProductos(productos); // plan B: copia el inventario inicial al cuaderno.
        return productos;
    }
}
// Máquina de turnos: entrega un id que NUNCA se repite, aunque se borren productos.
// Así un carrito viejo no confunde un producto borrado con uno nuevo.
export function siguienteId() {
    const guardado = localStorage.getItem("ultimoId"); // el cajón de la maquina (aparte del catálogo)
    let ultimo; // let: su valor se decide en el if
    if (guardado) {
        ultimo = Number(guardado); // ya había turnos: texto -> número
    }
    else {
        const ids = obtenerProductos().map((item) => item.id);
        ultimo = Math.max(...ids); // primera vez: arranca desde el id más alto que existe.
    }
    // Esto pasa SIEMPRE (por eso va afuera del if/else)
    const nuevo = ultimo + 1;
    localStorage.setItem("ultimoId", String(nuevo)); // la máquina recuerda el último número entregado.
    return nuevo;
}
