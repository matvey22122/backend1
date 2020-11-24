import express from "express"
import config from "config"
import mongoose from "mongoose"
import router from "./routes";


const app = express()

app.use(express.json())
app.use('', router)

const PORT = config.get("PORT") || 5000

const start = async () => {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    app.listen(PORT, () => console.log("Start server"))
  } catch (e) {
    console.log(e.message)
    process.exit(1)
  }
}

start()
