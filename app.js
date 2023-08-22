const express = require("express")

const route = express()
const Message = "Hello from node"

route.get("/", (_req, res) => {
    res.send(Message)
})

route.listen(3000, () => {
    console.log("listening on port 3000")
})
