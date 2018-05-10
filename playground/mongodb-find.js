//const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) =>{
    if(err){
        return console.log("Unable to connect to MongoDb");
    }
    console.log("Connected to MongoDB server");
    const db = client.db("TodoApp")

    // db.collection("Todos").find({
    //     _id: new ObjectID("5af4554490cefbeb83941837")
    // }).toArray().then((docs) =>{
    //     console.log("Todos");
    //     console.log(JSON.stringify(docs, undefined,2));
    // }, (err) => {
    //     console.log("Unable to fetch todos", err);
    // })

    // db.collection("Todos").find().count().then((count) =>{
    //     console.log(`Todos ${count}`);
    // }, (err) => {
    //     console.log("Unable to fetch todos", err);
    // })


    db.collection("Users").find({
        name: "Madalin"
    }).toArray().then((docs) =>{
        console.log("Users");
        console.log(JSON.stringify(docs, undefined,2));
    }, (err) => {
        console.log("Unable to fetch users", err);
    })


    //client.close();
});