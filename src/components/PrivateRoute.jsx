import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PrivateRoute = ({ children, role }) => {
  const token = JSON.parse(sessionStorage.getItem("token")) || "";
  const roleUser = JSON.parse(sessionStorage.getItem("role")) || "";
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      if (role !== roleUser) {
        if (roleUser === "admin") {
          navigate("/home-adminLog");
        } else {
          navigate("/");
        }
      }
    }
  }, [token, role, roleUser, navigate]);

  if (!token) {
    return null; 
  }

  if (role === roleUser) {
    return children;
  }


  return null;
};

export default PrivateRoute;
