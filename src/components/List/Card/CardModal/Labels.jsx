import {
  Box,
  Chip,
  FormControl,
  Icon,
  InputLabel,
  List,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLabel, removeLabel } from "../../../redux/labelsSlice";

const Labels = ({ data }) => {
  const labels = useSelector((state) => state.labels);
  const currentLabels = useSelector((state) => state.cards.currentCard.labels);
  const currentBoardId = useSelector((state) => state.boards.currentBoard.id);

  const dispatch = useDispatch();

  const handleChange = (value) => {
    dispatch(addLabel({ id: value, cardId: data.id,boardId: currentBoardId }));
  };

  const handleDelete = (labelId) => {
    dispatch(removeLabel({ id: labelId, cardId: data.id, boardId: currentBoardId}));
  };

  return (
    <Box my={4}>
      <Stack direction="row" gap={1} my={2}>
        <Icon>
          <LabelOutlinedIcon />
        </Icon>
        <Typography variant="body1" component="div" sx={{ fontWeight: 600 }}>
          Labels
        </Typography>
      </Stack>
      <Box sx={{ width: 200, my: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="select-label">Add Label</InputLabel>
          <Select
            labelId="select-label"
            id="select-label"
            label="Add label"
            value=""
            onChange={(e) => handleChange(e.target.value)}
          >
            {labels && labels.map((label) => {
              return (
                <MenuItem key={label.id} value={label.id}>
                  {label.title}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <List>
        {currentLabels && currentLabels.map((label) => {
          return (
            <Chip
              key={label.id}
              label={label.title}
              onDelete={() => handleDelete(label.CardLabel.id)}
              sx={{ mr: 2, backgroundColor: label.color }}
              color="primary"
            />
          );
        })}
      </List>
    </Box>
  );
};

export default Labels;
