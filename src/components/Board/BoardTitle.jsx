import { Box, IconButton, Stack, TextField, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleEditTitle, updateBoard } from "../redux/boardsSlice";

const BoardTitle = ({ currentBoard }) => {
  const [value, setValue] = useState(currentBoard.title);
  const titleEdit = useSelector((state) => state.boards.editTitle);
  const dispatch = useDispatch();

  const handleTitleEdit = () => {
    if (value !== currentBoard.title && value !== "") {
      dispatch(updateBoard({ id: currentBoard.id, title: value }));
    }
    toggleEdit();
  };

  const toggleEdit = () => {
    dispatch(toggleEditTitle());
  };

  return (
    <>
      {titleEdit ? (
        <Box m="auto">
          <TextField
            value={value}
            sx={{ backgroundColor: "white" }}
            autoFocus
            onBlur={handleTitleEdit}
            onChange={(e) => setValue(e.target.value)}
            InputProps={{
              endAdornment: (
                <Stack direction="row">
                  <IconButton onClick={handleTitleEdit}>
                    <DoneIcon />
                  </IconButton>
                  <IconButton onClick={toggleEdit}>
                    <CloseIcon />
                  </IconButton>
                </Stack>
              ),
            }}
          />
        </Box>
      ) : (
        <Stack direction={"row"} m="auto">
          <IconButton color="inherit" onClick={toggleEdit}>
            <EditIcon />
          </IconButton>
          <Typography variant="h6" m="auto">
            {currentBoard.title}
          </Typography>
        </Stack>
      )}
    </>
  );
};

export default BoardTitle;
