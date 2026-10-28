function ExceptionUsuario(mensaje) {
  this.mensaje = mensaje;
  this.nombre = "ExceptionUsuario";
}

function getNombreMes(mes) {
  mes = mes - 1; // Ajustar el número de mes al índice del arreglo (1 = Ene, 12 = Dic)
  var meses = new Array(
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  );
  if (meses[mes] != null) {
    return meses[mes];
  } else {
    miExcepcionUsuario = new ExceptionUsuario("NumeroMesNoValido");
    throw miExcepcionUsuario;
  }
}

try {
  // sentencias para try
  nombreMes = getNombreMes(miMes);
} catch (excepcion) {
  nombreMes = "desconocido";
  registrarMisErrores(excepcion.mensaje, excepcion.nombre); // pasa el objeto exception al manejador de errores
}
