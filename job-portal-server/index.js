 const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
  origin: process.env.FRONT_END_URL,
  credentials: true
}));

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@job-portal-demo.krv6aeo.mongodb.net`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    const db = client.db("mernJobPortal");
    const jobsCollection = db.collection("demoJobs");

    const indexKeys = { title: 1, category: 1 };
    const indexOptions = { name: "titleCategory" };
    await jobsCollection.createIndex(indexKeys, indexOptions);

    app.post("/post-job", async (req, res) => {
      const body = req.body;
      console.log(body)
      body.createdAt = new Date();
      const result = await jobsCollection.insertOne(body);
      if (result?.insertedId) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send({
          message: "can not insert try again later",
          status: false,
        });
      }
    });

    app.get("/all-jobs", async (req, res) => {
      const jobs = await jobsCollection.find({}).sort({ createdAt: -1 }).toArray();
      res.send(jobs);
    });

    // Other routes...

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error(error);
  }
}

run().catch(console.dir);

process.on('SIGINT', async () => {
  await client.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});

app.use(express.static(path.join(__dirname, "../../job-portal-server/dist")));

app.get('/', (req, res) => {
  res.send('Hello developer!');
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
