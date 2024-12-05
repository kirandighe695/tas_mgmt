import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Grid, Typography, Box, TextField, Button, IconButton, InputLabel, Dialog } from '@mui/material';
import '../../styles/TaskModal.scss';
import { useNavigate } from "react-router-dom";
import useTasks from "../../hooks/useTasks";

const TaskModal = ({ isOpen, onClose, onSave, initialData }) => {
  const userId = localStorage.getItem('userId');
  const [task, setTask] = useState(initialData || {
    title: "",
    status: "Select Status",
    createdOn: '',
    endDate: '',
    category: "Select Category",
    priority: "Select Priority",
  });

  const [errors, setErrors] = useState({});
  const { categories, addCategory, editCategory, handleDeleteCategory } = useTasks();
  const [categoryName, setCategoryName] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (initialData) {
      setTask({
        ...initialData,
        createdOn: initialData.createdOn || '',
        endDate: initialData.endDate || ''
      });
      setErrors({});
    } else {
      setTask({
        title: "",
        status: "Select Status",
        createdOn: '',
        endDate: '',
        category: "Select Category",
        priority: "Select Priority",
      });
      setErrors({});
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value === "" || value.trim().length > 0) {
      setTask((prevTask) => ({ ...prevTask, [name]: value }));
      if (value.trim()) {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      }
    }
  };

  const validate = () => {
    let validationErrors = {};

    if (!task.title.trim()) {
      validationErrors.title = "Task title is required.";
    }

    if (!task.status.trim()) {
      validationErrors.status = "Status must be required";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave({ ...task, id: initialData?.id || Date.now(), userId });
    onClose();
    navigate('/all-task')
  };

  const handleSaveCategory = () => {
    if (!categoryName.trim()) return;
    if (editingCategoryId) {
      editCategory({ id: editingCategoryId, name: categoryName });
    } else {
      addCategory(categoryName);
    }
    setCategoryName("");
    setEditingCategoryId(null);
  };

  return (
    <>
      <Dialog open={isOpen} onClose={() => {
        setTask({
          title: "",
          status: "Pending",
          createdOn: '',
          category: "Select Category",
          priority: "Select Priority",
        });
        setErrors({});
        onClose();
      }}>

        <Box className="box" padding={2} sx={{ width: '500px' }}>
          <Typography sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" component="h2">
              {initialData ? "Edit Task" : "Add New Task"}
            </Typography>
            <IconButton
              onClick={() => {
                setTask({
                  title: "",
                  status: "Pending",
                  createdOn: '',
                  category: "Select Category",
                  priority: "Select Priority",
                });
                setErrors({});
                onClose();
              }}>
              <CloseIcon className="text-value" />
            </IconButton>
          </Typography>

          <Typography
            sx={{
              maxHeight: '340px',
              overflowY: 'auto',
              scrollbarWidth: 'none',
              zIndex: '99999'
            }}>

            <Grid container spacing={2}>
              <Grid item xs={12} container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    placeholder="Enter Title"
                    name="title"
                    className="mt-2 inputs"
                    InputProps={{
                      classes: {
                        input: "text-value font14",
                      },
                    }}
                    fullWidth
                    value={task.title}
                    onChange={handleChange}
                    error={Boolean(errors.title)}
                    helperText={errors.title}
                    margin="normal"
                    required>
                  </TextField>
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    type="date"
                    name="endDate"
                    fullWidth
                    className="mt-2 inputs"
                    value={task.endDate}
                    onChange={handleChange}
                    margin="normal"
                    InputProps={{
                      classes: {
                        input: "text-value font14",
                      },
                    }}
                    required
                  />
                </Grid>
              </Grid>

              <Grid item xs={12} container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    name="status"
                    fullWidth
                    className="mt-0 inputs"
                    select
                    value={task.status}
                    onChange={handleChange}
                    margin="normal"
                    error={Boolean(errors.status)}
                    helperText={errors.status}
                    SelectProps={{ native: true }}
                    InputProps={{
                      classes: {
                        input: "text-value font14",
                      },
                    }}
                    required>
                    <option value="" className="text-dark">Select Status</option>
                    <option value="Pending" className="text-dark">Pending</option>
                    <option value="Ongoing" className="text-dark">Ongoing</option>
                    <option value="Completed" className="text-dark">Completed</option>
                  </TextField>
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    name="priority"
                    className="mt-0 inputs font14"
                    select
                    value={task.priority}
                    onChange={handleChange}
                    InputProps={{
                      classes: {
                        input: "text-value font14",
                      },
                    }}
                    SelectProps={{ native: true }}
                    margin="normal">
                    <option value="" className="text-dark">Select Priority</option>
                    <option value="Low" className="text-dark">Low</option>
                    <option value="Medium" className="text-dark">Medium</option>
                    <option value="High" className="text-dark">High</option>
                  </TextField>
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    name="category"
                    className="mt-0 inputs"
                    select
                    value={task.category}
                    onChange={handleChange}
                    InputProps={{
                      classes: {
                        input: "text-value font14",
                      },
                    }}
                    SelectProps={{ native: true }}
                    margin="normal"
                    required>
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.name} className="text-dark">
                        {category.name}
                      </option>
                    ))}
                  </TextField>
                </Grid>
              </Grid>

              <Grid item xs={12} container spacing={2} alignItems="center">
                <Grid item xs={10}>
                  <InputLabel className="text-value font16">Add Category</InputLabel>
                  <TextField
                    placeholder="Enter Category Name"
                    className="inputs font14 mt-1"
                    fullWidth
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    InputProps={{
                      classes: {
                        input: "text-value font14",
                      },
                    }}
                  ></TextField>
                </Grid>

                <Grid item xs={2}>
                  <Button variant="outlined" className="mt-4" onClick={handleSaveCategory} sx={{ height: '55px', width: '60px' }}>
                    {editingCategoryId ? "Update" : "Add"}
                  </Button>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <ul>
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box>
                          {category.name}
                        </Box>
                        <Box>
                          <IconButton
                            style={{ color: '#0096FF' }}
                            onClick={() => {
                              setEditingCategoryId(category.id);
                              setCategoryName(category.name);
                            }}
                            aria-label="edit">
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            style={{ color: 'red' }}
                            onClick={() => handleDeleteCategory(category.id)}
                            aria-label="delete">
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </li>
                  ))}
                </ul>
              </Grid>
            </Grid>
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button variant="contained" className="create-actions" onClick={handleSave}>
              {initialData ? "Update" : "Save"}
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default TaskModal;
