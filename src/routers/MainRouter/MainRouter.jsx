import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import Home from "../../pages/Home/Home";
import Contests from "../../pages/Contests/Contests";

const MainRouter = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/contests",
                element: <Contests />,
            },
        ],
    },
]);

export default MainRouter;
