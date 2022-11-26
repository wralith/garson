import { jest } from "@jest/globals"
import { User } from "../core/domain/User"
import { IUserService } from "../core/port/IUserService"

export const MockUserService: IUserService = {
  createUser: jest.fn(async () => {
    return "12345"
  }),
  getUser: jest.fn(async () => {
    return User.create({ firstName: "mock", lastName: "mock", email: "mock@mail.com" })
  }),
  validateUser: jest.fn(async () => true),
}
