import http from "http"
import express from "express"

import gracefulShutdown from "./common/util/gracefulShutdown"

import userRouter from "./user/adapter/UserRoutes"
import tableRouter from "./table/router/TableRoutes"
import reservationRouter from "./reservation/adapter/http/ReservationRoutes"
import orderRouter from "./order/adapter/http/OrderRoutes"

export const app = express()
const port = process.env.PORT || 8080

app.set("port", port)
app.use(express.json())

const server = http.createServer(app)

app.use("/users", userRouter)
app.use("/tables", tableRouter)
app.use("/reservations", reservationRouter)
app.use("/orders", orderRouter)

console.log("starting server at http://localhost:" + port)
server.listen(port)

process.on("SIGINT", () => gracefulShutdown(server))
process.on("SIGTERM", () => gracefulShutdown(server))
