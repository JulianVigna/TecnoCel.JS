// acceso al DOM
let productos = document.getElementById("productos")
let btnGuardarCel = document.getElementById("guardarCelBtn")
let buscadorNav = document.getElementById("buscadorNav")
let modalBody = document.getElementById("modal-body")
let botonCarrito = document.getElementById("botonCarrito")
let coincidencia = document.getElementById("coincidencia")
let btnFiltro = document.getElementById("selectOrden")
let divCompra = document.getElementById("precioTotal")


function saludoInicial(){
    alert(`Bienvenido a Tecnocel!!`
    )
}
// saludoInicial()

// Funcion constructora de agregar celulares
class Dispositivo {
    constructor(id, marca, modelo, capacidad, color, precio, imagen){

        this.id = id
        this.marca = marca
        this.modelo = modelo
        this.capacidad = capacidad
        this.color = color
        this.precio = precio
        this.imagen = imagen
    }

}
// array

const dispositivo1 = new Dispositivo(1,"Iphone","14 pro max", 256, "silver", 500000, "14promaxsilver.jpeg")

const dispositivo2 = new Dispositivo(2,"Iphone","14 pro max", 128,"gold", 420000, "14promaxgold.jpeg")

const dispositivo3 = new Dispositivo(3,"Iphone", "14 pro", 128, "silver", 390000,  "14promaxsilver.jpeg")

const dispositivo4 = new Dispositivo(4,"Iphone","14", 128, "green", 300000, "14green.jpeg")

const dispositivo5 = new Dispositivo(5,"Iphone", "13 pro max", 256, "space black", 400000, "14prospaceblack.jpeg")

const dispositivo6 = new Dispositivo(6,"Iphone", "13", 128, "red", 260000, "13red.jpeg")

const dispositivo7 = new Dispositivo(7,"xiaomi", "redmi 10", 256, "black", 230000, "redmi10black.jpeg")

const dispositivo8 = new Dispositivo(8,"Samsung", "S22", 128, "black", 280000, "s22black.jpeg")

const dispositivo9 = new Dispositivo(9,"Samsung", "51", 128, "white", 200000, "a51white.jpeg")

const dispositivo10 = new Dispositivo(10,"Samsung", "51", 256, "white", 240000, "a51white.jpeg")

const dispositivo11 = new Dispositivo(11,"Samsung", "S22", 128, "green", 280000, "s22green.jpeg")

let stockDispositivos = []

if(localStorage.getItem("stock")){
    stockDispositivos = JSON.parse(localStorage.getItem("stock"))
}else{
    console.log(`se esta ingresando por primera vez`)
    stockDispositivos.push(dispositivo1, dispositivo2, dispositivo3, dispositivo4, dispositivo5, dispositivo6, dispositivo7, dispositivo8, dispositivo9, dispositivo10, dispositivo11)
    localStorage.setItem("stock",JSON.stringify(stockDispositivos))
}

let productosEnCarrito = []

if(localStorage.getItem("carrito")){
    productosEnCarrito = JSON.parse(localStorage.getItem("carrito"))
}else{
    console.log(`se esta ingresando por primera vez`)

    localStorage.setItem("carrito",JSON.stringify(productosEnCarrito))
}
// Construccion de opcion 1 Agregar celulares

function nuevoDispositivo(array){

    let inputMarca = document.getElementById("marcaInput")
    let inputModelo = document.getElementById("modeloInput")
    let inputColor = document.getElementById("colorInput")
    let inputCapacidad = document.getElementById("capacidadInput")
    let inputPrecio = document.getElementById("precioInput")

    let nuevoDispositivoCreado = new Dispositivo(array.length+1, inputMarca.value, inputModelo.value, inputColor.value, parseInt(inputCapacidad.value),parseInt(inputPrecio.value), "newPhone.jpeg" )

    array.push(nuevoDispositivoCreado)

    localStorage.setItem("stock", JSON.stringify(array))

    dispositivosActuales(array)
    console.log(array)

    inputMarca.value = ""
    inputModelo.value = ""
    inputColor.value = ""
    inputCapacidad.value = ""
    inputPrecio.value = ""
}


// Construccion de opcion 2

function dispositivosActuales(array){
    productos.innerHTML = ""

    for(let celular of array){
        let nuevoCelular = document.createElement("div")
        nuevoCelular.innerHTML = `<article id="${celular.id}" class="card">
                                    <h3 class="tituloCard">${celular.marca} ${celular.modelo}</h3>
                                    <img src="imagenes/${celular.imagen}"  alt="${celular.marca} de ${celular.modelo}">
                                    <div class="content">
                                        <p class="autorCard">color: ${celular.color}<br> Capacidad: ${celular.capacidad} GB</p>
                                        <p class="precioCard">$ ${celular.precio}</p>
                                        <button id="agregarBtn${celular.id}" class="btn btn-outline-danger">Agregar al carrito</button>

                                    </div>
                                </article>`
        productos.appendChild(nuevoCelular)
    let btnAgregar = document.getElementById(`agregarBtn${celular.id}`)
    
    btnAgregar.addEventListener("click", ()=>{
        agregarCarrito(celular)

    })
    }
}

