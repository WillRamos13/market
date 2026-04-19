async function cargarProductos() {
    const res = await fetch("https://marketfash.onrender.com/productos");
    const productos = await res.json();

    const contenedor = document.getElementById("productos");
    contenedor.innerHTML = "";

    productos.forEach(p => {
        contenedor.innerHTML += `
            <article class="oferta1">
                <img class="fproducto" src="${p.imagen}" alt="${p.nombre}">
                <h3>${p.nombre}</h3>
                <p>${p.descripcion}</p>
                <strong>S/. ${p.precio}</strong>
            </article>
        `;
    });
}

cargarProductos();

const video = document.getElementById("videoIntro");
const intro = document.getElementById("intro");
const contenido = document.getElementById("contenido");

// Cuando termina el video
video.addEventListener("ended", () => {
    intro.style.display = "none";
    contenido.style.display = "block";
});