import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ListSettingsMenu from "./ListSettingsMenu";
import UpdateList from "./UpdateList";

const ListCard = ({ data }) => {
  const [titleEdit, setTitleEdit] = useState(false);

  const handleEdit = () => {
    setTitleEdit(!titleEdit);
  };

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
      {titleEdit ? (
        <UpdateList setEdit={handleEdit} title={data.title} id={data.id} />
      ) : (
        <CardHeader
          title={data.title}
          action={<ListSettingsMenu id={data.id} setEdit={handleEdit} />}
        />
      )}
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
        }}
      >
        <List disablePadding>
          <Divider />
          <ListItem disableGutters>
            <Typography variant="body1">list item 1</Typography>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default ListCard;
