window.onload = function cargarTabla (){
    const xhttp = new XMLHttpRequest()
    xhttp.onload = function(){
        const xmlDoc = xhttp.responseXML
        const cd = xmlDoc.getElementsByTagName("camion")
        miFuncion(cd)
    }
    xhttp.open("GET", "../XML/Camiones.xml")
    xhttp.send()
}

function miFuncion(cd){
    let table="";
    let cont = 0;
    for (let i = 0; i < cd.length; i++) {
        if(cont == 0){
            table += "<tr>"
        }
        table += "<td><p>" + "<img class='img-tarjeta' src='../imgs/camion.png'></p>" +
        "<p>Marca: " + cd[i].getElementsByTagName("marca")[0].childNodes[0].nodeValue + "</p><p>" +
        "Modelo: " + cd[i].getElementsByTagName("modelo")[0].childNodes[0].nodeValue + "</p><p>" +
        "Año: " + cd[i].getElementsByTagName("anio")[0].childNodes[0].nodeValue + "</p><p>" +
        "Color: " + cd[i].getElementsByTagName("color")[0].childNodes[0].nodeValue + "</p><p>" +
        "Precio: " + cd[i].getElementsByTagName("precio")[0].childNodes[0].nodeValue + "</p><p>" +
        "Tonelaje: " + cd[i].getElementsByTagName("tonelaje")[0].childNodes[0].nodeValue + "</p><p>" +
        "Numero de ruedas: " + cd[i].getElementsByTagName("noRuedas")[0].childNodes[0].nodeValue + "</p><p>" +
        "Tipo de contenedor: " + cd[i].getElementsByTagName("contenedor")[0].childNodes[0].nodeValue + "</p>" +
        "</td>";
        cont ++;
        if (cont >= 4){
            table += "</tr>"
            cont = 0;
        }
    }
    table += "</tr>"
    
    document.getElementById("tabla").innerHTML = table;
}