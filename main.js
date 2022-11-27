// acceso al DOM
let productos = document.getElementById("productos")
let btnGuardarCel = document.getElementById("guardarCelBtn")
let buscadorNav = document.getElementById("buscadorNav")
let modalBody = document.getElementById("modal-body")
let botonCarrito = document.getElementById("botonCarrito")
let coincidencia = document.getElementById("coincidencia")
let btnFiltro = document.getElementById("selectOrden")
let divCompra = document.getElementById("precioTotal")
let loaderSpinner = document.getElementById("loaderSpinner")
let botonFinalizarCompra = document.getElementById("botonFinalizarCompra")


// Funcion constructora de agregar celulares
class Dispositivo {
    constructor(id, marca, modelo, capacidad, color, precio, imagen) {

        this.id = id
        this.marca = marca
        this.modelo = modelo
        this.capacidad = capacidad
        this.color = color
        this.precio = precio
        this.imagen = imagen
    }
}

// array stock
let stockDispositivos = []

const cargarDispositivos = async ()=>{
    const response = await fetch("celulares.json")
    const data = await response.json()
    console.log(data)
    for(let celular of data){
        let celularNuevo = new Dispositivo (celular.id, celular.marca, celular.modelo, celular.capacidad, celular.color, celular.precio, celular.imagen)
        stockDispositivos.push(celularNuevo)
    }
    localStorage.setItem("stock", JSON.stringify(stockDispositivos))
    }

    // inicializador 
    if (localStorage.getItem("stock")) {
        stockDispositivos = JSON.parse(localStorage.getItem("stock"))
    } else {
        console.log(`se esta ingresando por primera vez`)
        cargarDispositivos()
}
// Array de productos en el carrito
let productosEnCarrito = []

if (localStorage.getItem("carrito")) {
    productosEnCarrito = JSON.parse(localStorage.getItem("carrito"))
} else {
    console.log(`se esta ingresando por primera vez`)

    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
}
// Construccion de opcion Agregar celulares

function nuevoDispositivo(array) {

    let inputMarca = document.getElementById("marcaInput")
    let inputModelo = document.getElementById("modeloInput")
    let inputColor = document.getElementById("colorInput")
    let inputCapacidad = document.getElementById("capacidadInput")
    let inputPrecio = document.getElementById("precioInput")

    let nuevoDispositivoCreado = new Dispositivo(array.length + 1, inputMarca.value, inputModelo.value, parseInt(inputCapacidad.value), inputColor.value, parseInt(inputPrecio.value), "newPhone.jpeg")

    array.push(nuevoDispositivoCreado)

    localStorage.setItem("stock", JSON.stringify(array))

    dispositivosActuales(array)
    console.log(array)
    Swal.fire({
        title: "Ha agregado un nuevo producto a la lista",
        icon: "success",
        confirmButtonColor: "red",
        timer: 1500,
        text: `${inputMarca.value} ${inputModelo.value} ${inputColor.value} ${inputCapacidad.value} GB`
    })

    inputMarca.value = ""
    inputModelo.value = ""
    inputColor.value = ""
    inputCapacidad.value = ""
    inputPrecio.value = ""

}


// Construccion de opcion stock de dispositivos

function dispositivosActuales(array) {
    productos.innerHTML = ""

    for (let celular of array) {
        let nuevoCelular = document.createElement("div")
        nuevoCelular.innerHTML = `<article id="${celular.id}" class="card">
                                    <h3 class="tituloCard">${celular.marca} ${celular.modelo}</h3>
                                    <img src="imagenes/${celular.imagen}"  alt="${celular.marca} de ${celular.modelo}">
                                    <div class="content">
                                        <p class="autorCard">color: ${celular.color}<br> Capacidad: ${celular.capacidad}GB</p><br>
                                        <p class="precioCard">$ ${celular.precio}</p>
                                        <button id="agregarBtn${celular.id}" class="btn btn-outline-danger">Agregar al carrito</button>

                                    </div>
                                </article>`
        productos.appendChild(nuevoCelular)
        let btnAgregar = document.getElementById(`agregarBtn${celular.id}`)

        btnAgregar.addEventListener("click", () => {
            agregarCarrito(celular)


        })
    }
}

// Funcion agregar al carrito
function agregarCarrito(celular) {
    let celularAgregado = productosEnCarrito.find((elem)=>(elem.id == celular.id))
    console.log(celularAgregado)
    if(celularAgregado == undefined){
        
        productosEnCarrito.push(celular)
        console.log(productosEnCarrito)
        localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))

        // sweetAlert para agregar al carrito
        Swal.fire({
            title: "Ha agregado un producto",
            icon: "success",
            confirmButtonColor: "red",
            timer: 1000,
            text: `${celular.marca} ${celular.modelo} ${celular.capacidad} GB ${celular.color}`,
            imageUrl: `imagenes/${celular.imagen}`,
            imageHeight: 200,
            imageWidth: 200,
            imageAlt: `${celular.marca}${celular.modelo}`
        })
    }else{
        console.log(`el celular ya existe en el carrito`)

        Swal.fire({
            title: "Producto ya agregado",
            icon: "error",
            confirmButtonColor: "red",
            timer: 1000,
            text:`ya se encuentra en el carrito`,
            text: `${celular.marca} ${celular.modelo} ${celular.capacidad} GB ${celular.color}`,
            imageUrl: `imagenes/${celular.imagen}`,
            imageHeight: 200,
            imageWidth: 200,
            imageAlt: `${celular.marca}${celular.modelo}`
        })
    }

}


// Imprimir en el modal

