const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// CONEXIÓN POSTGRESQL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// TEST
app.get("/", (req, res) => {
    res.send("API funcionando");
});

// OBTENER PRODUCTOS
app.get("/productos", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM productos");
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener productos" });
    }
});

// CREAR PRODUCTO (🔥 NUEVO)
app.post("/productos", async (req, res) => {
    const { nombre, precio, descripcion, imagen } = req.body;

    try {
        const result = await pool.query(
            "INSERT INTO productos (nombre, precio, descripcion, imagen) VALUES ($1, $2, $3, $4) RETURNING *",
            [nombre, precio, descripcion, imagen]
        );

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Error al crear producto" });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Servidor en puerto " + PORT);
});