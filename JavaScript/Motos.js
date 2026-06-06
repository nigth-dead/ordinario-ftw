window.onload = function cargarImagenes(){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        const xmlDoc = xhttp.responseXML
        const cd = xmlDoc.getElementsByTagName("moto")
        miFuncion(cd)
    }
    xhttp.open("GET", "../XML/Motos.xml")
    xhttp.send()
}

function miFuncion(cd){
    let table="";
    let cont = 0;
    for (let i = 0; i < cd.length; i++) {
        if(cont == 0){
            table += "<tr>"
        }
        table += "<td><p>" + "<img class='img-tarjeta' src='../imgs/moto.png'></p>" +
        "<p>Marca: " + cd[i].getElementsByTagName("marca")[0].childNodes[0].nodeValue + "</p><p>" +
        "Modelo: " + cd[i].getElementsByTagName("modelo")[0].childNodes[0].nodeValue + "</p><p>" +
        "Año: " + cd[i].getElementsByTagName("anio")[0].childNodes[0].nodeValue + "</p><p>" +
        "Color: " + cd[i].getElementsByTagName("color")[0].childNodes[0].nodeValue + "</p><p>" +
        "Precio: " + cd[i].getElementsByTagName("precio")[0].childNodes[0].nodeValue + "</p><p>" +
        "Cilindrada: " + cd[i].getElementsByTagName("cilindrada")[0].childNodes[0].nodeValue + "</p>" +
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