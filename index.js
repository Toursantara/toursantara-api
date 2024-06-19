import Hapi from "@hapi/hapi"
import authRoutes from "./routes/authRoutes.js"
import placeRoutes from "./routes/placeRoutes.js"

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 8080,
        host: "0.0.0.0",
        routes: {
            cors: {
                origin: ["*"],
            },
        },
    })

    server.route(authRoutes)
    server.route(placeRoutes)

    server.route({
        method: "GET",
        path: "/",
        handler: (request, h) => {
            return "Hello, World!"
        },
    })

    await server.start()
    console.log("Server running on %s", server.info.uri)
}

process.on("unhandledRejection", (err) => {
    console.log(err)
    process.exit(1)
})

init()
