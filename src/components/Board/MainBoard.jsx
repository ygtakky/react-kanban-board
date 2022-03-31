import { Box, Grid } from "@mui/material";
import ListCard from "../List/ListCard";
import AddList from "../List/AddList";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { updateCard } from "../redux/cardsSlice";
import { changeItemList, changeListItemOrder, changeListOrder } from "../redux/boardsSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MainBoard = () => {
  const lists = useSelector((state) => state.boards.currentBoard.lists);
  const boardId = useSelector((state) => state.boards.currentBoard.id);
  const isLoggedIn = useSelector(state=> state.user.isLoggedIn);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const handleDragEnd = (result) => {
    if (result.type === "LIST") {
      if (result.destination) {
        const sourceList = lists[result.source.index];
        dispatch(changeListOrder({ listId: sourceList.id, newIndex: result.destination.index }));
      }
    }
    if (result.type === "ITEM") {
      if (result.destination) {
        if (result.destination.droppableId === result.source.droppableId) {
          dispatch(changeListItemOrder({sourceIndex: result.source.index, newIndex: result.destination.index, listIndex: result.source.droppableId}))
        } else if (result.destination.droppableId !== "") {
          dispatch(changeItemList({sourceIndex: result.source.index, newIndex: result.destination.index, listIndex: result.source.droppableId, newListIndex: result.destination.droppableId}))
          dispatch(updateCard({boardId: boardId, id: lists[result.source.droppableId].cards[result.source.index].id, listId: lists[result.destination.droppableId].id}))
        }
      }
    }
  };

  return (
    <Box m={4}>
      <DragDropContext
        onDragEnd={(values) => {
          handleDragEnd(values);
        }}
      >
        <Droppable
          droppableId="droppableGrid"
          type="LIST"
          direction="horizontal"
        >
          {(provided) => {
            return (
              <Grid
                container
                gap={6}
                sx={{
                  flexDirection: "row",
                  flexWrap: "nowrap",
                  overflowX: "auto",
                  pr: 4,
                  height: "100%",
                  width: "100%",
                }}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {lists &&
                  lists.map((list, index, array) => {
                    return (
                      <ListCard
                        key={list.id}
                        data={list}
                        listLength={array.length}
                        index={index}
                      />
                    );
                  })}
                {provided.placeholder}
                <Grid item order={lists && lists.length + 2}>
                  <AddList />
                </Grid>
              </Grid>
            );
          }}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default MainBoard;
