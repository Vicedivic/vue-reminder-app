<template>
<header>
  <h1>{{ title }}</h1>
  <Button
    @click="store.toggleShowAddTaskForm()"
    :text="store.showAddTaskForm ? 'Close' : 'Add Task'"
    :color="store.showAddTaskForm ? 'red' : 'green'"
    v-if="isFrontPage"
  />
</header>
</template>

<script setup>
import Button from './Button.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import store from '../store.js';

defineProps({
  title: String,
});

const route = useRoute();

const isFrontPage = computed(() => route.path === '/')
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>