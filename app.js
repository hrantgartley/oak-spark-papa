const express = require("express")
const route = express()
const bodyParser = require("body-parser")
require("dotenv").config()
// eslint-disable-next-line no-unused-vars
const { ObjectId } = require("mongodb")
const uri = process.env.MONGO_URI
const port = process.env.PORT || 3000
const portArray = [80, 443, undefined, NaN, null]

route.set("view engine", "ejs")
route.use(bodyParser.urlencoded({ extended: true }))

let myVariableServer = "soft coded server data"

route.get("/", async (_req, res) => {
    let result = await cxnDB()
    res.send("Here for a second: " + result[0].name)
})

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

const { MongoClient, ServerApiVersion } = require("mongodb")

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
})

// eslint disable no-unused-vars
async function cxnDB() {
    try {
        client.connect
        const collection = client.db("papa-database").collection("dev-profiles")
        // const collection = client.db("papa").collection("dev-profiles");
        const result = await collection.find().toArray()
        //const result = await collection.findOne();
        console.log("cxnDB result: ", result)
        return result
    } catch (e) {
        console.log(e)
    } finally {
        client.close
    }
}
/*
async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect()
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 })
        console.log(
            "Pinged your deployment. You successfully connected to MongoDB!"
        )
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close()
    }
} */
// run().catch(console.dir)
