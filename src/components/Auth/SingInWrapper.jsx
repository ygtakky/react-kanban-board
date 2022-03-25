import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { setIsLoggedIn } from "../redux/userSlice";

const SignInWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  if (token) {
    dispatch(setIsLoggedIn({isLoggedIn: true}));
  }
  return token ? children : <Navigate to="/login" replace />;
};

export default SignInWrapper