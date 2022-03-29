import { Box, Divider, Icon, List, Stack, Typography, TextField } from "@mui/material";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import React, { useState } from "react";
import {useDispatch} from "react-redux";
import { updateChecklist } from "../../../redux/checklistSlice";
import ChecklistItem from "./ChecklistItem";
import AddChecklistItem from "./AddChecklistItem";
import CardChecklistSettings from "./CardChecklistSettings";

const Checklist = ({ data }) => {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(data.title)

  const dispatch = useDispatch();

  const handleEdit = () => {
    setEdit((prev) => !prev);
  };

  const handleTitleUpdate = () => {
    dispatch(updateChecklist({ id: data.id, title: title, cardId: data.cardId }));
    setEdit(false);
  };

  return (
    <Box my={4}>
      <Stack direction="row" gap={1} my={2} alignItems="center">
        <Icon>
          <CheckBoxOutlinedIcon />
        </Icon>
        {edit ? (
          <TextField value={title} sx={{mr: "auto"}} onChange={(e) => setTitle(e.target.value)} onBlur={handleTitleUpdate} />
        ) : (
          <Typography
            variant="body1"
            component="div"
            sx={{ fontWeight: 600, mr: "auto" }}
          >
            {data && data.title}
          </Typography>
        )}
        <CardChecklistSettings
          id={data.id}
          cardId={data.cardId}
          setEdit={handleEdit}
        />
      </Stack>
      <Divider sx={{ my: 2 }} />
      <List disablePadding>
        {data.items &&
          data.items.map((item) => <ChecklistItem key={item.id} data={item} />)}
        <AddChecklistItem checklistId={data.id} cardId={data.cardId} />
      </List>
    </Box>
  );
};

export default Checklist;