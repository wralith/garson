import { jest } from "@jest/globals"
import { IUserService } from "../../user/core/port/IUserService"
import { UserDTO } from "../../user/core/service/UserDTO"

export const dummyUser: UserDTO = {
  id: "user-1",
  firstName: "test",
  lastName: "test",
  email: "test@test.com",
}

export const MockUserService: IUserService = {
  createUser: jest.fn(async () => {
    return dummyUser.id
  }),

  getUser: jest.fn(async () => {
    return dummyUser
  }),

  validateUser: jest.fn(async () => true),
}
