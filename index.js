const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");


const port = process.env.PORT || 5000;
require("dotenv").config();
const app = express();


/*****middle wares*****/
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.6xivgke.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run(){
  try{
    const serviceCollection = client.db('travelBro').collection('services');
    const oldTripCollection = client.db('travelBro').collection('oldTrip');

    app.get('/services', async(req, res)=>{
      const query = {}
      const cursor = serviceCollection.find(query);
      const services = await cursor.limit(3).toArray();
      res.send(services);
    });
     
    
    app.get("/services/all", async (req, res) => {
       const query = {};
       const cursor = serviceCollection.find(query);
       const services = await cursor.toArray();
       res.send(services);
     });

    app.get("/services/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const service = await serviceCollection.findOne(query);
      res.send(service);
    });

     app.get("/oldTrip", async (req, res) => {
       const query = {};
       const cursor = oldTripCollection.find(query);
       const oldTrip = await cursor.toArray();
       res.send(oldTrip);
     });

     
   
  }

  finally{
    
  }
}

run().catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("Future travel is runnning");
});

app.listen(port, () => {
  console.log(`Future travel server is running on port ${port}`);
});
