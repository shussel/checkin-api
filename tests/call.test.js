const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../server");

require("dotenv").config();

beforeEach(async () => {
    await mongoose.connect(process.env.MONGO_URI);
});
afterEach(async () => {
    await mongoose.connection.close();
});
afterAll(done => {
    app.close();
    done();
});

// create a new call, get created call, get call list, add checkin to created call, delete created call
let callID;
const checkin = {
    checkinTime: new Date().toJSON(),
    location: [37.5211589, -77.521894],
    checkinMessage: "OK",
}

describe("POST /api/Call", () => {
    it("should create a call", async () => {
        const res = await request(app).post("/api/Call").send({
            checkins: [
                checkin
            ],
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.checkins.length).toBe(1);
        callID = res.body._id;
    });
});

describe("GET /api/Call/:id", () => {
    it("should return a call", async () => {
        const res = await request(app).get(
            `/api/Call/${callID}`
        );
        expect(res.statusCode).toBe(200);
    });
});

describe("GET /api/Call", () => {
    it("should return call list", async () => {
        const res = await request(app).get("/api/Call");
        expect(res.statusCode).toBe(200);
    });
});

describe("PUT /api/Call/:id", () => {
    it("should add checkin to call", async () => {
        const res = await request(app)
            .patch(`/api/Call/${callID}`)
            .send(checkin);
        expect(res.statusCode).toBe(200);
        expect(res.body.modifiedCount).toBe(1);
    });
});

describe("DELETE /api/products/:id", () => {
    it("should delete call", async () => {
        const res = await request(app).delete(
            `/api/Call/${callID}`
        );
        expect(res.statusCode).toBe(200);
    });
});