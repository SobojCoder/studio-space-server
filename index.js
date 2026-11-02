import express from "express";
import "dotenv/config";
import { MongoClient } from "mongodb";
import cors from 'cors'

const app = express();
const PORT = 5000;

app.use(cors())
app.use(express.json())

const client = new MongoClient(
  "mongodb://studio-space:2uia6volq85XitUJ@ac-fp5z2sz-shard-00-00.yfbjwpb.mongodb.net:27017,ac-fp5z2sz-shard-00-01.yfbjwpb.mongodb.net:27017,ac-fp5z2sz-shard-00-02.yfbjwpb.mongodb.net:27017/?ssl=true&replicaSet=atlas-fg8pkp-shard-0&authSource=admin",
);

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


app.post("/add-studio", async(req, res)=>{
    const data = req.body;

    const result = await studioCollectins.insertOne(data);

    res.send(result)
})


app.get("/", (req, res) => {
  res.send({ message: "Server is running fine!" });
});

app.listen(PORT, () => {
  console.log(`Server is running in ${PORT}`);
});
