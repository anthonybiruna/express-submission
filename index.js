
const express = require("express")
const app = express()
const { nanoid } = require("nanoid")


const PORT = 2000

app.use(express.json())

const users = [
    {
        username: "seto",
        occupation:  "developer",
        gender: "male",
        id: 1
    },
    {
        username: "bill",
        occupation:  "ui/ux",
        gender: "female",
        id: 2
    },
    {
        username: "yes",
        occupation:  "ui/ux",
        gender: "female",
        id: 3
    }
]

app.get("/users", (req, res) => {

    if(users.length) {
        res.status(200).json({
            message: "users fetched succesfuuly",
            result: users
        })
    } else {
        res.status(400).send("no users found")
    }
})

app.get("/users/:userId", (req, res) => {
    const userId = req.params.userId

    const findIndex = users.findIndex((val) => {
        return val.id == userId
    })

    if (findIndex == -1) {
        res.status(400).json({
          message: `User with ID ${userId}, not found`
        })
        return
    }

    res.status(200).json({
        message: "users fetched succesfully",
        result: users[findIndex]
    })
    
})

app.post("/users", (req, res) => {
    const data = req.body

    if(!data.username) {
        res.status(400).json({
            message: "user data is required"
        })
        return
    }
    
    if(!data.occupation) {
        res.status(400).json({
            message: "user data is required"
        })
        return
    }

    if(!data.gender) {
        res.status(400).json({
            message: "user data is required"
        })
        return
    }

    data.id = nanoid()

    users.push(data)

    res.status(201).json({
        message:"added user",
        result: data
    })
})

app.delete("/users/:userId", (req, res) => {
    const userId = req.params.userId

    const findIndex = users.findIndex((val) => {
        return val.id == userId
    })

    if(findIndex == -1) {
        res.status(400).json({
            message: `user ${userId} not found` 
        })
        return
    }

    users.splice(findIndex, 1)

    res.status(200).json({
        message: "user deleted"
    })
})

app.patch("/users/:id", (req, res) => {
    const data = req.body
    const userId = req.params.id

    const findIndex = users.findIndex((val) => {
        return val.id == userId
    })

    if (findIndex == -1){
        res.status(400).send(`Employee with ID ${userId} not Found!`)
        return
    }

    users[findIndex] = {
        ...users[findIndex],
        ...data
    }

})



app.listen(PORT, () => {
    console.log("server is running", PORT);
})