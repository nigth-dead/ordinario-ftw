let servicios = []

window.onload = function cargarVista(){
    cargarTabla()
}

function cargarTabla (){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        const xmlDoc = xhttp.responseXML
        const cd = xmlDoc.getElementsByTagName("servicio")
        servicios = cd
        miFuncion(cd, "inicio")
    }
    xhttp.open("GET", "../XML/Servicios.xml")
    xhttp.send()
}

function TarjetaServicio(servicio){
    return `
        <td>
            <p><img class="img-tarjeta" src="" alt="Imagen de servicio"></p>
            <p>Nombre: ${servicio.getElementsByTagName("nombre")[0].childNodes[0].nodeValue}</p>
            <p>Descripción: ${servicio.getElementsByTagName("descripcion")[0].childNodes[0].nodeValue}</p>
            <p>Costo: ${servicio.getElementsByTagName("costo")[0].childNodes[0].nodeValue}</p>
            <p>Duración: ${servicio.getElementsByTagName("duracion")[0].childNodes[0].nodeValue}</p>
            <p>Vehículo: ${servicio.getElementsByTagName("vehiculo")[0].childNodes[0].nodeValue}</p>
        </td>
    `
}

function miFuncion(cd, origen) {
    let table="";
    let cont = 0;
    const vehiculos = new Set()

    for (let i = 0; i < cd.length; i++) {
        if(cont == 0){
            table += "<tr>"
        }
        if(origen == "inicio"){
            vehiculos.add(cd[i].getElementsByTagName("vehiculo")[0].childNodes[0].nodeValue)
        }
        table += TarjetaServicio(cd[i])
        cont ++;
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
    cargarImagenes("car maintenance");
    if(origen == "inicio"){
        cargarSelectVehiculos(vehiculos)
    }
}

function limpiarFiltros(){
    cargarTabla()
    document.getElementById("costo-minimo").value = null
    document.getElementById("costo-maximo").value = null
    document.getElementById("duracion-minima").value = null
    document.getElementById("duracion-maxima").value = null
}

function abrirMenuFiltro(){
    const seccion = document.getElementById("menu-filtrado")
    seccion.classList.toggle("menu-oculto")
}

function cargarSelectVehiculos(vehiculos){
    const selectVehiculos = document.getElementById("vehiculo")
    selectVehiculos.innerHTML = "<option value=''>Seleccione un vehículo</option>"
    vehiculos.forEach(v => {
        selectVehiculos.innerHTML += "<option value='" + v + "'>" + v + "</option>"
    });
}

function cargarTablaFiltrada(){
    const vehiculoSeleccionado = document.getElementById("vehiculo").value;
    const costoMinimo = document.getElementById("costo-minimo").value;
    const costoMaximo = document.getElementById("costo-maximo").value;
    const duracionMinima = document.getElementById("duracion-minima").value;
    const duracionMaxima = document.getElementById("duracion-maxima").value;

    let cdFiltrado = []

    for(let i = 0; i < servicios.length; i++){
        let band = 1
        const vehiculo = servicios[i].getElementsByTagName("vehiculo")[0].childNodes[0].nodeValue
        const costoTexto = servicios[i].getElementsByTagName("costo")[0].childNodes[0].nodeValue
        const duracionTexto = servicios[i].getElementsByTagName("duracion")[0].childNodes[0].nodeValue
        let costoNumero = 0
        if(costoTexto != "Gratis"){
            costoNumero = Number(costoTexto.replace("$", ""))
        }
        let duracionHoras = 0
        if(duracionTexto.includes("minuto")){
            duracionHoras = parseInt(duracionTexto) / 60
        }
        if(duracionTexto.includes("hora")){
            duracionHoras = parseInt(duracionTexto)
        }
        if(vehiculoSeleccionado != "" && vehiculoSeleccionado != vehiculo && vehiculo != "Todos"){
            band = 0
        }
        if(costoMinimo != "" && costoMinimo > costoNumero){
            band = 0
        }
        if(costoMaximo != "" && costoMaximo < costoNumero){
            band = 0
        }
        if(duracionMinima != "" && duracionMinima > duracionHoras){
            band = 0
        }
        if(duracionMaxima != "" && duracionMaxima < duracionHoras){
            band = 0
        }
        if(band == 1){
            cdFiltrado.push(servicios[i])
        }
    }
    miFuncion(cdFiltrado)
    abrirMenuFiltro()
}