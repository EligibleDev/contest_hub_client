import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import MainRouter from "./routers/MainRouter/MainRouter";
import Theme from "./components/Theme/Theme";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Theme>
            <RouterProvider router={MainRouter} />
        </Theme>
    </React.StrictMode>
);
