// Importa la librería readline (nativa de Node.js) para hacer preguntas interactivas en consola
import * as readline from "readline";

//INTERFACES
// Una INTERFACE es un contrato que define qué propiedades DEBE tener un objeto

// INTERFAZ: Define la estructura de un estudiante
interface IEstudiante {
  id: number;           // Identificador único (número)
  nombre: string;       // Nombre del estudiante (texto)
  edad: number;         // Edad del estudiante (número)
  carrera: string;      // Carrera que estudia (texto)
  activo: boolean;      // Si está activo o no (verdadero/falso)
  promedio: number;     // Promedio académico (número entre 0-10)
}

// INTERFAZ: Define la estructura de una respuesta/resultado
interface IResultado<T> {
  ok: boolean;          // ¿La operación fue exitosa? (true/false)
  mensaje: string;      // Mensaje de respuesta (error o éxito)
  data?: T;             // Datos opcionales (el ? significa que es opcional)
}

//CLASE ESTUDIANTE
// Una CLASE es el plano/molde para crear objetos de tipo Estudiante

// Declara la clase Estudiante que cumple con la interfaz IEstudiante
class Estudiante implements IEstudiante {
  // Declara las propiedades (atributos) de la clase
  id: number;
  nombre: string;
  edad: number;
  carrera: string;
  activo: boolean;
  promedio: number;

  // CONSTRUCTOR: Método especial que se ejecuta cuando creas una nueva instancia
  // Recibe los parámetros necesarios para inicializar el objeto
  constructor(
    id: number,                      // Parámetro: ID del estudiante
    nombre: string,                  // Parámetro: Nombre
    edad: number,                    // Parámetro: Edad
    carrera: string,                 // Parámetro: Carrera
    promedio: number,                // Parámetro: Promedio
    activo: boolean = true           // Parámetro: Activo (por defecto es true)
  ) {
    // Asigna los parámetros recibidos a las propiedades del objeto
    this.id = id;                    // this.id = el id que pasaste
    this.nombre = nombre;            // this.nombre = el nombre que pasaste
    this.edad = edad;                // this.edad = la edad que pasaste
    this.carrera = carrera;          // this.carrera = la carrera que pasaste
    this.promedio = promedio;        // this.promedio = el promedio que pasaste
    this.activo = activo;            // this.activo = activo (true por defecto)
  }
}

//CLASE SISTEMA ESTUDIANTES
// Esta clase gestiona el sistema completo de estudiantes (agregar, buscar, listar, etc.)

class SistemaEstudiantes {
  // PROPIEDAD PRIVADA: Solo esta clase puede acceder a esta variable
  // Crea un array vacío para guardar todos los estudiantes
  private estudiantes: Estudiante[] = [];

  //MÉTODO: AGREGAR
  // Agregar un nuevo estudiante validando que no haya errores
  agregar(est: Estudiante): IResultado<Estudiante> {
    // VALIDACIÓN 1: Verificar que el ID no sea repetido
    // BUCLE WHILE: Recorre toda la lista de estudiantes
    let i = 0;                       // Inicializa contador en 0
    while (i < this.estudiantes.length) {  // Mientras i sea menor que la cantidad de estudiantes
      if (this.estudiantes[i].id === est.id) {  // Si encuentra un ID igual al que quiero agregar
        // Retorna error: El ID ya existe
        return {
          ok: false,                 // La operación NO fue exitosa
          mensaje: "Error: El ID ya existe.",  // Mensaje de error
        };
      }
      i++;                           // Incrementa i (i = i + 1) para ir al siguiente
    }

    // VALIDACIÓN 2: Verificar que la edad sea válida (entre 15 y 80)
    if (est.edad < 15 && est.edad > 80) {  // Si edad es menor a 15 O mayor a 80
      return {
        ok: false,
        mensaje: "Error: La edad debe estar entre 15 y 80 años.",
      };
    }

    // VALIDACIÓN 3: Verificar que el promedio sea válido (entre 0 y 10)
    if (est.promedio < 0 || est.promedio > 10) {  // Si promedio es menor a 0 O mayor a 10
      return {
        ok: false,
        mensaje: "Error: El promedio debe estar entre 0 y 10.",
      };
    }

    // Si pasó todas las validaciones, agrega el estudiante a la lista
    this.estudiantes.push(est);     // Agrega el estudiante al final del array

    // Retorna éxito con los datos del estudiante agregado
    return {
      ok: true,                      // La operación fue exitosa
      mensaje: `Estudiante ${est.nombre} agregado correctamente.`,  // Mensaje de éxito
      data: est,                     // Devuelve el estudiante que se agregó
    };
  }

