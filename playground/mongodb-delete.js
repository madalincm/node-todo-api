//const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) =>{
    if(err){
        return console.log("Unable to connect to MongoDb");
    }
    console.log("Connected to MongoDB server");
    const db = client.db("TodoApp")


    //deletaMany
    // db.collection("Todos").deleteMany({text:"eat lunch"}).then((result) =>{
    //     console.log(result);
    // });

    //deleteOne
    // db.collection("Todos").deleteOne({text:"Walk the dog"}).then((result) =>{
    //     console.log(result);
    // });

    //FindOneAndDelete
    // db.collection("Todos").findOneAndDelete({completed: true}).then((result) => {
    //     console.log(result);
    // });

    // db.collection("Users").deleteMany({name: "Madalin"}).then((result) => {
    //     console.log(result);
    // });

    // db.collection("Users").findOneAndDelete({_id: new ObjectID("5af40b764028010dd022245e")}).then((result) =>{
    //     console.log(result);
    // });

    //client.close();
});