import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import Home from "../../pages/Home/Home";
import Contests from "../../pages/Contests/Contests";
import ContestDetails from "../../pages/ContestDetails/ContestDetails";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";
import MyProfile from "../../pages/MyProfile/MyProfile";
import MyParticipatedContests from "../../pages/Participant/MyParticipatedContests/MyParticipatedContests";
import MyWinningContests from "../../pages/Participant/MyWinningContests/MyWinningContests";
import AddContest from "../../pages/Creator/AddContest/AddContest";
import MyAddedContests from "../../pages/Creator/MyAddedContests/MyAddedContests";
import ManageUsers from "../../pages/Admin/ManageUsers/ManageUsers";
import ManageContests from "../../pages/Admin/ManageContests/ManageContests";
import PrivateRoute from "../../components/PrivateRoute/PrivateRoute";
import CreatorRoute from "../../components/CreatorRoute/CreatorRoute";
import AdminRoute from "../../components/AdminRoute/AdminRoute";
import RegisterContest from "../../pages/RegisterContest/RegisterContest";
import UpdateContest from "../../pages/UpdateContest/UpdateContest";
import Submissions from "../../pages/Submissions/Submissions";
import UpdateProfile from "../../pages/UpdateProfile/UpdateProfile";
import Statistics from "../../pages/Statistics/Statistics";

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
            {
                path: "/contest/:id",
                element: (
                    <PrivateRoute>
                        <ContestDetails />
                    </PrivateRoute>
                ),
            },
            {
                path: "/register_contest/:id",
                element: <RegisterContest />,
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/dashboard",
        element: (
            <PrivateRoute>
                <DashboardLayout />
            </PrivateRoute>
        ),
        children: [
            {
                index: true,
                element: (
                    <PrivateRoute>
                        <MyProfile />
                    </PrivateRoute>
                ),
            },
            {
                path: "update_profile",
                element: (
                    <PrivateRoute>
                        <UpdateProfile />
                    </PrivateRoute>
                ),
            },
            {
                path: "my_participated_contests",
                element: (
                    <PrivateRoute>
                        <MyParticipatedContests />
                    </PrivateRoute>
                ),
            },
            {
                path: "my_winning_contests",
                element: (
                    <PrivateRoute>
                        <MyWinningContests />
                    </PrivateRoute>
                ),
            },
            {
                path: "statistics",
                element: (
                    <PrivateRoute>
                        <Statistics />
                    </PrivateRoute>
                ),
            },
            {
                path: "add_contest",
                element: (
                    <PrivateRoute>
                        <CreatorRoute>
                            <AddContest />
                        </CreatorRoute>
                    </PrivateRoute>
                ),
            },
            {
                path: "my_added_contests",
                element: (
                    <PrivateRoute>
                        <CreatorRoute>
                            <MyAddedContests />
                        </CreatorRoute>
                    </PrivateRoute>
                ),
            },
            {
                path: "update_contest/:id",
                element: (
                    <PrivateRoute>
                        <UpdateContest />
                    </PrivateRoute>
                ),
            },
            {
                path: "submissions/:id",
                element: (
                    <PrivateRoute>
                        <CreatorRoute>
                            <Submissions />
                        </CreatorRoute>
                    </PrivateRoute>
                ),
            },
            {
                path: "manage_users",
                element: (
                    <PrivateRoute>
                        <AdminRoute>
                            <ManageUsers />
                        </AdminRoute>
                    </PrivateRoute>
                ),
            },
            {
                path: "manage_contests",
                element: (
                    <PrivateRoute>
                        <AdminRoute>
                            <ManageContests />
                        </AdminRoute>
                    </PrivateRoute>
                ),
            },
        ],
    },
]);

export default MainRouter;