  //MÉTODO: LISTAR
  // Devuelve la lista completa de estudiantes
  listar(): Estudiante[] {
    return this.estudiantes;         // Retorna el array completo de estudiantes
  }

  //MÉTODO: BUSCAR POR ID
  // Busca un estudiante específico por su ID
  buscarPorId(id: number): IResultado<Estudiante> {
    // BUCLE FOR: Recorre toda la lista de estudiantes usando índices (0, 1, 2, ...)
    for (let i = 0; i < this.estudiantes.length; i++) {  // i va desde 0 hasta el final
      if (this.estudiantes[i].id === id) {  // Si encuentra el estudiante con ese ID
        return {
          ok: true,
          mensaje: "Estudiante encontrado.",
          data: this.estudiantes[i],  // Retorna el estudiante encontrado
        };
      }
    }
    // Si salió del bucle es porque no encontró el estudiante
    return {
      ok: false,
      mensaje: "Error: Estudiante no encontrado.",
    };
  }

  //MÉTODO: ACTUALIZAR PROMEDIO
  // Actualiza el promedio de un estudiante específico
  actualizarPromedio(
    id: number,                      // Parámetro: ID del estudiante a actualizar
    nuevoPromedio: number            // Parámetro: Nuevo promedio
  ): IResultado<Estudiante> {
    // VALIDACIÓN: Verificar que el nuevo promedio sea válido (entre 0 y 10)
    if (nuevoPromedio < 0 || nuevoPromedio > 10) {
      return {
        ok: false,
        mensaje: "Error: El promedio debe estar entre 0 y 10.",
      };
    }

    // BUCLE DO-WHILE: Ejecuta primero, luego verifica la condición
    let j = 0;                       // Inicializa contador en 0
    do {
      if (this.estudiantes[j].id === id) {  // Si encuentra el estudiante con ese ID
        // Actualiza el promedio
        this.estudiantes[j].promedio = nuevoPromedio;  // Cambia el promedio al nuevo
        return {
          ok: true,
          mensaje: `Promedio del estudiante ${this.estudiantes[j].nombre} actualizado a ${nuevoPromedio}.`,
          data: this.estudiantes[j],
        };
      }
      j++;                           // Incrementa j para ir al siguiente
    } while (j < this.estudiantes.length);  // Repite mientras j sea menor que la cantidad de estudiantes

    // Si salió del bucle es porque no encontró el estudiante
    return {
      ok: false,
      mensaje: "Error: Estudiante no encontrado.",
    };
  }

  //  MÉTODO: CAMBIAR ESTADO
  // Activa o desactiva un estudiante
  cambiarEstado(id: number, activo: boolean): IResultado<Estudiante> {
    // BUCLE FOR-IN: Recorre los índices del array (0, 1, 2, ...)
    for (const key in this.estudiantes) {  // key es el índice (0, 1, 2, ...)
      if (this.estudiantes[key].id === id) {  // Si encuentra el estudiante con ese ID
        // Cambia el estado (activo o inactivo)
        this.estudiantes[key].activo = activo;  // Asigna el nuevo estado
        // Crea un texto con el estado actual
        const estado = activo ? "activo" : "inactivo";  // Si activo es true: "activo", si no: "inactivo"
        return {
          ok: true,
          mensaje: `Estudiante ${this.estudiantes[key].nombre} ahora está ${estado}.`,
          data: this.estudiantes[key],
        };
      }
    }

    // Si salió del bucle es porque no encontró el estudiante
    return {
      ok: false,
      mensaje: "Error: Estudiante no encontrado.",
    };
  }

