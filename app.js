require("dotenv").config()
const express = require("express")
const route = express()
const bodyParser = require("body-parser")
// eslint-disable-next-line no-unused-vars
const { ObjectId } = require("mongodb")
const uri = process.env.MONGO_URI

const { MongoClient, ServerApiVersion } = require("mongodb")
const port = process.env.PORT || 3000
const portArray = [80, 443, undefined, NaN, null]

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
})

route.set("view engine", "ejs")
route.use(bodyParser.urlencoded({ extended: true }))

let myVariableServer = "soft coded server data"

route.get("/", async (_req, res) => {
    let result = await cxnDB()
    res.render("index", { icecreamData: result[0].name })
})

route.post("/update", async (req, res) => {
    client.connect
    const collection = client
        .db("quebec-database")
        .collection("icecream-flavors")
    let flavorMongoDB = await collection.findOneAndUpdate(
        {
            _id: new ObjectId(req.body._id),
        },
        {
            $set: {
                flavor: req.body.flavor,
            },
        }
    )
    console.log(flavorMongoDB)
    res.redirect("/")
    res.send("Here for a second: " + flavorMongoDB[0].flavor)
})

route.get("/meep", (_req, res) => {
    res.render("index", {
        myVariableClient: myVariableServer,
    })
})

route.post("/postClientData", (req, res) => {
    console.log("body: ", req.body)
    console.log("user Name: ", req.body.profileData)

    res.render("index", {
        profileData: req.body.userName,
    })
})

route.delete("/deleteIcecream", async (req, res) => {
    const collection = client
        .db("quebec-database")
        .collection("icecream-flavors")
    let result = await collection.deleteOne({
        _id: new ObjectId(req.body._id),
    })
    res.send(`Deleted ${result.deletedCount} documents`)
})

if (!portArray.includes(port)) {
    route.listen(port, () => console.log(`Server is listening on port ${port}`))
} else {
    console.log("Invalid Port")
}
async function cxnDB() {
    try {
        client.connect
        const collection = client.db("papa-database").collection("dev-profiles")
        const result = await collection.find().toArray()
        console.log("cxnDB result: ", result)
        return result
    } catch (e) {
        console.log(e)
    } finally {
        client.close
    }
}
