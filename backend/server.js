const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

app.get("/", (req, res) => {
    res.send("API funcionando");
});

app.get("/productos", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM productos");
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener productos" });
    }
});

app.post("/productos", async (req, res) => {
    const { nombre, precio, descripcion, imagen } = req.body;

    if (!nombre || !precio || !descripcion || !imagen) {
        return res.status(400).json({ error: "Faltan datos" });
    }

    try {
        const result = await pool.query(
            "INSERT INTO productos (nombre, precio, descripcion, imagen) VALUES ($1, $2, $3, $4) RETURNING *",
            [nombre, precio, descripcion, imagen]
        );

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear producto" });
    }
});

app.put("/productos/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre, precio, descripcion, imagen } = req.body;

    try {
        const result = await pool.query(
            "UPDATE productos SET nombre=$1, precio=$2, descripcion=$3, imagen=$4 WHERE id=$5 RETURNING *",
            [nombre, precio, descripcion, imagen, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar producto" });
    }
});

app.delete("/productos/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            "DELETE FROM productos WHERE id=$1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        res.json({ message: "Producto eliminado ✔" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar producto" });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Servidor en puerto " + PORT);
});