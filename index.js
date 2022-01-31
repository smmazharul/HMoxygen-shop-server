require('dotenv').config()
const express = require('express');
const { MongoClient } = require('mongodb');
const cors=require('cors')
const app = express();
const port = process.env.port || 5000;

//middleware
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qeyo8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db('online_Shop');
        const productsCollection=database.collection('products')
        
        //Get Product API 
        app.get('/products', async (req, res) => {
            const cursor = productsCollection.find({});
            const products=await cursor.toArray();
            res.send(products);
        });
         

    } finally {
        // await client.close()
    }
}
run().catch(console.log.dir)


app.get('/', (req, res) => {
    res.send("Ema Jon server is running");
})













app.listen(port, () => {
    console.log("server running at port",port);
})