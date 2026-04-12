import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import routes from "./routes.js"
dotenv.config()

const app = express()
app.use(cors())

app.use(express.json())
app.use("/api", routes)

const PORT = 5000
const start = async () => {
    try{
        await app.listen(PORT, () => {
            console.log(`server running on port ${PORT}`)
        })
    }catch(e){
        console.log('error while trying to listen')
    }
}

start()