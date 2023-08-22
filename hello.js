const express = require("express")

const app = express()

const Message = "Hello World"
app.get("/", (_req, res) => {
    res.send(Message)
})

app.listen(3000, () => {
    console.log("listening on port 3000")
})
