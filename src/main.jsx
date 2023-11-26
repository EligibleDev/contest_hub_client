import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import MainRouter from "./routers/MainRouter/MainRouter";
import Theme from "./components/Theme/Theme";
import MainProvider from "./providers/MainProvider/MainProvider";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <MainProvider>
            <Theme>
                <Toaster />
                <RouterProvider router={MainRouter} />
            </Theme>
        </MainProvider>
    </React.StrictMode>
);
