import { useState, useEffect } from "react";
import { validateTaskTitle, isTaskDuplicate } from "../utils/validation";
import { v4 as uuidv4 } from 'uuid';

const useTasks = () => {
  const userId = localStorage.getItem('userId');

  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem("tasks");
      return savedTasks ? JSON.parse(savedTasks).filter(task => task.userId === userId) : [];
    } catch (error) {
      console.error("Error parsing tasks from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const userTasks = allTasks.filter(task => task.userId === userId);
    setTasks(userTasks);
  }, [userId]);

  useEffect(() => {
    try {
      const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const updatedTasks = [...allTasks.filter(task => task.userId !== userId), ...tasks];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    } catch (error) {
      console.error("Error saving tasks to localStorage:", error);
    }
  }, [tasks, userId]);

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const addTask = (task) => {
    if (!validateTaskTitle(task.title)) {
      return alert("Task title cannot be empty!");
    }
    if (isTaskDuplicate(tasks, task.title)) {
      return alert("Task already exists!");
    }
    const createdOn = formatDate(new Date());
    const newTask = { ...task, id: uuidv4(), userId, createdOn, subtasks: task.subtasks || [] };

    setTasks((prev) => [...prev, newTask]);

    const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    localStorage.setItem("tasks", JSON.stringify([...allTasks, newTask]));
  };

  const editTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );

    const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = allTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task));
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));

    const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = allTasks.filter((task) => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const toggleTaskStatus = (taskId) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          let newStatus;
          switch (task.status) {
            case "Pending":
              newStatus = "Ongoing";
              break;
            case "Ongoing":
              newStatus = "Completed";
              break;
            case "Completed":
              newStatus = "Pending";
              break;
            default:
              newStatus = "Pending";
          }
          return { ...task, status: newStatus };
        }
        return task;
      })
    );

    const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = allTasks.map((task) => {
      if (task.id === taskId) {
        let newStatus;
        switch (task.status) {
          case "Pending":
            newStatus = "Ongoing";
            break;
          case "Ongoing":
            newStatus = "Completed";
            break;
          case "Completed":
            newStatus = "Pending";
            break;
          default:
            newStatus = "Pending";
        }
        return { ...task, status: newStatus };
      }
      return task;
    });
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const updateSubtasks = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );

    const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = allTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task));
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const [categories, setCategories] = useState(() => {
    try {
      const savedCategories = localStorage.getItem("categories");
      return savedCategories ? JSON.parse(savedCategories) : [];
    } catch (error) {
      console.error("Error parsing categories from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("categories", JSON.stringify(categories));
    } catch (error) {
      console.error("Error saving categories to localStorage:", error);
    }
  }, [categories]);

  const addCategory = (name) => {
    const newCategory = { id: Date.now(), name };
    setCategories((prev) => [...prev, newCategory]);

    const allCategories = JSON.parse(localStorage.getItem("categories")) || [];
    localStorage.setItem("categories", JSON.stringify([...allCategories, newCategory]));
  };

  const editCategory = (updatedCategory) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category
      )
    );

    const allCategories = JSON.parse(localStorage.getItem("categories")) || [];
    const updatedCategories = allCategories.map((category) =>
      category.id === updatedCategory.id ? updatedCategory : category
    );
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
  };

  const handleDeleteCategory = (id) => {
    setCategories((prev) => prev.filter((category) => category.id !== id));

    const allCategories = JSON.parse(localStorage.getItem("categories")) || [];
    const updatedCategories = allCategories.filter((category) => category.id !== id);
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
  };

  return {
    tasks,
    addTask,
    editTask,
    deleteTask,
    toggleTaskStatus,
    updateSubtasks,
    categories,
    addCategory,
    editCategory,
    handleDeleteCategory,
  };
};

export default useTasks;