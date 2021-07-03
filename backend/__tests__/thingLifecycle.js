const request = require("supertest");

const app = require("../app");
const mongoose = require("../db/mongoose");
const User = require("../db/models/User");
const Thing = require("../db/models/Thing");

describe("Test user lifecycle APIs", () => {
  let jwt = "";
  let thingId = "";

  beforeAll(async () => {
    await request(app)
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

    const response = await request(app)
      .post("/api/auth/login")
      .set("Accept", "application/json")
      .send({
        email: "raphael@test.ch",
        password: "superSecure9$",
      });
    jwt = response.body.token;
  });

  afterAll(async () => {
    await Thing.deleteMany().exec();
    await User.deleteMany().exec();
    app.close();
    mongoose.disconnect();
  });

  it("POST /api/thing/createThing", async () => {
    const response = await request(app)
      .post("/api/thing/createThing")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${jwt}`)
      .send({
        name: "iMac",
        description: "Very fancy device",
        location: {
          type: "Point",
          coordinates: [8.17463, 47.13548],
        },
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("_id");
    thingId = response.body._id;
  });

  it("GET /api/thing/getThingsByText", async () => {
    const response = await request(app)
      .get("/api/thing/getThingsByText?text=Very%20fancy")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${jwt}`)
      .send();
    expect(response.statusCode).toBe(200);
    expect(response.body[0].name).toBe("iMac");
  });

  it("GET /api/thing/getMyThings", async () => {
    const response = await request(app)
      .get("/api/thing/getMyThings")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${jwt}`)
      .send();
    expect(response.statusCode).toBe(200);
  });

  it("GET api/thing/getThingsNearLocation", async () => {
    const response = await request(app)
      .get(
        "/api/thing/getThingsNearLocation?lat=47.1354987&long=8.174678&radius=500"
      )
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${jwt}`)
      .send();
    expect(response.statusCode).toBe(200);
    expect(response.body[0]).toHaveProperty("name");
  });

  it("PATCH /api/thing/updateThing", async () => {
    const response = await request(app)
      .patch("/api/thing/updateThing")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${jwt}`)
      .send({
        thingId,
        name: "iPad",
      });
    expect(response.statusCode).toBe(200);

    // Test if name was updated
    const r = await request(app)
      .get("/api/thing/getThingsByText?text=Very%20fancy")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${jwt}`)
      .send();
    expect(r.statusCode).toBe(200);
    expect(r.body[0].name).toBe("iPad");
  });

  it("DELETE /api/thing/deleteThing", async () => {
    const response = await request(app)
      .delete(`/api/thing/deleteThing?thingId=${thingId}`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${jwt}`)
      .send();
    expect(response.statusCode).toBe(200);

    // Test if thing was deleted
    const r = await request(app)
      .get("/api/thing/getThingsByText?text=Very%20fancy")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${jwt}`)
      .send();
    expect(r.statusCode).toBe(200);
    expect(r.body.error).toBe("No things found");
  });
});