// Funcion agregar al carrito
function agregarCarrito(celular) {
    console.log(celular)
    productosEnCarrito.push(celular)
    console.log(productosEnCarrito)
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))

}

// Imprimir en el modal

function cargarProductosCarrito(array){
    modalBody.innerHTML = ""
    array.forEach((productoCarrito)=>{
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
    array.forEach((productoCarrito, indice)=>{
        document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click",()=>{
            console.log(`se elimina ${productoCarrito.marca} ${productoCarrito.modelo} ${productoCarrito.color} ${productoCarrito.capacidad}GB`)
            // eliminar del DOM
            let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
            cardProducto.remove()
            // eliminar del array de comprar
            productosEnCarrito.splice(indice, 1)
            // eliminar del storage
            localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
            // vuelve a calcular el total 
            compraTotal(array)
        } )
    })
    compraTotal(array)
}

// function calcular total

function compraTotal(array){
    let acumulador = 0
    acumulador = array.reduce((acc, productoCarrito)=> acc + productoCarrito.precio, 0)
    console.log(acumulador)
    acumulador == 0 ? divCompra.innerHTML= `No hay productos en el carrito` : divCompra.innerHTML = `El total es $${acumulador} `
}


// Construccion de opcion 3 filtros

function ordenarMenorMayor(array) {
    let menorMayor = [].concat(array)
    menorMayor.sort((a,b) => (a.precio - b.precio))
    console.log(array)
    console.log(menorMayor)
    dispositivosActuales(menorMayor)
}

function ordenarMayorMenor(array) {
    let mayorMenor = [].concat(array)
    mayorMenor.sort((a,b) => (b.precio - a.precio))
    console.log(array)
    console.log(mayorMenor)
    dispositivosActuales(mayorMenor)
}

function ordenarAlfabeticamente(array){
    let alfabeticamente = array.slice()
    alfabeticamente.sort((a,b) => {
        if(a.marca.toLowerCase() < b.marca.toLowerCase())return -1
        if(a.marca.toLowerCase() > b.marca.toLowerCase())return 1
        return 0
    })
    console.log(array)
    console.log(alfabeticamente)
    dispositivosActuales(alfabeticamente)
}


// buscador
function buscarInfo(buscado, array){
    let busqueda = array.filter(
        (celular) => celular.marca.toLowerCase().includes(buscado.toLowerCase()) || celular.modelo.toLowerCase().includes(buscado.toLowerCase())
    )
    busqueda.length == 0 ? 
    (coincidencia.innerHTML = `<h3 class="text-danger m-2">No hay coincidencias con su busqueda.. 
    A continuación tiene todo nuestro catálogo disponible:</h3>`, dispositivosActuales(array)) 
    : (coincidencia.innerHTML = "", dispositivosActuales(busqueda))
}


// Construccion de opcion 4 eliminar

function eliminarCelular(array){
    console.log("A partir del catálogo ingrese el id del libro a eliminar")
    for(let elem of array){
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
btnGuardarCel.addEventListener("click", ()=>{nuevoDispositivo(stockDispositivos)})
buscadorNav.addEventListener("input", ()=>{buscarInfo(buscadorNav.value, stockDispositivos)})
botonCarrito.addEventListener("click",()=>{
    cargarProductosCarrito(productosEnCarrito)})

btnFiltro.addEventListener("change",() =>{
    console.log(btnFiltro.value)

    if(btnFiltro.value == 1){
        ordenarMenorMayor(stockDispositivos)
    }else if(btnFiltro.value == 2)
    {ordenarMayorMenor(stockDispositivos)
    }else if (btnFiltro.value == 3){
        ordenarAlfabeticamente(stockDispositivos)
    }else{
        dispositivosActuales(stockDispositivos)
    }
}
)

dispositivosActuales(stockDispositivos)









// Menu
// function preguntarOpcion(){
//     let opcion = parseInt( prompt(`Ingrese el numero de opcion que desean realizar:
//         1 - Agregar celular
//         2 - Ver celulares
//         3 - Filtrar celulares
//         4 - Eliminar celular
//         0 - Salir
//     `))
//     menu(opcion)
// }

// function menu (opcionSeleccionada) {
//     switch(opcionSeleccionada){

//         case 0:
//             salir = true
//             alert(`Gracias por visitarnos !`)

//         break
//         case 1: nuevoDispositivo(stockDispositivos)

//         break
//         case 2: dispositivosActuales(stockDispositivos)

//         break
//         case 3: filtro(stockDispositivos)

//         break
//         case 4: eliminarCelular(stockDispositivos)

//         break
//         default:
//             alert(`Ingrese una opcion correcta`)

//         }
// }
// let salir = false
// while (salir!= true){
//     preguntarOpcion()
// }
