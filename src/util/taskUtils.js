export const getTasksFromLocalStorage = () => {
  const serializedTasks = localStorage.getItem('tasks');
  return JSON.parse(serializedTasks) || [];
};

const storeTasksInLocalStorage = (tasks) => {
  const serializedTasks = JSON.stringify(tasks);
  localStorage.setItem('tasks', serializedTasks);
};

export const deleteTask = (taskId, tasks) => {
  const updatedTasks = tasks.filter((taskItem) => taskItem.id !== taskId);

  storeTasksInLocalStorage(updatedTasks);

  return updatedTasks;
};

export const toggleReminder = (taskId, tasks) => {
  const updatedTasks = tasks.map((taskItem) => {
    if (taskItem.id === taskId) {
      return {
        ...taskItem,
        reminder: !taskItem.reminder,
      };
    }
    return taskItem;
  });

  storeTasksInLocalStorage(updatedTasks);

  return updatedTasks;
};

const generateTaskId = (tasks) => {
  if (!tasks.length) {
    return 1;
  }

  const taskIds = tasks.map((task) => task.id);
  return Math.max(...taskIds) + 1;
};

export const addTask = (taskData, tasks) => {
  const taskWithId = {
    ...taskData,
    id: generateTaskId(tasks),
  };

  const updatedTasks = [...tasks, taskWithId];

  storeTasksInLocalStorage(updatedTasks);

  return updatedTasks;
};