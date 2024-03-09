const express = require('express')
const app = express()
const cors = require('cors')
const path= require("path")
const port = process.env.PORT || 5000;
require('dotenv').config()

//middleware here
app.use(express.json());
app.use(cors({
  origin:process.env.FRONT_END_URL,
  credentials:true
}))

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// replace username(${process.env.DB_USER}) and password(${process.env.DB_PASS}) here
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@job-portal-demo.krv6aeo.mongodb.net/?retryWrites=true&w=majority&appName=job-portal-demo`;
//const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@jobportal.a2ilieo.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
app.use(express.static(path.join(__dirname,"../../job-portal-server/dist")))

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //create database
    const db = client.db("mernJobPortal");
    const jobsCollection = db.collection("demoJobs");
    // const db = client.db("jobPortal");
    // const jobsCollection = db.collection("jobs");

    // Creating index for job sorting last job posted will show first
    const indexKeys = { title: 1, category: 1 };
    const indexOptions = { name: "titleCategory" };
    const result = await jobsCollection.createIndex(indexKeys, indexOptions);
    // console.log(result);

    // post a job
    app.post("/post-job", async (req, res) => {
      const body = req.body;
      body.createdAt = new Date();
      // console.log(body);
      const result = await jobsCollection.insertOne(body);
      if (result?.insertedId) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send({
          message: "can not insert try again leter",
          status: false,
        });
      }
    });


    // get all jobs 
    app.get("/all-jobs", async (req, res) => {
      const jobs = await jobsCollection
        .find({})
        .sort({ createdAt: -1 })
        .toArray();
      res.send(jobs);
    });

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

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error(error);
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
// Move client.close() outside of run function
process.on('SIGINT', async () => {
  await client.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});

app.get('/', (req, res) => {
  res.send('Hello developer!')
})

app.listen(port, () => {
  console.log(`app is listening on port ${port}`)
})