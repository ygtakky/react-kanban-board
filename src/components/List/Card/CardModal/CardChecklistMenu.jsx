import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createChecklist } from "../../../redux/checklistSlice";

const CardChecklistMenu = ({ cardId }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setValue("");
  };
  const [value, setValue] = useState("");

  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(createChecklist({ title: value, cardId: cardId }));
    setValue("");
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleClick}>
        <CheckBoxOutlinedIcon />
      </IconButton>
      <Menu
        id="dueDate-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem disableRipple sx={{":hover": {backgroundColor: "inherit", cursor: "default"}}} onKeyDown={e => e.stopPropagation()}>
        <Stack gap={2} m={2} mt={0}>
          <TextField
            required
            id="ChecklistTitle"
            label="Checklist Title"
            name="ChecklistTitle"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              ),
            }}
          />
          <Button
            variant="contained"
            disabled={value === ""}
            onClick={handleAdd}
          >
            Add
          </Button>
        </Stack>
        </MenuItem>
      </Menu>
    </>
  );
};

export default CardChecklistMenu;
