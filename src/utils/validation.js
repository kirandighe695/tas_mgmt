export const validateTaskTitle = (title) => title.trim().length > 0;

export const isTaskDuplicate = (tasks, title) =>
  tasks.some((task) => task.title.toLowerCase() === title.toLowerCase());
