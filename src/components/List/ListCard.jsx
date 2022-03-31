import { Card, CardContent, CardHeader, Grid, List } from "@mui/material";

import React, { useMemo, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { updateList } from "../redux/listsSlice";
import AddCard from "./Card/AddCard";
import ListItemCard from "./Card/ListItemCard";
import ListSettingsMenu from "./ListSettingsMenu";
import UpdateList from "./UpdateList";

const ListCard = ({ data, index, listLength }) => {
  const [titleEdit, setTitleEdit] = useState(false);
  const dispatch = useDispatch();

  const handleEdit = () => {
    setTitleEdit(!titleEdit);
  };

  useMemo(() => {
    dispatch(updateList({ id: data.id, boardId: data.boardId, order: index }));
  }, [dispatch, data.id, data.boardId, index]);

  return (
    <Draggable draggableId={data.id.toString()} index={index}>
      {(provided) => {
        return (
          <Grid item {...provided.draggableProps} ref={provided.innerRef} >
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
                <UpdateList
                  setEdit={handleEdit}
                  title={data.title}
                  id={data.id}
                />
              ) : (
                <CardHeader
                {...provided.dragHandleProps}
                  title={data.title}
                  action={
                    <ListSettingsMenu id={data.id} setEdit={handleEdit} />
                  }
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
                <Droppable droppableId={index.toString()} type="ITEM">
                  {(provided, snapshot) => {
                    return (
                      <List
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          maxHeight: 330,
                          overflowY: "auto",
                        }}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {data.cards.map((card, index, array) => {
                          return (
                            <Draggable
                              key={card.id}
                              draggableId={card.title}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <ListItemCard
                                    data={card}
                                    provided={provided}
                                    listLength={array.length}
                                    index={index}
                                  />
                                );
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
      }}
    </Draggable>
  );
};

export default ListCard;
