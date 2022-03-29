import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton, ListItemIcon, ListItemText } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from "react-redux";
import { deleteChecklist } from "../../../redux/checklistSlice";

const CardChecklistSettings = ({id, cardId, setEdit }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch()

  const handleDelete = () => {
    dispatch(deleteChecklist({id: id, cardId: cardId}));
    handleClose();
  }

  const handleEdit = () => {
    setEdit();
    handleClose();
  }

  return (
    <>
      <IconButton id="checklist-menu-button" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="checklist-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText primary="Remove Checklist" />
        </MenuItem>
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText primary="Rename Checklist" />
        </MenuItem>
      </Menu>
    </>
  );
}

export default CardChecklistSettings;