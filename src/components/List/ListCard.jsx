import {
  Card,
  CardContent,
  CardHeader,
  List,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddCard from "./Card/AddCard";
import ListItemCard from "./Card/ListItemCard";
import ListSettingsMenu from "./ListSettingsMenu";
import UpdateList from "./UpdateList";

const ListCard = ({ data }) => {
  const [titleEdit, setTitleEdit] = useState(false);
  const [listCards, setListCards] = useState([]);
  const cards = useSelector((state) => state.cards.cards);

  useEffect(() => {
    if (cards) {
      const newCards = cards.filter((card) => card.listId === data.id);
      setListCards(newCards);
    }
  }, [cards, data.id]);

  const handleEdit = () => {
    setTitleEdit(!titleEdit);
  };

  return (
    <>
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
          <List>
            {listCards.map((card) => (
              <ListItemCard key={card.id} data={card} />
            ))}
          </List>
        </CardContent>
      </Card>
      <AddCard id={data.id} />
    </>
  );
};

export default ListCard;
