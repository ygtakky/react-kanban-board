import PeopleIcon from "@mui/icons-material/People";
import {
  Box,
  FormControl,
  FormLabel,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  MenuItem,
  Modal,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBoardMember, deleteBoardMember } from "../redux/boardMembersSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 14,
  p: 2,
  borderRadius: 4,
};

const BoardMemberModal = () => {
  const currentBoard = useSelector((state) => state.boards.currentBoard);
  const users = useSelector((state) => state.users);
  const currentUserId = useSelector((state) => state.user.id);
  const [userOptions, setUserOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch= useDispatch();

  useEffect(() => {
    const filteredUsers = users.filter((user) => {
      return user.id !== currentBoard.owner.id && user.id !== currentUserId;
    });
    setUserOptions(filteredUsers);
  }, [users, currentBoard.owner.id, currentUserId]);

  const handleAdd = (e) => {
    // check if the user already is in the board members
    const user = currentBoard.members.find((user) => user.id === e.target.value.id);
    if (!user) {
      dispatch(addBoardMember({username: e.target.value.username, boardId: currentBoard.id}));
    }
  }

  const handleDelete = (id) => {
    dispatch(deleteBoardMember({ id: id, boardId: currentBoard.id }));
  }

  return (
    <>
      <MenuItem onClick={handleOpen}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Board member settings" />
      </MenuItem>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Board Members
          </Typography>
          <Box my={2}>
            <FormControl fullWidth>
            <FormLabel>Add members</FormLabel>
            <Select value="" onChange={handleAdd}>
              {userOptions.map((user) => (
                <MenuItem key={user.id} value={user}>
                  {user.username}
                </MenuItem>
              ))}
            </Select>
            </FormControl>
          </Box>
          <Box my={2}>
            <List>
              <ListItem sx={{border: "1px solid black", borderRadius: 4}}>
                <ListItemIcon><SupervisorAccountIcon /></ListItemIcon>
                <ListItemText primary={currentBoard.owner.username} secondary="Owner" />
              </ListItem>
              {currentBoard.members.map((member) => (
                <ListItem key={member.id} sx={{border: "1px solid black", borderRadius: 4, my: 2}}>
                  <ListItemIcon><PeopleIcon /></ListItemIcon>
                  <ListItemText primary={member.username} secondary="Board member" />
                  <IconButton onClick={()=>handleDelete(member.BoardMember.id)}><DeleteIcon/></IconButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default BoardMemberModal;
