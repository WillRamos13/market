const API = "https://marketfash.onrender.com/productos";

// 📥 Cargar productos
function cargarProductos() {
    fetch(API)
    .then(res => res.json())
    .then(data => {
        const contenedor = document.getElementById("listaProductos");
        contenedor.innerHTML = "";

        data.forEach(p => {
            contenedor.innerHTML += `
                <article class="card">
                    <img src="${p.imagen || 'img/oferta1.png'}">
                    <h3>${p.nombre}</h3>
                    <p>${p.descripcion}</p>
                    <span>S/. ${p.precio}</span>
                </article>
            `;
        });
    });
}

// 📤 Enviar producto
document.getElementById("formProducto").addEventListener("submit", function(e){
    e.preventDefault();

    const producto = {
        nombre: document.getElementById("nombre").value,
        precio: document.getElementById("precio").value,
        descripcion: document.getElementById("descripcion").value,
        imagen: document.getElementById("imagen").value
    };

    fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(producto)
    })
    .then(res => res.json())
    .then(() => {
        alert("Producto guardado");
        cargarProductos();
        document.getElementById("formProducto").reset();
    });
});

// 🚀 cargar al iniciar
cargarProductos();