const mongoose = require("mongoose");
const { Todos } = require("./models/TodoSchema");
const { Users } = require("./models/UsersSchema");

//Connecting to database
mongoose.connect(
    "mongodb+srv://urmas:Kammkala123@cluster0.0scmk.mongodb.net/todoapp?retryWrites=true&w=majority",
    { useNewUrlParser: true }
);
// const Schema = mongoose.Schema;

// const TodoSchema = new Schema({
//     title: { type: String },
//     status: { type: String },
// });

// const Todos = mongoose.model("Todos", TodoSchema);

module.exports = {
    Todos,
    Users
};
