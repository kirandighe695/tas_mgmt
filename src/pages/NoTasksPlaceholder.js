import React from "react";
import { Typography } from "@mui/material";
import noImage from '../../src/assets/no.png';
import '../styles/NoTaskPlaceholder.scss';

const NoTasksPlaceholder = () => (
  <Typography className="no-tasks">
    <img src={noImage} alt="No tasks" />
    <p>No tasks available</p>
  </Typography>
);

export default NoTasksPlaceholder;
