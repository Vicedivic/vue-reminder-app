<template>
  <button :style="{ background: color }" @click="onClick" class="btn">{{ text }}</button>
</template>

<script setup>
defineProps({
  text: String,
  color: String,
});

const emit = defineEmits(['click']);

const onClick = () => {
  emit('click');
};
</script>