const request = require("supertest");

const app = require("../app");
const mongoose = require("../db/mongoose");
const User = require("../db/models/User");

describe("Test user lifecycle APIs", () => {
  let jwt = "";

  afterAll(async () => {
    await User.deleteMany().exec();
    app.close();
    mongoose.disconnect();
  });

  it("POST /api/user/createUser", async () => {
    const response = await request(app)
      .post("/api/user/createUser")
      .set("Accept", "application/json")
      .send({
        username: "Raphael",
        email: "raphael@test.ch",
        password: "superSecure9$",
        location: {
          type: "Point",
          coordinates: [8.174678, 47.1354987],
        },
      });
    expect(response.statusCode).toBe(201);
  });

  it("POST /api/auth/login", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .set("Accept", "application/json")
      .send({
        email: "raphael@test.ch",
        password: "superSecure9$",
      });
    expect(response.statusCode).toBe(200);
    jwt = response.body.token;
  });

  it("GET /api/user/me", async () => {
    const response = await request(app)
      .get("/api/user/me")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${jwt}`)
      .send();
    expect(response.statusCode).toBe(200);
    expect(response.body.username).toBe("Raphael");
  });

  it("PATCH /api/user/me", async () => {
    const response = await request(app)
      .patch("/api/user/me")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${jwt}`)
      .send({
        username: "Raphi",
      });
    expect(response.statusCode).toBe(200);

    // Test if username changed
    const r = await request(app)
      .get("/api/user/me")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${jwt}`)
      .send();
    expect(r.statusCode).toBe(200);
    expect(r.body.username).toBe("Raphi");
  });

  it("DELETE /api/user/me", async () => {
    const response = await request(app)
      .delete("/api/user/me")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${jwt}`)
      .send();
    expect(response.statusCode).toBe(200);

    // Test if user still exists
    const r = await request(app)
      .get("/api/user/me")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${jwt}`)
      .send();
    expect(r.statusCode).toBe(401);
  });
});
