import { Button, CircularProgress, Paper, Typography } from "@mui/material";
import useMain from "../../hooks/useMain/useMain";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../api/auth";
import { Link } from "react-router-dom";

const MyProfile = () => {
    const { user } = useMain();

    const { data: userDB, isLoading } = useQuery({
        queryKey: ["userDB"],
        queryFn: async () => getUser(user?.email),
    });

    if (isLoading) return <CircularProgress />;

    return (
        <div
            style={{
                height: "calc(100vh - 150px)",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Paper
                sx={{
                    width: { xs: "90%", sm: "80%", lg: "50%" },
                    height: "300px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                elevation={3}
            >
                <img
                    style={{ width: "75px", borderRadius: "8px" }}
                    src={user?.photoURL}
                    alt=""
                />

                <Typography sx={{ fontWeight: "600" }} variant="h4">
                    {user?.displayName}
                </Typography>

                <Typography gutterBottom>ID: {userDB?._id}</Typography>
                <Typography>Email: {user?.email}</Typography>
                <Typography sx={{ textTransform: "capitalize" }}>
                    Role: {userDB?.role}
                </Typography>

                <Link to="/dashboard/update_profile">
                    <Button sx={{ mt: "1rem" }}>Update Profile</Button>
                </Link>
            </Paper>
        </div>
    );
};

export default MyProfile;
