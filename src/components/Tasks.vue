<template>
  <div v-for="taskItem in tasks" :key="taskItem.id">
    <TaskItem @toggle-reminder="$emit('toggle-reminder', taskItem.id)" @delete-task="$emit('delete-task', taskItem.id)" :task="taskItem" />
  </div>
</template>

<script setup>
import TaskItem from './TaskItem.vue';

defineProps({
  tasks: Array,
});

defineEmits(['delete-task', 'toggle-reminder']);
</script>