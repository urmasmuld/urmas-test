<template>
  <div>
    <div class="row">
      <div class="col">
        <h2>{{ title }}</h2>

        <ul class="list-group mb-3">
          <li
            v-for="todo in todosFromServer"
            :key="todo"
            class="list-group-item"
          >
            {{ todo.title }} {{ todo.status }}
            <button type="submit" @click="getTodo(todo._id)" class="btn btn-info">Get info</button>
            &nbsp;
            <button type="submit" @click="updTodo(todo._id)" class="btn btn-success">Complete</button>
            &nbsp;
            <button type="submit" @click="delTodo(todo._id)" class="btn btn-danger">Delete</button>
          </li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <input
          v-model="newTodo"
          type="text"
          name="newTodo"
          class="form-control"
        />
      </div>
      <div class="col">
        <button @click="addTodo" type="submit" class="btn btn-primary w-100">
          Add new todo
        </button>
      </div>
    </div>
        Info: {{ singleTodo }}
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
export default {
  name: "TodoList",
  props: {
    title: String,
  },
  setup() {
    const todos = ref(["Read a book", "Go for a walk", "Eat food"]);
    const newTodo = ref("");
    const todosFromServer = ref([]);
    const singleTodo = ref({});
    async function getTodos() {
      const result = await axios.get("/api/get-todos");
      todosFromServer.value = result.data;
      console.log(result.data);
    }
    async function getTodo(id) {
      const result = await axios.get("/api/get-todo/" + id);
      singleTodo.value = result.data;
      console.log(result.data);
    }
    async function updTodo(id) {
      const result = await axios.get("/api/upd-todo/" + id);
      singleTodo.value = result.data;
      console.log(result.data);
      await getTodos();
    }
    async function delTodo(id) {
      const result = await axios.get("/api/del-todo/" + id);
      singleTodo.value = result.data;
      console.log(result.data);
      await getTodos();
    }
    async function addTodo() {
      await axios.post("/api/add-todo", {
        title: newTodo.value,
        status: "ACTIVE",
      });
      newTodo.value = "";
      await getTodos();
    }
    getTodos();
    function addNewTodo() {
      todos.value.push(newTodo.value);
      newTodo.value = "";
    }
    return {
      todos,
      newTodo,
      addNewTodo,
      todosFromServer,
      addTodo,
      singleTodo,
      getTodo,
      updTodo,
      delTodo,
    };
  },
};
</script>