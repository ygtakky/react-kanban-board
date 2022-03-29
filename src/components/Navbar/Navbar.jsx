import {
  AppBar,
  Box,
  Button,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import RegisterIcon from "@mui/icons-material/AppRegistration";
import HomeIcon from "@mui/icons-material/Home";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import BoardTitle from "../Board/BoardTitle";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const currentBoard = useSelector((state) => state.boards.currentBoard);

  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar sx={{ display: "flex" }}>
          <Stack direction={"row"} gap={2}>
            <Typography variant="h6">Kanban Board</Typography>
            <Button
              color="inherit"
              component={RouterLink}
              to="/"
              startIcon={<HomeIcon />}
            >
              Home
            </Button>
          </Stack>
          {currentBoard.title && <BoardTitle currentBoard={currentBoard} />}
          {user.isLoggedIn ? (
            <UserMenu />
          ) : (
            <Stack direction={"row"} gap={2} ml="auto">
              <Button
                color="inherit"
                component={RouterLink}
                to="/login"
                endIcon={<LoginIcon />}
              >
                Login
              </Button>
              <Button
                color="inherit"
                component={RouterLink}
                to="/register"
                endIcon={<RegisterIcon />}
              >
                Register
              </Button>
            </Stack>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
