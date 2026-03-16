const data = [
  { id: "p01", title: "Aurora", desc: "Luz suave y cielo polar", src: "https://picsum.photos/id/1018/1200/675" },
  { id: "p02", title: "Montaña", desc: "Rocas y niebla", src: "https://picsum.photos/id/1015/1200/675" },
  { id: "p03", title: "Ciudad", desc: "Atardecer urbano", src: "https://picsum.photos/id/1011/1200/675" },
  { id: "p04", title: "Bosque", desc: "Verde profundo", src: "https://picsum.photos/id/1020/1200/675" },
  { id: "p05", title: "Mar", desc: "Horizonte y calma", src: "https://picsum.photos/id/1016/1200/675" },
  { id: "p06", title: "Ruta", desc: "Camino en perspectiva", src: "https://picsum.photos/id/1005/1200/675" }
];

// Recuperar elementos del DOM
const thumbs = document.querySelector("#thumbs"); //miniaturas
const heroImg = document.querySelector("#heroImg");  // imagen principal
const heroTitle = document.querySelector("#heroTitle"); // título de la imagen
const heroDesc = document.querySelector("#heroDesc"); // descripción de la imagen
const counter = document.querySelector("#counter"); // contador de imágenes
const likeBtn = document.querySelector("#likeBtn"); // botón de "me gusta"


//trabajar con el estadi de la aplicacion
let currentIndex = 0;
let likes ={};
let autoplay = null; //objeto para almacenar los "me gusta" por imagen 

//renderizar las miniaturas
function renderThumbs () {
    thumbs.innerHTML = data.map((item, index) => {
        return `
        <article class="thumb ${index === currentIndex ? "active" : ""}" data-index="${index}">
        <span class="badge">${index + 1}</span>
        <img src="${item.src}" alt="${item.title}" />
      </article>
    `;
   }).join("");
}

function renderHero(index) {
    const item = data[index];

    //actualizar la imagen principal 
    heroImg.src = item.src;
    heroImg.alt = item.title;

    //actualizar el titulo y la descripcion 
    heroTitle.textContent = item.title;
    heroDesc.textContent = item.desc;

    //actualizar el contador 
    counter.textContent = `${index + 1} / ${data.length}`;

    //recorrer miniaturas para marcar la activa 
    document.querySelectorAll(".thumb").forEach((thumb, i) => {
        thumb.classList.toggle("active", i === index);
    });

    //revisar si la imagen actual tiene like 
    const isLiked = likes[item.id] === true;

    //cambiar el simbolo del boton 
    likeBtn.textContent = isLiked ? "❤️" : "🤍";

    //aplicar o quitar la clase visual
    likeBtn.classList.toggle("on", isLiked);


}
// navegación
function nextImage(){
    currentIndex = (currentIndex + 1) % data.length;
    renderHero(currentIndex);
}



function prevImage(){
    currentIndex = (currentIndex - 1 + data.length) % data.length;
    renderHero(currentIndex);
}


// autoplay
function togglePlay(){

    if(autoplay){
        clearInterval(autoplay);
        autoplay = null;
        playBtn.textContent = "►";
    }else{
        autoplay = setInterval(nextImage, 3000);
        playBtn.textContent = "⏸";
    }

}


// eventos DOM
document.addEventListener("DOMContentLoaded", () => {

    renderThumbs();
    renderHero(currentIndex);

    // click miniaturas
    thumbs.addEventListener("click", (e) => {

        const thumb = e.target.closest(".thumb");
        if(!thumb) return;

        currentIndex = Number(thumb.dataset.index);
        renderHero(currentIndex);

    });


    // botones navegación
    nextBtn.addEventListener("click", nextImage);
    prevBtn.addEventListener("click", prevImage);


    // autoplay
    playBtn.addEventListener("click", togglePlay);


    // botón like
    likeBtn.addEventListener("click", () => {

        const item = data[currentIndex];

        likes[item.id] = !likes[item.id];

        renderHero(currentIndex);

    });

});
