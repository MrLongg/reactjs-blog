const express = require("express")
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const authRoute = require("./routes/auth")
const userRoute = require("./routes/users")
const postRoute = require("./routes/posts")
const categoryRoute = require("./routes/categories")
const multer = require("multer")

dotenv.config()
app.use(express.json())

mongoose.connect("mongodb+srv://longtran:longtran123@cluster0.nexritu.mongodb.net/blog?retryWrites=true&w=majority")
    .then(console.log("Connected to MONGO!"))
    .catch((err) => console.log("err:" , err))

    const storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, "images")
        }, filename: (req, file, callback) => {
            callback(null, "hello.jpg")
        }
    })

    const upload = multer({storage: storage})
    app.post("/api/upload", upload.single("file"), (req, res) => {
        res.status(200).json("File has been uploaded")
    })

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/posts", postRoute)
app.use("/api/categories", categoryRoute)


app.listen("5000", () => {
    console.log("Backend is running");
})