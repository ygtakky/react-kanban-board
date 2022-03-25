import {
  Card,
} from "@mui/material";
import React from "react";
import AddDialog from "./AddDialog";

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
    <AddDialog/>
    </Card>
  );
};

export default AddBoard;
