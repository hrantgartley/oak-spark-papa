const express = require("express")
const route = express()
const bodyParser = require("body-parser")
const port = 3000
const portArray = [80, 443, undefined, NaN, null]

route.set("view engine", "ejs")
route.use(bodyParser.urlencoded({ extended: true }))

let myVariableServer = "soft coded server data"

route.get("/meep", (_req, res) => {
    res.render("index", {
        myVariableClient: myVariableServer,
    })
})

route.post("/postClientData", (req, res) => {
    console.log("body: ", req.body)
    console.log("user Name: ", req.body.userName)

    res.render("index", {
        myVariableClient: req.body.userName,
    })
})

route.get("/", (_req, res) => {
    res.send("<h1>Hello World From Express & a PaaS/Render</h1>")
})

route.get("/whatever", (_req, res) => {
    res.sendFile(__dirname + "/index.html")
})

if (!portArray.includes(port)) {
    route.listen(port, () => console.log(`Server is listening on port ${port}`))
} else {
    console.log("Invalid Port")
}
