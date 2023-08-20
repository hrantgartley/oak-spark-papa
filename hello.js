const express = require("express")

const app = express()

const Message = "Hello from node"
app.get("/", (_req, res) => {
    res.send(Message)
})

app.listen(3000)
