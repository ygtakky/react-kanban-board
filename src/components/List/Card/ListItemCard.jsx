import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  ListItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getCardById, resetCurrentCard } from "../../redux/cardsSlice";
import CardModal from "./CardModal/CardModal";
import DateChip from "./DateChip";
import LabelChip from "./LabelChip";

const ListItemCard = ({ data, provided }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(getCardById({ id: data.id }));
    setIsOpen(true);
  };

  const handleClose = () => {
    dispatch(resetCurrentCard());
    setIsOpen(false);
  };

  return (
    <ListItem
      disableGutters
      {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}
    >
      <Card
        sx={{
          border: "1px solid rgba(0,0,0,0.2)",
          boxShadow: "none",
          backgroundColor: "rgba(255,255,255,1)",
          width: "100%",
        }}
      >
        <CardActionArea component="div" disableRipple onClick={handleOpen}>
          {data.labels && data.labels.length > 0 && (
            <Box sx={{ p: 2, pb: 0 }}>
              {data.labels.map((label) => (
                <LabelChip key={label.id} data={label} />
              ))}
            </Box>
          )}
          <CardHeader
            title={
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {data.title}
              </Typography>
            }
            sx={{ pb: 0 }}
          />
          <CardContent>
            {data.duedate && <DateChip data={data.duedate} />}
          </CardContent>
        </CardActionArea>
        <CardModal isOpen={isOpen} handleClose={handleClose} data={data} />
      </Card>
    </ListItem>
  );
};

export default ListItemCard;
