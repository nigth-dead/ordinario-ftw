let camiones = []

window.onload = function cargarVista(){
    cargarTabla()
}

function cargarTabla (){
    const xhttp = new XMLHttpRequest()
    xhttp.onload = function(){
        const xmlDoc = xhttp.responseXML
        const cd = xmlDoc.getElementsByTagName("camion")
        camiones = cd
        miFuncion(cd, "inicio")
    }
    xhttp.open("GET", "../XML/Camiones.xml")
    xhttp.send()
}

function TarjetaCamion(camion){
    return `
        <td>
            <p><img class="img-tarjeta" src="" alt="Imagen de camión"></p>
            <p>Marca: ${camion.getElementsByTagName("marca")[0].childNodes[0].nodeValue}</p>
            <p>Modelo: ${camion.getElementsByTagName("modelo")[0].childNodes[0].nodeValue}</p>
            <p>Año: ${camion.getElementsByTagName("anio")[0].childNodes[0].nodeValue}</p>
            <p>Color: ${camion.getElementsByTagName("color")[0].childNodes[0].nodeValue}</p>
            <p>Precio: ${camion.getElementsByTagName("precio")[0].childNodes[0].nodeValue}</p>
            <p>Tonelaje: ${camion.getElementsByTagName("tonelaje")[0].childNodes[0].nodeValue}</p>
            <p>Numero de ruedas: ${camion.getElementsByTagName("noRuedas")[0].childNodes[0].nodeValue}</p>
            <p>Tipo de contenedor: ${camion.getElementsByTagName("contenedor")[0].childNodes[0].nodeValue}</p>
        </td>
    `
}

function miFuncion(cd, origen){
    let table = "";
    let cont = 0;
    const marcas = new Set()
    const anios = new Set()
    const colores = new Set()
    const tonelajes = new Set()
    const ruedas = new Set()
    const contenedores = new Set()

    for (let i = 0; i < cd.length; i++) {
        if(cont == 0){
            table += "<tr>"
        }
        if(origen == "inicio"){
            marcas.add(cd[i].getElementsByTagName("marca")[0].childNodes[0].nodeValue)
            anios.add(cd[i].getElementsByTagName("anio")[0].childNodes[0].nodeValue)
            colores.add(cd[i].getElementsByTagName("color")[0].childNodes[0].nodeValue)
            tonelajes.add(cd[i].getElementsByTagName("tonelaje")[0].childNodes[0].nodeValue)
            ruedas.add(cd[i].getElementsByTagName("noRuedas")[0].childNodes[0].nodeValue)
            contenedores.add(cd[i].getElementsByTagName("contenedor")[0].childNodes[0].nodeValue)
        }
        table += TarjetaCamion(cd[i])
        cont++;
        if (cont >= 4){
            table += "</tr>"
            cont = 0
        }
    }
    if(cont != 0){
        while(cont < 4){
            table += "<td class='td-vacio'></td>";
            cont++;
        }
        table += "</tr>";
    }
    document.getElementById("tabla").innerHTML = table;
    cargarImagenes("cargo trucks");
    if(origen == "inicio"){
        cargarSelectMarcas(marcas)
        cargarSelectAnios(anios)
        cargarSelectColores(colores)
        cargarSelectTonelajes(tonelajes)
        cargarSelectRuedas(ruedas)
        cargarSelectContenedores(contenedores)
    }
}

function limpiarFiltros(){
    cargarTabla()
    document.getElementById("precio-minimo").value = null
    document.getElementById("precio-maximo").value = null
}

function abrirMenuFiltro(){
    const seccion = document.getElementById("menu-filtrado")
    seccion.classList.toggle("menu-oculto")
}

function cargarSelectMarcas(marcas){
    const selectMarcas = document.getElementById("marca")
    selectMarcas.innerHTML = "<option value=''>Seleccione una marca</option>"
    marcas.forEach(m => {
        selectMarcas.innerHTML += "<option value='" + m + "'>" + m + "</option>"
    });
}

