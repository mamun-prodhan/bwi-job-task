import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  console.log("token private route first lie", token);

  if (token) {
    console.log("token in if", token);
    return children;
  }
  console.log("token in navigate if", token);
  return <Navigate state={location.pathname} to="/login"></Navigate>;
};

export default PrivateRoute;
