
const calcularPromedio = (notas) => {
    const suma = notas.reduce((acumulador, nota) => acumulador + nota, 0);
    return suma / notas.length;
};
const filtrarAprobados = (alumnos) => {
    return alumnos.filter(alumno => alumno.nota >= 6);
};
const formatearAlumnos = (alumnos) => {
    return alumnos.map(alumno => `Nombre: ${alumno.nombre} - Nota: ${alumno.nota}`);
};
const buscarAlumnos = (alumnos, nombre) => {
    return alumnos.find(alumno => alumno.nombre === nombre);
};
const alumnos = [
    { nombre: "Analia", nota: 8 },
    { nombre: "Carl", nota: 4 },
    { nombre: "Braian", nota: 9 },
    { nombre: "pepe", nota: 6 }
];

