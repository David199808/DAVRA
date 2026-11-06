// La receta de (fetch)

async function mostrarUsuarios() {
  try {
    // Intentar
    // Espera la respuesta de fetch con la url.
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/users"); // Pedir.
    // Si la respuesta no salio bien (404, 500...), lanzo mi propio error con el codigo.
    if (!respuesta.ok) {
      // Leer la nota.
      throw new Error(`No se pudo cargar (${respuesta.status})`);
    }
    // Si todo esta bien.. abre la caja (respuesta) y saca el contenido .
    const datos = await respuesta.json(); // Abrir la caja.
    // Imprime cuantos usuarios llegaron(la length del array).
    console.log(`Llegaron ${datos.length} usuarios`);
    // Recorre los datos e imprime el nombre de cada usuario.
    datos.forEach((usuario) => {
      console.log(`Nombre: ${usuario.name}`);
    });
    // Si algo falla atrapa el error e imprime el mensaje del error que fue lanzado.
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}

mostrarUsuarios();

// Misión: mostrar los títulos de las tareas completadas del usuario 1, y cuántas son.
// ------ EJERCICIO 2 ------ //

async function mostarTitulos() {
  try {
    const respuesta2 = await fetch("https://jsonplaceholder.typicode.com/todos");
    if (!respuesta2.ok) {
      throw new Error(`No se pudo cargar (${respuesta2.status})`);
    }
    const datos2 = await respuesta2.json();

    const tareasCompletadasUsuario1 = datos2.filter((tarea) => tarea.userId === 1 && tarea.completed);
    const titulos = tareasCompletadasUsuario1.map((tarea) => tarea.title);
    console.log(`Total: ${titulos.length} titulos`);
    titulos.forEach((titulo) => {
      console.log(`Nombre de titulo ${titulo}`);
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}

mostarTitulos();
