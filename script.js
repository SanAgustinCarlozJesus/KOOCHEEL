document.addEventListener('DOMContentLoaded', function() {

    const carrito = document.getElementById('carrito');
    const elementos2 = document.querySelector('.product-content');
    const lista = document.querySelector('#lista-carrito tbody');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

    let pasoActual = 1;

const pasosElaboracion = {
    1: {
        titulo: "Paso 1: Recolección y Lavado",
        descripcion: "Empezamos con la recolección de la materia prima, como vegetales para la extracción de pigmento. Lavamos y cortamos todo cuidadosamente.",
        imagen: "images/cortar.jpg" 
    },
    2: {
        titulo: "Paso 2: Secado y Disecado",
        descripcion: "Secamos los vegetales con papel de cocina para extraer el agua. Luego, los metemos al microondas para disecar la materia prima por completo.",
        imagen: "images/micro.jpg" 
    },
    3: {
        titulo: "Paso 3: Molienda y Filtrado",
        descripcion: "Una vez disecados, se trituran con un vaso o moleta para dejarlos en polvo. Pasamos el resultado por un colador para quitar los excesos grandes.",
        imagen: "images/colador.png" 
    },
    4: {
        titulo: "Paso 4: Mezcla y Homogenización",
        descripcion: "Incorporamos un poco de colorante, nuestro aglutinante y el conservador. Moletamos con paciencia hasta que no quede ningún solo grumo.",
        imagen: "images/agua.png" 
    },
    5: {
        titulo: "Paso 5: Moldeado y Secado Final",
        descripcion: "Pasamos la mezcla al molde, limpiamos los bordes y dejamos secar. Nota: Algunos pigmentos se extraen hirviendo y el proceso sigue igual desde aquí.",
        imagen: "images/embase.png" 
    },
    6: {
        titulo: "Paso 6:Secado y Empaque",
        descripcion: "Se deja secar completamente la mezcla en el molde. Finalmente, se desmolda y se empacan las acuarelas para su distribución.",
        imagen: "images/acuarelasp.png" 
    }
};

const totalPasos = Object.keys(pasosElaboracion).length;

    cargarEventListeners();

    function cargarEventListeners(){
        if (elementos2) elementos2.addEventListener('click', comprarElemento);
        if (carrito) carrito.addEventListener('click', eliminarElemento);
        if (vaciarCarritoBtn) vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
        
        inicializarCarruselPasos();
    }

    function comprarElemento(e) {
        e.preventDefault();
        if(e.target.classList.contains('agregar-carrito')){
            const elemento = e.target.parentElement.parentElement; 
            leerDatosElemento(elemento);
        }
    }

    function leerDatosElemento(elemento) {
        const infoElemento = {
            imagen: elemento.querySelector('img').src,
            titulo: elemento.querySelector('h3').textContent,
            precio: elemento.querySelector('.precio').textContent, 
            id: elemento.querySelector('a').getAttribute('data-id')
        }
        insertarCarrito(infoElemento);
    }



    function insertarCarrito(elemento){
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
        <img src="${elemento.imagen}" width=100>
        </td>
        <td>
        ${elemento.titulo} 
        </td>
        <td>
        ${elemento.precio}
        </td>
        <td>
        <a href="#" class="borrar" data-id="${elemento.id}">X</a>
        </td>
        `;
        if (lista) {
            lista.appendChild(row);

            const carritoMenu = document.getElementById('carrito');
            carritoMenu.style.display = 'block';
            setTimeout(() => {
                carritoMenu.style.display = '';
        }, 2000);
    }
    }

    function eliminarElemento(e) {
        e.preventDefault();
        if(e.target.classList.contains('borrar')){
            e.target.parentElement.parentElement.remove(); 
        }
    }

    function vaciarCarrito() {
        if (lista) {
            while(lista.firstChild) {
                lista.removeChild(lista.firstChild)
            }
        }
        return false;
    }

    function inicializarCarruselPasos() {
        const carruselContenedor = document.getElementById('carrusel-pasos-container');
        const btnAnterior = document.getElementById('btn-anterior');
        const btnSiguiente = document.getElementById('btn-siguiente');

        if (carruselContenedor) {
            cambiarPaso(pasoActual); 
            
            if (btnAnterior) btnAnterior.addEventListener('click', () => moverCarrusel(-1));
            if (btnSiguiente) btnSiguiente.addEventListener('click', () => moverCarrusel(1));
        }
    }

    function cambiarPaso(paso) {
        const data = pasosElaboracion[paso];
        if (!data) return;

        const imgEl = document.getElementById('carrusel-imagen');
        const tituloEl = document.getElementById('carrusel-titulo');
        const descEl = document.getElementById('carrusel-descripcion');

        const indicadores = document.querySelectorAll('.indicador');
        indicadores.forEach(indicador => {
            indicador.classList.remove('activo');
            if (parseInt(indicador.getAttribute('data-paso')) === paso) {
                indicador.classList.add('activo');
            }
        });

        if (imgEl) {
            imgEl.src = data.imagen;
            imgEl.alt = data.titulo;
        }
        if (tituloEl) tituloEl.textContent = data.titulo;
        if (descEl) descEl.textContent = data.descripcion;

        pasoActual = paso;
    }

    function moverCarrusel(direccion) {
        let nuevoPaso = pasoActual + direccion;
        if (nuevoPaso > totalPasos) nuevoPaso = 1;
        if (nuevoPaso < 1) nuevoPaso = totalPasos;

        cambiarPaso(nuevoPaso);
    }
});