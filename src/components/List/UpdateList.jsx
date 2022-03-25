import {
  CardContent,
  TextField,
  IconButton,
  Stack,
} from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateList } from "../redux/listsSlice";

const UpdateList = ({ id, title, setEdit}) => {
  const [value, setValue] = useState(title);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updateList({ title: value, id: id }));
    handleClose();
  };

  const handleClose = () => {
    setEdit(false);
  };

  return (
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
        name="listTitle"
        value={value}
        autoFocus
        onChange={(e) => setValue(e.target.value)}
        InputProps={{
          endAdornment: (
            <Stack direction="row">
            <IconButton onClick={handleUpdate}>
              <DoneIcon />
            </IconButton>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
            </Stack>
          ),
        }}
      />
    </CardContent>
  );
};

export default UpdateList;
