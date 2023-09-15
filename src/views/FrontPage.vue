<template>
  <AddTask v-show="store.showAddTaskForm" @add-task="addTask" />
  <Tasks @toggle-reminder="toggleReminder" @delete-task="deleteTask" :tasks="tasks" />
</template>

<script setup>
import Tasks from '../components/Tasks.vue';
import AddTask from '../components/AddTask.vue';
import { onMounted, ref } from 'vue';
import store from '../store.js';

const tasks = ref([]);

const fetchTasks = async () => {
  const res = await fetch('/tasks');
  return await res.json();
};

onMounted(async () => {
  tasks.value = await fetchTasks();
});

const fetchSingleTask = async (id) => {
  const res = await fetch(`/tasks/${id}`);
  return await res.json();
};

const deleteTask = async (taskId) => {
  if (!confirm('Are you sure you want to delete this task?')) {
    return;
  }

  const res = await fetch(`/tasks/${taskId}`, { method: 'DELETE' });

  if (res.status !== 200) {
    alert('Error deleting task.');
    return;
  }

  tasks.value = tasks.value.filter((taskItem) => taskItem.id !== taskId);
};

const toggleReminder = async (taskId) => {
  const taskToToggle = await fetchSingleTask(taskId);
  const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

  const res = await fetch(`/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(updatedTask),
  });

  const taskFromBackend = await res.json();

  tasks.value = tasks.value.map((taskItem) => {
    if (taskItem.id === taskId) {
      return taskFromBackend;
    }
    return taskItem;
  });
};

const addTask = async (newTask) => {
  const res = await fetch('/tasks', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(newTask),
  });

  const taskFromBackend = await res.json();

  tasks.value = [...tasks.value, taskFromBackend];

  store.toggleShowAddTaskForm();
};
</script>