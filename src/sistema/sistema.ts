interface IEstudiante { 
    id: number
    nombre: string
    edad: number
    carrera: string
    activo: boolean
    promedio: number
}

 

interface IResultado<T> { 
    ok: boolean
    mensaje: string
    data?: T
}

class Estudiante implements IEstudiante {
    constructor(
        public id: number,
        public nombre: string,
        public edad: number,
        public carrera: string,
        public activo: boolean,
        public promedio: number
    ) {}
}


class Sistema{
    private estudiantes: Estudiante[] = [];

    agregar(student: Estudiante): IResultado<Estudiante> {
        // Validar ID repetido
        for (let e of this.estudiantes) {
            if (e.id === student.id) {
                return { ok: false, mensaje: "ID repetido" };
            }
        }

        // Validar edad
        if (student.edad < 15 || student.edad > 80) {
            return { ok: false, mensaje: "Edad inválida" };
        }

        // Validar promedio
        if (student.promedio < 0 || student.promedio > 10) {
            return { ok: false, mensaje: "Promedio inválido" };
        }

        this.estudiantes.push(student);
        return { ok: true, mensaje: "Estudiante agregado", data: student };
    }

    listar(): Estudiante[] {
        return this.estudiantes;
    }

    buscarPorId(id: number): IResultado<Estudiante> {
        for (let e of this.estudiantes) {
            if (e.id === id) {
                return { ok: true, mensaje: "Estudiante encontrado", data: e };
            }
        }
        return { ok: false, mensaje: "Estudiante no encontrado" };
    }

    actualizarPromedio(id: number, nuevoPromedio: number): IResultado<Estudiante> {
        if (nuevoPromedio < 0 || nuevoPromedio > 10) {
            return { ok: false, mensaje: "Promedio inválido" };
        }

        for (let e of this.estudiantes) {
            if (e.id === id) {
                e.promedio = nuevoPromedio;
                return { ok: true, mensaje: "Promedio actualizado", data: e };
            }
        }
        return { ok: false, mensaje: "Estudiante no encontrado" };
    }

    cambiarEstado(id: number, activo: boolean): IResultado<Estudiante> {
        for (let e of this.estudiantes) {
            if (e.id === id) {
                e.activo = activo;
                return { ok: true, mensaje: "Estado actualizado", data: e };
            }
        }
        return { ok: false, mensaje: "Estudiante no encontrado" };
    }

    listarActivos(): Estudiante[] {
        const activos: Estudiante[] = [];
        for (let e of this.estudiantes) {
            if (e.activo) {
                activos.push(e);
            }
        }
        return activos;
    }

    promedioGeneral(): number {
        if (this.estudiantes.length === 0) return 0;

        let suma = 0;
        for (let e of this.estudiantes) {
            suma += e.promedio;
        }
        return suma / this.estudiantes.length;
    }
}


function mostrarMenu(): void {
    console.log("SISTEMA DE ESTUDIANTES");
    console.log("1. Agregar estudiante");
    console.log("2. Listar estudiantes");
    console.log("3. Buscar por ID");
    console.log("4. Actualizar promedio");
    console.log("5. Cambiar estado");
    console.log("6. Listar activos");
    console.log("7. Promedio general");
}

function ejecutarDemo(sistema: Sistema): void {
    sistema.agregar(new Estudiante(1, "Ana", 20, "Sistemas", true, 8.5));
    sistema.agregar(new Estudiante(2, "Luis", 22, "Contabilidad", true, 7.8));
    sistema.agregar(new Estudiante(3, "María", 19, "Derecho", true, 9.2));

    console.log("Lista de estudiantes:");
    console.log(sistema.listar());

    console.log("Buscar estudiante con ID 2:");
    console.log(sistema.buscarPorId(2));

    console.log("\Actualizar promedio del ID 2:");
    console.log(sistema.actualizarPromedio(2, 8.9));

    console.log("Cambiar estado a inactivo (ID 3):");
    console.log(sistema.cambiarEstado(3, false));

    console.log("Estudiantes activos:");
    console.log(sistema.listarActivos());

    console.log("Promedio general del curso:");
    console.log(sistema.promedioGeneral());
}

mostrarMenu();
const sistema = new Sistema();
ejecutarDemo(sistema);