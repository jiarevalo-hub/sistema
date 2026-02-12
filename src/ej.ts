import * as readline from "readline";

interface IEstudiante {
  id: number;
  nombre: string;
  edad: number;
  carrera: string;
  activo: boolean;
  promedio: number;
}

interface IResultado<T> {
  ok: boolean;
  mensaje: string;
  data?: T;
}

class Estudiante implements IEstudiante {
  id: number;
  nombre: string;
  edad: number;
  carrera: string;
  activo: boolean;
  promedio: number;

  constructor(
    id: number,
    nombre: string,
    edad: number,
    carrera: string,
    promedio: number,
    activo: boolean = true
  ) {
    this.id = id;
    this.nombre = nombre;
    this.edad = edad;
    this.carrera = carrera;
    this.promedio = promedio;
    this.activo = activo;
  }
}

class SistemaEstudiantes {
  private estudiantes: Estudiante[] = [];

  agregar(est: Estudiante): IResultado<Estudiante> {
    let i = 0;
    while (i < this.estudiantes.length) {
      if (this.estudiantes[i].id === est.id) {
        return { ok: false, mensaje: "Error: El ID ya existe." };
      }
      i++;
    }

    if (est.edad < 15 || est.edad > 80) {
      return { ok: false, mensaje: "Error: La edad debe estar entre 15 y 80 años." };
    }

    if (est.promedio < 0 || est.promedio > 10) {
      return { ok: false, mensaje: "Error: El promedio debe estar entre 0 y 10." };
    }

    this.estudiantes.push(est);
    return {
      ok: true,
      mensaje: `Estudiante ${est.nombre} agregado correctamente.`,
      data: est,
    };
  }

  listar(): Estudiante[] {
    return this.estudiantes;
  }

  buscarPorId(id: number): IResultado<Estudiante> {
    for (let i = 0; i < this.estudiantes.length; i++) {
      if (this.estudiantes[i].id === id) {
        return {
          ok: true,
          mensaje: "Estudiante encontrado.",
          data: this.estudiantes[i],
        };
      }
    }
    return { ok: false, mensaje: "Error: Estudiante no encontrado." };
  }

  actualizarPromedio(id: number, nuevoPromedio: number): IResultado<Estudiante> {
    if (nuevoPromedio < 0 || nuevoPromedio > 10) {
      return { ok: false, mensaje: "Error: El promedio debe estar entre 0 y 10." };
    }

    let j = 0;
    do {
      if (this.estudiantes[j].id === id) {
        this.estudiantes[j].promedio = nuevoPromedio;
        return {
          ok: true,
          mensaje: `Promedio del estudiante ${this.estudiantes[j].nombre} actualizado a ${nuevoPromedio}.`,
          data: this.estudiantes[j],
        };
      }
      j++;
    } while (j < this.estudiantes.length);

    return { ok: false, mensaje: "Error: Estudiante no encontrado." };
  }

  cambiarEstado(id: number, activo: boolean): IResultado<Estudiante> {
    for (const key in this.estudiantes) {
      if (this.estudiantes[key].id === id) {
        this.estudiantes[key].activo = activo;
        const estado = activo ? "activo" : "inactivo";
        return {
          ok: true,
          mensaje: `Estudiante ${this.estudiantes[key].nombre} ahora está ${estado}.`,
          data: this.estudiantes[key],
        };
      }
    }
    return { ok: false, mensaje: "Error: Estudiante no encontrado." };
  }

  listarActivos(): Estudiante[] {
    const activos: Estudiante[] = [];
    let k = 0;
    while (k < this.estudiantes.length) {
      if (this.estudiantes[k].activo) {
        activos.push(this.estudiantes[k]);
      }
      k++;
    }
    return activos;
  }

  promedioGeneral(): number {
    if (this.estudiantes.length === 0) return 0;

    let suma = 0;
    for (let m = 0; m < this.estudiantes.length; m++) {
      suma += this.estudiantes[m].promedio;
    }
    return suma / this.estudiantes.length;
  }
}

