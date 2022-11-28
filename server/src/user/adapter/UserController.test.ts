import { afterAll, beforeAll, describe, expect, jest, test } from "@jest/globals"
import request from "supertest"
import http from "http"
import express from "express"

import { UserController } from "./UserController"
import { MockUserService } from "../../common/mocks/MockUserService"

describe("src/user/adapter/UserController", () => {
  const userController = new UserController(MockUserService)
  let server: http.Server
  const app = express()
  app.use(express.json())

  beforeAll(() => {
    app.use("/users", userController.register)
    server = http.createServer(app)
  })

  afterAll(() => {
    server.close()
  })

  describe("POST /users", () => {
    test("should return 200 with user id if success", async () => {
      const dummy = { firstName: "test", lastName: "test", email: "test@mail.com" }
      jest.spyOn(MockUserService, "createUser").mockImplementation(() => Promise.resolve("23123"))
      const response = await request(app).post("/users").send(dummy)
      expect(response.status).toBe(201)
    })

    test("should return 400 for invalid input", async () => {
      const dummy = { firstName: "test", lastName: "test", email: "mail.com" }
      const response = await request(app).post("/users").send(dummy)
      expect(response.status).toBe(400)
    })

    test("should return 500 if core layer fails", async () => {
      const dummy = { firstName: "test", lastName: "test", email: "test@mail.com" }
      jest.spyOn(MockUserService, "createUser").mockImplementation(() => Promise.reject())
      const response = await request(app).post("/users").send(dummy)
      expect(response.status).toBe(500)
    })
  })
})
