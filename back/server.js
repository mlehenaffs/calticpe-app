const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express(); // Aquí se inicializa la app

// Middlewares
app.use(cors());
app.use(express.json());

// Importar rutas
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const clientRoutes = require("./routes/clientRoutes");
const moeRoutes = require("./routes/moeRoutes");
const strategyRoutes = require("./routes/strategyRoutes");

app.use("/api/clients", clientRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/moes", moeRoutes);
app.use("/api/strategies", strategyRoutes);

// Conexión a MongoDB y servidor
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Conectado a MongoDB");
    app.listen(5000, () => {
      console.log("Servidor corriendo en puerto 5000");
    });
  })
  .catch((error) => console.error("Error de conexión:", error));
