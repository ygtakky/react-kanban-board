import { Checkbox, IconButton, ListItem, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteChecklistItem, updateChecklistItem } from "../../../redux/checklistItemSlice";

const ChecklistItem = ({data}) => {
  const [title, setTitle] = useState(data.title);
  const cardId = useSelector(state=>state.cards.currentCard.id);
  const dispatch = useDispatch();

  const handleTitleChange = () => {
    dispatch(updateChecklistItem({id: data.id, title: title, cardId: cardId}));
  }

  const handleCheckboxChange = () => {
    dispatch(updateChecklistItem({id: data.id, isChecked: !data.isChecked, cardId: cardId}));
  }

  const handleDelete = () => {
    dispatch(deleteChecklistItem({id: data.id, cardId: cardId}));
  }

  return (
    <ListItem disableGutters>
      <Checkbox color="secondary" checked={data.isChecked} onChange={handleCheckboxChange} />
      <TextField fullWidth size="small" value={title} sx={{ mx: 2 }} onChange={(e)=>setTitle(e.target.value)} onBlur={handleTitleChange} />
      <IconButton color="secondary" onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

export default ChecklistItem;
