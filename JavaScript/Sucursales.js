window.onload = function cargarTabla (){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        const xmlDoc = xhttp.responseXML
        const cd = xmlDoc.getElementsByTagName("sucursal")
        miFuncion(cd)
    }
    xhttp.open("GET", "../XML/Sucursales.xml")
    xhttp.send()
}

function miFuncion(cd) {
    let table="";
    let cont = 0;
    for (let i = 0; i < cd.length; i++) {
        if(cont == 0){
            table += "<tr>"
        }
        table += "<td><p>" + "<img class='img-tarjeta' src=''></p>" +
        "<p>Nombre: " + cd[i].getElementsByTagName("nombre")[0].childNodes[0].nodeValue + "</p><p>" +
        "Direccion: " + cd[i].getElementsByTagName("direccion")[0].childNodes[0].nodeValue + "</p><p>" +
        "Ciudad: " + cd[i].getElementsByTagName("ciudad")[0].childNodes[0].nodeValue + "</p><p>" +
        "Estado: " + cd[i].getElementsByTagName("estado")[0].childNodes[0].nodeValue + "</p><p>" +
        "Horario: " + cd[i].getElementsByTagName("horario")[0].childNodes[0].nodeValue + "</p>" +
        "</td>";
        cont ++;
        if (cont >= 4){
            table += "</tr>"
            cont = 0;
        }
    }
    table += "</tr>"
    document.getElementById("tabla").innerHTML = table;
    cargarImagenes("Car dealership");
}