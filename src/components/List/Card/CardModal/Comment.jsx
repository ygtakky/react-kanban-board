import { Box, Button, Icon, Stack, TextField, Typography } from "@mui/material";
import AddCommentIcon from "@mui/icons-material/AddCommentOutlined";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../../redux/commentsSlice";

const Comment = () => {
  const [comment, setComment] = useState("");
  const cardId = useSelector((state) => state.cards.currentCard.id);

  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(createComment({message: comment, cardId: cardId}));
    setComment("");
  };

  return (
    <Box>
      <Stack direction="row" gap={1} my={2} alignItems="center">
        <Icon>
          <AddCommentIcon />
        </Icon>
        <Typography
          variant="body1"
          component="div"
          sx={{ fontWeight: 600, mr: "auto" }}
        >
          Comment
        </Typography>
      </Stack>
      <Box my={2}>
        <TextField
          fullWidth
          placeholder="Write a comment..."
          id="description"
          multiline
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          minRows={2}
          sx={{marginBottom: 2}}
        />
        <Button variant="contained" disabled={comment === ""} onClick={handleAdd} >Add</Button>
      </Box>
    </Box>
  );
};

export default Comment;
