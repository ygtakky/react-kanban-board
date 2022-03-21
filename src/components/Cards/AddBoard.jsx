import {
  Card,
  CardActionArea,
  CardContent,
  Fab,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";

const AddBoard = () => {
  return (
    <Card
      sx={{
        width: 175,
        height: 175,
        display: "flex",
        border: "1px solid rgba(0,0,0,0.2)",
      }}
    >
      <CardActionArea>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Fab color="primary" aria-label="add" size="medium" sx={{ boxShadow: "none" }}>
            <AddIcon />
          </Fab>
          <Typography align="center" variant="h6" component="div">
            Add new board
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default AddBoard;
