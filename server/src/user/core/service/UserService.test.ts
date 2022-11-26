import { describe, test, expect } from "@jest/globals"
import { User } from "../domain/User"
import { UserInMemoryRepo } from "../../repo/UserInMemoryRepo"
import { UserService } from "./UserService"

describe("src/user/service/UserService", () => {
  const repo = new UserInMemoryRepo()
  const service = new UserService(repo)

  const dummy = User.create({
    firstName: "test",
    lastName: "test",
    email: "test@mail.com",
    roles: 0,
  })

  test("create and validate user", async () => {
    const id = await service.createUser(dummy.firstName, dummy.lastName, dummy.email)

    const got = await service.getUser(id)
    expect(got.email).toEqual(dummy.email)

    let got2 = await service.validateUser(dummy.email)
    expect(got2).toEqual(true)

    got2 = await service.validateUser("unregistered@mail.com")
    expect(got2).toEqual(false)
  })
})