  //MÉTODO: LISTAR ACTIVOS 
  // Devuelve solo los estudiantes que están activos
  listarActivos(): Estudiante[] {
    const activos: Estudiante[] = [];  // Crea un array vacío para guardar los activos
    let k = 0;                       // Inicializa contador en 0
    // BUCLE WHILE: Recorre toda la lista
    while (k < this.estudiantes.length) {  // Mientras k sea menor que la cantidad de estudiantes
      if (this.estudiantes[k].activo) {  // Si el estudiante está activo
        activos.push(this.estudiantes[k]);  // Lo agrega al array de activos
      }
      k++;                           // Incrementa k para ir al siguiente
    }
    return activos;                  // Retorna la lista de solo activos
  }

  //MÉTODO: PROMEDIO GENERAL
  // Calcula el promedio de todos los estudiantes
  promedioGeneral(): number {
    // Si no hay estudiantes, retorna 0
    if (this.estudiantes.length === 0) {
      return 0;
    }

    let suma = 0;                    // Variable para acumular todos los promedios
    // BUCLE FOR: Recorre toda la lista de estudiantes
    for (let m = 0; m < this.estudiantes.length; m++) {  // m va desde 0 hasta el final
      suma += this.estudiantes[m].promedio;  // Suma cada promedio (suma = suma + promedio)
    }

    // Divide la suma total entre la cantidad de estudiantes
    return suma / this.estudiantes.length;  // Ejemplo: 27 / 3 = 9
  }
}

// MENU
// Imprime el menú principal en la consola
function mostrarMenu() {
  console.log("SISTEMA DE GESTIÓN DE ESTUDIANTES");  // Título del sistema
  console.log("1. Agregar estudiante");               // Opción 1
  console.log("2. Listar todos");                     // Opción 2
  console.log("3. Buscar por ID");                    // Opción 3
  console.log("4. Actualizar promedio");              // Opción 4
  console.log("5. Cambiar estado");                   // Opción 5
  console.log("6. Listar activos");                   // Opción 6
  console.log("7. Ver promedio general");             // Opción 7
  console.log("8. Salir");                            // Opción 8
}

//FUNCIÓN: OPCIÓN 1 - AGREGAR
// Esta función es ASYNC porque usa AWAIT (espera respuestas del usuario)
async function opcion1(
  rl: readline.Interface,            // Parámetro: Interface de readline para hacer preguntas
  sistema: SistemaEstudiantes        // Parámetro: El sistema de estudiantes
) {
  console.log("Agregar Estudiante");  // Imprime el título de esta opción

  // Pregunta el ID y espera la respuesta
  const id = parseInt(               // parseInt convierte el texto a número entero
    await hacerPregunta(rl, "Ingrese el ID del estudiante: ")  // await espera la respuesta
  );
  if (isNaN(id)) {                   // Si el ID no es un número válido
    console.log("INGRESAR UN NÚMERO");  // Imprime mensaje de error
    return;                         // Sale de la función sin hacer nada más
  }

  // Pregunta el nombre y espera la respuesta
  const nombre = await hacerPregunta(rl, "Ingrese el nombre del estudiante: ");

  // Pregunta la edad y convierte a número
  const edad = parseInt(
    await hacerPregunta(rl, "Ingrese la edad del estudiante: ")
  );

  // Pregunta la carrera
  const carrera = await hacerPregunta(rl, "Ingrese la carrera del estudiante: ");

  // Pregunta el promedio y convierte a número decimal
  const promedio = parseFloat(       // parseFloat convierte a número con decimales
    await hacerPregunta(rl, "Ingrese el promedio del estudiante (0-10): ")
  );

  // Crea una nueva instancia de Estudiante con los datos ingresados
  const nuevoEstudiante = new Estudiante(id, nombre, edad, carrera, promedio);

  // Intenta agregar el estudiante al sistema
  const resultado = sistema.agregar(nuevoEstudiante);

  // Imprime el resultado: éxito (✓) o error (✗)
  console.log(
    resultado.ok ? `OK ${resultado.mensaje}` : `NOP ${resultado.mensaje}`
    // Si resultado.ok es true: imprime ✓ + mensaje
    // Si resultado.ok es false: imprime ✗ + mensaje
  );
}

