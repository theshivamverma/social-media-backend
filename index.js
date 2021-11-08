const express = require("express")
const cors = require("cors")
require("dotenv").config()

const { initializeDBConnection } = require("./db/db.config")

const { routeNotFound } = require("./middlewares/routeNotFound.middleware")
const { errorHandler } = require("./middlewares/errorHandler.middleware")

const authRouter = require("./routes/auth.route")
const userRouter = require("./routes/user.route")
const postRouter = require("./routes/post.route")

const app = express();
const PORT = process.env.PORT || 8000;

initializeDBConnection()

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/post", postRouter)


app.get("/", (req, res) => {
    res.send("Hello world")
})

app.use(errorHandler)
app.use(routeNotFound)

app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`)
})