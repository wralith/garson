import { Router } from "express"

import { ReservationService } from "../../core/service/ReservationService"
import { ReservationInMemoryRepo } from "../../repo/ReservationInMemoryRepo"
import { ReservationController } from "./ReservationController"

import { tableService } from "../../../table/router/TableRoutes"
import { userService } from "../../../user/adapter/UserRoutes"

const reservationRepo = new ReservationInMemoryRepo()
const reservationService = new ReservationService(reservationRepo, tableService, userService)
const reservationController = new ReservationController(reservationService)

const reservationRouter = Router()

reservationRouter.post("/", reservationController.createReservation)
reservationRouter.get("/user/:userId", reservationController.getUsersReservations)
reservationRouter.get("/today", reservationController.getTodaysReservations)
reservationRouter.delete("/:id", reservationController.deleteReservation)

export default reservationRouter
