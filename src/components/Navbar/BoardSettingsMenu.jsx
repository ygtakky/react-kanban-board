import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { deleteBoard } from "../redux/boardsSlice";
import { resetAction } from "../redux/store";

const BoardSettingsMenu = ({ setEdit }) => {
  const currentBoard = useSelector((state) => state.boards.currentBoard);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteBoard({ id: currentBoard.id }));
    handleClose();
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(resetAction());
  };

  return (
    <>
      <IconButton
        color="inherit"
        id="board-settings-button"
        onClick={handleClick}
      >
        <SettingsIcon />
      </IconButton>
      <Menu
        id="board-settings"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "board-settings-button",
        }}
      >
        <MenuItem component={RouterLink} to="/" onClick={handleDelete}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText primary="Delete board" />
        </MenuItem>
        <MenuItem component={RouterLink} to="/login" onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>
    </>
  );
};

export default BoardSettingsMenu;
