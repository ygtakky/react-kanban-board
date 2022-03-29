import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { CardActionArea, CardContent, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/AddCircle";
import { useDispatch } from "react-redux";
import { createBoard } from "../redux/boardsSlice";

const AddDialog = () => {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (value) {
      dispatch(createBoard({title: value}));
      handleClose();
    }
  }

  return (
    <>
      <CardActionArea onClick={handleClickOpen}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
          }}
        >
          <AddIcon fontSize="large" />
          <Typography align="center" variant="h6" component="div">
            Add new board
          </Typography>
        </CardContent>
      </CardActionArea>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Board</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the new board name!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Board Name"
            type="text"
            fullWidth
            variant="standard"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Confirm</Button>
        </DialogActions>
      </Dialog>
      </>
  );
};

export default AddDialog;
