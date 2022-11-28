import http from "http"

export default function gracefulShutdown(server: http.Server) {
  console.log("closing http server")
  server.close((err) => {
    if (err) {
      console.log(`error while closing http server: ${err}`)
      return
    }
    console.log("http server closed")
    process.exit(0)
  })
}
