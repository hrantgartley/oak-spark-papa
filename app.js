const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const port = process.env.PORT || 3000
const portArray = [80, 443, undefined, NaN, null]
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({ extended: true }))

4
let myVariableServer = "soft coded server data"

app.get("/meep", function (_req, res) {
    res.render("index", {
        myVariableClient: myVariableServer,
    })
})

app.post("/postClientData", function (req, res) {
    console.log("body: ", req.body)
    console.log("user Name: ", req.body.userName)

    res.render("index", {
        myVariableClient: req.body.userName,
    })
})

app.get("/", function (_req, res) {
    res.send("<h1>Hello World From Express & a PaaS/Render</h1>")
})

app.get("/whatever", function (_req, res) {
    res.sendFile(__dirname + "/index.html")
})

if (!portArray.includes(port)) {
    app.listen(port, () => console.log(`Server is running...on port ${port}`))
} else {
    console.log("Invalid Port")
}
