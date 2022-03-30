import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const CardDueDateMenu = () => {
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
    // Due date is send as a empty string and removed from the card
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleClick}>
        <CalendarTodayOutlinedIcon />
      </IconButton>
      <Menu
        id="dueDate-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText primary="Remove due date" />
        </MenuItem>
      </Menu>
    </>
  )
}

export default CardDueDateMenu;