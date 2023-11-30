import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import useRole from "../../hooks/useRole/useRole";

const CreatorRoute = ({ children }) => {
    const location = useLocation();
    const [role, isLoading] = useRole();

    if (isLoading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <CircularProgress />
            </div>
        );
    } else if (role !== 'creator') {
        return <Navigate state={location.pathname} to="/dashboard" />;
    }

    return children;
};

CreatorRoute.propTypes = {
    children: PropTypes.node,
};
export default CreatorRoute;
