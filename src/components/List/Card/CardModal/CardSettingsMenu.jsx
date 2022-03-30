import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCard } from "../../../redux/cardsSlice";

const CardSettingsMenu = ({id}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const boardId = useSelector((state) => state.boards.currentBoard.id);

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteCard({id : id, boardId: boardId}));
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleClick}>
        <MoreHorizOutlinedIcon />
      </IconButton>
      <Menu
        id="card-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText primary="Remove Card" />
        </MenuItem>
      </Menu>
    </>
  );
};

export default CardSettingsMenu;
