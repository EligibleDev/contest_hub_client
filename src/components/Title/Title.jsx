import { Typography } from "@mui/material";
import PropTypes from "prop-types";

const Title = ({ text }) => {
    return (
        <>
            <Typography
                gutterBottom
                sx={{
                    fontWeight: "700",
                    fontSize: "2.5rem",
                    textTransform: "capitalize",
                }}
                variant="h2"
            >
                {text}
            </Typography>

            <div className="title-divider"></div>
        </>
    );
};

Title.propTypes = {
    text: PropTypes.node,
};
export default Title;
