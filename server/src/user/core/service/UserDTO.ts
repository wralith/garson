import { User } from "../domain/User"

export interface UserDTO {
  id: string
  firstName: string
  lastName: string
  email: string
}

export class UserMap {
  public static toDto(user: User): UserDTO {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    }
  }

  public static toDomain(dto: UserDTO): User {
    return User.create(
      {
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        roles: 0,
      },
      dto.id
    )
  }
}
