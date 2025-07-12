const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express(); // Inicializa la app

// Monitoreo
const statusMonitor = require("express-status-monitor");
app.use(statusMonitor());
app.get('/status', statusMonitor().pageRoute);

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
const fodaRoutes = require("./routes/fodaRoutes");
const cadenaValorRoutes = require("./routes/cadenaValorRoutes");

app.use("/api/clients", clientRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/moes", moeRoutes);
app.use("/api/strategies", strategyRoutes);
app.use("/api/foda", fodaRoutes);
app.use("/api/cadena-valor", cadenaValorRoutes);

// Conexión a MongoDB y servidor
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Conectado a MongoDB");

    if (process.env.NODE_ENV !== "test") {
      app.listen(PORT, () => {
        console.log(`Servidor corriendo en puerto ${PORT}`);
      });
    }
  })
  .catch((error) => console.error("Error de conexión:", error));

// Exportar app para pruebas con Supertest
module.exports = app;
