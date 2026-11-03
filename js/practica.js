import { productos } from "./productos.js";

//function contarPorCategoria(categoria) {
//  let total = 0;
//  for (let producto of productos) {
//    if (producto.categoria === categoria) {
//      total += 1;
//    }
//  }
//  return total;
//}

//console.log(contarPorCategoria("mujer"));

//function contarPorCategoria(categoria) {
//  let total = 0;
//  productos.forEach((producto) => {
//    if (producto.categoria === categoria) {
//      total += 1;
//    }
//  });
//  return total;
//}

console.log(contarPorCategoria("mujer"));
console.log(contarPorCategoria("hombre"));

//function productoMasCaro() {
//  let mayor = productos[0];
//  for (let producto of productos) {
//    if (producto.precio > mayor.precio) {
//      mayor = producto;
//    }
//  }
//  return mayor;
//}

//console.log(productoMasCaro());

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
//  let items = [];
//  for (let producto of productos) {
//    if (producto.talla === talla) {
//      items.push(producto.nombre);
//    }
//  }
//  return items;
//}

console.log(nombresDeTalla("L"));
console.log(nombresDeTalla("M"));

function nombresDeTalla(talla) {
  let items = [];
  productos.forEach((producto) => {
    if (producto.talla === talla) {
      items.push(producto.nombre);
    }
  });
  return items;
}

console.log(nombresDeTalla("L"));

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

console.log(contarPorCategoria("mujer"));
