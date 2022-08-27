const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        console.log('vaciando carrito')
        articulosCarrito = [];

        limpiarHTML();
    })
}

function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCursos(cursoSeleccionado);
    }

}

function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)

        carritoHTML();
    }
}

function leerDatosCursos(cursoSeleccionado) {
    // Crear un objeto con el contenido del curso actual
    const infoCurso = {
        id: cursoSeleccionado.querySelector('a').getAttribute('data-id'),
        imagen: cursoSeleccionado.querySelector('img').src,
        titulo: cursoSeleccionado.querySelector('h4').textContent,
        precio: cursoSeleccionado.querySelector('.precio span').textContent,
        cantidad: 1,
    }

    // Revisa si un elemento existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);

    if (existe) {
        console.log('No puede agregar el curso más de una vez')
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        })
        articulosCarrito = [...cursos]
    } else {
        // Agrega Elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso]
    }

    carritoHTML();

}

// Muestra el carrito de compras en el HTML
function carritoHTML() {

    // Limpiar el HTML
    limpiarHTML();

    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `
        // Agrega el HTML del carrito en tbody
        contenedorCarrito.appendChild(row);
    })
}

// Elimina los curso del tbody
function limpiarHTML() {
    // Forma lenta
    // contenedorCarrito.innerHTML = '';

    // Forma Rápida
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}