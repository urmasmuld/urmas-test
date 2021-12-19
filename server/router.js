const express = require("express");
const router = express.Router();
const { Todos } = require("./dbConnection");
const authRoutes = require("./authenticate.router");

router.use("/auth", authRoutes);

router.get("/calc", function (req, res) {
  const a = 4;
  const b = 4;
  const result = a + b;
  res.send({ result });
});

// request === req ja response === res
router.get("/get-todos", async function (request, response) {
  const result = await Todos.find();
  console.log(result);
  response.send(result);
});

router.get("/get-todo/:id", async function (request, response) {
  const result = await Todos.findOne({ _id: request.params.id });
  console.log(result);
  response.send(result);
});

router.get("/upd-todo/:id", async function (request, response) {
  // const result = await Todos.updateOne({ _id: request.params.id },
  // { status: 'COMPLETE'} või { status: 'ACTIVE'}
  await Todos.updateOne(
    { _id: request.params.id }, 
    { $set: { status: request.body.status } } 
    );
  // await Todos.updateOne({ _id: request.params.id },
  //   { $set:
  //       {
  //         "status": "COMPLETE"
  //       }
  //    } );
  console.log(result);
  response.send(result);
});

router.get("/del-todo/:id", async function (request, response) {
  // const result = await Todos.deleteOne( { _id: request.params.id } );
  await Todos.deleteOne( { _id: request.params.id } );
  // console.log(result);
  console.log("Deleting todo..");
  response.send({});
});

router.post("/add-todo", async function (request, response) {
  if (request.body.title) {
    await Todos.create(request.body);
    console.log("Lisa todo");
  }
  response.send("done");
});

module.exports = router;

// .deleteOne()
// .updateOne()
// mongo updateOne $set