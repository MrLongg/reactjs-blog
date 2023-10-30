const express = require("express")
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const authRoute = require("./routes/auth")

dotenv.config()
app.use(express.json())

mongoose.connect("mongodb+srv://longtran:longtran123@cluster0.nexritu.mongodb.net/blog?retryWrites=true&w=majority")
.then(console.log("Connected to MONGO!"))
.catch((err) => console.log("err:" , err))

app.use("/api/auth", authRoute)

app.listen("5000", () => {
    console.log("Backend is running");
})