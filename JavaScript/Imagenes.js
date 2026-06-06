
const ACCESS_KEY = "Bg6tjGg5XNMn907DNK4l6U3NqxHYtCElLDSRKNSHvnk";

function cargarImagenes(tema){
    fetch(`https://api.unsplash.com/search/photos?query=${tema}&per_page=25&orientation=landscape&client_id=${ACCESS_KEY}`)
        .then(respuesta => respuesta.json())
        .then(datos => {
            const imagenesTarjetas = document.querySelectorAll(".img-tarjeta");

            imagenesTarjetas.forEach((img, i) => {
                if(datos.results[i]){
                    img.src = datos.results[i].urls.small;
                    img.alt = datos.results[i].alt_description || tema;
                }
            });
        })
        .catch(error => {
            console.log("Error al cargar imágenes:", error);
        });
}