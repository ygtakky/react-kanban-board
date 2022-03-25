import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createList } from "../redux/listsSlice";

const AddList = () => {
  const [inputState, setInputState] = useState(false);
  const [value, setValue] = useState("");
  const currentBoard = useSelector(state=>state.boards.currentBoard);
  const dispatch = useDispatch();

  const handleInput = () => {
    setInputState((prev) => !prev);
  };

  const handleAdd = () => {
    dispatch(createList({title: value, boardId: currentBoard.id}))
    setValue("")
    setInputState(false);
  }

  return (
    <Card
      sx={{
        width: 300,
        minHeight: 80,
        display: "flex",
        border: "1px solid rgba(0,0,0,0.2)",
        alignSelf: "flex-start",
      }}
    >
      {inputState ? (
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 2,
          }}
        >
          <TextField
            required
            fullWidth
            id="listTitle"
            label="List title"
            name="listTitle"
            value={value}
            autoFocus
            onChange={(e) => setValue(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleInput}>
                  <CloseIcon />
                </IconButton>
              ),
            }}
          />
          <Button variant="contained" onClick={handleAdd}>Add</Button>
        </CardContent>
      ) : (
        <CardActionArea onClick={handleInput}>
          <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <AddIcon />
            <Typography variant="h6" component="div">
              Add a list
            </Typography>
          </CardContent>
        </CardActionArea>
      )}
    </Card>
  );
};

export default AddList;
