import { Card, CardActionArea, CardHeader, ListItem, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getCardById, resetCurrentCard } from "../../redux/cardsSlice";
import CardModal from "./CardModal/CardModal";

const ListItemCard = ({data}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(getCardById({id: data.id}));
    setIsOpen(true);
  };

  const handleClose = () => {
    dispatch(resetCurrentCard())
    setIsOpen(false);
  };

  return (
    <ListItem disableGutters>
    <Card sx={{ border: "1px solid rgba(0,0,0,0.2)", boxShadow: "none", backgroundColor: "rgba(255,255,255,1)", width: "100%" }}>
      <CardActionArea disableRipple onClick={handleOpen}>
      <CardHeader title={<Typography variant="body1">{data.title}</Typography>} />
      </CardActionArea>
      <CardModal isOpen={isOpen} handleClose={handleClose} data={data} />
    </Card>
    </ListItem>
  );
};

export default ListItemCard;
