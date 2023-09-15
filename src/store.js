import { reactive } from 'vue';

export default reactive({
  showAddTaskForm: false,
  toggleShowAddTaskForm() {
    this.showAddTaskForm = !this.showAddTaskForm;
  },
});