import express from "express"
import dotenv from "dotenv"
import connectDb from "./connectDb.js"
import { User } from "./models/Users.model.js"

dotenv.config({ path: "./.env" })
connectDb()

const app = express()
app.use(express.json())


app.post("/api/create", async (req, res) => {
  try {
    const { name, email, age } = req.body

    const user = await User.create({ name, email, age })
    res.json({ message: "User created successfully", user })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})


app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({})
    res.json(users)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.get("/api/getUser/:id", async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})


app.put("/api/updateUser/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { name, email, age } = req.body

    const user = await User.findByIdAndUpdate(
      id,
      { name, email, age },
      { new: true } 
    )

    res.json({ message: "User updated successfully", user })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
)
