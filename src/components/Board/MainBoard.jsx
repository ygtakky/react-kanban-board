import { Box, Grid } from "@mui/material";
import ListCard from "../List/ListCard";
import AddList from "../List/AddList";
import { useSelector } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";

const MainBoard = () => {
  const lists = useSelector((state) => state.boards.currentBoard.lists);

  return (
    <Box m={4}>
      <DragDropContext
        onDragEnd={(values) => {
          console.log(values);
        }}
      >
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
        >
          {lists &&
            lists.map((list, index, array) => {
              return <ListCard data={list} listLength={array.length} />;
            })}
          <Grid item order={lists && lists.length + 2}>
            <AddList />
          </Grid>
        </Grid>
      </DragDropContext>
    </Box>
  );
};

export default MainBoard;
