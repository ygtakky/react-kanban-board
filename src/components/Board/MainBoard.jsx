import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Fab,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const MainBoard = () => {
  return (
    <Box m={4}>
    <Card
      sx={{
        width: 300,
        height: 80,
        display: "flex",
        border: "1px solid rgba(0,0,0,0.2)",
        alignSelf: "flex-start"
      }}
    >
      <CardActionArea>
        <CardContent sx={{display: "flex", alignItems: "center", gap: 2}}>
          <Fab
            color="primary"
            aria-label="add"
            size="small"
            sx={{ boxShadow: "none" }}
          >
            <AddIcon />
          </Fab>
          <Typography variant="h6" component="div">
            Add a list
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Box>
  );
};

export default MainBoard;
