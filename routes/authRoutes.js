import { register, login } from "../controllers/authController.js"

const authRoutes = [
    {
        method: "POST",
        path: "/register",
        handler: register,
    },
    {
        method: "POST",
        path: "/login",
        handler: login,
    },
]

export default authRoutes
