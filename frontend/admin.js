const API = "https://marketfash.onrender.com/productos";

const form = document.getElementById("formProducto");
const contenedor = document.getElementById("listaProductos");


// =======================
// CARGAR PRODUCTOS (GET)
// =======================
async function cargarProductos() {
    try {
        const res = await fetch(API);
        const productos = await res.json();

        contenedor.innerHTML = "";

        productos.forEach(p => {
            contenedor.innerHTML += `
                <article class="card">
                    <img src="${p.imagen}" width="120">
                    <h3>${p.nombre}</h3>
                    <p>${p.descripcion}</p>
                    <strong>S/. ${p.precio}</strong>

                    <br><br>

                    <button onclick="eliminarProducto(${p.id})">🗑 Eliminar</button>
                    <button onclick="editarProducto(${p.id})">✏ Editar</button>
                </article>
            `;
        });

    } catch (error) {
        console.error("Error cargando productos:", error);
    }
}


// =======================
// CREAR PRODUCTO (POST)
// =======================
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const precio = document.getElementById("precio").value;
    const descripcion = document.getElementById("descripcion").value;
    const imagen = document.getElementById("imagen").value;

    if (!nombre || !precio || !descripcion || !imagen) {
        alert("Completa todos los campos");
        return;
    }

    const producto = { nombre, precio, descripcion, imagen };

    try {
        await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(producto)
        });

        alert("Producto guardado ✔");
        form.reset();

        cargarProductos(); // 🔥 refresca lista

    } catch (error) {
        console.error(error);
        alert("Error al guardar producto");
    }
});


// =======================
// ELIMINAR PRODUCTO (DELETE)
// =======================
async function eliminarProducto(id) {
    if (!confirm("¿Seguro que quieres eliminar este producto?")) return;

    try {
        await fetch(`${API}/${id}`, {
            method: "DELETE"
        });

        cargarProductos();

    } catch (error) {
        console.error(error);
    }
}


// =======================
// EDITAR PRODUCTO (PUT)
// =======================
async function editarProducto(id) {
    const nombre = prompt("Nuevo nombre:");
    const precio = prompt("Nuevo precio:");
    const descripcion = prompt("Nueva descripción:");
    const imagen = prompt("Nueva imagen:");

    if (!nombre || !precio || !descripcion || !imagen) {
        alert("Datos incompletos");
        return;
    }

    try {
        await fetch(`${API}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nombre, precio, descripcion, imagen })
        });

        cargarProductos();

    } catch (error) {
        console.error(error);
    }
}


// =======================
// INICIAR
// =======================
cargarProductos();