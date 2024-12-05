import React, { useState, useEffect } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import TaskList from "../components/task/TaskList";
import TaskModal from "../components/task/TaskModal";
import NoTasksPlaceholder from "./NoTasksPlaceholder";
import useTasks from "../hooks/useTasks";
import { Typography, InputAdornment, TextField, Button, Box } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useLocation, useNavigate } from "react-router-dom";
import '../styles/HomePage.scss';

const HomePage = ({ tab = 0 }) => {
  const { tasks, addTask, editTask, deleteTask, toggleTaskStatus } = useTasks();
  const { categories } = useTasks();
  const [activeTab, setActiveTab] = useState(tab);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/all-task") setActiveTab(0);
    else if (location.pathname === "/pending-task") setActiveTab(1);
    else if (location.pathname === "/completed-task") setActiveTab(2);
  }, [location.pathname]);

  const handleAddTask = () => {
    setEditingTask(null);
    setModalOpen(true);
    navigate('/add-task');
  };

  const handleEditTask = (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    setEditingTask(task || { subtasks: [] });
    setModalOpen(true);
  };

  const handleTaskAction = (action, taskId) => {
    if (action === "edit") handleEditTask(taskId);
    if (action === "delete") deleteTask(taskId);
    if (action === "complete") toggleTaskStatus(taskId);
    if (action === "updateSubtasks") editTask(taskId);
  };

  const displayedTasks = tasks
    .filter((task) => {
      if (activeTab === 0) return true;
      if (activeTab === 1) return task.status === "Pending";
      return task.status === "Completed";
    })
    .filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((task) =>
      selectedCategory ? task.category === selectedCategory : true
    )
    .filter((task) =>
      selectedPriority ? task.priority === selectedPriority : true
    );

  const onFilterChange = (type, value) => {
    if (type === 'category') {
      setSelectedCategory(value);
    } else if (type === 'priority') {
      setSelectedPriority(value);
    }
  };

  return (
    <Typography className="home-page">
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        categories={categories}
      />

      <Box sx={{ paddingRight: '16px', marginTop: '6px', display: 'flex', justifyContent: 'end', alignItems: 'center', flexWrap: 'wrap' }}>
        <select onChange={(e) => onFilterChange('category', e.target.value)} style={{ margin: '8px 10px', border: 'none', cursor: 'pointer' }} className="select">
          <option value="">Filter by Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>

        <select onChange={(e) => onFilterChange('priority', e.target.value)} style={{ margin: '8px 10px', border: 'none', cursor: 'pointer' }} className="select">
          <option value="">Filter by Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <TextField
          className="search inputs font14"
          sx={{
            height: '40px',
            margin: '2px 8px 2px 0',
            borderRadius: '5px',
            '& .MuiInputBase-root': {
              height: '40px',
            },
          }}
          placeholder="Search By Title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            classes: {
              input: "text-value font14",
            },
          }}

          variant="outlined"
        />

        <Button
          variant="contained"
          className="add-task-button"
          onClick={handleAddTask}
          sx={{ marginLeft: '8px', marginBottom: '8px' }}>
          Add New Task
        </Button>
      </Box>

      <Typography
        className="content">
        {displayedTasks?.length === 0 ? (
          <NoTasksPlaceholder onAddTask={handleAddTask} />
        ) : (
          <TaskList displayedTasks={displayedTasks} onAction={handleTaskAction} />
        )}
      </Typography>

      <Footer />
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingTask(null);
        }}
        initialData={editingTask}
        onSave={(taskData) => {
          if (editingTask) {
            editTask(taskData);
          } else {
            addTask(taskData);
          }
          setModalOpen(false);
        }}
      />
    </Typography>
  );
};

export default HomePage;
