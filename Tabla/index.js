//-----------------------------------------------------------
//-----------------------------------------------------------
const baseDatos = "https://647a6fc7d2e5b6101db05b33.mockapi.io/usuarios";

//capturo las etiquetas
const modal = document.getElementById("modal");
const form = document.getElementById("form");
const apiRestTabla = document.getElementById("bodyTabla");
const trListado = document.getElementsByTagName("tr");
const modalOpciones = document.getElementById("modalOpciones");
const inputBuscador = document.getElementById("buscador");

//capturo encabezados para ordenar cuando los "clickeo"
const encabezadoNombre = document.getElementById("colNombre");
const encabezadoEmail = document.getElementById("colEmail");
const encabezadoTelefono = document.getElementById("colTelefono")

//inputs actuan como botones
const cerrarModal = document.getElementById("cerrarModal");
const cerrarModalOpciones = document.getElementById("cerrarModalOpciones");

//capturo botones
const btnNuevoUsuario = document.getElementById("nuevoUsuario");
const btnEliminar = document.getElementById("btnEliminar");
const btnModificar = document.getElementById("btnModificar");

//capturo inputs de ingreso de datos
let ingresoNombre = document.getElementById("nombre");
let ingresoEmail = document.getElementById("email");
let ingresoTelefono = document.getElementById("telefono");

//capturo input buscador
const buscador = document.getElementById("buscador");

//creo variable para guardad id cada vez que se hace click sobre una fila de la tabla
let id = undefined;

//array vacio para guardar lista.Json() para manipularla
let lista = [];

//orden predeterminado de la lista
let tippoOrden = "nombre"
inputBuscador.placeholder = tippoOrden;

//-----------------------------------------------------------
//-----------------------------------------------------------

//escucho botones CRUD
btnNuevoUsuario.addEventListener("click", () => {
    ingresoNombre.value = "";
    ingresoEmail.value = "";
    ingresoTelefono.value = "";
    modal.showModal();
    form.addEventListener("submit", () => {
       nuevoUsuario(ingresoNombre.value,ingresoEmail.value,ingresoTelefono.value); 
    });  
});

btnModificar.addEventListener("click",() => {
    modal.showModal();
    modalOpciones.close()
    form.addEventListener("submit", () => {
        modificarUsuario(ingresoNombre.value,ingresoEmail.value,ingresoTelefono.value);
    });
});

btnEliminar.addEventListener("click", () => {
    modalOpciones.close(); 
    eliminarUsuario();
});

//escucho encabezados para ordenar columnas y elejir la busqueda
encabezadoNombre.addEventListener("click", () => {
    apiRestTabla.innerText = "";
    tippoOrden = "nombre";
    ordenarX();
    inputBuscador.placeholder = tippoOrden;
    encabezadoNombre.classList.add("ColorSeleccion");
    encabezadoEmail.classList.remove("ColorSeleccion");
    encabezadoTelefono.classList.remove("ColorSeleccion");
    let listaFiltrar = buscar();
    imprimirListado(listaFiltrar);
    escuchadorDeFilas();
});

encabezadoEmail.addEventListener("click", () => {
    apiRestTabla.innerText = "";
    tippoOrden = "email";
    ordenarX();
    inputBuscador.placeholder = tippoOrden;
    encabezadoNombre.classList.remove("ColorSeleccion");
    encabezadoEmail.classList.add("ColorSeleccion");
    encabezadoTelefono.classList.remove("ColorSeleccion");
    let listaFiltrar = buscar();
    imprimirListado(listaFiltrar);
    escuchadorDeFilas();
});

encabezadoTelefono.addEventListener("click", () => {
    apiRestTabla.innerText = "";
    tippoOrden = "telefono";
    ordenarX();
    inputBuscador.placeholder = tippoOrden;
    encabezadoNombre.classList.remove("ColorSeleccion");
    encabezadoEmail.classList.remove("ColorSeleccion");
    encabezadoTelefono.classList.add("ColorSeleccion");
    let listaFiltrar = buscar();
    imprimirListado(listaFiltrar);
    escuchadorDeFilas();
});

//escucho modal para cerrarlo
cerrarModal.addEventListener("click", () => {modal.close();});

cerrarModalOpciones.addEventListener("click", () => {modalOpciones.close();});

//escucho buscador
buscador.addEventListener("input", () => {
    
    apiRestTabla.innerText = "";
    imprimirListado(buscar());
    escuchadorDeFilas();
})

