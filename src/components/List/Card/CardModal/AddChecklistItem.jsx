import { Fab, ListItem, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createChecklistItem } from "../../../redux/checklistItemSlice";

const AddChecklistItem = ({checklistId, cardId}) => {
  const [value, setValue] = useState("");

  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(createChecklistItem({checklistId: checklistId, title: value, isChecked: false, cardId: cardId}));
    setValue("");
  }

  return (
    <ListItem disableGutters>
      <TextField fullWidth size="small" value={value} placeholder="Add a checklist item" sx={{paddingX: 2}} onChange={(e) => setValue(e.target.value)} />
      <Fab size="small" color="primary" disabled={value === ""} onClick={handleAdd}><AddIcon/></Fab>
    </ListItem>
  );
};

export default AddChecklistItem;