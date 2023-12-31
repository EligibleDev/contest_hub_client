import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import useMain from "../../hooks/useMain/useMain";

const PrivateRoute = ({ children }) => {
    const location = useLocation();

    const { user, loading } = useMain();

    if (loading) {
        return (
            <div className="h-screen flex justify-center items-center">
                 <CircularProgress />
            </div>
        );
    } else if (!user?.email) {
        return <Navigate state={location.pathname} to="/login"/>
    }

    return children;
};

PrivateRoute.propTypes = {
    children: PropTypes.node,
};
export default PrivateRoute;