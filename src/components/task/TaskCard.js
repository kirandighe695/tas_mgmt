import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Checkbox,
  Tooltip,
  FormControlLabel,
  CircularProgress
} from "@mui/material";
import ConfirmationDialog from "../popup/ConfirmDialog.js";
import "../../styles/TaskCard.scss";
import SubTaskModal from './SubTaskModal.js'

const TaskCard = ({ task, onAction }) => {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isSubtasksDialogOpen, setSubtasksDialogOpen] = useState(false);
  const [subtasks, setSubtasks] = useState([]);

  if (!task) return null;

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    onAction("delete", task.id);
    setDeleteDialogOpen(false);
  };

  const handleSubtasksDialogOpen = () => {
    setSubtasksDialogOpen(true);
  };

  const handleCloseSubtasksDialog = () => {
    setSubtasksDialogOpen(false);
  };

  const handleUpdateSubtasks = (updatedSubtasks) => {
    setSubtasks(updatedSubtasks);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "#b3b335";
      case "ongoing":
        return "#87CEEB";
      case "completed":
        return "green";
      default:
        return "gray";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "#FF0000";
      case "medium":
        return "#0000FF";
      case "low":
        return "#90EE";
      default:
        return "gray";
    }
  };

  const getProgressValue = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return 0;
      case "ongoing":
        return 50;
      case "completed":
        return 100;
      default:
        return 0;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const isEndDateApproaching = (endDate) => {
    const currentDate = new Date();
    const taskEndDate = new Date(endDate);
    const timeDifference = taskEndDate - currentDate;
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference >= 0 && daysDifference <= 2;
  };

  return (
    <>
      <Card className={`task-card mt-0 ${isEndDateApproaching(task.endDate) && task.status.toLowerCase() !== 'completed' ? 'highlight' : ''}`}>
        <CardContent>
          <FormControlLabel
            control={
              <Checkbox
                color="success"
                checked={task.status === 'Completed'}
                onChange={(e) => {
                  if (task.status === 'Completed') {
                    onAction("incomplete", task.id);
                  } else {
                    onAction("complete", task.id);
                  }
                }}
              />
            }
            sx={{ float: "right", marginTop: "-5px", marginRight: "-22px" }}
          />

          <Tooltip title={task.title}>
            <Typography
              variant="h6"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}>
              {task.title}
            </Typography>
          </Tooltip>

          <Typography sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
            <Typography variant="body2">{task.category}</Typography>
            <Typography variant="body2"
              fontWeight={700}
              sx={{
                color: getPriorityColor(task.priority),
              }}>
              {task.priority}
            </Typography>

            <Typography
              variant="body2"
              fontWeight={700}
              sx={{
                color: getStatusColor(task.status),
              }}>
              {task.status}
            </Typography>
          </Typography>

          <Typography sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>
              <Typography variant="body2" sx={{ marginTop: '5px' }}>Created date : {task.createdOn}</Typography>
              <Typography variant="body2" sx={{ marginTop: '5px' }}>End date : {formatDate(task.endDate)}</Typography>
            </Typography>

            <div style={{ position: 'sticky', top: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
              <CircularProgress
                variant="determinate"
                value={getProgressValue(task.status)}
                sx={{
                  color: getStatusColor(task.status),
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  position: 'absolute',
                  color: getStatusColor(task.status),
                }}>
                {getProgressValue(task.status)}%
              </Typography>
            </div>
          </Typography>
        </CardContent>

        <CardActions className="task-actions">
          <Button onClick={handleSubtasksDialogOpen}>
            Subtasks
          </Button>
          <Button size="small" onClick={() => onAction("edit", task.id)}>
            Edit
          </Button>
          <Button size="small" color="warning" onClick={handleDeleteClick}>
            Delete
          </Button>
        </CardActions>
      </Card>

      <ConfirmationDialog
        open={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
        taskTitle={task.title}
      />

      <SubTaskModal
        open={isSubtasksDialogOpen}
        onClose={handleCloseSubtasksDialog}
        subtasks={subtasks}
        onUpdateSubtasks={handleUpdateSubtasks}
        taskId={task.id}
      />
    </>
  );
};

export default TaskCard;
