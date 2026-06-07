let motos = []

window.onload = function cargarVista(){
    cargarTabla()
}

function cargarTabla (){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        const xmlDoc = xhttp.responseXML
        const cd = xmlDoc.getElementsByTagName("moto")
        motos = cd
        miFuncion(cd, "inicio")
    }
    xhttp.open("GET", "../XML/Motos.xml")
    xhttp.send()
}

function miFuncion(cd, origen){
    let table = "";
    let cont = 0;
    const marcas = new Set()
    const anios = new Set()
    const colores = new Set()
    const cilindradas = new Set()
    for (let i = 0; i < cd.length; i++) {
        if(cont == 0){
            table += "<tr>"
        }
        if(origen == "inicio"){
            marcas.add(cd[i].getElementsByTagName("marca")[0].childNodes[0].nodeValue)
            anios.add(cd[i].getElementsByTagName("anio")[0].childNodes[0].nodeValue)
            colores.add(cd[i].getElementsByTagName("color")[0].childNodes[0].nodeValue)
            cilindradas.add(cd[i].getElementsByTagName("cilindrada")[0].childNodes[0].nodeValue)
        }
        table += "<td><p>" + "<img class='img-tarjeta' src='' alt='Imagen de moto'></p>" +
        "<p>Marca: " + cd[i].getElementsByTagName("marca")[0].childNodes[0].nodeValue + "</p><p>" +
        "Modelo: " + cd[i].getElementsByTagName("modelo")[0].childNodes[0].nodeValue + "</p><p>" +
        "Año: " + cd[i].getElementsByTagName("anio")[0].childNodes[0].nodeValue + "</p><p>" +
        "Color: " + cd[i].getElementsByTagName("color")[0].childNodes[0].nodeValue + "</p><p>" +
        "Precio: " + cd[i].getElementsByTagName("precio")[0].childNodes[0].nodeValue + "</p><p>" +
        "Cilindrada: " + cd[i].getElementsByTagName("cilindrada")[0].childNodes[0].nodeValue + "</p>" +
        "</td>";
        cont++;
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
    cargarImagenes("Motorcycle");
    if(origen == "inicio"){
        cargarSelectMarcas(marcas)
        cargarSelectAnios(anios)
        cargarSelectColores(colores)
        cargarSelectCilindradas(cilindradas)
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

function cargarSelectCilindradas(cilindradas){
    const selectCilindradas = document.getElementById("cilindrada")
    selectCilindradas.innerHTML = "<option value=''>Seleccione una cilindrada</option>"
    const cilindradasOrdenada = Array.from(cilindradas).sort((a, b) => {
        return parseInt(b) - parseInt(a)
    });
    cilindradasOrdenada.forEach(c => {
        selectCilindradas.innerHTML += "<option value='" + c + "'>" + c + "</option>"
    });
}

function cargarTablaFiltrada(){
    const marcaSeleccionada = document.getElementById("marca").value;
    const anioSeleccionado = document.getElementById("anio").value;
    const colorSeleccionado = document.getElementById("color").value;
    const cilindradaSeleccionada = document.getElementById("cilindrada").value;
    const precioMinimo = document.getElementById("precio-minimo").value;
    const precioMaximo = document.getElementById("precio-maximo").value;
    let cdFiltrado = []
    for(let i = 0; i < motos.length; i++){
        let band = 1
        if(marcaSeleccionada != "" && marcaSeleccionada != motos[i].getElementsByTagName("marca")[0].childNodes[0].nodeValue){
            band = 0
        }
        if(anioSeleccionado != "" && anioSeleccionado != motos[i].getElementsByTagName("anio")[0].childNodes[0].nodeValue){
            band = 0
        }
        if(colorSeleccionado != "" && colorSeleccionado != motos[i].getElementsByTagName("color")[0].childNodes[0].nodeValue){
            band = 0
        }
        if(cilindradaSeleccionada != "" && cilindradaSeleccionada != motos[i].getElementsByTagName("cilindrada")[0].childNodes[0].nodeValue){
            band = 0
        }
        if(precioMinimo != "" && precioMinimo > Number(motos[i].getElementsByTagName("precio")[0].childNodes[0].nodeValue)){
            band = 0
        }
        if(precioMaximo != "" && precioMaximo < Number(motos[i].getElementsByTagName("precio")[0].childNodes[0].nodeValue)){
            band = 0
        }
        if(band == 1){
            cdFiltrado.push(motos[i])
        }
    }
    miFuncion(cdFiltrado)
    abrirMenuFiltro()
}