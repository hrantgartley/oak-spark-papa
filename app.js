const express = require("express")
const route = express()
const bodyParser = require("body-parser")
const port = process.env.PORT || 3000
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

const { MongoClient, ServerApiVersion } = require("mongodb")
const uri =
    "mongodb+srv://granthartley:2VSvwD3Aqhpa3AwD@cluster0.sh7wwbq.mongodb.net/?retryWrites=true&w=majority"

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
})

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
}
run().catch(console.dir)
