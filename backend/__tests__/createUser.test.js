const request = require("supertest");

const app = require("../app");
const User = require("../db/models/User");

describe("/api/user/createUser", () => {
  afterAll(() => {
    User.deleteMany().exec();
  });

  it("creates valid user", async () => {
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
});
