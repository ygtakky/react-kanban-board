import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const SignInWrapper = ({ children }) => {
  const {isLoggedIn} = useSelector(state=>state.user)
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default SignInWrapper