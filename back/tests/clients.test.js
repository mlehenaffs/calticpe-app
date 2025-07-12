const request = require("supertest");
const app = require("../server"); // Tu app Express
const mongoose = require("mongoose");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Pruebas funcionales para /api/clients", () => {
  let clientId;

  it("crea un nuevo cliente", async () => {
    const res = await request(app)
      .post("/api/clients")
      .send({ name: "Cliente de prueba" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.name).toBe("Cliente de prueba");

    clientId = res.body._id;
  });

  it("obtiene todos los clientes", async () => {
    const res = await request(app).get("/api/clients");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("elimina el cliente creado", async () => {
    const res = await request(app).delete(`/api/clients/${clientId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Cliente eliminado");
  });
});
