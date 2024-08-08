class Persona {
	constructor(nombreCompleto, anios) {
		this.nombreCompleto = nombreCompleto;
		this.anios = anios;
	}
}

class Alumno extends Persona {
	constructor(nombreCompleto, anios, lenguajeFavorito, calificacion) {
		super(nombreCompleto, anios);
		this.lenguajeFavorito = lenguajeFavorito;
		this.calificacion = calificacion;
	}
}

let listaAlumnos = []; // Crear una lista vacía para almacenar los alumnos.

// Obtener referencias a los elementos del DOM.
const formAlumno = document.getElementById('formAlumno');
const botonAgregar = document.getElementById('botonAgregar');
const botonActualizar = document.getElementById('botonActualizar');
const botonMostrar = document.getElementById('botonMostrar');
const inputNombre = document.getElementById('nombre');
const inputEdad = document.getElementById('edad');
const inputLenguaje = document.getElementById('lenguaje');
const inputCalificacion = document.getElementById('promedio');
const mostrarAlumnos = document.getElementById('mostrar');
const errorMensaje = document.getElementById('mensajeError');
const formActualizar = document.getElementById('formActualizar');
const inputNombreActualizar = document.getElementById('nombreActualizar');
const inputNuevaCalificacion = document.getElementById('nuevoPromedio');
const errorMensajeActualizar = document.getElementById('mensajeErrorActualizar');

// Función para actualizar la tabla de alumnos.
function actualizarMostrar() {
	let tabla = document.getElementById('mostrar').querySelector('table');
	if (tabla) {
	  tabla.innerHTML = ''; // Si la tabla ya existe, limpiar su contenido.
	} else {
	  tabla = document.createElement('table'); // Si no existe, crear una nueva tabla.
	}
	let encabezados = ['Nombre Completo', 'Años', 'Lenguaje Favorito', 'Calificación'];
	let filaEncabezados = document.createElement('tr');
	encabezados.forEach(encabezado => {
	  let celda = document.createElement('th');
	  celda.textContent = encabezado; // Crear las celdas de encabezado.
	  filaEncabezados.appendChild(celda);
	});
	tabla.appendChild(filaEncabezados); // Agregar la fila de encabezados a la tabla.
	listaAlumnos.forEach(alumno => {
	  let fila = document.createElement('tr');
	  let nombreCelda = document.createElement('td');
	  nombreCelda.textContent = alumno.nombreCompleto; // Crear la celda del nombre.
	  fila.appendChild(nombreCelda);
	  let edadCelda = document.createElement('td');
	  edadCelda.textContent = alumno.anios; // Crear la celda de la edad.
	  fila.appendChild(edadCelda);
	  let lenguajeCelda = document.createElement('td');
	  lenguajeCelda.textContent = alumno.lenguajeFavorito; // Crear la celda del lenguaje favorito.
	  fila.appendChild(lenguajeCelda);
	  let calificacionCelda = document.createElement('td');
	  calificacionCelda.textContent = alumno.calificacion; // Crear la celda de la calificación.
	  fila.appendChild(calificacionCelda);
	  tabla.appendChild(fila); // Agregar la fila a la tabla.
	});
	mostrarAlumnos.appendChild(tabla); // Agregar la tabla al elemento mostrarAlumnos.
}

// Eventos de click para los botones.
botonAgregar.addEventListener('click', () => {
	document.getElementById('formulario').style.display = 'block';
	document.getElementById('actualizarCalificacion').style.display = 'none';
	document.getElementById('mostrar').style.display = 'none';
});

botonActualizar.addEventListener('click', () => {
	document.getElementById('formulario').style.display = 'none';
	document.getElementById('actualizarCalificacion').style.display = 'block';
	document.getElementById('mostrar').style.display = 'none';
});

