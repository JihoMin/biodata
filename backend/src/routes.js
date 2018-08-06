const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const mysql = require("mysql2/promise");

const { MYSQL_URL, MYSQL_ID, MYSQL_PWD } = process.env;

// create DB pool
var pool = mysql.createPool({
    host: MYSQL_URL,
    user: MYSQL_ID,
    password: MYSQL_PWD,
    database: "test"
});

const router = express.Router();

router.get('/', async (req, res) => {
    const collection = await loadMicroPostsCollection();
    console.log(collection);
    res.send(
        collection
    )
})

// insert a new micro-post
router.post('/', async (req, res) => {
    await insertFruit(req.body.text);
    res.status(200).send();
});

const insertFruit = async (fruit) => {
    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const fruit_name = fruit;
            connection.query('INSERT INTO fruit(fruit_name) VALUES(?)',[fruit_name]);
        } catch(err) {
            console.log(err);
        }
    } catch(err) {
        console.log(err);
    }
}

const loadMicroPostsCollection = async () => {
    try{
        const connection = await pool.getConnection(async conn => conn);
        try {
            const [rows] = await connection.query('SELECT * FROM fruit');
            connection.release();
            return rows;
        } catch(err){
            console.log('select error');
            console.log(err);
        }
    } catch(err) {
        console.log('connection error');
        console.log(err);
    }
}

module.exports = router;
