const API_KEY = "aQCersNDP5REOrlKtAgY2rOK0CgpDSz4U3WFNtLQSbm0kkLRxq6DnIWU";

fetch("https://api.pexels.com/v1/search?query=car&per_page=50", {
    headers: {
        Authorization: API_KEY
    }
})
.then(response => response.json())
.then(data => {

    let indiceAleatorio = Math.floor(Math.random() * data.photos.length);

    document.getElementById("fotoAuto").src =
        data.photos[indiceAleatorio].src.large;

});