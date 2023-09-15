<template>
  <AddTask v-show="store.showAddTaskForm" @add-task="addTask" />
  <Tasks @toggle-reminder="toggleReminder" @delete-task="deleteTask" :tasks="tasks" />
</template>

<script setup>
import Tasks from '../components/Tasks.vue';
import AddTask from '../components/AddTask.vue';
import { onMounted, ref } from 'vue';
import store from '../store.js';

const serializedTasks = localStorage.getItem('tasks');
const tasks = ref(JSON.parse(serializedTasks) || []);

const deleteTask = async (taskId) => {
  if (!confirm('Are you sure you want to delete this task?')) {
    return;
  }

  tasks.value = tasks.value.filter((taskItem) => taskItem.id !== taskId);

  storeTasksInLocalStorage();
};

const toggleReminder = async (taskId) => {
  const taskToToggle = tasks.value.find((task) => task.id === taskId);
  if (!taskId) {
    throw new Error('Task not found');
  }

  const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

  tasks.value = tasks.value.map((taskItem) => {
    if (taskItem.id === taskId) {
      return updatedTask;
    }
    return taskItem;
  });

  storeTasksInLocalStorage();
};

const storeTasksInLocalStorage = (taskList = tasks.value) => {
  const serializedTasks = JSON.stringify(taskList);
  localStorage.setItem('tasks', serializedTasks);
};

const generateTaskId = () => {
  if (!tasks.value.length) {
    return 1;
  }

  const taskIds = tasks.value.map((task) => task.id);
  return Math.max(...taskIds) + 1;
};

const addTask = async (taskData) => {
  const taskWithId = {
    ...taskData,
    id: generateTaskId(),
  };

  tasks.value = [...tasks.value, taskWithId];

  storeTasksInLocalStorage();

  store.toggleShowAddTaskForm();
};
</script>