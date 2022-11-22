import { describe, test, expect } from "@jest/globals"
import { Entity, isEntity } from "./Entity"

type DummyProps = { name: string }
class DummyEntity extends Entity<DummyProps> {
  name: string
  constructor(props: DummyProps, id?: string) {
    super(id)
    this.name = props.name
  }
}

describe("Entity class", () => {
  let e1: DummyEntity

  test("Creates entities, checks isEntity", () => {
    e1 = new DummyEntity({ name: "test" })
    expect(isEntity(e1)).toBe(true)
    expect(isEntity("not an entity")).toBe(false)
  })

  test("Compares entities", () => {
    const e2 = e1
    expect(e1.equals(e2)).toBe(true)

    const e3 = new DummyEntity({ name: "test" })
    expect(e1.equals(e3)).toBe(false)
  })

  test("Creates entity with given id", () => {
    const eWithId1 = new DummyEntity({ name: "test" }, "testId")
    const eWithId2 = new DummyEntity({ name: "test" }, "testId")
    expect(eWithId1.equals(eWithId2)).toBe(true)
    expect(!eWithId1.equals(e1)).toBe(true)
  })
})
