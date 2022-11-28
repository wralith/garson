import { z } from "zod"

const reservationSchema = z.object({
  reservationHour: z.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date) return new Date(arg)
  }, z.date()),
  guestCount: z.number().positive(),
  userId: z.string().min(9), // Global config?
  tableId: z.string().min(9),
})

export type CreateReservationRequest = z.infer<typeof reservationSchema>
export const validateCreateReservationRequest = (req: CreateReservationRequest) =>
  reservationSchema.parse(req)
