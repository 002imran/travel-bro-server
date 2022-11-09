const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion } = require("mongodb");


require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;


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
    app.get('/services', async(req, res)=>{
      const query = {}
      const cursor = serviceCollection.find(query);
      const services = await cursor.limit(3).toArray();
      res.send(services);
    });
     
    app.get("/services/all", async (req, res) => {
       const query = {};
       const cursor = serviceCollection.find(query);
       const servicesAll = await cursor.toArray();
       res.send(servicesAll);
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
