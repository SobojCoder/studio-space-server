import express from "express";
import "dotenv/config";
import { MongoClient, ObjectId } from "mongodb";
import cors from 'cors'
import { createRemoteJWKSet, jwtVerify } from "jose";

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


const verifyToken = async(req, res, next)=>{
  const authHeader = req.headers.authorization;

  if(!authHeader){

    return res.status(401).send({msg:"Unauthorize"})
  }

  const token = authHeader.split(" ")[1]

  if(!token){

    return res.status(401).send({msg:"Unauthorize"})
  }

  const JWKS = createRemoteJWKSet(new URL('http://localhost:3000/api/auth/jwks'))

  try{
    const {payload} = await jwtVerify(token, JWKS)
    next();
}catch(error){
  return res.status(500).send({msg: "Server Error"})
}


}



app.post("/add-studio", verifyToken, async (req, res) => {
  const data = req.body;

  const result = await studioCollectins.insertOne(data);

  res.send(result);
});

app.get("/my-listing/:email",verifyToken, async (req, res) => {
  const { email } = req.params;

  const result = await studioCollectins
    .find({ ownerEmail: email })
    .toArray();

  res.send(result);
});

app.delete("/my-listing/:id",verifyToken, async(req, res)=>{
  const {id} = req.params;
  const result = await studioCollectins.deleteOne({_id: new ObjectId(id)})
  res.send(result)
})


app.get('/studio-list',verifyToken, async(req, res)=>{
    const result = await studioCollectins.find().toArray();
    res.send(result)
})

app.get('/studio/:id',verifyToken, async(req, res)=>{
    const {id} = req.params;
    const result = await studioCollectins.findOne({_id: new ObjectId(id)});
    res.send(result);
})

app.get('/feature-studio',verifyToken, async(req, res)=>{
    const result = await studioCollectins.find().sort({rating: - 1}).limit(6).toArray();
    res.send(result)
})

app.post('/bookings',verifyToken, async(req, res)=>{
  const data = req.body;
  const result = await bookingCollections.insertOne(data)
  res.send(result)
})

app.get("/my-bookings/:email", verifyToken, async(req, res)=>{
  const {email} = req.params;
  const result = await bookingCollections.find({userEmail: email}).toArray()
  res.send(result)
})

app.delete("/my-bookings/:studioId",verifyToken, async(req, res)=>{
  const {studioId} = req.params;
  const result = await bookingCollections.deleteOne({studioId: studioId})
  res.send(result)
})



app.get("/", (req, res) => {
  res.send({ message: "Server is running fine!" });
});

app.listen(PORT, () => {
  console.log(`Server is running in ${PORT}`);
});
