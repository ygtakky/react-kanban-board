import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getBoardById } from "../redux/boardsSlice";
import { getListsById } from "../redux/listsSlice";

const BoardCard = ({ title, id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRoute = () => {
    dispatch(getBoardById({ id: id }));
    dispatch(getListsById({ id: id }));
    navigate(`/board/${id}`);
  };

  return (
    <Card
      sx={{
        width: 175,
        height: 175,
        display: "flex",
        border: "1px solid rgba(0,0,0,0.2)",
      }}
    >
      <CardActionArea onClick={handleRoute}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
          }}
        >
          <DashboardIcon fontSize="large" />
          <Typography align="center" variant="h6" component="div">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BoardCard;
