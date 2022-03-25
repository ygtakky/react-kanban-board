import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import SignInWrapper from "./components/Auth/SingInWrapper";
import MainBoard from "./components/Board/MainBoard";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";


function App() {
  return (
    <Box>
      <Navbar currentBoard={1} />
      <Box sx={{display: "flex"}} mt={8}>
      <Routes>
        <Route path='/' element={<SignInWrapper><Home/></SignInWrapper>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/board/:id" element={<MainBoard/>}/>
      </Routes>
      </Box>
    </Box>
  );
}

export default App;
