import {
  Box,
  Modal,
  AppBar,
  Toolbar,
  Stack,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Checklist from "./Checklist";
import CardSettingsMenu from "./CardSettingsMenu";
import CardDueDateMenu from "./CardDueDateMenu";
import CardChecklistMenu from "./CardChecklistMenu";
import Comment from "./Comment";
import Comments from "./Comments";
import { updateCard } from "../../../redux/cardsSlice";
import Labels from "./Labels";

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
  const boardId = useSelector((state) => state.boards.currentBoard.id);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    setTitle(card.title);
    setDueDate(card.duedate);
    setDescription(card.description);
  }, [card]);

  const handleTitleChange = () => {
    dispatch(updateCard({ id: card.id, title: title, boardId: boardId }));
  };

  const handleDueDateChange = () => {
    dispatch(updateCard({ id: card.id, duedate: dueDate, boardId: boardId }));
  };

  const handleDescriptionChange = () => {
    dispatch(
      updateCard({ id: card.id, description: description, boardId: boardId })
    );
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={style}>
        <AppBar sx={{ position: "static", borderTop: "1px solid #141731" }}>
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
        <Box p={4} sx={{ height: "92%", overflowY: "scroll" }}>
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
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleTitleChange}
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
              onChange={(e) => setDueDate(e.target.value)}
              onBlur={handleDueDateChange}
            />
          </Stack>
          <Box my={4}>
            <TextField
              fullWidth
              placeholder="Description"
              id="description"
              multiline
              value={description}
              minRows={4}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={handleDescriptionChange}
            />
          </Box>
          <Labels data={card} />
          {card && card.checklists &&
            card.checklists.map((checklist) => (
              <Checklist key={checklist.id} data={checklist} />
            ))}
          <Comment />
          <Comments />
        </Box>
      </Box>
    </Modal>
  );
};

export default CardModal;
