const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const router = express.Router();


router.get('/', async (req, res) => {
    const collection = await loadMicroPostsCollection();
    ret.send(
        await collection.fine({}).toArray()
    )
})

// insert a new micro-post
router.post('/', async (req, res) => {
    const collection = await loadMicroPostsCollection();
    await collection.insertOne({
      text: req.body.text,
      createdAt: new Date(),
    });
    res.status(200).send();
});

async function loadMicroPostsCollection() {
    const client = await MongoClient.connect('mongodb://localhost:27017/');
    return client.db('micro-blog').collection('micro-posts');
}

module.exports = router;
