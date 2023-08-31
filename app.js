const express = require("express")
const route = express()
const PORT = 3000
let myServer = "variable from server"

route.set("view engine", "ejs")

route.get("/meep", (_req, res) => {
    res.render("index", {
        myVariableClient: myServer,
    })
})
const portArray = [80, 443, undefined, NaN]
if (!portArray.includes(PORT)) {
    route.listen(PORT, () => {
        console.log(`listening on port ${PORT}`)
    })
} else {
    console.error("Invalid Port")
}
