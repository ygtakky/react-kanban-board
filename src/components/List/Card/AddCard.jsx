import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Icon,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {createCard} from '../../redux/cardsSlice'

const AddCard = ({ id, boardId }) => {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch()

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setValue("");
    setIsOpen(false);
  };

  const handleAdd = () => {
    if (value) {
      dispatch(createCard({ title: value, listId: id, boardId: boardId }));
      handleClose();
    }
  };

  return (
    <Card
      sx={{
        border: "1px solid rgba(0,0,0,0.2)",
        borderRadius: "0px 0px 4px 4px",
        backgroundColor: "rgba(255,255,255,0.5)",
      }}
    >
      {isOpen ? (
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
            id="cardTitle"
            label="Card title"
            name="cardTitle"
            value={value}
            autoFocus
            onChange={(e) => setValue(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              ),
            }}
          />
          <Button variant="contained" onClick={handleAdd}>Add</Button>
        </CardContent>
      ) : (
        <CardActionArea onClick={handleOpen}>
          <CardContent sx={{ display: "flex" }}>
            <Icon fontSize="medium">
              <AddIcon />
            </Icon>
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                lineHeight: "inherit",
              }}
              variant="body1"
              component="p"
            >
              Add a card
            </Typography>
          </CardContent>
        </CardActionArea>
      )}
    </Card>
  );
};

export default AddCard;
