//const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb");

var obj = new ObjectID();
console.log(obj);

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) =>{
    if(err){
        return console.log("Unable to connect to MongoDb");
    }
    console.log("Connected to MongoDB server");
    const db = client.db("TodoApp")

    // db.collection("Todos").insertOne(
    //     {
    //         text: "Something to do",
    //         completed: false
    //     }, (err, result) => {
    //         if(err){
    //             return console.log("Unable to insert todo", err);
    //         }
    //         console.log(JSON.stringify(result.ops, undefined, 2));
    //     });

    // db.collection("Users").insertOne(
    //     {
    //         name: "Madalin",
    //         age: 26,
    //         location: "Baia Mare"
    //     }, (err, result) => {
    //         if(err){
    //             return console.log("Unable to insert users");
    //         }
    //         console.log(JSON.stringify(result.ops, undefined, 2));
    //         console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
    //     });

    client.close();
});