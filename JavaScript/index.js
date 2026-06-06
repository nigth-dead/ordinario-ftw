function Validar(){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        const xmlDoc = xhttp.responseXML
        const cd = xmlDoc.getElementsByTagName("usuario")
        miFuncion(cd)
    }
    xhttp.open("GET", "./../XML/Usuarios.xml")
    xhttp.send()
}

function miFuncion(cd){
    const usuarioInput = document.getElementById("usuario").value
    const contrasenaInput = document.getElementById("contrasena").value
    let loginCorrecto = false

    for(let i = 0; i < cd.length; i++){
        const usuario = cd[i].getElementsByTagName("nombre")[0].childNodes[0].nodeValue
        const contrasena = cd[i].getElementsByTagName("contrasena")[0].childNodes[0].nodeValue

        if(usuarioInput == usuario && contrasenaInput == contrasena){
            loginCorrecto = true
            break
        }
    }

    if(loginCorrecto){
        window.location.href = "./HTML/Inicio.html"
    } else {
        document.getElementById("error").innerText = "Usuario  o contraseña incorrecta"
    }
}