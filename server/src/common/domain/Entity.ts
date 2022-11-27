import { nanoid } from "nanoid"

export abstract class Entity<T> {
  public id: string

  constructor(id?: string) {
    this.id = id ? id : nanoid(10)
  }

  public equals(o: Entity<T>): boolean {
    return this.id === o.id
  }
}

export const isEntity = (v: unknown): v is Entity<unknown> => {
  return v instanceof Entity
}
