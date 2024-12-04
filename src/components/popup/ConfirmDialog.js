import React from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Box } from "@mui/material";

const ConfirmationDialog = ({ open, onClose, onConfirm, taskTitle }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <Box className='box'>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText className="text-value">
            Are you sure you want to delete the task?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{marginRight: '16px', marginTop: '-15px'}}>
          <Button onClick={onClose} variant="outlined">
            No
          </Button>
          <Button onClick={onConfirm} variant="contained">
            Yes
          </Button>
        </DialogActions>
      </Box>

    </Dialog>
  );
};

export default ConfirmationDialog;
