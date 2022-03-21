import { Grid, Typography } from "@mui/material";
import AddBoard from "../Cards/AddBoard";
import BoardCard from "../Cards/BoardCard";

const Home = () => {
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
        <BoardCard title="Board 1" />
        <BoardCard title="Board 2" />
        <BoardCard title="Board 3"/>
        <AddBoard />
      </Grid>
    </Grid>
  );
};

export default Home;