// =============== FUNCIÓN: OPCIÓN 2 - LISTAR TODOS ===============
function opcion2(sistema: SistemaEstudiantes) {
  console.log("Lista de Todos los Estudiantes");  // Título

  // Obtiene la lista de todos los estudiantes
  const todos = sistema.listar();

  // Si la lista está vacía
  if (todos.length === 0) {
    console.log("No hay estudiantes registrados.");
  } else {
    // Si hay estudiantes, los imprime uno por uno
    for (let i = 0; i < todos.length; i++) {  // BUCLE FOR: recorre cada estudiante
      console.log(
        // Imprime los datos del estudiante en una línea
        `ID: ${todos[i].id} | ${todos[i].nombre} | Edad: ${todos[i].edad} | ${todos[i].carrera} | Promedio: ${todos[i].promedio} | ${todos[i].activo ? "✓ Activo" : "✗ Inactivo"}`
      );
    }
  }
}

// =============== FUNCIÓN: OPCIÓN 3 - BUSCAR POR ID ===============
async function opcion3(
  rl: readline.Interface,
  sistema: SistemaEstudiantes
) {
  console.log("Buscar por ID");

  // Pregunta el ID a buscar
  const id = parseInt(await hacerPregunta(rl, "Ingrese el ID a buscar: "));

  // Busca el estudiante en el sistema
  const resultado = sistema.buscarPorId(id);

  // Si lo encontró, imprime los datos
  if (resultado.ok && resultado.data) {
    console.log(
      `ENCONTRADO ${resultado.data.nombre} | ${resultado.data.carrera} | Promedio: ${resultado.data.promedio} | ${resultado.data.activo ? "Activo" : "Inactivo"}`
    );
  } else {
    // Si no lo encontró, imprime el error
    console.log(`ERROR ${resultado.mensaje}`);
  }
}

//FUNCIÓN: OPCIÓN 4 - ACTUALIZAR PROMEDIO
async function opcion4(
  rl: readline.Interface,
  sistema: SistemaEstudiantes
) {
  console.log("Actualizar Promedio");

  // Pregunta el ID del estudiante a actualizar
  const id = parseInt(
    await hacerPregunta(rl, "Ingrese el ID del estudiante: ")
  );

  // Pregunta el nuevo promedio
  const nuevoPromedio = parseFloat(
    await hacerPregunta(rl, "Ingrese el nuevo promedio (0-10): ")
  );

  // Intenta actualizar el promedio en el sistema
  const resultado = sistema.actualizarPromedio(id, nuevoPromedio);

  // Imprime el resultado: éxito o error
  console.log(
    resultado.ok ? `EXITO ${resultado.mensaje}` : `ERROR ${resultado.mensaje}`
  );
}

//FUNCIÓN: OPCIÓN 5 - CAMBIAR ESTADO
async function opcion5(
  rl: readline.Interface,
  sistema: SistemaEstudiantes
) {
  console.log("Cambiar Estado");

  // Pregunta el ID del estudiante
  const id = parseInt(
    await hacerPregunta(rl, "Ingrese el ID del estudiante: ")
  );

  // Pregunta si desea activar (s) o desactivar (n)
  const estado = await hacerPregunta(
    rl,
    "¿Desea activar (s) o desactivar (n)? "
  );

  // Convierte la respuesta en booleano (true si es "s", false si no)
  const activo = estado.toLowerCase() === "s";  // toLowerCase convierte a minúsculas

  // Intenta cambiar el estado en el sistema
  const resultado = sistema.cambiarEstado(id, activo);

  // Imprime el resultado: éxito o error
  console.log(
    resultado.ok ? `EXITO ${resultado.mensaje}` : `ERROR ${resultado.mensaje}`
  );
}

