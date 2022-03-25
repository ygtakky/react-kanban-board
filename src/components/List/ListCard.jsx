import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import ListSettingsMenu from "./ListSettingsMenu";

const ListCard = ({ data }) => {
  return (
    <Card
      sx={{
        width: 300,
        minHeight: 80,
        display: "flex",
        flexDirection: "column",
        border: "1px solid rgba(0,0,0,0.2)",
        alignSelf: "flex-start",
      }}
    >
      <CardHeader
        title={data.title}
        action={
          <ListSettingsMenu id={data.id}/>
        }
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
        }}
      >
        <List disablePadding>
          <Divider/>
          <ListItem disableGutters>
            <Typography variant="body1">list item 1</Typography>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default ListCard;
