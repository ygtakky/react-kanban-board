import {
  Box,
  Modal,
  AppBar,
  Toolbar,
  Typography,
  Stack,
  IconButton,
  TextField,
  Icon,
  Autocomplete,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Checklist from "./Checklist";
import CardSettingsMenu from "./CardSettingsMenu";
import CardDueDateMenu from "./CardDueDateMenu";
import CardChecklistMenu from "./CardChecklistMenu";
import Comment from "./Comment";
import Comments from "./Comments";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 820,
  height: "93vh",
  bgcolor: "background.paper",
  boxShadow: 5,
  borderRadius: "4px",
};

const CardModal = ({ isOpen, handleClose }) => {
  const card = useSelector((state) => state.cards.currentCard);
  const labels = useSelector((state) => state.labels);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    setTitle(card.title);
    setDueDate(card.dueDate);
  }, [card]);

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={style}>
        <AppBar sx={{position:"static", borderTop: "1px solid #141731" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Stack direction="row" gap={2}>
              <CardDueDateMenu boardId={card.boardId} />
              <CardChecklistMenu cardId={card.id} />
              <CardSettingsMenu id={card.id} boardId={card.boardId} />
            </Stack>
            <IconButton color="inherit" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box p={4} sx={{height: "92%",overflowY: "scroll"}}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <TextField
              required
              size="small"
              label="Title"
              value={title}
              sx={{ width: 500 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              size="small"
              id="date"
              label="Due date"
              type="date"
              value={dueDate}
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Stack>
          <Box my={4}>
            <TextField
              fullWidth
              placeholder="Description"
              id="description"
              multiline
              value={card.description}
              minRows={4}
            />
          </Box>
          <Box my={4}>
            <Stack direction="row" gap={1} my={2}>
              <Icon>
                <LabelOutlinedIcon />
              </Icon>
              <Typography variant="body1" component="div" sx={{fontWeight: 600}}>
                Labels
              </Typography>
            </Stack>
            <Autocomplete
              multiple
              id="tags"
              options={labels}
              getOptionLabel={(option) => option.title}
              renderOption={(props, option) => {
                  return (<Box {...props} sx={{ width: "100%" }}><Typography variant="body2">{option.title}</Typography></Box>)
              }}
              renderTags={(value, getTagProps) => {
                return value.map((option, index) => (
                  <Chip label={option.title} {...getTagProps({ index })} sx={{backgroundColor: option.color, color: "white"}} />
                ));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Labels"
                  placeholder="Labels"
                />
              )}
            />
          </Box>
          {card.checklists && card.checklists.map((checklist) => (
            <Checklist key={checklist.id} data={checklist} />
          ))}
          <Comment/>
          <Comments/>
        </Box>
      </Box>
    </Modal>
  );
};

export default CardModal;
