import { useNavigate } from "react-router-dom";
const PrivateRoute = ({ children, role }) => {
  const token = JSON.parse(sessionStorage.getItem("token")) || "";
  const roleUser = JSON.parse(sessionStorage.getItem("role")) || "";

  const navigate = useNavigate();

  if (!token) {
    navigate("/login");
  } else {
    if (role === roleUser) {
      return children;
    } else {
      if (roleUser === "admin") {
        navigate("/home-adminLog");
      } else {
        navigate("/");
      }
    }
  }
};
export default PrivateRoute;