function cargarProductosCarrito(array) {
    modalBody.innerHTML = ""
    array.forEach((productoCarrito) => {
        modalBody.innerHTML += `
        <div class="card border-danger mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 540px;">
            <img class="card-img-top" height="300px" src="imagenes/${productoCarrito.imagen}" alt="${productoCarrito.marca} ${productoCarrito.modelo}">
            <div class="card-body">
                    <h4 class="card-title">${productoCarrito.marca} ${productoCarrito.modelo}<br>color: ${productoCarrito.color}, capacidad:${productoCarrito.capacidad}GB</h4>
                    <h4 class="card-text">$${productoCarrito.precio}</h4>
                    <button class= "btn btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
            </div>
        </div>`
    })
    array.forEach((productoCarrito, indice) => {
        document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click", () => {
            console.log(`se elimina ${productoCarrito.marca} ${productoCarrito.modelo} ${productoCarrito.color} ${productoCarrito.capacidad}GB`)

            // eliminar del DOM
            let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
            cardProducto.remove()
            // eliminar del array de comprar
            let productoEliminar = array.find(celular => celular.id == productoCarrito.id)
            console.log(productoEliminar)
            let posicion = array.indexOf(productoEliminar)
            array.splice(posicion, 1)
            // eliminar del storage
            localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
            // vuelve a calcular el total 
            compraTotal(array)
        })
    })
    compraTotal(array)
}

// funcion calcular total

function compraTotal(array) {
    let acumulador = 0
    acumulador = array.reduce((acc, productoCarrito) => acc + productoCarrito.precio, 0)
    console.log(acumulador)
    acumulador == 0 ? divCompra.innerHTML = `No hay productos en el carrito` : divCompra.innerHTML = `El total es $${acumulador} `
    return acumulador
}

// finalizar compra 

function finalizarCompra() {
    
    Swal.fire({
        title: 'Está seguro de realizar la compra ?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Sí, seguro',
        cancelButtonText: 'No, no quiero',
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
    }).then((result) => {
        
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Compra realizada',
                icon: 'success',
                confirmButtonColor: 'green',
                text: `Muchas gracias por su compra. `,
                timer: 3500
            })
            //llevar a cero el array de carrito
            productosEnCarrito = []
            //Tenemos que researtearlo localStorage
            localStorage.removeItem("carrito")
        } else {

            Swal.fire({
                title: 'Compra no realizada',
                icon: 'error',
                text: `La compra no ha sido realizada! Atención sus productos siguen en el carrito !`,
                confirmButtonColor: 'red',
                timer: 3500,
            })
        }
    })
}


// Construccion de Filtros

function ordenarMenorMayor(array) {
    let menorMayor = [].concat(array)
    menorMayor.sort((a, b) => (a.precio - b.precio))
    console.log(array)
    console.log(menorMayor)
    dispositivosActuales(menorMayor)
}

function ordenarMayorMenor(array) {
    let mayorMenor = [].concat(array)
    mayorMenor.sort((a, b) => (b.precio - a.precio))
    console.log(array)
    console.log(mayorMenor)
    dispositivosActuales(mayorMenor)
}

function ordenarAlfabeticamente(array) {
    let alfabeticamente = array.slice()
    alfabeticamente.sort((a, b) => {
        if (a.marca.toLowerCase() < b.marca.toLowerCase()) return -1
        if (a.marca.toLowerCase() > b.marca.toLowerCase()) return 1
        return 0
    })
    console.log(array)
    console.log(alfabeticamente)
    dispositivosActuales(alfabeticamente)
}


// Buscador
function buscarInfo(buscado, array) {
    let busqueda = array.filter(
        (celular) => celular.marca.toLowerCase().includes(buscado.toLowerCase()) || celular.modelo.toLowerCase().includes(buscado.toLowerCase())
    )
    busqueda.length == 0 ?
        (coincidencia.innerHTML = `<h3 class="text-danger m-2">No hay coincidencias con su busqueda.. 
    A continuación tiene todo nuestro catálogo disponible:</h3>`, dispositivosActuales(array))
        : (coincidencia.innerHTML = "", dispositivosActuales(busqueda))
}


// Eliminar de carrito de compra 

function eliminarCelular(array) {
    console.log("A partir del catálogo ingrese el id del libro a eliminar")
    for (let elem of array) {
        console.log(`Nª${elem.id}. $${elem.marca} ${elem.modelo} capacidad ${elem.capacidad} GB, color ${elem.color} precio: $${elem.precio}`)
    }
    let idEliminar = parseInt(prompt("Ingrese el id a eliminar"))

    let indices = array.map(ubicacion => ubicacion.id)
    console.log(indices)

    let indice = indices.indexOf(idEliminar)
    console.log(indice)

    array.splice(indice, 1)
    console.log(array)
}



// Eventos
btnGuardarCel.addEventListener("click", () => { nuevoDispositivo(stockDispositivos) })
buscadorNav.addEventListener("input", () => { buscarInfo(buscadorNav.value, stockDispositivos) })
botonCarrito.addEventListener("click", () => {
    cargarProductosCarrito(productosEnCarrito)
})

btnFiltro.addEventListener("change", () => {
    console.log(btnFiltro.value)

    if (btnFiltro.value == 1) {
        ordenarMenorMayor(stockDispositivos)
    } else if (btnFiltro.value == 2) {
        ordenarMayorMenor(stockDispositivos)
    } else if (btnFiltro.value == 3) {
        ordenarAlfabeticamente(stockDispositivos)
    } else {
        dispositivosActuales(stockDispositivos)
    }
}
)
// Spiner
setTimeout(() => {
    loaderSpinner.remove()
    dispositivosActuales(stockDispositivos)
}, 1000
)

botonFinalizarCompra.addEventListener("click", () => {
    finalizarCompra()

})


