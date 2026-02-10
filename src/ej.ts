interface IEstudiantec { // Define la estructura de un estudiante
  id: number;
  nombre: string;
  edad: number;
  carrera: string;
  activo: boolean;
  promedio: number;
  nota?: [number, number, number]; // nota es opcional
}

class Estudiante implements IEstudiantec { // implements obliga a cumplir con la interfaz de IEstudiante
  id: number; //variables
  nombre: string; //variables
  edad: number; //variables
  carrera: string; //variables
  activo: boolean; //variables
  promedio: number; //variables
  nota?: [number, number, number]
    constructor(id: number, nombre: string, edad: number, carrera: string, promedio: number, activo: boolean = true, nota?: [number, number, number]
  ) { // guarda los valores dentro del objeto
    this.id = id;
    this.nombre = nombre;
    this.edad = edad;
    this.carrera = carrera;
    this.promedio = promedio;
    this.activo = activo;
    this.nota = nota;
  }

  calcularPromedio(): number { // metodo para calcular promedio
    if (this.nota) {
      const suma = this.nota.reduce((acumulado, individual) => acumulado + individual, 0);
      this.promedio = suma / this.nota.length;
    }
    return this.promedio;
}

  agregarnota(nota: [number, number, number]): void { // metodo para agregar notas]){
    this.nota = nota;
    this.promedio = (nota[0] + nota[1] + nota[2]) / 3; // calcula el promedio
   }



}

const estudiantes: Estudiante[] = []

function agregarEstudiante(estudiante: Estudiante): void { // funcion para agregar estudiantes
  estudiantes.push(estudiante);
}

function listarestudiantes(){ // funcion para listar estudiantes
  return estudiantes;

}

function llenarnotas(id: number, nota:number ){
  const estudiante = buscarEstudiante(id);
  for (let i = 0; i < 3; i++) {
    if (nota[i] > 0 && nota[i] < 10) {
      estudiante.nota[i] = nota;
    } else { 
      console.error(`La nota ${nota[i]} no es válida. Debe estar entre 0 y 10.`);
      return;
    }
} 

}

function buscarEstudiante(id: number){ // funcion para buscar estudiantes por id
  return estudiantes.find(estudiante => estudiante.id === id);
}

function actualizarpromedio(id: number, nota: number){ // funcion para actualizar el promedio de un estudiante
  const estudiante = buscarEstudiante(id);  
  if (estudiante) {
    console.log("estufiante no encontradp")
    return;
  }

  llenarnotas(id , nota); 
  estudiante.calcularPromedio();


}
console.log(estudiantes);




//HACER BUCLE DO WHILE PARA AGREGAR ESTUDIANTES HASTA QUE EL USUARIO DECIDA SALIR
let continuar = true;
while (continuar) {
  const id = parseInt(prompt("Ingrese el ID del estudiante:") || "0");
  const nombre = prompt("Ingrese el nombre del estudiante:");
  const edad = parseInt(prompt("Ingrese la edad del estudiante:") || "0");
  const carrera = prompt("Ingrese la carrera del estudiante:");
  const promedio = parseFloat(prompt("Ingrese el promedio del estudiante:") || "0");

  if (id && nombre && edad && carrera && !isNaN(promedio)) {
    const nuevoEstudiante = new Estudiante(id, nombre, edad, carrera, promedio);
    agregarEstudiante(nuevoEstudiante);
  } else {
    console.log("Datos inválidos. Por favor, ingrese los datos correctamente.");
  }

  const respuesta = prompt("¿Desea agregar otro estudiante? (s/n):");
  continuar = respuesta?.toLowerCase() === 's';
}           