import { describe, test, expect } from "@jest/globals"
import { User, UserProps } from "./User"

describe("User entity class", () => {
  test("Fails if given data is invalid", () => {
    // trim
    let user = () =>
      User.create({ firstName: "  ts    ", lastName: "ts  ", email: "invalid", roles: 2 })
    expect(user).toThrow()
    // long first name invalid email
    user = () =>
      User.create({
        firstName: "it is a very long first name",
        lastName: "valid",
        email: "invalid",
        roles: 2,
      })
    expect(user).toThrow()
    // invalid role
    user = () =>
      User.create({ firstName: "valid", lastName: "valid", email: "test@mail.com", roles: 4 })
    expect(user).toThrow()
  })

  test("Successful case", () => {
    const props: UserProps = {
      firstName: "first",
      lastName: "last",
      email: "test@mail.com",
      roles: 0,
    }
    const d1 = User.create(props)
    expect(d1.email).toBe("test@mail.com")
    expect(d1.roles).toBe(0)
  })
})
