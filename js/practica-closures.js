// La FABRICA de alcancias

function crearContador() {
  let clics = 0;

  return () => {
    clics++;
    return clics;
  };
}

const contarLaTerraxza = crearContador();

console.log(contarLaTerraxza());
console.log(contarLaTerraxza());
console.log(contarLaTerraxza());
console.log(contarLaTerraxza());
console.log(contarLaTerraxza());

const contarDavra = crearContador();

console.log(contarDavra());
console.log(contarDavra());
console.log(contarDavra());

console.log(contarLaTerraxza());
