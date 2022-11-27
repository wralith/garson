import http from "http"
import express from "express"
import userRouter from "./user/adapter/UserRoutes"
import tableRouter from "./table/router/TableRoutes"

export const app = express()
const port = process.env.PORT || 8080

app.set("port", port)
app.use(express.json())

const server = http.createServer(app)

app.use("/users", userRouter)
app.use("/tables", tableRouter)

console.log("starting server at http://localhost:" + port)
server.listen(port)
