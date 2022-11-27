import { z } from "zod"

const createTableSchema = z.object({
  name: z.string(),
  seats: z.number().positive(),
})

export type CreateTableRequest = z.infer<typeof createTableSchema>
export const validateCreateTableRequest = (req: CreateTableRequest) => createTableSchema.parse(req)
