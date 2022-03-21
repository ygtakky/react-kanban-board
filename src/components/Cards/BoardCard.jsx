import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import React from "react";
import { useNavigate } from "react-router-dom";

const BoardCard = ({ title }) => {
  let navigate = useNavigate();

  const handleRoute = () => {
    navigate("/board", {replace:true})
  }

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
