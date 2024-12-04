import React, { useState, useEffect } from "react";
import { Button, TextField, List, ListItem, ListItemText, IconButton, Typography, Dialog, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

const SubTaskModal = ({ open, onClose, taskId }) => {
    const [subtasks, setSubtasks] = useState([]);
    const [currentSubtask, setCurrentSubtask] = useState({ title: '', index: null });

    useEffect(() => {
        const savedSubtasks = JSON.parse(localStorage.getItem('subtasks')) || [];
        const filteredSubtasks = savedSubtasks.filter(subtask => subtask.taskId === taskId);
        setSubtasks(filteredSubtasks);
    }, [taskId]);

    const onUpdateSubtasks = (updatedSubtasks) => {
        setSubtasks(updatedSubtasks);
        const allSubtasks = JSON.parse(localStorage.getItem('subtasks')) || [];
        const newSubtasks = allSubtasks.filter(subtask => subtask.taskId !== taskId).concat(updatedSubtasks);
        localStorage.setItem('subtasks', JSON.stringify(newSubtasks));
    };

    const handleAddOrUpdateSubtask = () => {
        if (currentSubtask.index === null) {
            onUpdateSubtasks([...subtasks, { title: currentSubtask.title, taskId }]);
        } else {
            const updatedSubtasks = subtasks.map((subtask, index) =>
                index === currentSubtask.index ? { title: currentSubtask.title, taskId: subtask.taskId } : subtask
            );
            onUpdateSubtasks(updatedSubtasks);
        }
        setCurrentSubtask({ title: '', index: null });
    };

    const handleEditSubtask = (index) => {
        setCurrentSubtask({ title: subtasks[index].title, index });
    };

    const handleDeleteSubtask = (index) => {
        const updatedSubtasks = subtasks.filter((_, i) => i !== index);
        onUpdateSubtasks(updatedSubtasks);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <Box className='box' padding={2} sx={{ width: '400px' }}>
                <Typography sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: '20px', fontWeight: '500' }}>Add SubTask</Typography>
                    <IconButton
                        onClick={() => {
                            setCurrentSubtask({
                                title: "",
                            });
                            onClose();
                        }}>
                        <CloseIcon className="text-value" />
                    </IconButton>
                </Typography>
                <TextField
                    placeholder="Enter Subtask Title"
                    className="inputs mt-2"
                    InputProps={{
                        classes: {
                            input: "text-value font14",
                        },
                    }}
                    sx={{ marginTop: '10px' }}
                    value={currentSubtask.title}
                    onChange={(e) => setCurrentSubtask({ ...currentSubtask, title: e.target.value })}
                    fullWidth
                />
                <Button variant="contained" onClick={handleAddOrUpdateSubtask} style={{ marginTop: '30px', marginLeft: '110px' }}>
                    {currentSubtask.index === null ? 'Add Subtask' : 'Update Subtask'}
                </Button>
                <List>
                    {subtasks.map((subtask, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={subtask.title} />
                            <IconButton onClick={() => handleEditSubtask(index)} className="text-value font14">
                                <EditIcon sx={{ color: '#0096FF' }} />
                            </IconButton>
                            <IconButton onClick={() => handleDeleteSubtask(index)} className="text-value font14">
                                <DeleteIcon sx={{ color: 'red' }} />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Dialog>
    );
};

export default SubTaskModal;