import { z } from "zod"

const orderSchema = z.object({
  items: z.array(z.string()),
  userId: z.string().min(9),
  tableId: z.string().min(9),
})

export type CreateOrderRequest = z.infer<typeof orderSchema>
export const validateCreateOrderRequest = (req: CreateOrderRequest) => orderSchema.parse(req)
