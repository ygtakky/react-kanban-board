import { Card, CardContent, CardHeader, Grid, List } from "@mui/material";

import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import AddCard from "./Card/AddCard";
import ListItemCard from "./Card/ListItemCard";
import ListSettingsMenu from "./ListSettingsMenu";
import UpdateList from "./UpdateList";

const ListCard = ({ data, listLength}) => {
  const [titleEdit, setTitleEdit] = useState(false);

  const handleEdit = () => {
    setTitleEdit(!titleEdit);
  };

  return (
    <Grid item key={data.id} order={data.order || listLength + 1}>
      <Card
        sx={{
          width: 300,
          minHeight: 80,
          display: "flex",
          flexDirection: "column",
          border: "1px solid rgba(0,0,0,0.2)",
          borderBottom: "none",
          borderRadius: "4px 4px 0px 0px",
          backgroundColor: "rgba(255,255,255,0.5)",
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
          <Droppable droppableId={data.title} type="ITEM" >
            {(provided, snapshot) => {
              return (
                <List
                  sx={{ maxHeight: 330, overflowY: "auto" }}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {data.cards.map((card, index) => {
                    return (
                      <Draggable key={card.id} draggableId={card.title} index={index} >
                        {(provided, snapshot) => {
                          return (
                            <ListItemCard data={card} provided={provided} />
                          )
                        }}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </List>
              );
            }}
          </Droppable>
        </CardContent>
      </Card>
      <AddCard id={data.id} boardId={data.boardId} />
    </Grid>
  );
};

export default ListCard;
