import { createContext } from "react";
import PropTypes from "prop-types";

export const MainContext = createContext();
const MainProvider = ({ children }) => {
    const server = "http://localhost:5000";

    const categories = [
        { label: "All", value: "" },
        { label: "Business Contest", value: "business" },
        { label: "Medical Contest", value: "medical" },
        { label: "Article Writing", value: "article" },
        { label: "Gaming Contest", value: "gaming" },
    ];

    const values = { server, categories };

    return <MainContext.Provider value={values}>{children}</MainContext.Provider>;
};

MainProvider.propTypes = {
    children: PropTypes.node,
};
export default MainProvider;