function mostrarMenu() {
  console.log("SISTEMA DE GESTIÓN DE ESTUDIANTES");
  console.log("1. Agregar estudiante");
  console.log("2. Listar todos");
  console.log("3. Buscar por ID");
  console.log("4. Actualizar promedio");
  console.log("5. Cambiar estado");
  console.log("6. Listar activos");
  console.log("7. Ver promedio general");
  console.log("8. Salir");
}

async function opcion1(rl: readline.Interface, sistema: SistemaEstudiantes) {
  const id = parseInt(await hacerPregunta(rl, "Ingrese el ID: "));
  if (isNaN(id)) return;

  const nombre = await hacerPregunta(rl, "Ingrese el nombre: ");
  const edad = parseInt(await hacerPregunta(rl, "Ingrese la edad: "));
  const carrera = await hacerPregunta(rl, "Ingrese la carrera: ");
  const promedio = parseFloat(await hacerPregunta(rl, "Ingrese el promedio: "));

  const nuevo = new Estudiante(id, nombre, edad, carrera, promedio);
  const resultado = sistema.agregar(nuevo);
  console.log(resultado.mensaje);
}

function opcion2(sistema: SistemaEstudiantes) {
  const todos = sistema.listar();
  if (todos.length === 0) {
    console.log("No hay estudiantes.");
  } else {
    for (let i = 0; i < todos.length; i++) {
      console.log(
        `${todos[i].id} | ${todos[i].nombre} | ${todos[i].edad} | ${todos[i].carrera} | ${todos[i].promedio} | ${todos[i].activo}`
      );
    }
  }
}

async function opcion3(rl: readline.Interface, sistema: SistemaEstudiantes) {
  const id = parseInt(await hacerPregunta(rl, "Ingrese el ID: "));
  const resultado = sistema.buscarPorId(id);
  console.log(resultado.mensaje);
}

async function opcion4(rl: readline.Interface, sistema: SistemaEstudiantes) {
  const id = parseInt(await hacerPregunta(rl, "Ingrese el ID: "));
  const promedio = parseFloat(await hacerPregunta(rl, "Nuevo promedio: "));
  const resultado = sistema.actualizarPromedio(id, promedio);
  console.log(resultado.mensaje);
}

async function opcion5(rl: readline.Interface, sistema: SistemaEstudiantes) {
  const id = parseInt(await hacerPregunta(rl, "Ingrese el ID: "));
  const estado = await hacerPregunta(rl, "Activar (s) / Desactivar (n): ");
  const activo = estado.toLowerCase() === "s";
  const resultado = sistema.cambiarEstado(id, activo);
  console.log(resultado.mensaje);
}

function opcion6(sistema: SistemaEstudiantes) {
  const activos = sistema.listarActivos();
  activos.forEach(e =>
    console.log(`${e.nombre} | ${e.carrera} | ${e.promedio}`)
  );
}

function opcion7(sistema: SistemaEstudiantes) {
  console.log(sistema.promedioGeneral().toFixed(2));
}

function hacerPregunta(
  rl: readline.Interface,
  pregunta: string
): Promise<string> {
  return new Promise(resolve => rl.question(pregunta, resolve));
}

async function ejecutarMenuInteractivo(sistema: SistemaEstudiantes) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let continuar = true;

  while (continuar) {
    mostrarMenu();
    const opcion = await hacerPregunta(rl, "Opción: ");

    switch (opcion) {
      case "1": await opcion1(rl, sistema); break;
      case "2": opcion2(sistema); break;
      case "3": await opcion3(rl, sistema); break;
      case "4": await opcion4(rl, sistema); break;
      case "5": await opcion5(rl, sistema); break;
      case "6": opcion6(sistema); break;
      case "7": opcion7(sistema); break;
      case "8": continuar = false; break;
      default: console.log("Opción inválida");
    }
  }

  rl.close();
}

const sistema = new SistemaEstudiantes();
ejecutarMenuInteractivo(sistema);
