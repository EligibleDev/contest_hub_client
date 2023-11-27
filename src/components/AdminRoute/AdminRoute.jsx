import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import useRole from "../../hooks/useRole/useRole";
const AdminRoute = ({ children }) => {
    const location = useLocation();
    const [role, loading] = useRole();
    console.log(role);

    if (loading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <CircularProgress />
            </div>
        );
    } else if (role !== "admin") {
        return <Navigate state={location.pathname} to="/dashboard" />;
    }
    return children;
};

AdminRoute.propTypes = {
    children: PropTypes.node,
};
export default AdminRoute;
