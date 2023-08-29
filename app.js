const express = require("express")
const route = express()
const PORT = 3000
route.set("view engine", "ejs")

let myServer = "variable from server"
route.get("/meep", (_req, res) => {
    res.render("index", {
        myVariableClient: myServer,
    })
})

if (![80, 443, undefined, NaN].includes(PORT)) {
    route.listen(PORT, () => {
        console.log(`listening on port ${PORT}`)
    })
} else {
    console.error("Invalid Port")
}