function cargarSelectAnios(anios){
    const selectAnios = document.getElementById("anio")
    selectAnios.innerHTML = "<option value=''>Seleccione un año</option>"
    const aniosOrdenados = Array.from(anios).sort((a, b) => b - a);
    aniosOrdenados.forEach(a => {
        selectAnios.innerHTML += "<option value='" + a + "'>" + a + "</option>"
    });
}

function cargarSelectColores(colores){
    const selectColores = document.getElementById("color")
    selectColores.innerHTML = "<option value=''>Seleccione un color</option>"
    colores.forEach(c => {
        selectColores.innerHTML += "<option value='" + c + "'>" + c + "</option>"
    });
}

function cargarSelectTonelajes(tonelajes){
    const selectTonelajes = document.getElementById("tonelaje")
    selectTonelajes.innerHTML = "<option value=''>Seleccione un tonelaje</option>"
    const tonelajesOrdenados = Array.from(tonelajes).sort((a, b) => {
        return parseFloat(b) - parseFloat(a)
    });
    tonelajesOrdenados.forEach(t => {
        selectTonelajes.innerHTML += "<option value='" + t + "'>" + t + "</option>"
    });
}

function cargarSelectRuedas(ruedas){
    const selectRuedas = document.getElementById("ruedas")
    selectRuedas.innerHTML = "<option value=''>Seleccione un No. de ruedas</option>"
    const ruedasOrdenadas = Array.from(ruedas).sort((a, b) => Number(a) - Number(b));
    ruedasOrdenadas.forEach(r => {
        selectRuedas.innerHTML += "<option value='" + r + "'>" + r + "</option>"
    });
}

function cargarSelectContenedores(contenedores){
    const selectContenedores = document.getElementById("contenedor")
    selectContenedores.innerHTML = "<option value=''>Seleccione un contenedor</option>"
    contenedores.forEach(c => {
        selectContenedores.innerHTML += "<option value='" + c + "'>" + c + "</option>"
    });
}

function cargarTablaFiltrada(){
    const marcaSeleccionada = document.getElementById("marca").value;
    const anioSeleccionado = document.getElementById("anio").value;
    const colorSeleccionado = document.getElementById("color").value;
    const tonelajeSeleccionado = document.getElementById("tonelaje").value;
    const ruedasSeleccionadas = document.getElementById("ruedas").value;
    const contenedorSeleccionado = document.getElementById("contenedor").value;
    const precioMinimo = document.getElementById("precio-minimo").value;
    const precioMaximo = document.getElementById("precio-maximo").value;

    let cdFiltrado = []
    for(let i = 0; i < camiones.length; i++){
        let band = 1
        if(marcaSeleccionada != "" && marcaSeleccionada != camiones[i].getElementsByTagName("marca")[0].childNodes[0].nodeValue){
            band = 0
        }
        if(anioSeleccionado != "" && anioSeleccionado != camiones[i].getElementsByTagName("anio")[0].childNodes[0].nodeValue){
            band = 0
        }
        if(colorSeleccionado != "" && colorSeleccionado != camiones[i].getElementsByTagName("color")[0].childNodes[0].nodeValue){
            band = 0
        }
        if(tonelajeSeleccionado != "" && tonelajeSeleccionado != camiones[i].getElementsByTagName("tonelaje")[0].childNodes[0].nodeValue){
            band = 0
        }
        if(ruedasSeleccionadas != "" && ruedasSeleccionadas != camiones[i].getElementsByTagName("noRuedas")[0].childNodes[0].nodeValue){
            band = 0
        }
        if(contenedorSeleccionado != "" && contenedorSeleccionado != camiones[i].getElementsByTagName("contenedor")[0].childNodes[0].nodeValue){
            band = 0
        }
        if(precioMinimo != "" && precioMinimo > Number(camiones[i].getElementsByTagName("precio")[0].childNodes[0].nodeValue)){
            band = 0
        }
        if(precioMaximo != "" && precioMaximo < Number(camiones[i].getElementsByTagName("precio")[0].childNodes[0].nodeValue)){
            band = 0
        }
        if(band == 1){
            cdFiltrado.push(camiones[i])
        }
    }
    miFuncion(cdFiltrado)
    abrirMenuFiltro()
}