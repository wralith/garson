import { z } from "zod"
import { Entity } from "../../common/domain/Entity"

export enum UserRoleTypes {
  Client,
  Staff,
  Admin,
}

const userSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(3, "first name should be longer than 3 characters")
    .max(14, "first name should be shorter than 14 characters"),
  lastName: z
    .string()
    .trim()
    .min(3, "last name name should be longer than 3 characters")
    .max(14, "last name name should be shorter than 14 characters"),
  email: z.string().email("invalid email address"),
  roles: z.nativeEnum(UserRoleTypes),
})

export type UserProps = z.infer<typeof userSchema>

export class User extends Entity<UserProps> {
  firstName: string
  lastName: string
  email: string
  roles: UserRoleTypes

  private constructor(props: UserProps, id?: string) {
    super(id)
    this.firstName = props.firstName
    this.lastName = props.lastName
    this.email = props.email
    this.roles = UserRoleTypes.Client
  }

  public static create(props: UserProps) {
    const valid = userSchema.safeParse(props)
    if (!valid.success) {
      throw Error(valid.error.issues[0].message)
    }
    return new User(props)
  }
}
