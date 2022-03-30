import { Box, Grid } from "@mui/material";
import ListCard from "../List/ListCard";
import AddList from "../List/AddList";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { updateList } from "../redux/listsSlice";
import { updateCard } from "../redux/cardsSlice";

const MainBoard = () => {
  const lists = useSelector((state) => state.boards.currentBoard.lists);
  const boardId = useSelector((state) => state.boards.currentBoard.id);

  const dispatch = useDispatch();

  // TODO change this to be a better solution
  const handleDragEnd = (result) => {
    if (result.type === "LIST") {
      if (result.destination) {
        const sourceList = lists[result.source.index];
        const destinationList = lists[result.destination.index];
        dispatch(updateList({ id: sourceList.id, boardId: sourceList.boardId, order: destinationList.order }));
        dispatch(updateList({ id: destinationList.id, boardId: sourceList.boardId, order: sourceList.order }));
      }
    }
    if (result.type === "ITEM") {
      if (result.destination) {
        const sourceCard = lists[result.source.droppableId].cards[result.source.index];
        const destinationList = lists[result.destination.droppableId];
        const destinationCard = destinationList.cards[result.destination.index];
        if (sourceCard.listId !== destinationList.id) {
          if (!destinationCard) {
            dispatch(updateCard({ id: sourceCard.id, listId: destinationList.id, boardId: boardId}));
          } else {
            dispatch(updateCard({ id: sourceCard.id, listId: destinationList.id, boardId: boardId, order: destinationCard.order }));
          }
        } else {
          dispatch(updateCard({ id: sourceCard.id, boardId: boardId, order: destinationCard.order }));
          dispatch(updateCard({ id: destinationCard.id, boardId: boardId, order: sourceCard.order }));
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
