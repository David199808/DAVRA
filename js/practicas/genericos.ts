function primero<T>(lista: T[]): T | undefined {
  return lista[0];
}

const a = primero([1, 2, 3]);
const b = primero(["S", "M"]);
