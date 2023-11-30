import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import PropTypes from "prop-types";

const Theme = ({ children }) => {
    const theme = createTheme({
        palette: {
            primary: {
                main: "#e74c3c",
            },
            secondary: {
                main: "#fff",
            },
        },
    });

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

Theme.propTypes = {
    children: PropTypes.node,
};
export default Theme;
