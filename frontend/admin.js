const form = document.getElementById("formProducto");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const producto = {
        nombre: document.getElementById("nombre").value,
        precio: document.getElementById("precio").value,
        descripcion: document.getElementById("descripcion").value,
        imagen: document.getElementById("imagen").value
    };

    try {
        const res = await fetch("https://marketfash.onrender.com/productos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(producto)
        });

        const data = await res.json();
        alert("Producto guardado ✔");

        form.reset();
    } catch (error) {
        alert("Error al guardar producto");
    }
    if (!nombre || !precio || !descripcion || !imagen) {
    alert("Completa todos los campos");
    return;
}
});