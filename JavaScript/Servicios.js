window.onload = function cargarTabla (){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        const xmlDoc = xhttp.responseXML
        const cd = xmlDoc.getElementsByTagName("servicio")
        miFuncion(cd)
    }
    xhttp.open("GET", "../XML/Servicios.xml")
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
        "<p><b>" + cd[i].getElementsByTagName("nombre")[0].childNodes[0].nodeValue + "</b></p><p>" +
        "Descripcion: " + cd[i].getElementsByTagName("descripcion")[0].childNodes[0].nodeValue + "</p><p>" +
        "Costo: " + cd[i].getElementsByTagName("costo")[0].childNodes[0].nodeValue + "</p><p>" +
        "Duracion: " + cd[i].getElementsByTagName("duracion")[0].childNodes[0].nodeValue + "</p>" +
        "</td>";
        cont ++;
        if (cont >= 4){
            table += "</tr>"
            cont = 0;
        }
    }
    table += "</tr>"
    document.getElementById("tabla").innerHTML = table;
    cargarImagenes("car maintenance");
}