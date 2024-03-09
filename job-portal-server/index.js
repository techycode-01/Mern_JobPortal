 const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
  origin:"*",
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
   
   // get single job using id
   app.get("/all-jobs/:id", async (req, res) => {
    // console.log(req.params.id);
    const job = await jobsCollection.findOne({
      _id: new ObjectId(req.params.id),
    });
    res.send(job);
  });

  // get jobs based on email for my job listing 
  app.get("/myJobs/:email", async (req, res) => {
    // console.log("email---", req.params.email);
    const jobs = await jobsCollection.find({ postedBy: req.params.email, }).toArray();
    res.send(jobs);
  });


  // delete a job
  app.delete("/job/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const result = await jobsCollection.deleteOne(filter);
    res.send(result);
  })

  // updata a job
  app.patch("/update-job/:id", async (req, res) => {
    const id = req.params.id;
    const jobData = req.body;
    // console.log(body);
    const filter = { _id: new ObjectId(id) };
    const updateDoc = {
      $set: {
        ...jobData
      },
    };
    const options = { upsert: true };
    const result = await jobsCollection.updateOne(filter, updateDoc, options);
    res.send(result);
  });


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
