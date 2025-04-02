<template>
  <div class="todo-container">
    <div class="todo-wrapper">
      <h2 class="todo-title">To-Do List</h2>

      <!-- Input Field for New Task -->
      <div class="todo-input">
        <input
          type="text"
          v-model="newTask"
          placeholder="Add a new task..."
          @keyup.enter="addTask"
        />
        <button @click="addTask" class="add-task-btn">Add Task</button>
      </div>

      <!-- Task List -->
      <ul class="todo-list">
        <li v-for="(task, index) in tasks" :key="index">
          <span>{{ task.description }}</span>
          <!-- <button @click="removeTask(index)" class="remove-btn">X</button> -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import type { Todo } from "~/types";
export default {
  data() {
    return {
      newTask: "",
      tasks: [] as Todo[],
    };
  },
  methods: {
    async addTask() {
      const response = await axios.post("/api/todos/todo", {
        text: this.newTask,
      });
      this.tasks.push(response.data[0]);
      this.newTask = "";
      console.log(response.data);
    },

    // removeTask(index ) {
    //   this.tasks.splice(index, 1);
    // },
  },
  mounted() {
    const token = localStorage.getItem("jwt");
    if (!token) {
      this.$router.push("/login");
    }
  },
};
</script>

<style scoped>
/* Container styling */
.todo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f7fc;
  padding: 20px;
}

/* Wrapper for the todo list */
.todo-wrapper {
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

/* Title */
.todo-title {
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
}

/* Input field and button */
.todo-input {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.todo-input input {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.todo-input button {
  padding: 10px 20px;
  background-color: #4e73df;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.todo-input button:hover {
  background-color: #2e59d9;
}

/* Task list */
.todo-list {
  list-style-type: none;
  padding: 0;
}

.todo-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.todo-list li.completed span {
  text-decoration: line-through;
  color: #888;
}

.todo-list input[type="checkbox"] {
  margin-right: 10px;
}

.remove-btn {
  background-color: #e74c3c;
  color: white;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.remove-btn:hover {
  background-color: #c0392b;
}
</style>
