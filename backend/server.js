const express = require("express")
const bodyparser = require("body-parser")
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb');
const cors = require("cors")
dotenv.config()




const url = process.env.MONGO_URI;
const client = new MongoClient(url);

const app = express();
app.use(bodyparser.json())

const corsOptions = {
    origin: 'https://pass-man-theta.vercel.app', // Replace with your allowed origin
};

app.use(cors(corsOptions));


// Database Name
const dbName = 'passMan';
client.connect()

//get all the passwords
app.get('/' , async (req, res) => {
    const db = client.db(dbName)
    const collection = db.collection('passwords')
    const findResult = await collection.find({}).toArray()
    res.send(findResult)
})

//save password
app.post('/' , async (req, res) => {
    const password = req.body
    const db = client.db(dbName)
    const collection = db.collection('passwords')
    await collection.insertOne(password)
    res.send({
        message: "Succesfully inserted!"
    })
})

//delete password
app.delete('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName)
    const collection = db.collection('passwords')
    await collection.deleteOne(password)
    res.send({
        message: "Succesfully deleted!"
    })
})



app.listen(3000, () => console.log("Hello world!")
)