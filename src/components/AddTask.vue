<template>
  <form @submit.prevent="onSubmit" class="add-form">
    <div class="form-control">
      <label for="text">Task</label>
      <input v-model="formData.text" type="text" name="text" placeholder="Add Task">
    </div>
    <div class="form-control">
      <label for="day">Day & Time</label>
      <input v-model="formData.day" type="text" name="day" placeholder="Add Day & Time">
    </div>
    <div class="form-control form-control-check">
      <label for="reminder">Set Reminder</label>
      <input v-model="formData.reminder" type="checkbox" name="reminder">
    </div>

    <input type="submit" value="Save Task" class="btn btn-block">
  </form>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['add-task']);

const formData = ref({
  text: '',
  day: '',
  reminder: false,
});

const onSubmit = () => {
  if (!formData.value.text) {
    alert('Please add a task.');
    return;
  }

  emit('add-task', formData.value);

  formData.value = {
    text: '',
    day: '',
    reminder: false,
  };
};
</script>

<style scoped>
.add-form {
  margin-bottom: 40px;
}

.form-control {
  margin: 20px 0;
}

.form-control label {
  display: block;
}

.form-control input {
  width: 100%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}

.form-control-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.form-control-check label {
  flex: 1;
}

.form-control-check input {
  flex: 2;
  height: 20px;
}
</style>