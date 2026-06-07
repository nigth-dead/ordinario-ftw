let sucursales = []

window.onload = function cargarVista(){
    cargarTabla()
}

function cargarTabla (){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        const xmlDoc = xhttp.responseXML
        const cd = xmlDoc.getElementsByTagName("sucursal")
        sucursales = cd
        miFuncion(cd, "inicio")
    }
    xhttp.open("GET", "../XML/Sucursales.xml")
    xhttp.send()
}

function TarjetaSucursal(sucursal){
    return `
        <td>
            <p><img class="img-tarjeta" src="" alt="Imagen de sucursal"></p>
            <p>Nombre: ${sucursal.getElementsByTagName("nombre")[0].childNodes[0].nodeValue}</p>
            <p>Direccion: ${sucursal.getElementsByTagName("direccion")[0].childNodes[0].nodeValue}</p>
            <p>Ciudad: ${sucursal.getElementsByTagName("ciudad")[0].childNodes[0].nodeValue}</p>
            <p>Estado: ${sucursal.getElementsByTagName("estado")[0].childNodes[0].nodeValue}</p>
            <p>Horario: ${sucursal.getElementsByTagName("horario")[0].childNodes[0].nodeValue}</p>
        </td>
    `
}

function miFuncion(cd, origen) {
    let table="";
    let cont = 0;
    const ciudades = new Set()

    for (let i = 0; i < cd.length; i++) {
        if(cont == 0){
            table += "<tr>"
        }
        if(origen == "inicio"){
            ciudades.add(cd[i].getElementsByTagName("ciudad")[0].childNodes[0].nodeValue)
        }
        table += TarjetaSucursal(cd[i])
        cont ++;
        if (cont >= 4){
            table += "</tr>"
            cont = 0;
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
    cargarImagenes("Car dealership");
    if(origen == "inicio"){
        cargarSelectCiudades(ciudades)
    }
}

function limpiarFiltros(){
    cargarTabla()
}

function abrirMenuFiltro(){
    const seccion = document.getElementById("menu-filtrado")
    seccion.classList.toggle("menu-oculto")
}

function cargarSelectCiudades(ciudades){
    const selectCiudades = document.getElementById("ciudad")
    selectCiudades.innerHTML = "<option value=''>Seleccione una ciudad</option>"
    ciudades.forEach(c => {
        selectCiudades.innerHTML += "<option value='" + c + "'>" + c + "</option>"
    });
}

function cargarTablaFiltrada(){
    const ciudadSeleccionada = document.getElementById("ciudad").value;
    let cdFiltrado = []
    for(let i = 0; i < sucursales.length; i++){
        let band = 1
        if(ciudadSeleccionada != "" && ciudadSeleccionada != sucursales[i].getElementsByTagName("ciudad")[0].childNodes[0].nodeValue){
            band = 0
        }
        if(band == 1){
            cdFiltrado.push(sucursales[i])
        }
    }
    miFuncion(cdFiltrado)
    abrirMenuFiltro()
}