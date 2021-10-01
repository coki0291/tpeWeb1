//Creación de eventos, botones,url, y variables.

let btnAgregar = document.querySelector("#btn-agregar");
btnAgregar.addEventListener("click", agregar);

let btnAgregarx3 = document.querySelector("#btn-agregarx3");
btnAgregarx3.addEventListener("click", agregarx3);

let inputFiltro = document.querySelector("#filtrar");
inputFiltro.addEventListener("keyup", filtrar);

document.querySelector("#btn-anterior").addEventListener("click", function (e) {
    cambiarPagina(-1)
});

document.querySelector("#btn-siguiente").addEventListener("click", function (e) {
    cambiarPagina(1)
});

const url = "https://60d4c981c6549200173a4e25.mockapi.io/api/v1/compras";
let paginaNumero = 1;

//Json Aleatorio

let aleatorio = [
    {
        nombre: "Silvina",
        apellido: "Herrera",
        email: "slherrera91@gmail.com",
        producto: "APA",
        cantidad: 3
    },
    {
        nombre: "Lorena",
        apellido: "Herrera",
        email: "tancredilorena50@gmail.com",
        producto: "IPA",
        cantidad: 5
    },
    {
        nombre: "Marina",
        apellido: "Herrera",
        email: "marinaherre85@gmail.com",
        producto: "Blonde",
        cantidad: 8
    },
    {
        nombre: "Pablo",
        apellido: "Martin",
        email: "martinpablo@gmail.com",
        producto: "APA",
        cantidad: 11
    },
]

mostrarPedido();

//Funciones asíncronas: agregar_api, mostrarPedido, borrarID, editar_api, agregarx3

//Esta función recibe un objeto json y ejecuta un post sobre la api, cuando recibe la respuesta correcta muestra la tabla actualizada. 
async function agregar_api(item) {
    try {
        let res = await fetch(url, {
            "method": "POST",
            "headers": { "Content-type": "application/json" },
            "body": JSON.stringify(item)
        });
        console.log(res.status);
        if (res.status === 201){
            mostrarPedido();
        }
    } catch (error) {
        console.log(error);
    }
}

//Esta función pide el contenido de la api, espera una respuesta, y cuando la recibe de manera correcta recrea la tabla y muestra el contenido. 
async function mostrarPedido() {
    let tablaCompras = document.querySelector("#tablaCompras")
    let claseFila;
    try {
        let res = await fetch(url + `?page=${paginaNumero}&limit=10`);
        json = await res.json();
        if (json.length > 0) {
            tablaCompras.innerHTML =
            `<tr>
                <th class="ocultarColumna">Id</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Acciones</th>
            </tr>` ;
            for (const item of json){
                if (item.cantidad >= 10) {
                    claseFila = "resaltadonegrita";
                }
                else{
                    claseFila = "";
                }
                tablaCompras.innerHTML +=
                    `<tr class=${claseFila}>
                        <td class="ocultarColumna" contenteditable="true">${item.id}</td>
                        <td contenteditable="true">${item.nombre}</td>
                        <td contenteditable="true">${item.apellido}</td>
                        <td contenteditable="true">${item.email}</td>
                        <td contenteditable="true">${item.producto}</td>
                        <td contenteditable="true">${item.cantidad}</td>
                        <td>
                            <input type="submit" value="Editar" class= "editar">
                            <input type="submit" value="Eliminar" class= "eliminar">
                        </td>
                    </tr>`;

                let btnBorrar = document.querySelectorAll(".eliminar");
                for (const item of btnBorrar) {
                    item.addEventListener("click", borrarPedido);
                }
                let btnEditar = document.querySelectorAll(".editar");
                for (const item of btnEditar) {
                    item.addEventListener("click", editar);
                }

            }
            console.log(json);

        }
        else{
            paginaNumero--;
        }
        
    } catch (error) {
        console.log(error);
    }
}

//Esta función elimina contenido de la api a través del id ejecutando el método DELETE
async function borrarID(id) {
    try {
        let res = await fetch(`${url}/${id}`, {
            "method": "DELETE"
        });
        if (res.status === 200) {
            console.log("Se elimino el id " + id);
            mostrarPedido();
        }
    } catch (error) {
        console.log(error);
    }
}