// =============== FUNCIÓN: OPCIÓN 6 - LISTAR ACTIVOS ===============
function opcion6(sistema: SistemaEstudiantes) {
  console.log("Estudiantes Activos");

  // Obtiene solo los estudiantes activos
  const activos = sistema.listarActivos();

  // Si no hay activos
  if (activos.length === 0) {
    console.log("No hay estudiantes activos.");
  } else {
    // Si hay activos, los imprime uno por uno
    let i = 0;
    // BUCLE WHILE: recorre cada estudiante activo
    while (i < activos.length) {
      console.log(
        `${activos[i].nombre} | ${activos[i].carrera} | Promedio: ${activos[i].promedio}`
      );
      i++;  // Incrementa i para ir al siguiente
    }
  }
}

// =============== FUNCIÓN: OPCIÓN 7 - PROMEDIO GENERAL ===============
function opcion7(sistema: SistemaEstudiantes) {
  console.log("Promedio General");

  // Calcula el promedio general de todos los estudiantes
  const promedio = sistema.promedioGeneral();

  // Imprime el promedio con 2 decimales
  console.log(`Promedio general del curso: ${promedio.toFixed(2)}`);
  // toFixed(2) redondea a 2 decimales
}

// =============== FUNCIÓN: HACER PREGUNTA ===============
// Función auxiliar que convierte readline en una promesa (para usar con await)
function hacerPregunta(
  rl: readline.Interface,            // Parámetro: Interface de readline
  pregunta: string                   // Parámetro: La pregunta a hacer
): Promise<string> {                 // Retorna una Promesa de string
  // Retorna una nueva Promesa
  return new Promise((resolve) => {
    // rl.question: Hace una pregunta en la consola
    rl.question(pregunta, (respuesta) => {
      // Si el usuario responde, llama a resolve con la respuesta
      resolve(respuesta);            // Devuelve la respuesta al que lo llamó
    });
  });
}

// =============== FUNCIÓN: MENÚ INTERACTIVO ===============
// Función ASYNC que ejecuta el menú repetidamente hasta que salga
async function ejecutarMenuInteractivo(
  sistema: SistemaEstudiantes
) {
  // Crea la interface de readline para hacer preguntas
  const rl = readline.createInterface({
    input: process.stdin,            // Lee del teclado
    output: process.stdout,          // Escribe en la pantalla
  });

  let continuar = true;              // Variable para controlar el bucle del menú

  // BUCLE WHILE: Muestra el menú repetidamente hasta que el usuario salga
  while (continuar) {
    mostrarMenu();                   // Imprime el menú

    // Pregunta al usuario qué opción desea
    const opcion = await hacerPregunta(rl, "Selecciona una opción (1-8): ");

    // SWITCH: Ejecuta una acción según la opción elegida
    switch (opcion) {   
      case "1":                      // Si elige opción 1
        await opcion1(rl, sistema);  // Ejecuta la función opción1
        break;                       // Sale del switch

      case "2":                      // Si elige opción 2
        opcion2(sistema);            // Ejecuta la función opción2
        break;

      case "3":                      // Si elige opción 3
        await opcion3(rl, sistema);  // Ejecuta la función opción3
        break;

      case "4":                      // Si elige opción 4
        await opcion4(rl, sistema);  // Ejecuta la función opción4
        break;

      case "5":                      // Si elige opción 5
        await opcion5(rl, sistema);  // Ejecuta la función opción5
        break;

      case "6":                      // Si elige opción 6
        opcion6(sistema);            // Ejecuta la función opción6
        break;

      case "7":                      // Si elige opción 7
        opcion7(sistema);            // Ejecuta la función opción7
        break;

      case "8":                      // Si elige opción 8 (Salir)
        continuar = false;           // Cambia a false para salir del while
        break;

      default:                       // Si elige algo que no está en las opciones
        console.log("OPCION INVÁLIDA");  // Imprime mensaje de error
    }
  }

  // Después de salir del while, cierra la interface de readline
  rl.close();
}

//EJECUCIÓN
// Crea una nueva instancia del sistema de estudiantes (vacío)
const sistema = new SistemaEstudiantes();

// Inicia el menú interactivo pasando el sistema como parámetro
ejecutarMenuInteractivo(sistema);