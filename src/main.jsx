import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import MainRouter from "./routers/MainRouter/MainRouter";
import Theme from "./components/Theme/Theme";
import MainProvider from "./providers/MainProvider/MainProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <MainProvider>
            <Theme>
                <RouterProvider router={MainRouter} />
            </Theme>
        </MainProvider>
    </React.StrictMode>
);
