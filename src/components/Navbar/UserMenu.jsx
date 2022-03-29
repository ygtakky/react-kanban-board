// Menu that is displayed when a board is selected in the navbar
import { Box, Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetAction } from "../redux/store";
import BoardSettingsMenu from "./BoardSettingsMenu";

const UserMenu = () => {
  const currentBoard = useSelector(state=>state.boards.currentBoard);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(resetAction());
  };

  return (
    <Box ml="auto">
      {currentBoard.title ? (
        <BoardSettingsMenu />
      ) : (
        <Button
          color="inherit"
          component={RouterLink}
          to="/login"
          endIcon={<LogoutIcon />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      )}
    </Box>
  );
};

export default UserMenu;
