import { obtenerProductos } from "../catalogo.js";
/*
//function contarPorCategoria(categoria) {
//let total = 0;
//productos.forEach((producto) => {
//if (producto.categoria === categoria) {
//total += 1;
//}
//});
//return total;
//}

//console.log(contarPorCategoria("mujer"));
//console.log(contarPorCategoria("hombre"));

function productoMasCaro() {
  let mayor = productos[0];
  productos.forEach((producto) => {
    if (producto.precio > mayor.precio) {
      mayor = producto;
    }
  });
  return mayor;
}

console.log(productoMasCaro());

//function nombresDeTalla(talla) {
//let items = [];
//productos.forEach((producto) => {
//if (producto.talla === talla) {
//items.push(producto.nombre);
//}
//});
//return items;
//}

//console.log(nombresDeTalla("L"));

function totalPorCategoria(categoria) {
  let total = 0;
  for (let producto of productos) {
    if (producto.categoria === categoria) {
      total += producto.precio;
    }
  }
  return total;
}

console.log(totalPorCategoria("mujer"));

function contarPorCategoria(categoria) {
  let contador = 0;
  productos.forEach((producto) => {
    if (producto.categoria === categoria) {
      contador += 1;
    }
  });
  return contador;
}

//console.log(contarPorCategoria("mujer"));

function contarPorCategoriaC(categoria) {
  const filtrados = productos.filter((producto) => producto.categoria === categoria);
  return filtrados.length;
}

console.log(contarPorCategoriaC("mujer"));

function nombresDeTallaB(talla) {
  const productosDeTalla = productos.filter((producto) => producto.talla === talla);
  const nombres = productosDeTalla.map((producto) => producto.nombre);
  return nombres;
}

console.log(nombresDeTallaB("L"));
console.log(nombresDeTallaB("S"));
console.log(nombresDeTallaB("M"));

function ordenarPorPrecio() {
  const copia = [...productos];
  copia.sort((a, b) => a.precio - b.precio);
  return copia;
}

const ordenados = ordenarPorPrecio();
const lineas = ordenados.map((producto) => `${producto.nombre} - $${producto.precio}`);
console.log(lineas);
console.log(productos[0].precio);

function agregarProducto(id) {
  const items = productos.find((producto) => producto.id === id);
  if (!items) {
    throw new Error(`El producto con el id ${id} no existe`);
  }
  this.items.push(items);
  this.guardar();
}

function agregarProductoB(id) {
  const prenda = productos.find((producto) => producto.id === id);
  if (!prenda) {
    throw new Error(`El producto con id ${id} no esxiste`);
  }
  const enCarrito = this.items.find((producto) => producto.id === id);
  if ((enCarrito.cantidad += 1)) {
  } else {
    this.items.push({ ...prenda, cantidad: 1 });
  }
  this.guardar();
}

const productos = [
  { id: 1, nombre: "Buzo", precio: 95000 },
  { id: 2, nombre: "Jogger", precio: 80000 },
  { id: 3, nombre: "Camiseta", precio: 45000 },
];
const productoABorrar = { id: 2, nombre: "Jogger", precio: 80000 };

const productosActualizados = productos.filter((item) => item.id !== productoABorrar.id);
console.log(productosActualizados);

const productosTotal = productos.reduce((total, producto) => total + producto.precio, 0);
console.log(productosTotal);

const Camiseta = productos.find((item) => item.id === 3);
console.log(Camiseta.nombre);

const etiquetas = productos.map((item) => `${item.nombre} - ${item.precio}`);

console.log(etiquetas);
*/

//4. filter + map encadenados → Crea caros: los nombres de los productos que cuestan más de 50.000.

const productos2 = [
  { id: 1, nombre: "Buzo", precio: 95000 },
  { id: 2, nombre: "Jogger", precio: 80000 },
  { id: 3, nombre: "Camiseta", precio: 45000 },
];

const caros = productos2.filter((item) => item.precio > 50000).map((item) => item.nombre);

console.log(caros);

function buscarNombre(id) {
  const encontrado = productos2.find((item) => item.id === id);
  if (!encontrado) {
    return "No existe";
  }
  return encontrado.nombre;
}

console.log(buscarNombre(1));
console.log(buscarNombre(9));
