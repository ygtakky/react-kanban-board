import { Grid, Typography } from "@mui/material";
import AddBoard from "../Cards/AddBoard";
import BoardCard from "../Cards/BoardCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBoards } from "../redux/boardsSlice";

const Home = () => {
  const boards = useSelector(state=>state.boards.boards)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBoards())
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
