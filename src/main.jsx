import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import MainRouter from "./routers/MainRouter/MainRouter";
import Theme from "./components/Theme/Theme";
import MainProvider from "./providers/MainProvider/MainProvider";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <MainProvider>
            <Theme>
                <QueryClientProvider client={queryClient}>
                    <Toaster />
                    <RouterProvider router={MainRouter} />
                </QueryClientProvider>
            </Theme>
        </MainProvider>
    </React.StrictMode>
);
