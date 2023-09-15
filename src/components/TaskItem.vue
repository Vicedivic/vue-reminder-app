<template>
  <div :class="{ reminder: task.reminder, task: true }">
    <div>
      <h3>{{ task.text }}</h3>
      <p>{{ task.day }}</p>
    </div>
    <div class="action-button-container">
      <button @click="$emit('toggle-reminder', task.id)" class="reminder-button">
        <ImportantIcon />
      </button>
      <button @click="$emit('delete-task', task.id)" class="delete-button">
        <XIcon />
      </button>
    </div>
  </div>
</template>

<script setup>
import XIcon from './XIcon.vue';
import ImportantIcon from './ImportantIcon.vue';

defineProps({
  task: Object,
});

defineEmits(['delete-task', 'toggle-reminder']);
</script>

<style scoped>
.task {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}

.action-button-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.action-button-container button {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid transparent;
  border-radius: 5px;
  background: transparent;
  cursor: pointer;
  transition: border-color 0.3s;
}

.action-button-container button:hover {
  border-color: #333;
}

.delete-button {
  color: red;
}

.reminder-button {
  color: green;
}

.task.reminder {
  border-left: 5px solid green;
}

.task h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>