import React from "react";
import { Grid, Typography } from "@mui/material";
import TaskCard from "./TaskCard";

const TaskList = ({ displayedTasks, onAction }) => {

  return (
    <Typography className="task-list">
      <Grid container spacing={2} className="task-list">
        {displayedTasks.map((task) => (
          <Grid item xs={12} sm={6} md={3} key={task.id}>
            <TaskCard task={task} onAction={onAction} />
          </Grid>
        ))}
      </Grid>
    </Typography>
  )
};

export default TaskList;
