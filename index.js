const express = require('express')
const cors = require('cors');
require('dotenv').config();
const objectId = require('mongodb').ObjectId;
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dfq6j.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
      await client.connect();
      console.log("DB connected");

      const taskCollection = client.db("todo-app").collection("task");



      app.post('/task', async (req, res) => {
        const task = req.body;
        console.log(task)
      const result = await taskCollection.insertOne(task);
  
        res.send(result); 
      })

      app.get('/task', async (req, res) => {
        const task = await taskCollection.find().toArray();
  
        res.send(task);
      })

      app.delete('/task/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id:objectId(id) };
        const result = await taskCollection.deleteOne(query);
  
        res.send(result);
      })
  

    } finally {
        //await client.close();
      }
    }
    run().catch(console.dir);


    app.get('/', (req, res) => {
        res.send('Hello From todo-app')
      })
      
      app.listen(port, () => {
        console.log(`todo-app listening on port ${port}`)
      })
    
   