import { Grid, Typography } from "@mui/material";
import AddBoard from "../Board/AddBoard";
import BoardCard from "../Board/BoardCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBoards, resetCurrentBoard } from "../redux/boardsSlice";
import { resetLists, toggleListFetching } from "../redux/listsSlice";
import { getCards } from "../redux/cardsSlice";
import { getLabels } from "../redux/labelsSlice";
import { getUsers } from "../redux/usersSlice";

const Home = () => {
  const boards = useSelector(state=>state.boards.boards)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBoards())
    dispatch(getCards());
    dispatch(getLabels());
    dispatch(getUsers());
    dispatch(resetCurrentBoard())
    dispatch(resetLists())
    dispatch(toggleListFetching(true))
  }, [dispatch])

  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "80vh"
      }}
      spacing={10}
    >
      <Grid item>
        <Typography variant="h4">Boards</Typography>
      </Grid>
      <Grid container item gap={5} justifyContent="center" maxWidth="lg">
        {boards && boards.map(board => {
          return (
            <BoardCard key={board.id} id={board.id} title={board.title}/>
          )
        })}
        <AddBoard />
      </Grid>
    </Grid>
  );
};

export default Home;