//funciones CRUD
function nuevoUsuario(nombre,email,telefono){
    const usuario = creadorUsuario(nombre,email,telefono);
    fetch(baseDatos, 
    {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
    })
    .then(()=> location.reload());
};

function modificarUsuario(nombre,email,telefono){ 
    const usuario = creadorUsuario(nombre,email,telefono);
    fetch(baseDatos + `/${id}`, 
    {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
    })
    .then(()=>traerApi_Presentar(baseDatos));
};

function eliminarUsuario(){
    fetch(baseDatos + `/${id}`, 
    {
        method: "DELETE",
    })
    .then(()=>traerApi_Presentar(baseDatos));
};

//fetch Api
function traerApi_Presentar(url){
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(datos =>{
        apiRestTabla.innerText = "";
        lista = datos;
        imprimirListado(lista);
        escuchadorDeFilas();
    })
    .catch(err => console.error(err, "sin internet"))
};

//funciones complementarias
function crearTrTd(id,nombre,email,telefono){
    //creo los etiquetas
    const nuevoTr = document.createElement("tr");
    const nueviId = document.createElement("td");
    const nuevoTbNombre = document.createElement("td");
    const nuevoTbEmail = document.createElement("td");
    const nuevoTbTelefono = document.createElement("td");
    //le asigno clases a cada etiqueta
    nuevoTr.classList.add("filaListado");
    nueviId.classList.add("identificador");
    nuevoTbNombre.classList.add("columnaListado");
    nuevoTbEmail.classList.add("columnaListado");
    nuevoTbTelefono.classList.add("columnaListado");
    //imprimo los valores de casda celda(estos entrar por parametros a esta funcion)
    nueviId.innerText = id;
    nuevoTbNombre.innerText = nombre;
    nuevoTbEmail.innerText = email;
    nuevoTbTelefono.innerText = telefono;
    //creo cada fila con los datos recojido en los imputs
    nuevoTr.appendChild(nueviId);
    nuevoTr.appendChild(nuevoTbNombre);
    nuevoTr.appendChild(nuevoTbEmail);
    nuevoTr.appendChild(nuevoTbTelefono);
    apiRestTabla.appendChild(nuevoTr);
};

function ordenarX(){
    if(tippoOrden === "nombre"){lista = lista.sort((x, y) => x.nombre.localeCompare(y.nombre));return lista;};
    if(tippoOrden === "email"){lista = lista.sort((x, y) => x.email.localeCompare(y.email));return lista;};
    if(tippoOrden === "telefono"){lista = lista.sort((x, y) => x.telefono.localeCompare(y.telefono));return lista;};
}

function imprimirListado(arrayImpresion){
    ordenarX();   
    arrayImpresion.forEach(element => {crearTrTd(element.id,element.nombre, element.email, element.telefono)});
}

function escuchadorDeFilas(){
    for (let index = 1; index < trListado.length; index++){
        trListado[index].addEventListener("click",() => {
        //cuando "click" sobre una fila,guardo el id y presento el modal opciones autocompletado con los datos de le fila cliqueada
        id = trListado[index].cells[0].innerText;
        completarModal(index);
        modalOpciones.showModal();
        });
    };
}

function completarModal(index){
    ingresoNombre.value = trListado[index].cells[1].innerText;
    ingresoEmail.value = trListado[index].cells[2].innerText;
    ingresoTelefono.value = trListado[index].cells[3].innerText;
};

function creadorUsuario(nombre,email,telefono){
    const usuario = {
        nombre: `${nombre}`,
        email: `${email}`,
        telefono: `${telefono}`,
    }
    return usuario
};

function buscar(){
    let listaFiltrada = [];
    let textoEntrante = buscador.value;
    if(tippoOrden === "nombre"){
    listaFiltrada = lista.filter((element)=>{
        if(element.nombre.toLowerCase().startsWith(textoEntrante)){
            return element
        }
    });
    return listaFiltrada;
    }
    if(tippoOrden === "email"){
    listaFiltrada = lista.filter((element)=>{
        if(element.email.toLowerCase().startsWith(textoEntrante)){
            return element
        }
    });
        return listaFiltrada;
    }
    if(tippoOrden === "telefono"){
    listaFiltrada = lista.filter((element)=>{
        if(element.telefono.toLowerCase().startsWith(textoEntrante)){
            return element
        }
    });
        return listaFiltrada;
    }
}

traerApi_Presentar(baseDatos);