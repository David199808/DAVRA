import { productos } from "../catalogo.js";

//function cargarCatalogo() {
//return new Promise((resolve, reject) => {
//setTimeout(() => {
//resolve(productos);
//}, 1500);
//});
//}

//console.log("Cargando catálogo...");

//cargarCatalogo().then((catalogo) => {
//console.log(`Llegaron ${catalogo.length} productos`);
//});

//console.log("Mientras tanto, sigo trabajando");

function cargarCatalogoInestable() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.5) {
        resolve(productos);
      } else {
        reject(new Error("No hay conexion a internet"));
      }
    }, 1500);
  });
}

//cargarCatalogoInestable()
//.then((catalogo) => {
//console.log(`Llegaron ${catalogo.length} productos`);
//})
//.catch((error) => {
//console.log(`Error: ${error.message}`);
//});

async function mostrarCatalogo() {
  try {
    const catalogo = await cargarCatalogoInestable();
    console.log(`Llegaron ${catalogo.length} productos`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}

mostrarCatalogo();

console.log("Mientras tanto, sigo trabajando");

const catalogo = [
  { id: 1, nombre: "Buzo", precio: 95000 },
  { id: 2, nombre: "Jogger", precio: 80000 },
];
const guardados = [{ id: 2, cantidad: 3 }, { id: 7 }];

const existentes = guardados.filter((item) => catalogo.find((producto) => producto.id === item.id));

const productosCompletos = existentes.map((item) => {
  const actual = catalogo.find((producto) => producto.id === item.id);
  return { ...actual, cantidad: item.cantidad ?? 1 };
});

console.log(productosCompletos);

const catalogo2 = [
  { id: 1, nombre: "Buzo", precio: 95000 },
  { id: 2, nombre: "Jogger", precio: 80000 },
  { id: 3, nombre: "Camiseta", precio: 45000 },
];

const nombres = catalogo2.map((producto) => {
  producto.nombre;
  return producto.nombre;
});

console.log(nombres);

const conDescuento = catalogo2.map((producto) => {
  return { ...producto, precio: producto.precio * 0.9 };
});

console.log(conDescuento);

const nombresBaratos = catalogo2.filter((producto) => producto.precio < 90000).map((producto) => producto.nombre);

//const nombresBaratos = baratos.map((producto) => producto.nombre);

console.log(nombresBaratos);

function describirProducto(id) {
  const encontrado = catalogo2.find((producto) => producto.id === id);
  if (!encontrado) {
    return "No existe";
  }
  return `${encontrado.nombre} cuesta ${encontrado.precio}`;
}

console.log(describirProducto(2));
console.log(describirProducto(9));
