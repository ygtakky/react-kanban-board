import { Navigate } from "react-router-dom";

const SignInWrapper = ({ children, currentUser}) => {
  return currentUser ? children : <Navigate to="/login" replace />;
};

export default SignInWrapper