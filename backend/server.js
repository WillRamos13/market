const express = require('express');
const {pool, Connection} = require ("pg");
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const pool = new pool({
    Connectionstring: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

app.get("/", (req, res) => {
    res.send("funciona");
});

app.get("productos", async (req, res) => {
    try {
        const client = await pool.query("SELECT * FROM productos");
        res.json(client.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los productos" });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
}   );