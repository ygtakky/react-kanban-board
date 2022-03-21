import { AppBar, Box, Button, Container, Stack, Toolbar, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import RegisterIcon from "@mui/icons-material/AppRegistration";
import HomeIcon from "@mui/icons-material/Home";
import { Link as RouterLink } from "react-router-dom";

const Navbar = ({ currentUser, currentBoard }) => {
  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar sx={{display:"flex", justifyContent: "space-between"}}>
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
          { currentBoard  ? (<Typography variant="h6">Board Name</Typography>) : <div></div>}
          {currentUser ? (
            <Button color="inherit" component={RouterLink} to="/">
              Logout
            </Button>
          ) : (
            <Stack direction={"row"} gap={2}>
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
