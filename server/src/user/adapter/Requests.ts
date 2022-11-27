import { z } from "zod"

const registerSchema = z.object({
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
})

export type RegisterRequest = z.infer<typeof registerSchema>

export const validateRegisterRequest = (req: RegisterRequest) => registerSchema.parse(req)
