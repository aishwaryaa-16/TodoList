import express from "express"
import authRoutes from "./routes/auth.route.js"
import taskRoutes from "./routes/tasks.route.js"
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()
dotenv.config()

const port = process.env.PORT

app.use(express.json())
app.use(cookieParser())

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true
    })
)
app.use("/api/auth", authRoutes)
app.use("/api/tasks", taskRoutes )

app.listen(5000,()=>{
    console.log("server is running on port 5000")
    connectDB()
})