//Esta función edita el contenido de la api ejecutando el método PUT.
async function editar_api(item, id) {
    try {
        let res = await fetch(`${url}/${id}`, {
            "method": "PUT",
            "headers": { "Content-type": "application/json" },
            "body": JSON.stringify(item)
        })
        console.log(res.status);
        if (res.status === 200) {
            console.log("Editado");
            mostrarPedido();
        }
    } catch (error) {
        console.log(error);
    }
}

//Esta función agrega a la api 3 items de manera aleatoria.
async function agregarx3(event) {
    event.preventDefault();
    let numeroAleatorio;
    let compras;
    for (i = 0; i <= 2; i++) {
        numeroAleatorio = Math.floor(Math.random() * 3);
        await agregar_api(aleatorio[numeroAleatorio]);
    }

}

//Funciones: borrarPedido,agregar,editar,filtrar

//Esta función toma el elemento padre(td) del botón, luego el elemento padre (tr), el primer hijo (td[0]), y su contenido(id) 
function borrarPedido(event) {
    event.preventDefault();
    borrarID(this.parentElement.parentElement.firstElementChild.innerHTML);
}

//Esta función lee los elementos del input, si están completos, crea el objeto json, luego llama a la función agregar_api. 
function agregar(event) {
    event.preventDefault();
    let inputNombre = document.querySelector("#inputNombre").value;
    let inputApellido = document.querySelector("#inputApellido").value;
    let inputEmail = document.querySelector("#inputEmail").value;
    let inputProducto = document.querySelector("#inputProducto").value;
    let inputCantidad = document.querySelector("#inputCantidad").value;
    if (inputCantidad != "" && inputNombre != "" && inputApellido != "" && inputEmail != "" && inputProducto != "") {
        let item = {
            nombre: inputNombre,
            apellido: inputApellido,
            email: inputEmail,
            producto: inputProducto,
            cantidad: inputCantidad,
        }
        agregar_api(item);
    }
}

//Esta función toma el contenido de todas las celdas de la fila para editar creando el nuevo objeto. 
function editar(event) {
    event.preventDefault();
    let celdas = this.parentElement.parentElement.children;
    let id = celdas[0].innerHTML;
    let inputNombre = celdas[1].innerHTML;
    let inputApellido = celdas[2].innerHTML;
    let inputEmail = celdas[3].innerHTML;
    let inputProducto = celdas[4].innerHTML;
    let inputCantidad = celdas[5].innerHTML;
    if (inputCantidad != "" && inputNombre != "" && inputApellido != "" && inputEmail != "" && inputProducto != "") {
        let item = {
            nombre: inputNombre,
            apellido: inputApellido,
            email: inputEmail,
            producto: inputProducto,
            cantidad: inputCantidad,
        }
        editar_api(item, id);
    }
}

//Esta función realiza un recorrido por cada fila de la tabla compras, captura la celda que contiene el nombre y la guarda. 
//Si lo que se escribe para filtrar está contenido en el texto de la celda nombre, se muestra en la tabla, en caso contrario, 
//se agrega la clase ocultarFila.

function filtrar() {
    let input = document.getElementById("filtrar");
    let filtro = input.value.toUpperCase();
    let tabla = document.getElementById("tablaCompras");
    let fila = tabla.getElementsByTagName("tr");
    for (i = 0; i < fila.length; i++) {
        celda = fila[i].getElementsByTagName("td")[1];
        if (celda){
            let txtValue = celda.innerText;
            if (txtValue.toUpperCase().indexOf(filtro) > -1) {
                fila[i].classList.remove("ocultarFila");
            }
            else {
                fila[i].classList.add("ocultarFila");
            }
        }
    }
}

//Esta función recibe un valor por parámetro y es llamada por la función anónima para incrementar o disminuir el número de página.
function cambiarPagina(num) {
    if (paginaNumero + num > 0) {
        paginaNumero += num;
        mostrarPedido();
    }

}