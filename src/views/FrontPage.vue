<template>
  <AddTask v-show="store.showAddTaskForm" @add-task="onAddTask" />
  <Tasks @toggle-reminder="onToggleReminder" @delete-task="onTaskDelete" :tasks="tasks" />
</template>

<script setup>
import Tasks from '../components/Tasks.vue';
import AddTask from '../components/AddTask.vue';
import { ref } from 'vue';
import store from '../store.js';
import { addTask, deleteTask, getTasksFromLocalStorage, toggleReminder } from '../util/taskUtils.js';

const tasks = ref(getTasksFromLocalStorage());

const onTaskDelete = (taskId) => {
  if (!confirm('Are you sure you want to delete this task?')) {
    return;
  }

  tasks.value = deleteTask(taskId, tasks.value);
};

const onToggleReminder = (taskId) => {
  tasks.value = toggleReminder(taskId, tasks.value);
};

const onAddTask = (taskData) => {
  tasks.value = addTask(taskData, tasks.value)
  store.toggleShowAddTaskForm();
};
</script>