import GenerateCuid from "cuid"

export abstract class Entity<T> {
  public id: string

  constructor(id?: string) {
    this.id = id ? id : GenerateCuid()
  }

  public equals(o: Entity<T>): boolean {
    return this.id === o.id
  }
}

export const isEntity = (v: unknown): v is Entity<unknown> => {
  return v instanceof Entity
}
