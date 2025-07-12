const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");
const Client = require("../models/Client");
const User = require("../models/User");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Pruebas funcionales para /api/projects", () => {
  let clientId;
  let userId;
  let projectId;

  beforeAll(async () => {
    // Crear un cliente de prueba
    const clientRes = await request(app).post("/api/clients").send({ name: "Cliente Proyecto" });
    clientId = clientRes.body._id;

    // Crear un usuario de prueba
    const userRes = await request(app)
      .post("/api/users")
      .send({ name: "Usuario Proyecto", email: "proyecto@test.com", role: "consultant", password: "123456" });
    userId = userRes.body._id;
  });

  it("crea un nuevo proyecto", async () => {
    const res = await request(app)
      .post("/api/projects")
      .send({
        name: "Proyecto de prueba",
        client: clientId,
        accessUsers: [userId],
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.name).toBe("Proyecto de prueba");
    projectId = res.body._id;
  });

  it("obtiene todos los proyectos", async () => {
    const res = await request(app).get("/api/projects");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("elimina el proyecto creado", async () => {
    const res = await request(app).delete(`/api/projects/${projectId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Proyecto eliminado");
  });
});
