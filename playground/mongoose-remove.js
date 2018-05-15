const {ObjectId} = require("mongodb");

const {mongoose} = require("./../server/db/mongoose");
const {Todo} = require("./../server/models/todo");


//remove all
// Todo.remove({}).then((result) =>{
//     console.log(result);
// });

// Todo.findOneAndRemove({_id:"5afaeb87240dd01384785086"}).then((todo) => {
//     console.log(todo);
// });

Todo.findByIdAndRemove({_id: "5afaec2ea79eae2840912fef"}).then((todo) => {
    console.log(todo);
});


