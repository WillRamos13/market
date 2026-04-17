const form = document.getElementById("formProducto");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const precio = document.getElementById("precio").value;
    const descripcion = document.getElementById("descripcion").value;
    const imagen = document.getElementById("imagen").value;

    // VALIDACIÓN CORRECTA
    if (!nombre || !precio || !descripcion || !imagen) {
        alert("Completa todos los campos");
        return;
    }

    const producto = {
        nombre,
        precio,
        descripcion,
        imagen
    };

    try {
        const res = await fetch("https://marketfash.onrender.com/productos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(producto)
        });

        await res.json();

        alert("Producto guardado ✔");
        form.reset();

    } catch (error) {
        console.error(error);
        alert("Error al guardar producto");
    }
});