jest.useFakeTimers();
import app from '../../../server/app'
const request = require('supertest');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')
const dbSetup = require('./globals')
const UserModel = require('../../../server/models/user');

beforeEach(dbSetup)

describe("GET /register", () => {
  const createUser = async () => {
    const password = await bcrypt.hash("test1234", 10)
    const user = {
      email: "test@example.com",
      name: "Hachi ko ",
      password
    }
    return await UserModel.query().insert(user)
  }
  it("responds 401 if not authenticated", async (done) => {
    await request(app).get('/api/surveys')
      .expect(401)
    done()
  })
  it("responds 200 if the token is valid", async (done) => {
    const user = await createUser();
    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY || "secretcode")
    await request(app).get('/api/surveys')
      .set("Authorization", token)
      .expect(200)
    done()
  })
})