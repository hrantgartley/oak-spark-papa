const express = require("express")

const route = express()
const Message = "<h2>Hello from Nodejs</h2>"
const PORT = 3000

route.get("/", (_req, res) => {
    res.send(Message)
})

if (![80, 443, undefined, NaN].includes(PORT)) {
    route.listen(PORT, () => {
        console.log(`listening on port ${PORT}`)
    })
} else {
    console.error("Invalid Port")
}
