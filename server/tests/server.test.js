const expect = require("expect");
const request = require("supertest");
const {ObjectId} = require("mongodb");

const {app} = require("./../server");
const {Todo} = require("./../models/todo");

const todos = [{
    _id: new ObjectId(),
    text: "first test todo"
},
{
    _id: new ObjectId(),
    text: "second test todo",
    completed: true,
    completedAt: 333
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        Todo.insertMany(todos);
    }).then(() =>{
        done();
    });
});

describe("Post /todos", () =>{
 it("should create a new todo", (done) => {
    var text = "Test todo text";

    request(app)
    .post("/todos")
    .send({text})
    .expect(200)
    .expect((res) => {
        expect(res.body.text).toBe(text);
    })
    .end((err,res) => {
        if(err) {
            return done(err);
        }
        Todo.find({text}).then((todos) => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
        }).catch((e) => done(e));
    });
 });

 it("should not create todo", (done) => {
    var text = "";
    request(app)
    .post("/todos")
    .send({text})
    .expect(400)
    .end((err,res) => {
        if(err) {
            return done(err);
        }
        Todo.find().then((todos) => {
            expect(todos.length).toBe(2);
            done();
        }).catch((e) => done(e));
    });
 });
});

describe("GET /todos", () => {
    it("should get all todos", (done) =>{
        request(app)
        .get("/todos")
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    });
 });

 describe("Get /todos/:id", () => {
    it("should return todo doc", (done) => {
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });

    it("should return 404 if not found", (done) => {
        var inexistentId = new ObjectId().toHexString();
        request(app)
        .get(`/todos/${inexistentId}`)
        .expect(404)
        .end(done);
    });

    it("should return 404 for non-object ids", (done) => {
        var invalidId = "123";
        request(app)
        .get(`/todos/${invalidId}`)
        .expect(404)
        .end(done);
    });
 });

 describe("Delete /todos/:id", () => {
    it("should delete todo doc", (done) => {
        validId = todos[0]._id.toHexString();

        request(app)
        .delete(`/todos/${validId}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo._id).toBe(validId);
        })
        .end(done);
    });

    it("should return 404 if not found", (done) => {
        var inexistentId = new ObjectId().toHexString();
        request(app)
        .delete(`/todos/${inexistentId}`)
        .expect(404)
        .end(done);
    });

    it("should return 404 for non-object ids", (done) => {
        var invalidId = "123";
        request(app)
        .delete(`/todos/${invalidId}`)
        .expect(404)
        .end(done);
    });

 })

 describe("Patch /todos/:id", () => {
     it ("should update todo doc", (done) => {
        var validId = todos[0]._id.toHexString();
        var text = "This should be the new text";
        request(app)
        .patch(`/todos/${validId}`)
        .send({
            completed: true,
            text: text
        })
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBe(true);
            expect(typeof res.body.todo.completedAt).toBe("number");
        })
        .end(done);

     });

     it ("should clear completedAt when todo is not completed", (done) => {
        var validId = todos[1]._id.toHexString();
        var text = "This should be the new text!!!";
        request(app)
        .patch(`/todos/${validId}`)
        .send({
            completed: false,
            text: text
        })
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBe(false);
            expect(res.body.todo.completedAt).toBeFalsy();
        })
        .end(done);
     })
 });