botonMostrar.addEventListener('click', () => {
	document.getElementById('formulario').style.display = 'none';
	document.getElementById('actualizarCalificacion').style.display = 'none';
	document.getElementById('mostrar').style.display = 'block';
	actualizarMostrar(); // Llamar a la función actualizarMostrar cuando se haga click en el botón Mostrar.
});

// Evento de submit para el formulario de agregar alumno.
formAlumno.addEventListener('submit', (event) => {
	event.preventDefault(); // Prevenir la recarga de la página.
	let nombreCompleto = inputNombre.value;
	let anios = parseInt(inputEdad.value);
	let lenguajeFavorito = inputLenguaje.value;
	let calificacion = parseFloat(inputCalificacion.value);

	const agregar = new Promise((resolve, reject) => {
		if (isNaN(anios) || isNaN(calificacion)) {
		  reject('Por favor, ingrese datos válidos.'); // Validar que la edad y la calificación sean números.
		} else if (!/^[a-zA-Z\sáéíóúÁÉÍÓÚñÑ]+$/.test(nombreCompleto)) {
		  reject('El nombre solo puede contener letras.'); // Validar que el nombre solo contenga letras.
		} else if (anios < 15) {
		  reject('La edad debe ser mayor o igual a 15.'); // Validar que la edad sea mayor o igual a 15.
		} else if (calificacion < 2 || calificacion > 5) {
		  reject('La calificación debe estar entre 2 y 5.'); // Validar que la calificación esté entre 2 y 5.
		} else if (!/^\d+(\.\d{1,2})?$/.test(calificacion)) {
		  reject('La calificación debe tener hasta dos decimales.'); // Validar que la calificación tenga hasta dos decimales.
		} else {
		  let nuevoAlumno = new Alumno(nombreCompleto, anios, lenguajeFavorito, parseFloat(calificacion.toFixed(2)));
		  listaAlumnos.push(nuevoAlumno); // Agregar el nuevo alumno a la lista.
		  resolve('Alumno agregado correctamente');
		}
	});

	agregar.then((mensaje) => {
	  formAlumno.reset(); // Limpiar el formulario.
	  errorMensaje.textContent = '';
	  alert(mensaje); // Mostrar un mensaje de éxito.
	}).catch((error) => {
	  errorMensaje.textContent = error; // Mostrar el mensaje de error.
	});
});

// Evento de submit para el formulario de actualizar calificación.
formActualizar.addEventListener('submit', (event) => {
	event.preventDefault(); // Prevenir la recarga de la página.
	let nombreActualizar = inputNombreActualizar.value;
	let nuevaCalificacion = parseFloat(inputNuevaCalificacion.value);
	let alumnoEncontrado = listaAlumnos.find(alumno => alumno.nombreCompleto === nombreActualizar);
	if (alumnoEncontrado) {
	  alumnoEncontrado.calificacion = nuevaCalificacion; // Actualizar la calificación del alumno encontrado.
	  inputNombreActualizar.value = '';
	  inputNuevaCalificacion.value = '';
	  errorMensajeActualizar.textContent = '';
	  alert("Calificación actualizada correctamente"); // Mostrar un mensaje de éxito.
	} else {
	  errorMensajeActualizar.textContent = 'No se encontró el alumno.'; // Mostrar un mensaje de error si no se encontró el alumno.
	}
});

// Evento de carga del documento.
document.addEventListener('DOMContentLoaded', (event) => {
	let lenguajesFavoritos = ['JavaScript', 'Python', 'Java', 'C', 'C++', 'C#', 'PHP', 'Swift', 'Go', 'Kotlin', 'Ruby'];
	const inputLenguaje = document.getElementById('lenguaje');
	lenguajesFavoritos.forEach(lenguajeFavorito => {
	  let opcion = document.createElement('option');
	  opcion.value = lenguajeFavorito;
	  opcion.text = lenguajeFavorito;
	  inputLenguaje.appendChild(opcion); // Agregar las opciones de lenguajes favoritos al select.
	});
});
