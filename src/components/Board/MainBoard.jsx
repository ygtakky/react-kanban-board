import { Box, Grid } from "@mui/material";
import ListCard from "../List/ListCard";
import AddList from "../List/AddList";
import { useSelector } from "react-redux";

const MainBoard = () => {
  const lists = useSelector((state) => state.lists);

  return (
    <Box m={4}>
      <Grid container gap={6}>
        {lists &&
          lists.map((list) => {
            return (
              <Grid item key={list.id}>
                <ListCard data={list} />
              </Grid>
            );
          })}
        <Grid item>
          <AddList />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainBoard;
