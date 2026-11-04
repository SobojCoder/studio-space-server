import express from "express";
import "dotenv/config";
import { MongoClient, ObjectId } from "mongodb";
import cors from 'cors'

const app = express();
const PORT = 5000;

app.use(cors())
app.use(express.json())

const client = new MongoClient(process.env.MONGODB_URL);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

const mongoClient = await connectToMongoDB()
const db = mongoClient.db("studio-space")
const studioCollectins = db.collection("studios")
const bookingCollections = db.collection("bookings")


app.post("/add-studio", async(req, res)=>{
    const data = req.body;

    const result = await studioCollectins.insertOne(data);

    res.send(result)
})

app.get('/studio-list', async(req, res)=>{
    const result = await studioCollectins.find().toArray();
    res.send(result)
})

app.get('/studio/:id', async(req, res)=>{
    const {id} = req.params;
    const result = await studioCollectins.findOne({_id: id});
    res.send(result);
})

app.get('/feature-studio', async(req, res)=>{
    const result = await studioCollectins.find().sort({rating: - 1}).limit(6).toArray();
    res.send(result)
})

app.post('/bookings', async(req, res)=>{
  const data = req.body;
  const result = await bookingCollections.insertOne(data)
  res.send(result)
})

app.get("/my-bookings/:email", async(req, res)=>{
  const {email} = req.params;
  const result = await bookingCollections.find({userEmail: email}).toArray()
  res.send(result)
})


app.get("/", (req, res) => {
  res.send({ message: "Server is running fine!" });
});

app.listen(PORT, () => {
  console.log(`Server is running in ${PORT}`);
});
