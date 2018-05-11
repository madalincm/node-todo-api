//const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) =>{
    if(err){
        return console.log("Unable to connect to MongoDb");
    }
    console.log("Connected to MongoDB server");
    const db = client.db("TodoApp")

    // db.collection("Todos").findOneAndUpdate(
    //     {
    //     _id: new ObjectID("5af55e62adaa45641d3c5956")
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });

    db.collection("Users").findOneAndUpdate(
        {
            _id: new ObjectID("5af54b96adaa45641d3c57bc")
        },{
            $set: {
                name: "Madalin"
            },
            $inc: {
                age: 1
            }
        },
        {
            returnOriginal: false
        }).then((result) => {
            console.log(result);
        });


    //client.close();
});